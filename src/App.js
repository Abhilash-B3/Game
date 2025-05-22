import React, { useRef, useEffect } from "react";
import "./App.css";
import CancelAttack from "./CancelAttack";

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const game = new CancelAttack(canvas, ctx);
    game.start();

    return () => game.stop(); // Clean up on unmount
  }, []);

  return (
    <div className="App">
      <h1 className="title">Cancel Culture: Meme Arena</h1>
      <canvas ref={canvasRef} width={800} height={500} />
    </div>
  );
}

export default App;
