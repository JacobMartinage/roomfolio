import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoaded }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [bricks, setBricks] = useState([]);
  const { progress, loaded, total, active } = useProgress(); // Added more progress details
  const loadingComplete = loaded && progress >= 100;

  useEffect(() => {
    // Log loading status for debugging
    console.log({
      progress,
      loaded,
      total,
      active,
      loadingComplete
    });

    // Update bricks based on real loading progress
    const brickCount = Math.floor((progress / 100) * 20);
    setBricks(Array(brickCount).fill("█"));
  }, [progress, loaded, total, active]);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => onLoaded(), 500);
  };

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="space-background"></div> 

      <div className="loading-content">
        <h1 className="portfolio-title">My Portfolio in 3D</h1>

        {!loadingComplete ? (
          <>
            <h2>Loading... {Math.round(progress)}%</h2>
            <div className="brick-loading-bar">
              {bricks.map((brick, index) => (
                <span key={index} className="brick">{brick}</span>
              ))}
            </div>
          </>
        ) : (
          <button className="enter-button" onClick={handleEnter}>Enter</button> 
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;