export default function GlobalNotFound() {
  return (
    <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem", color: "#2D2A26" }}>404</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#2D2A26" }}>Sidan hittades inte</p>
        <p style={{ color: "#6B6560", marginBottom: "2rem" }}>Sidan du letar efter finns inte.</p>
        <a
          href="/"
          style={{
            background: "#C41E1E",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Gå till startsidan
        </a>
      </div>
    </main>
  );
}
