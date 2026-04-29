// =============================================================================
// Citation audit service
// Extracts DOIs and ISBNs from essay text, verifies them against external APIs.
// Deterministic — Gemini is never used for citation work (hallucinates metadata).
//
// APIs used:
//   Crossref  https://api.crossref.org/works/{doi}   — DOI verification (free)
//   OpenLibrary https://openlibrary.org/api/books    — ISBN verification (free)
//
// Both APIs require no key. Crossref polite pool is used (5 sec timeout).
// Verification is parallelized. Capped at MAX_DOIS + MAX_ISBNS per analysis
// to keep latency bounded.
// =============================================================================

const MAX_DOIS = 10;
const MAX_ISBNS = 5;
const FETCH_TIMEOUT_MS = 5000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CitationFinding {
  type: 'doi' | 'isbn';
  raw: string;
  normalized: string;
  verified: boolean;
  metadata?: {
    title?: string;
    authors?: string[];
    year?: number;
    source?: string; // journal name or publisher
  };
  error?: 'not_found' | 'api_error';
}

export interface CitationAuditResult {
  findings: CitationFinding[];
  doiCount: number;
  isbnCount: number;
  verifiedCount: number;
  unverifiedCount: number;
  apiErrorCount: number;
}

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

// Matches bare DOIs and doi.org URLs.
// Examples: 10.1038/nature12373  |  https://doi.org/10.1038/s41586-020-2649-2
const DOI_PATTERN = /\b(10\.\d{4,9}\/[^\s,;)\]}"'<>]+)/gi;

// Matches ISBN-13 (978/979 prefix) and ISBN-10, with or without hyphens.
// Prefixed with optional "ISBN" label.
const ISBN_PATTERN =
  /(?:ISBN[:\s-]*)?(?:(?:97[89])[-\s]?\d{1,5}[-\s]?\d{1,7}[-\s]?\d{1,7}[-\s]?\d|(?:\d[-\s]?){9}[\dX])/gi;

function extractDOIs(text: string): string[] {
  const matches = [...text.matchAll(DOI_PATTERN)].map((m) =>
    m[1].replace(/[.,;)\]}"']+$/, '') // strip trailing punctuation
  );
  return [...new Set(matches)].slice(0, MAX_DOIS);
}

function extractISBNs(text: string): string[] {
  const matches = [...text.matchAll(ISBN_PATTERN)].map((m) =>
    m[0].replace(/[^\dX]/gi, '').toUpperCase()
  );
  const valid = matches.filter((isbn) => isbn.length === 10 || isbn.length === 13);
  return [...new Set(valid)].slice(0, MAX_ISBNS);
}

// ---------------------------------------------------------------------------
// Verification
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function verifyDOI(doi: string): Promise<CitationFinding> {
  const base: CitationFinding = {
    type: 'doi',
    raw: doi,
    normalized: doi.toLowerCase(),
    verified: false,
  };

  try {
    const res = await fetchWithTimeout(
      `https://api.crossref.org/works/${encodeURIComponent(doi)}`
    );

    if (res.status === 404) {
      return { ...base, error: 'not_found' };
    }

    if (!res.ok) {
      return { ...base, error: 'api_error' };
    }

    const json = (await res.json()) as {
      message?: {
        title?: string[];
        author?: { given?: string; family?: string }[];
        published?: { 'date-parts'?: number[][] };
        'container-title'?: string[];
      };
    };

    const msg = json.message ?? {};
    return {
      ...base,
      verified: true,
      metadata: {
        title: msg.title?.[0],
        authors: msg.author?.map((a) =>
          [a.given, a.family].filter(Boolean).join(' ')
        ),
        year: msg.published?.['date-parts']?.[0]?.[0],
        source: msg['container-title']?.[0],
      },
    };
  } catch {
    return { ...base, error: 'api_error' };
  }
}

async function verifyISBN(isbn: string): Promise<CitationFinding> {
  const base: CitationFinding = {
    type: 'isbn',
    raw: isbn,
    normalized: isbn,
    verified: false,
  };

  try {
    const res = await fetchWithTimeout(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=details`
    );

    if (!res.ok) {
      return { ...base, error: 'api_error' };
    }

    const json = (await res.json()) as Record<
      string,
      { details?: { title?: string; authors?: { name: string }[]; publish_date?: string } }
    >;

    const entry = json[`ISBN:${isbn}`];

    if (!entry) {
      return { ...base, error: 'not_found' };
    }

    return {
      ...base,
      verified: true,
      metadata: {
        title: entry.details?.title,
        authors: entry.details?.authors?.map((a) => a.name),
        year: entry.details?.publish_date
          ? parseInt(entry.details.publish_date, 10) || undefined
          : undefined,
      },
    };
  } catch {
    return { ...base, error: 'api_error' };
  }
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function auditCitations(text: string): Promise<CitationAuditResult> {
  const dois = extractDOIs(text);
  const isbns = extractISBNs(text);

  const [doiResults, isbnResults] = await Promise.all([
    Promise.all(dois.map(verifyDOI)),
    Promise.all(isbns.map(verifyISBN)),
  ]);

  const findings = [...doiResults, ...isbnResults];

  return {
    findings,
    doiCount: doiResults.length,
    isbnCount: isbnResults.length,
    verifiedCount: findings.filter((f) => f.verified).length,
    unverifiedCount: findings.filter((f) => f.error === 'not_found').length,
    apiErrorCount: findings.filter((f) => f.error === 'api_error').length,
  };
}
