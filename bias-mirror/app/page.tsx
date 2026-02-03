"use client";
import { useState } from "react";

// 1. THIS IS THE FIX: We define what the data looks like
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
  
  // 2. THIS IS THE FIX: We tell React the result can be 'AnalysisResult' OR 'null'
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
    <main style={{ padding: "3rem", maxWidth: "700px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Bias Mirror</h1>

      <p style={{ marginTop: "0.5rem", color: "#555" }}>
        Enter a belief or opinion to see how perspective shapes meaning.
      </p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Remote work makes people lazy..."
        style={{
          width: "100%",
          height: "120px",
          marginTop: "1.5rem",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.25rem",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#000",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* Simple Display of Results */}
      {result && (
        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
          <h3 style={{fontWeight: 'bold'}}>Neutral Reframe</h3>
          <p>{result.neutral_reframe}</p>
          
          <h3 style={{fontWeight: 'bold', marginTop: '1rem'}}>Bias Mirror</h3>
          <p>{result.bias_mirror}</p>

          <pre style={{marginTop: '1rem', fontSize: '0.8rem', overflowX: 'auto'}}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}