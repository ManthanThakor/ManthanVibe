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

  // Initialize Three.js particle system
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
    particlesRef.current = renderer.domElement;
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
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

      // Colors - using the teal color (#3becc3)
      const hue = 0.45 + Math.random() * 0.1; // Around teal in HSL
      const saturation = 0.8;
      const lightness = 0.5 + Math.random() * 0.3;
      color.setHSL(hue, saturation, lightness);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Sizes
      sizes[i] = 2 + Math.random() * 3;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    // Create particle system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Camera position
    camera.position.z = 500;

    // Animation loop
    function animate() {
      if (!containerRef.current) return;
      requestAnimationFrame(animate);

      // Rotate particles
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;

      // Pulse effect
      const time = Date.now() * 0.0005;
      particleSystem.scale.x = 1 + Math.sin(time * 2) * 0.1;
      particleSystem.scale.y = 1 + Math.cos(time * 3) * 0.1;

      renderer.render(scene, camera);
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && particlesRef.current) {
        containerRef.current.removeChild(particlesRef.current);
      }
      renderer.dispose();
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    if (!isLoading && containerRef.current) {
      // Add exit animations
      const letters = document.querySelectorAll(".letter");
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.add("letter-exit");
        }, index * 30);
      });

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.classList.add("preloader-exit");
          setTimeout(() => {
            containerRef.current.style.display = "none";
          }, 200);
        }
      }, 200);
      return;
    }

    // Progress animation
    const progressAnimation = anime({
      targets: ".loading-bar-inner",
      width: ["0%", "100%"],
      duration: 5000, // Total duration of 5 seconds
      easing: "easeInOutQuart",
      update: function (anim) {
        setLoadingProgress(Math.round(anim.progress));
      },
    });

    // Logo animation timeline
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

    timelineRef.current = timeline;

    // Add logo animation
    anime({
      targets: ".preloader-logo",
      translateX: [
        { value: "-100%", duration: 0 },
        { value: "50%", duration: 1000, delay: 2000 },
        { value: "0%", duration: 800 },
        { value: "30%", duration: 600 },
        { value: "0%", duration: 500 },
        { value: "15%", duration: 400 },
        { value: "0%", duration: 300 },
      ],
      scale: [
        { value: 0.5, duration: 0 },
        { value: 1.2, duration: 1000, delay: 2000 },
        { value: 0.8, duration: 800 },
        { value: 1.1, duration: 600 },
        { value: 0.9, duration: 500 },
        { value: 1.05, duration: 400 },
        { value: 1, duration: 300 },
      ],
      opacity: {
        value: [0, 1],
        duration: 500,
        delay: 2000,
        easing: "linear",
      },
      rotate: {
        value: ["0deg", "360deg"],
        duration: 1000,
        delay: 2000,
        easing: "easeInOutQuad",
      },
    });

    // Adjust timing for letter animations
    timeline
      .add({
        targets: ".letter-m .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 600,
        offset: 0,
      })
      .add({
        targets: ".letter-m .letter-fill",
        opacity: [0, 0.7],
        duration: 300,
        offset: 500,
      })
      .add({
        targets: ".letter-v .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 600,
        offset: 800,
      })
      .add({
        targets: ".letter-v .letter-fill",
        opacity: [0, 0.7],
        duration: 300,
        offset: 1300,
      })
      .add({
        targets: ".letter-i .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 600,
        offset: 1600,
      })
      .add({
        targets: ".letter-i .letter-fill",
        opacity: [0, 0.7],
        duration: 300,
        offset: 2100,
      })
      .add({
        targets: ".letter-b .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 600,
        offset: 2400,
      })
      .add({
        targets: ".letter-b .letter-fill",
        opacity: [0, 0.7],
        duration: 300,
        offset: 2900,
      })
      .add({
        targets: ".letter-e .letter-outline",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0, 1],
        duration: 600,
        offset: 3200,
      })
      .add({
        targets: ".letter-e .letter-fill",
        opacity: [0, 0.7],
        duration: 300,
        offset: 3700,
      });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
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
