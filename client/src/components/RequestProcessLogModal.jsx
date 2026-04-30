export default function RequestProcessLogModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white max-w-[560px] w-full rounded-xl shadow-[0_4px_40px_rgba(26,26,26,0.08)] border border-[#E8E4DC] overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-secondary-container rounded-lg">
              <span
                className="material-symbols-outlined text-on-secondary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                assignment_turned_in
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="mb-8">
            <h2 className="font-h2 text-h2 text-primary mb-3">
              Request Writing Process from Student
            </h2>

            <p className="text-stone-500 leading-relaxed">
              We'll send the student a notification asking them to share their
              ProofBuddy Writing Log for this document. This provides a detailed
              timeline of their drafting process, research habits, and source
              attribution to help clarify academic integrity concerns.
            </p>
          </div>

          <div className="mb-8">
            <label className="font-label-caps text-label-caps text-stone-400 block mb-3">
              MESSAGE TO STUDENT
            </label>

            <div className="relative">
              <textarea
                className="w-full h-32 p-4 bg-surface-container-lowest border border-[#E8E4DC] rounded-lg font-editor-text text-stone-800 text-sm focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all resize-none"
                placeholder="Add a custom note to the student..."
                defaultValue={
                  "I'd like to discuss your writing process for this paper. Could you please share your ProofBuddy process log for \"The Silk Road Influence\" by Monday?"
                }
              />

              <div className="absolute bottom-3 right-3 text-[10px] text-stone-400 font-medium">
                CHARACTERS: 164
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              Send Request
              <span className="material-symbols-outlined text-sm">send</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-stone-500 text-sm font-medium hover:text-stone-800 transition-colors"
            >
              Cancel and return to report
            </button>
          </div>
        </div>

        <div className="bg-surface-container-low px-8 py-4 border-t border-[#E8E4DC] flex items-center gap-3">
          <span className="material-symbols-outlined text-stone-400 text-sm">
            info
          </span>

          <p className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold">
            Log will be viewable immediately upon student approval.
          </p>
        </div>
      </div>
    </div>
  );
}
