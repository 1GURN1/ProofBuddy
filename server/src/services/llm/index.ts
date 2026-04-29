// Phase 9: provider-agnostic LLM abstraction
// Single entry point for all Gemini calls. Swap the implementation here
// to change providers without touching any route or service.
//
// Interface (to be implemented in Phase 9):
//   analyzeWithLLM<T>(prompt: string, schema: object): Promise<T>
//
// Rules enforced at this layer:
//   - Educator-side prompts must include the cautious-language system prompt
//   - Student-side prompts must not produce essay prose
//   - Every call is logged with token counts for usage tracking

export {};
