import React, { useEffect, useRef } from "react";
import Player from "./Player";
import CancelAttack from "./CancelAttack";
import MemeProjectile from "./MemeProjectile";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const playerRef = useRef(null);
  const projectilesRef = useRef([]);
  const cancelAttacksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const player = new Player(width / 2, height - 60);
    playerRef.current = player;

    let keys = {};

    const spawnCancelAttack = () => {
      const x = Math.random() * width;
      cancelAttacksRef.current.push(new CancelAttack(x, 0));
    };

    const fireMeme = () => {
      projectilesRef.current.push(
        new MemeProjectile(playerRef.current.x + 20, playerRef.current.y)
      );
    };

    const gameLoop = () => {
      ctx.fillStyle = "#1e1e1e";
      ctx.fillRect(0, 0, width, height);

      // Update and draw player
      playerRef.current.update(keys, width);
      playerRef.current.draw(ctx);

      // Update and draw meme projectiles
      projectilesRef.current.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.y < 0) projectilesRef.current.splice(index, 1);
      });

      // Update and draw cancel attacks
      cancelAttacksRef.current.forEach((c, index) => {
        c.update();
        c.draw(ctx);
        if (c.y > height) cancelAttacksRef.current.splice(index, 1);
      });

      requestAnimationFrame(gameLoop);
    };

    const keyDown = (e) => {
      keys[e.key] = true;
      if (e.key === " ") fireMeme(); // Space bar fires
    };
    const keyUp = (e) => (keys[e.key] = false);

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    const interval = setInterval(spawnCancelAttack, 1000);
    gameLoop();

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{ background: "#222", border: "3px solid hotpink" }}
      />
    </div>
  );
};

export default GameCanvas;
