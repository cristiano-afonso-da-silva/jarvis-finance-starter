# Teacher fallback components

The numbered prompts in ../PROMPTS.md are the student workflow. The website and prompts are English; the separate teacher handout uses Cantonese for guidance and scripts.

Copy ONE reference component into src/components with the same filename only when a student needs a working fallback. Do not import directly from teacher because relative imports are written for src/components.

Prompt 00 generates the HUD, ledger AND colour controls together. The initial app does not include completed charts, targets or an advisor. Prompt 02 only personalises the existing colour system.
