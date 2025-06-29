import React, { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";
import * as THREE from "three";
import "./PreLoader.css";
import Logo from "../../assets/Logo/Logo.png";

const PreLoader = ({ progress, isLoading }) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const particlesRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasStartedExit, setHasStartedExit] = useState(false);

  // Enhanced Three.js particle system with glow
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to container and store the DOM element for cleanup
    particlesRef.current = renderer.domElement;
    containerRef.current.appendChild(renderer.domElement);

    // Create glowing particles
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Positions
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      // Colors – vibrant teal with variations
      const hue = 0.45 + Math.random() * 0.1;
      const saturation = 0.9;
      const lightness = 0.5 + Math.random() * 0.4;
      color.setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Sizes – larger for more glow
      sizes[i] = 3 + Math.random() * 5;
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Particle material with more glow
    const particleMaterial = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 500;

    // Animation loop: now store the requestAnimationFrame ID
    let reqId;
    function animate() {
      reqId = requestAnimationFrame(animate);

      // More dynamic rotation
      particleSystem.rotation.x += 0.0008;
      particleSystem.rotation.y += 0.0012;

      // Enhanced pulse effect
      const time = Date.now() * 0.0005;
      particleSystem.scale.x = 1 + Math.sin(time * 3) * 0.15;
      particleSystem.scale.y = 1 + Math.cos(time * 2) * 0.15;
      particleSystem.scale.z = 1 + Math.sin(time * 4) * 0.1;

      // Color pulse effect
      const colorTime = Date.now() * 0.001;
      const hue = 0.45 + Math.sin(colorTime * 0.5) * 0.05;
      particleSystem.material.color.setHSL(hue, 0.9, 0.6);

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId); // cancel the animation loop on cleanup
      if (containerRef.current && particlesRef.current) {
        containerRef.current.removeChild(particlesRef.current);
      }
      renderer.dispose();
    };
  }, []);

  // Main exit sequence for when isLoading becomes false
  useEffect(() => {
    let mounted = true;
    if (!isLoading && containerRef.current && mounted && !hasStartedExit) {
      setHasStartedExit(true);
      const exitSequence = async () => {
        try {
          // Final flash and container exit (simplified)
          const finalFlash = document.createElement("div");
          finalFlash.className = "exit-flash";
          containerRef.current.appendChild(finalFlash);

          // Animate opacity of the preloader container for a smooth fade out
          anime({
            targets: containerRef.current,
            opacity: [1, 0],
            duration: 800, // Duration for fade out
            easing: "easeOutQuad",
            complete: () => {
              if (containerRef.current) {
                containerRef.current.style.display = "none";
              }
              finalFlash.remove();
            },
          });

          // Animate out the logo and loading bar along with the main container
          const logo = document.querySelector(".preloader-logo");
          const loadingBar = document.querySelector(".loading-bar-container");

          if (logo) {
            anime({
              targets: logo,
              opacity: [1, 0],
              duration: 700,
              easing: "easeOutQuad",
            });
          }
          if (loadingBar) {
            anime({
              targets: loadingBar,
              opacity: [1, 0],
              duration: 700,
              easing: "easeOutQuad",
            });
          }
        } catch (error) {
          console.error("Error during exit sequence:", error);
        }
      };

      if (mounted) {
        exitSequence().catch((error) =>
          console.error("Error in exit sequence:", error)
        );
      }
      return () => {
        mounted = false;
      };
    }
  }, [isLoading, hasStartedExit]);

  // Progress and primary animations
  useEffect(() => {
    if (!isLoading) return;

    // Progress animation for the loading bar
    const progressAnimation = anime({
      targets: ".loading-bar-inner",
      width: ["0%", "100%"],
      duration: 3000, // Reduced duration for faster preload
      easing: "easeInOutQuart",
      update: function (anim) {
        setLoadingProgress(Math.round(anim.progress));
      },
    });

    // Logo animation with a bounce-from-left effect
    // Entry animation (fade + scale + glow)
    anime({
      targets: ".preloader-logo",
      opacity: [0, 1],
      scale: [0.5, 1.1, 1],
      duration: 1200, // Reduced duration
      easing: "easeInOutQuad",
      delay: 200, // Reduced delay
      complete: () => {
        // After appearing, apply subtle glowing orbit motion
        anime({
          targets: ".preloader-logo",
          translateX: [
            { value: 10, duration: 1200 }, // Reduced duration
            { value: -10, duration: 1200 }, // Reduced duration
          ],
          translateY: [
            { value: 5, duration: 1200 }, // Reduced duration
            { value: -5, duration: 1200 }, // Reduced duration
          ],
          direction: "alternate",
          loop: true,
          easing: "easeInOutSine",
        });
      },
    });

    // Letters animation timeline (retained for initial entry)
    const timeline = anime.timeline({
      easing: "easeInOutQuad",
      complete: function () {
        anime({
          targets: ".letter-outline",
          opacity: [1, 0.4],
          loop: true,
          easing: "easeInOutSine",
          direction: "alternate",
          duration: 500,
        });
      },
    });

    timeline
      .add({
        targets: ".letter-m .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 500, // Reduced duration
        offset: 400, // Reduced offset
      })
      .add({
        targets: ".letter-m .letter-fill",
        opacity: [0, 0.7],
        duration: 250, // Reduced duration
        offset: 800, // Reduced offset
      })
      .add({
        targets: ".letter-v .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 500, // Reduced duration
        offset: 1000, // Reduced offset
      })
      .add({
        targets: ".letter-v .letter-fill",
        opacity: [0, 0.7],
        duration: 250, // Reduced duration
        offset: 1400, // Reduced offset
      })
      .add({
        targets: ".letter-i .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 500, // Reduced duration
        offset: 1600, // Reduced offset
      })
      .add({
        targets: ".letter-i .letter-fill",
        opacity: [0, 0.7],
        duration: 250, // Reduced duration
        offset: 2000, // Reduced offset
      })
      .add({
        targets: ".letter-b .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 500, // Reduced duration
        offset: 2200, // Reduced offset
      })
      .add({
        targets: ".letter-b .letter-fill",
        opacity: [0, 0.7],
        duration: 250, // Reduced duration
        offset: 2600, // Reduced offset
      })
      .add({
        targets: ".letter-e .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 500, // Reduced duration
        offset: 2800, // Reduced offset
      })
      .add({
        targets: ".letter-e .letter-fill",
        opacity: [0, 0.7],
        duration: 250, // Reduced duration
        offset: 3100, // Reduced offset
      });

    timelineRef.current = timeline;

    return () => {
      timeline.pause();
      progressAnimation.pause();
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="preloader-container">
      <div className="bg-pulse"></div>
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="preloader-logo" />
        <svg
          className="mvibe-logo"
          width="500"
          height="300"
          viewBox="0 0 500 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="softGlow" height="300%" width="300%" x="-75%" y="-75%">
              <feMorphology
                operator="dilate"
                radius="3"
                in="SourceAlpha"
                result="thicken"
              />
              <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />
              <feFlood floodColor="#3becc3" result="glowColor" />
              <feComposite
                in="glowColor"
                in2="blurred"
                operator="in"
                result="softGlow_colored"
              />
              <feMerge>
                <feMergeNode in="softGlow_colored" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="letterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#3becc3", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#ffffff", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#3becc3", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          {/* M Letter */}
          <g className="letter letter-m">
            <path
              className="letter-outline"
              d="M 50 250 L 50 80 L 90 80 L 120 180 L 150 80 L 190 80 L 190 250 L 160 250 L 160 140 L 135 230 L 105 230 L 80 140 L 80 250 Z"
              fill="none"
              stroke="#3becc3"
              strokeWidth="3"
              filter="url(#softGlow)"
            />
            <path
              className="letter-fill"
              d="M 50 250 L 50 80 L 90 80 L 120 180 L 150 80 L 190 80 L 190 250 L 160 250 L 160 140 L 135 230 L 105 230 L 80 140 L 80 250 Z"
              fill="url(#letterGrad)"
              opacity="0"
            />
          </g>
          {/* V Letter */}
          <g className="letter letter-v">
            <path
              className="letter-outline"
              d="M 220 80 L 250 80 L 280 200 L 310 80 L 340 80 L 300 250 L 260 250 Z"
              fill="none"
              stroke="#3becc3"
              strokeWidth="3"
              filter="url(#softGlow)"
            />
            <path
              className="letter-fill"
              d="M 220 80 L 250 80 L 280 200 L 310 80 L 340 80 L 300 250 L 260 250 Z"
              fill="url(#letterGrad)"
              opacity="0"
            />
          </g>
          {/* I Letter */}
          <g className="letter letter-i">
            <path
              className="letter-outline"
              d="M 360 80 L 420 80 L 420 110 L 405 110 L 405 220 L 420 220 L 420 250 L 360 250 L 360 220 L 375 220 L 375 110 L 360 110 Z"
              fill="none"
              stroke="#3becc3"
              strokeWidth="3"
              filter="url(#softGlow)"
            />
            <path
              className="letter-fill"
              d="M 360 80 L 420 80 L 420 110 L 405 110 L 405 220 L 420 220 L 420 250 L 360 250 L 360 220 L 375 220 L 375 110 L 360 110 Z"
              fill="url(#letterGrad)"
              opacity="0"
            />
          </g>
          {/* B Letter */}
          <g className="letter letter-b">
            <path
              className="letter-outline"
              d="M 50 80 L 120 80 Q 140 80 140 100 Q 140 120 125 130 Q 145 140 145 165 Q 145 190 120 190 L 50 190 Z M 80 110 L 80 120 L 110 120 Q 115 120 115 115 Q 115 110 110 110 Z M 80 140 L 80 160 L 115 160 Q 120 160 120 150 Q 120 140 115 140 Z"
              fill="none"
              stroke="#3becc3"
              strokeWidth="3"
              filter="url(#softGlow)"
              transform="translate(390, 80)"
            />
            <path
              className="letter-fill"
              d="M 50 80 L 120 80 Q 140 80 140 100 Q 140 120 125 130 Q 145 140 145 165 Q 145 190 120 190 L 50 190 Z M 80 110 L 80 120 L 110 120 Q 115 120 115 115 Q 115 110 110 110 Z M 80 140 L 80 160 L 115 160 Q 120 160 120 150 Q 120 140 115 140 Z"
              fill="url(#letterGrad)"
              opacity="0"
              transform="translate(390, 80)"
            />
          </g>
          {/* E Letter */}
          <g className="letter letter-e">
            <path
              className="letter-outline"
              d="M 50 80 L 130 80 L 130 110 L 80 110 L 80 150 L 120 150 L 120 180 L 80 180 L 80 220 L 130 220 L 130 250 L 50 250 Z"
              fill="none"
              stroke="#3becc3"
              strokeWidth="3"
              filter="url(#softGlow)"
              transform="translate(440, 0)"
            />
            <path
              className="letter-fill"
              d="M 50 80 L 130 80 L 130 110 L 80 110 L 80 150 L 120 150 L 120 180 L 80 180 L 80 220 L 130 220 L 130 250 L 50 250 Z"
              fill="url(#letterGrad)"
              opacity="0"
              transform="translate(440, 0)"
            />
          </g>
        </svg>
        {/* 3D Loading Bar */}
        <div className="loading-bar-container">
          <div className="loading-bar-outer"></div>
          <div className="loading-bar-inner"></div>
          <div className="loading-percentage">{loadingProgress}%</div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
