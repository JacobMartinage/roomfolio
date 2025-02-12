import { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [bricks, setBricks] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const fakeLoading = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fakeLoading);
          setLoadingComplete(true); // ✅ Show Enter button immediately
          return 100;
        }

        // ✅ Update brick-based progress animation
        setBricks((b) => {
          const newBricks = [...b, "█"];
          return newBricks.length > 20 ? newBricks.slice(1) : newBricks;
        });

        return prev + Math.random() * 3; // ✅ Slower, more natural fill speed
      });
    }, 20); // ✅ Faster interval

    return () => clearInterval(fakeLoading);
  }, []);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => onLoaded(), 800); // ✅ Slightly faster transition
  };

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="space-background"></div> 

      <div className="loading-content">
        <h1 className="portfolio-title">Jacob Martinage's Portfolio</h1>

        {!loadingComplete ? (
          <>
            <h2>Loading...</h2>
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
