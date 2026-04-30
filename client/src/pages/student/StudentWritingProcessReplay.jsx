import { useState } from "react";

const replayEvents = [
  { time: 0,   timestamp: "09:14:02", type: "SESSION_START", text: "" },
  { time: 5,   timestamp: "09:14:18", type: "PASTE",         text: "The concept of technological determinism posits that technology is the primary driver of social change." },
  { time: 15,  timestamp: "09:22:45", type: "EDIT",          text: "The concept of technological determinism posits that technology is the primary driver of social change. However, this view has been contested by scholars who argue that social factors mediate technological adoption." },
  { time: 30,  timestamp: "09:35:11", type: "PASTE",         text: "The concept of technological determinism posits that technology is the primary driver of social change. However, this view has been contested by scholars who argue that social factors mediate technological adoption. In conclusion, a nuanced perspective is essential for understanding the relationship between technology and society." },
  { time: 40,  timestamp: "09:41:33", type: "IDLE",          text: "The concept of technological determinism posits that technology is the primary driver of social change. However, this view has been contested by scholars who argue that social factors mediate technological adoption. In conclusion, a nuanced perspective is essential for understanding the relationship between technology and society." },
  { time: 50,  timestamp: "09:47:55", type: "EDIT",          text: "The concept of technological determinism posits that technology is the primary driver of social change. However, this view has been contested by scholars who argue that social factors shape and mediate technological adoption in complex ways. In conclusion, a nuanced perspective is essential for understanding the evolving relationship between technology and society." },
  { time: 60,  timestamp: "09:52:10", type: "SESSION_END",   text: "The concept of technological determinism posits that technology is the primary driver of social change. However, this view has been contested by scholars who argue that social factors shape and mediate technological adoption in complex ways. In conclusion, a nuanced perspective is essential for understanding the evolving relationship between technology and society." },
];

const typeStyles = {
  SESSION_START: { cls: "bg-emerald-50 text-emerald-700", icon: "play_circle" },
  SESSION_END:   { cls: "bg-stone-100 text-stone-600",    icon: "stop_circle" },
  PASTE:         { cls: "bg-red-50 text-red-700",         icon: "content_paste" },
  EDIT:          { cls: "bg-blue-50 text-blue-700",       icon: "edit" },
  IDLE:          { cls: "bg-amber-50 text-amber-700",     icon: "hourglass_empty" },
};

export default function StudentWritingProcessReplay() {
  const [step, setStep] = useState(replayEvents.length - 1);
  const [playing, setPlaying] = useState(false);

  const current = replayEvents[step];
  const total = replayEvents.length - 1;

  function handleSlider(e) {
    setStep(Number(e.target.value));
    setPlaying(false);
  }

  function handlePlay() {
    if (step >= total) { setStep(0); }
    setPlaying(true);
    let s = step >= total ? 0 : step + 1;
    const interval = setInterval(() => {
      setStep(s);
      s++;
      if (s > total) { clearInterval(interval); setPlaying(false); }
    }, 900);
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <header className="bg-[#FAF9F6] border-b border-[#E8E4DC] sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3 max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <a href="/student/report" className="text-stone-400 hover:text-stone-700 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </a>
            <div>
              <p className="font-medium text-sm text-on-surface leading-tight">Writing Process Replay</p>
              <p className="font-label-caps text-[10px] text-stone-400">THESIS DRAFT V2 • ENGL 102</p>
            </div>
          </div>
          <a href="/student/report" className="text-sm text-primary font-medium hover:underline">View Full Report</a>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-gutter py-stack_lg">
        <header className="mb-stack_lg">
          <p className="font-label-caps text-stone-400 mb-1">PROCESS REPLAY</p>
          <h1 className="font-h1 text-primary mb-2">Writing Timeline</h1>
          <p className="font-body-md text-stone-500">Scrub through your document's editing history to see how it evolved over time.</p>
        </header>

        <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden mb-stack_lg">
          <div className="flex items-center gap-3 px-stack_md py-4 border-b border-outline-variant bg-stone-50">
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full font-label-caps text-[10px] ${typeStyles[current.type]?.cls}`}>
              <span className="material-symbols-outlined text-[14px]">{typeStyles[current.type]?.icon}</span>
              {current.type.replace("_", " ")}
            </div>
            <span className="font-code text-xs text-stone-400">{current.timestamp}</span>
            <span className="ml-auto font-label-caps text-[10px] text-stone-400">STEP {step + 1} OF {total + 1}</span>
          </div>

          <div className="p-stack_md min-h-[200px]">
            {current.text
              ? <p className="font-editor-text text-editor-text leading-loose text-on-surface">{current.text}</p>
              : <p className="text-stone-300 font-editor-text italic">Session starting...</p>
            }
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-stack_md shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => { setStep(0); setPlaying(false); }}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
              title="Restart"
            >
              <span className="material-symbols-outlined">skip_previous</span>
            </button>
            <button
              type="button"
              onClick={() => { if (step > 0) { setStep(p => p - 1); setPlaying(false); }}}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
            >
              <span className="material-symbols-outlined">navigate_before</span>
            </button>
            <button
              type="button"
              onClick={playing ? () => setPlaying(false) : handlePlay}
              className="p-3 rounded-full bg-primary text-on-primary transition-all active:scale-95 hover:opacity-90"
            >
              <span className="material-symbols-outlined">{playing ? "pause" : "play_arrow"}</span>
            </button>
            <button
              type="button"
              onClick={() => { if (step < total) { setStep(p => p + 1); setPlaying(false); }}}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
            >
              <span className="material-symbols-outlined">navigate_next</span>
            </button>
            <button
              type="button"
              onClick={() => { setStep(total); setPlaying(false); }}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors text-stone-500"
              title="Jump to end"
            >
              <span className="material-symbols-outlined">skip_next</span>
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={total}
            value={step}
            onChange={handleSlider}
            className="w-full accent-primary"
          />

          <div className="flex justify-between mt-3 overflow-x-auto gap-1">
            {replayEvents.map((ev, i) => {
              const { cls, icon } = typeStyles[ev.type] || {};
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setStep(i); setPlaying(false); }}
                  className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all ${i === step ? "ring-2 ring-primary scale-105" : "opacity-60 hover:opacity-100"}`}
                  title={ev.type}
                >
                  <span className={`material-symbols-outlined text-[16px] p-1 rounded-full ${cls}`}>{icon}</span>
                  <span className="font-code text-[9px] text-stone-400">{ev.timestamp.slice(0, 5)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
