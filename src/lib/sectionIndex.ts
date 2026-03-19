export interface DemoSection {
  index: number;
  name: string;
  description: string;
}

export interface DemoSections {
  navFunction: string;
  sections: DemoSection[];
}

/**
 * Static manifest mapping pre-built HTML demo files to their internal sections.
 * Used by Gemini to pick the exact section to show, and by InlineDemo to
 * auto-navigate the iframe on load.
 *
 * navFunction: the global JS function inside the HTML that jumps to a section
 * sections: ordered list of { index, name, description } for Gemini's context
 */
export const sectionIndex: Record<string, DemoSections> = {
  // ── Class 10 Physics ──
  "/FinalContent/Class 10th/Science/Physics/Electricity/ohms_law.html": {
    navFunction: "goToSection",
    sections: [
      { index: 0, name: "Electric Current", description: "Concept of current flow, charge carriers, ampere definition" },
      { index: 1, name: "Ohm's Law", description: "V=IR relationship with interactive voltage/resistance sliders" },
      { index: 2, name: "V-I Graph", description: "Plotting voltage vs current, linear relationship visualization" },
      { index: 3, name: "Resistance Factors", description: "How length, area, material, and temperature affect resistance" },
      { index: 4, name: "Heating Effect", description: "Joule heating, P=I^2R, practical applications like fuses" },
    ],
  },

  // ── Class 10 Mathematics ──
  "/FinalContent/Class 10th/Mathematics/Real Numbers/Introduction_to_real_numbers.html": {
    navFunction: "goToSection",
    sections: [
      { index: 0, name: "Real Numbers", description: "Overview of natural, whole, integer, rational, irrational numbers" },
      { index: 1, name: "Prime Numbers", description: "Definition, sieve of Eratosthenes, prime factorization" },
      { index: 2, name: "Special Cases", description: "Properties of primes, twin primes, Goldbach conjecture" },
      { index: 3, name: "Fundamental Theorem", description: "Fundamental Theorem of Arithmetic, unique factorization" },
      { index: 4, name: "Factor Trees", description: "Interactive factor tree builder for prime factorization" },
      { index: 5, name: "HCF and LCM", description: "Computing HCF and LCM using prime factorization" },
    ],
  },

  // ── Class 9 Biology ──
  "/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_wall_plasmolysis.html": {
    navFunction: "loadJourneyStep",
    sections: [
      { index: 0, name: "Plant Cell Wall", description: "Structure and location of the cell wall" },
      { index: 1, name: "Cell Wall Composition", description: "Cellulose microfibrils, lignin, pectin" },
      { index: 2, name: "Protective Function", description: "How cell wall protects and shapes plant cells" },
      { index: 3, name: "Turgidity and Plant Rigidity", description: "Turgor pressure, why plants stand upright" },
      { index: 4, name: "Plasmolysis Process", description: "What happens when a cell loses water in hypertonic solution" },
      { index: 5, name: "Observing Living vs Dead Cells", description: "Experimental observation of plasmolysis" },
    ],
  },

  "/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/energy_organelles_exhibit.html": {
    navFunction: "loadJourneyStep",
    sections: [
      { index: 0, name: "Mitochondria", description: "Powerhouse of the cell, double membrane, cristae" },
      { index: 1, name: "ATP", description: "Energy currency, ATP synthesis, cellular respiration" },
      { index: 2, name: "Chloroplasts", description: "Photosynthesis, thylakoids, chlorophyll" },
      { index: 3, name: "Plastids", description: "Types: chloroplasts, chromoplasts, leucoplasts" },
      { index: 4, name: "Vacuoles", description: "Storage, turgor, waste disposal" },
      { index: 5, name: "Energy Flow", description: "How energy moves through the cell" },
    ],
  },

  "/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_division_exhibit.html": {
    navFunction: "loadJourneyStep",
    sections: [
      { index: 0, name: "Overview", description: "Why cells divide, growth and repair" },
      { index: 1, name: "Mitosis", description: "Stages of mitotic division, equal chromosome distribution" },
      { index: 2, name: "Meiosis", description: "Reduction division, gamete formation, crossing over" },
      { index: 3, name: "Liver Cell", description: "Liver regeneration as example of mitosis" },
      { index: 4, name: "Flexibility", description: "Regulation of cell division, checkpoints" },
      { index: 5, name: "Integration", description: "How division fits into organism growth" },
    ],
  },

  "/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/organelle_systems_exhibit.html": {
    navFunction: "loadJourneyStep",
    sections: [
      { index: 0, name: "Cytoplasm", description: "The cellular ocean, gel-like matrix" },
      { index: 1, name: "Rough ER", description: "Protein synthesis, ribosome-studded membrane" },
      { index: 2, name: "Smooth ER", description: "Lipid synthesis, detoxification" },
      { index: 3, name: "Golgi Apparatus", description: "Packaging and transport, cisternae" },
      { index: 4, name: "Lysosomes", description: "Digestive enzymes, autophagy, suicide bags" },
      { index: 5, name: "Integration", description: "How organelles work as a coordinated system" },
    ],
  },
};

/**
 * Look up sections for a given demo URL.
 * Returns null if no section index exists for this file.
 */
export function getSectionsForDemo(url: string): DemoSections | null {
  return sectionIndex[url] ?? null;
}

/**
 * Build a text description of available demo sections for the Gemini system prompt.
 * Only includes files from the availableDemos list that have section data.
 */
export function buildSectionContext(availableDemos: { name: string; url: string }[]): string {
  const lines: string[] = [];

  for (const demo of availableDemos) {
    const meta = sectionIndex[demo.url];
    if (!meta) continue;

    lines.push(`For "${demo.name}" (${demo.url}):`);
    for (const s of meta.sections) {
      lines.push(`  - Section ${s.index}: "${s.name}" -- ${s.description}`);
    }
  }

  if (lines.length === 0) return "";
  return `## Available Pre-Built Demo Sections\nUse show_demo_section to jump directly to a specific section:\n${lines.join("\n")}`;
}
