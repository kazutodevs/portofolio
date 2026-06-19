import { useState } from "react";
import KazutoDevDark from "./new/kazutodevdark";
import KazutoDevLight from "./new/kazutodevlight";

export default function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const Page = theme === "dark" ? KazutoDevDark : KazutoDevLight;

  return (
    <>
      {/* tombol toggle global */}
      {/* <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          padding: "10px 14px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button> */}

      {/* render page */}
      <Page />
    </>
  );
}