# LLM cost breakdown

Models: Sonnet 4.6 (~$3/M in, ~$15/M out), Opus 4.8 (~$15/M in, ~$75/M out), Mistral OCR ($2/1k pages).
All OpenRouter calls attributed to zoe.calance.ai.

A) PDF → Journey
 - Mistral OCR (Mistral): 1 call, ~$0.02 (10p)–$0.20 (100p), currently free
 - Topic Extraction / Journey Creation (OpenRouter/Sonnet 4.6): N calls (N = ceil(chars/40k), ~1-3), ~$0.05–0.15/chunk, parallel
 - Architect: removed, built in code, 0 calls
 Total: 1+N calls, ~$0.05–0.65

B) Normal Journey (scratch)
 - Architect / Journey Creation (OpenRouter/Sonnet 4.6): 1 call, ~$0.03–0.08
 Total: 1 call, ~$0.03–0.08

C) Step Generation (per step, both paths)
 - Planner (OpenRouter/Sonnet 4.6): 1 call, ~$0.02–0.05
 - Generator (OpenRouter/Opus 4.8, 32k out): 1 call, ~$0.50–1.50, dominant
 - Repair (OpenRouter/Opus 4.8): 0-1 call, ~$0.50–1.50, only if code breaks
 Total: 2 calls (+1 if repair), ~$0.55–2

Full journey (~8 steps, all opened):
 - PDF: 1 OCR + ~2 extraction + 8×(planner+generator) ≈ 19 calls, ~$5–13
 - Scratch: 1 architect + 8×(planner+generator) ≈ 17 calls, ~$5–12

Note: Opus generator is ~90% of total cost. To cut: lower generator maxTokens (32k→16k) or switch generator to Sonnet.
