import { useState, useEffect } from "react";

const usePreloader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const images = document.querySelectorAll("img");
    const totalImages = images.length;
    let loadedImages = 0;

    // Preload a single image (handles cached and uncached cases)
    const preloadImage = (img) => {
      return new Promise((resolve) => {
        if (img.complete) {
          loadedImages++;
          resolve();
        } else {
          img.onload = img.onerror = () => {
            loadedImages++;
            resolve();
          };
        }
      });
    };

    // Preload custom web fonts
    const preloadFonts = () => {
      return new Promise((resolve) => {
        const fonts = ["Orbitron", "Inter"];
        Promise.all(
          fonts.map((font) => document.fonts.load(`1em ${font}`))
        ).then(resolve);
      });
    };

    // Simulate 3D model loading (e.g., GLTF, FBX, etc.)
    const preloadModels = () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    };

    // Execute full preloading sequence with staged progress
    const preloadAll = async () => {
      if (!mounted) return;

      try {
        setProgress(5);
        await new Promise((r) => setTimeout(r, 200));

        await preloadFonts();
        setProgress(25);
        await new Promise((r) => setTimeout(r, 300));

        await Promise.all(Array.from(images).map(preloadImage));
        setProgress(55);
        await new Promise((r) => setTimeout(r, 300));

        await preloadModels();
        setProgress(85);
        await new Promise((r) => setTimeout(r, 300));

        const startTime = Date.now();
        const targetDuration = 3500;

        // Smoothly animate final 15% progress to reach 100%
        const progressInterval = setInterval(() => {
          const elapsedTime = Date.now() - startTime;
          const newProgress = Math.min(
            100,
            85 + (elapsedTime / (targetDuration * 0.5)) * 15
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
        }, 30);
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
