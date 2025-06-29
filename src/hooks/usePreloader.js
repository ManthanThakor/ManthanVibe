import { useState, useEffect } from "react";

const usePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const images = document.querySelectorAll("img");
    const totalImages = images.length;
    let loadedImages = 0;

    const preloadImage = (img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          loadedImages++;
          // setProgress dynamically based on total preload process, not just image count
          resolve();
        } else {
          img.onload = () => {
            loadedImages++;
            // setProgress dynamically
            resolve();
          };
          img.onerror = () => {
            loadedImages++;
            // setProgress dynamically
            resolve();
          };
        }
      });
    };

    const preloadFonts = () => {
      return new Promise((resolve) => {
        const fonts = ["Orbitron", "Inter"];
        Promise.all(
          fonts.map((font) => document.fonts.load(`1em ${font}`))
        ).then(() => {
          resolve();
        });
      });
    };

    const preloadModels = () => {
      return new Promise((resolve) => {
        // Simulate 3D model loading for a shorter duration
        setTimeout(() => {
          resolve();
        }, 500); // Reduced from 1000ms
      });
    };

    const preloadAll = async () => {
      if (!mounted) return;
      try {
        // Initial progress
        setProgress(5);
        await new Promise((resolve) => setTimeout(resolve, 200)); // Shorter initial delay

        // Preload fonts (up to ~25%)
        await preloadFonts();
        setProgress(25);
        await new Promise((resolve) => setTimeout(resolve, 300)); // Shorter delay

        // Preload images (up to ~55%)
        await Promise.all(Array.from(images).map(preloadImage));
        setProgress(55);
        await new Promise((resolve) => setTimeout(resolve, 300)); // Shorter delay

        // Preload 3D models (up to ~85%)
        await preloadModels();
        setProgress(85);
        await new Promise((resolve) => setTimeout(resolve, 300)); // Shorter delay

        // Ensure we reach approximately 3.5 seconds total
        const startTime = Date.now();
        const targetDuration = 3500; // Target 3.5 seconds in milliseconds

        const progressInterval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          // Interpolate progress smoothly to 100% within the remaining time
          const newProgress = Math.min(
            100,
            85 + (elapsedTime / (targetDuration * 0.5)) * 15 // Last 15% takes longer
          );
          setProgress(Math.round(newProgress));

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setProgress(100);
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setIsLoading(false);
              });
            });
          }
        }, 30); // Faster interval for smoother updates
      } catch (error) {
        console.error("Error during preloading:", error);
        setIsLoading(false);
      }
    };

    preloadAll();

    return () => {
      mounted = false;
    };
  }, []);

  return { progress, isLoading };
};

export default usePreloader;
