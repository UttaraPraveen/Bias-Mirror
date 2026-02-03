"use client";

export default function Home() {
  return (
    <main style={{ padding: "3rem", maxWidth: "700px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Bias Mirror
      </h1>

      <p style={{ marginTop: "0.5rem", color: "#555" }}>
        Enter a belief or opinion to see how perspective shapes meaning.
      </p>

      <textarea
        placeholder="Remote work makes people lazy."
        style={{
          width: "100%",
          height: "120px",
          marginTop: "1.5rem",
          padding: "1rem",
          fontSize: "1rem"
        }}
      />

      <button
  onClick={async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: "Remote work makes people lazy."
      })
    });

    const data = await res.json();
    console.log(data);
  }}
  style={{
    marginTop: "1rem",
    padding: "0.75rem 1.25rem",
    fontSize: "1rem",
    cursor: "pointer"
  }}
>
  Analyze
</button>

    </main>
  );
}
