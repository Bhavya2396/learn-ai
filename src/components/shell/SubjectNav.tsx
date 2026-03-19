"use client";

import { Accordion } from "@/components/ui/accordion";
import { useAppStore } from "@/lib/store";
import { getCurriculum } from "@/lib/curriculum";
import SubjectItem from "./SubjectItem";

export default function SubjectNav() {
  const { selectedClass, setSelectedClass } = useAppStore();
  const subjects = getCurriculum(selectedClass);

  return (
    <div className="px-2 py-2">
      {/* Class selector */}
      <div className="px-3 py-2 flex items-center gap-2">
        {["9th", "10th"].map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className="flex-1 text-center py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200"
            style={{
              background: selectedClass === cls ? "var(--accent)" : "var(--surface)",
              color: selectedClass === cls ? "var(--accent-foreground)" : "var(--foreground)",
            }}
          >
            Class {cls}
          </button>
        ))}
      </div>

      <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-foreground/50">
        Subjects
      </p>
      <Accordion multiple className="space-y-0.5">
        {subjects.map((subject) => (
          <SubjectItem key={subject.id} subject={subject} />
        ))}
      </Accordion>
    </div>
  );
}
