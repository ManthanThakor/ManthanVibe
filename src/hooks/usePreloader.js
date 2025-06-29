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
          setProgress((loadedImages / totalImages) * 100);
          resolve();
        } else {
          img.onload = () => {
            loadedImages++;
            setProgress((loadedImages / totalImages) * 100);
            resolve();
          };
          img.onerror = () => {
            loadedImages++;
            setProgress((loadedImages / totalImages) * 100);
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
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    };

    const preloadAll = async () => {
      if (!mounted) return;
      try {
        // Start with 5% progress
        setProgress(5);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Preload fonts (up to 20%)
        await preloadFonts();
        setProgress(20);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Preload images (up to 50%)
        await Promise.all(Array.from(images).map(preloadImage));
        setProgress(50);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Preload 3D models (up to 80%)
        await preloadModels();
        setProgress(80);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Ensure we reach exactly 4 seconds
        const startTime = Date.now();
        const targetDuration = 4000; // 4 seconds in milliseconds

        // Gradually increase progress to 100%
        const progressInterval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const newProgress = Math.min(
            100,
            80 + (elapsedTime / targetDuration) * 20
          );
          setProgress(Math.round(newProgress));

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            // Ensure state updates and animations are synchronized
            setProgress(100);
            // Use RAF to ensure DOM is updated before triggering exit
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setIsLoading(false);
              });
            });
          }
        }, 50);
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
