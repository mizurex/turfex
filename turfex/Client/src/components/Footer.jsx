export function Footer() {
  return (
    <main className="px-3 py-12 bg-[#FAF7F3] text-black">
      <div className="space-y-4">

        <div className="collapse bg-white border border-base-300">
          <input type="radio" name="my-accordion-1" defaultChecked />
          <div className="collapse-title font-semibold">
            Do I have to pay for it?
          </div>
          <div className="collapse-content text-sm">
            <p>Nope! Turfex is free to use. There are no hidden costs.</p>
          </div>
        </div>

        <div className="collapse bg-white border border-base-300">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title font-semibold">
            Is there a limit on how many PDFs I can generate?
          </div>
          <div className="collapse-content text-sm">
            <p>No, you can generate as many PDFs as you like.</p>
          </div>
        </div>

        <div className="collapse bg-white border border-base-300">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title font-semibold">
            Which AI models does it use?
          </div>
          <div className="collapse-content text-sm">
            <p>We integrate popular models like Gemini, GPT-4, and others depending on the task.</p>
          </div>
        </div>

  

     

      </div>
    </main>
  );
}
