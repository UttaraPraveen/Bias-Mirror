"use client";
import { useState } from "react";

interface AnalysisResult {
  neutral_reframe: string;
  perspectives: {
    affected_individual: string;
    authority: string;
    societal: string;
    ethical: string;
  };
  assumptions: string[];
  bias_mirror: string;
  bias_tags: string[];
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: inputText }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-900 selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex gap-8 text-sm font-medium text-slate-600 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-sm">
          <span className="cursor-pointer hover:text-black">Tool</span>
          <span className="cursor-pointer hover:text-black">Science</span>
          <span className="cursor-pointer hover:text-black">FAQs</span>
          <span className="cursor-pointer hover:text-black">About</span>
        </div>
        <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-all">
          <span>Get Started</span>
          <span className="text-lg">→</span>
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        {/* Badge */}
        <div className="inline-block bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100 mb-8 animate-fade-in">
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
            Bias Reflection Engine
          </span>
        </div>

        {/* Hero Section */}
        <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-slate-900 mb-6 leading-[1.1]">
          See your biases reflected. <br />
          <span className="italic text-slate-700">Shift your view.</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          The Bias Mirror helps you uncover hidden complexity in your opinions by reflecting them through multiple objective lenses.
        </p>

        {/* Input Area */}
        <div className="relative max-w-2xl mx-auto mb-16">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter an opinion (e.g., Remote work makes people lazy...)"
            className="w-full h-32 p-6 rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-xl focus:ring-2 focus:ring-slate-400 focus:outline-none text-lg transition-all resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="absolute bottom-4 right-4 bg-black text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-transform disabled:bg-slate-400 flex items-center gap-2"
          >
            {loading ? "Reflecting..." : "Analyze"}
            {!loading && <span className="text-lg">→</span>}
          </button>
        </div>

        {/* --- RESULTS SECTION --- */}
        {result && (
          <div className="animate-fade-in space-y-8 text-left">
            <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-[32px]">
              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Neutral Reality</h3>
              <p className="text-2xl text-slate-800 font-medium">{result.neutral_reframe}</p>
            </div>

            <div className="grid md:grid-rows-2 md:grid-cols-2 gap-4">
              <PerspectiveCard title="Affected Individual" icon="👤" text={result.perspectives.affected_individual} />
              <PerspectiveCard title="Authority Figure" icon="⚖️" text={result.perspectives.authority} />
              <PerspectiveCard title="Society" icon="🌍" text={result.perspectives.societal} />
              <PerspectiveCard title="Ethical Lens" icon="🧭" text={result.perspectives.ethical} />
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-slate-100 p-10 rounded-[40px] shadow-sm">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">🪞 The Mirror Reflection</h3>
                    <p className="text-lg italic text-slate-600 border-l-4 border-slate-200 pl-6">"{result.bias_mirror}"</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {result.bias_tags.map((tag, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function PerspectiveCard({ title, text, icon }: { title: string; text: string; icon: string }) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xl">{icon}</span>
        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{title}</h4>
      </div>
      <p className="text-slate-600 leading-relaxed text-sm">{text}</p>
    </div>
  );
}