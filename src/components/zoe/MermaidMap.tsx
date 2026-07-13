"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Renders a mermaid flowchart definition as an SVG, lazily (mermaid is heavy and
 * browser-only). Themed to ZOE's warm palette. Fails silently — the caller shows
 * the index as the source of truth, this is the "map" view.
 */
export default function MermaidMap({ definition }: { definition: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const id = "zoe-mm-" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif",
          themeVariables: {
            // Backgrounds — solid warm fills so nodes are clearly distinct from the page
            background: "#FBF8F2",
            primaryColor: "#FDDFA0",
            primaryBorderColor: "#B86A0A",
            // Dark ink text — readable on yellow node fill
            primaryTextColor: "#1E1A14",
            secondaryColor: "#EDE5D8",
            tertiaryColor: "#D4E8C4",
            tertiaryBorderColor: "#3E6B2A",
            tertiaryTextColor: "#1E1A14",
            // Edges
            lineColor: "#B86A0A",
            edgeLabelBackground: "#FBF8F2",
            // Cluster / subgraph
            clusterBkg: "#F4EFE5",
            clusterBorder: "rgba(42,34,20,0.18)",
            // Node text
            nodeTextColor: "#1E1A14",
            // Title
            titleColor: "#1E1A14",
          },
        });
        const { svg } = await mermaid.render(id, definition);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => { cancelled = true; };
  }, [definition, id]);

  if (error) {
    return (
      <div className="text-[13.5px] font-medium py-8 text-center" style={{ color: "var(--z-ink-3)" }}>
        Map unavailable — your path is shown in the index.
      </div>
    );
  }

  return <div ref={ref} className="zoe-mermaid w-full overflow-x-auto flex justify-center [&_svg]:max-w-full [&_svg]:h-auto" />;
}
