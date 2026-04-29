// Extracts the domain portion of an email address, lowercased.
// Used in educator signup to check against blocked_email_domains.
export function extractDomain(email: string): string {
  return email.split('@')[1]?.toLowerCase() ?? '';
}

// Derives a human-readable institution name from a domain.
// e.g. "uwaterloo.ca" → "Uwaterloo" (rough default; educator can correct at signup)
export function deriveInstitutionName(domain: string): string {
  const base = domain.split('.')[0] ?? domain;
  return base.charAt(0).toUpperCase() + base.slice(1);
}
