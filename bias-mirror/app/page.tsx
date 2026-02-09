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
    <main style={{ padding: "3rem", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif", lineHeight: "1.6" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Bias Mirror</h1>

      <p style={{ color: "#666", fontSize: "1.1rem" }}>
        Enter an opinion to see the hidden complexity behind it.
      </p>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="e.g., Remote work makes people lazy..."
        style={{
          width: "100%",
          height: "120px",
          marginTop: "1.5rem",
          padding: "1rem",
          fontSize: "1rem",
          borderRadius: "12px",
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          resize: "none"
        }}
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: "1.5rem",
          padding: "1rem 2rem",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: loading ? "#ccc" : "#000",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          transition: "background 0.2s"
        }}
      >
        {loading ? "Reflecting..." : "Analyze Perspectives"}
      </button>

      {/* --- RESULTS SECTION --- */}
      {result && (
        <div style={{ marginTop: "3rem", animation: "fadeIn 0.5s ease-in" }}>
          
          {/* 1. Neutral Reframe (The Anchor) */}
          <div style={{ background: "#f0f9ff", padding: "1.5rem", borderRadius: "12px", borderLeft: "5px solid #0ea5e9", marginBottom: "2rem" }}>
            <h3 style={{ color: "#0284c7", margin: "0 0 0.5rem 0", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Neutral Reality</h3>
            <p style={{ fontSize: "1.2rem", margin: 0 }}>{result.neutral_reframe}</p>
          </div>

          {/* 2. The Bias Mirror (The "What If") */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>🪞 The Mirror Reflection</h3>
            <p style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#444" }}>"{result.bias_mirror}"</p>
          </div>

          {/* 3. Perspectives Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
            <PerspectiveCard title="Affected Individual" icon="👤" text={result.perspectives.affected_individual} />
            <PerspectiveCard title="Authority Figure" icon="⚖️" text={result.perspectives.authority} />
            <PerspectiveCard title="Society" icon="🌍" text={result.perspectives.societal} />
            <PerspectiveCard title="Ethical Lens" icon="🧭" text={result.perspectives.ethical} />
          </div>

          {/* 4. Assumptions & Tags */}
          <div style={{ background: "#fafafa", padding: "2rem", borderRadius: "16px" }}>
            <h4 style={{ margin: "0 0 1rem 0", fontWeight: "bold" }}>Hidden Assumptions</h4>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "2rem", color: "#555" }}>
              {result.assumptions.map((item, i) => (
                <li key={i} style={{ marginBottom: "0.5rem" }}>{item}</li>
              ))}
            </ul>

            <h4 style={{ margin: "0 0 1rem 0", fontWeight: "bold" }}>Cognitive Biases Detected</h4>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {result.bias_tags.map((tag, i) => (
                <span key={i} style={{ background: "#e5e7eb", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.9rem", color: "#374151" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}

// Helper Component for the grid cards
function PerspectiveCard({ title, text, icon }: { title: string; text: string; icon: string }) {
  return (
    <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "12px", border: "1px solid #eee", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
      <div style={{ fontWeight: "bold", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span>{icon}</span> {title}
      </div>
      <p style={{ fontSize: "0.95rem", color: "#555", margin: 0 }}>{text}</p>
    </div>
  );
}