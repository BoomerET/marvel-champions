import { useEffect } from "react";
import { GameBoard } from "./components/GameBoard";
import "./App.css";

function App() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        document.body.classList.add("shift-down");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") {
        document.body.classList.remove("shift-down");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      document.body.classList.remove("shift-down");
    };
  }, []);

  return <GameBoard />;
}

export default App;
