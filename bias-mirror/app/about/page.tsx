import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen text-slate-900 font-sans">
      {/* Navigation (Consistent) */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex gap-1 p-1 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-sm">
          <Link href="/" className="px-6 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-white hover:text-black transition-all">
            Home
          </Link>
          <Link href="/about" className="px-6 py-2 rounded-full text-sm font-medium bg-white text-black shadow-sm">
            About
          </Link>
          <Link href="/contact" className="px-6 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-white hover:text-black transition-all">
            Contact
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8">
          The Science of <span className="italic text-slate-600">Reflection</span>
        </h1>

        <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed space-y-6">
          <p className="text-xl text-slate-800 font-medium">
            We live in an echo chamber. Algorithms feed us what we want to hear, reinforcing our existing beliefs until they feel like absolute truths.
          </p>
          
          <p>
            The <strong>Bias Mirror</strong> was built to break that cycle—not by judging you, but by showing you the hidden complexity you might have missed. It acts as a cognitive prism, taking a singular beam of thought and refracting it into a spectrum of valid perspectives.
          </p>

          <h3 className="text-2xl font-serif text-slate-900 mt-12 mb-4">How It Works</h3>
          <p>
            Using advanced Large Language Models (LLMs), our engine analyzes your statement for emotional loading and cognitive distortions. It then systematically applies four distinct frameworks:
          </p>
          <ul className="list-none space-y-4 pl-0">
            <li className="flex gap-4">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shrink-0">1</span>
              <span><strong>Neutralization:</strong> Stripping away inflammatory language to find the core claim.</span>
            </li>
            <li className="flex gap-4">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shrink-0">2</span>
              <span><strong>Perspective Taking:</strong> Simulating the reactions of those most affected by the opinion.</span>
            </li>
            <li className="flex gap-4">
              <span className="bg-blue-100 text-blue-700 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shrink-0">3</span>
              <span><strong>Systems Thinking:</strong> Examining the long-term societal ripple effects.</span>
            </li>
          </ul>

          <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl mt-12">
            <p className="text-sm text-yellow-800 m-0">
              <strong>Note:</strong> This tool is designed for self-reflection, not absolute truth. The AI models we use are advanced, but they can still mirror the biases present in their training data. Use this as a starting point for thought, not a final verdict.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}