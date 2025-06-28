import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Define easing function outside of component
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Define icons for the home section with their movement patterns
const homeIcons = [
  // First icon - starts center, moves diagonal left-down
  {
    url: "/icons/cube-abstract-shape-animated-3d-icon-1284210180529.glb",
    startPosition: [-8, 5, 2], // Initial static position
    endPosition: [-35, -15, 2], // Moves far left and down
    triggerStart: 0.15, // Starts moving at 15% scroll
    triggerEnd: 0.7, // Completes movement by 70% scroll
    isStatic: true, // Make it visible immediately
    scale: 2.0,
    floatAmount: 0.3, // Gentle float
  },
  // Second icon - starts center, moves diagonal right-down
  {
    url: "/icons/sphere-abstract-shape-animated-3d-icon-430778994990.glb",
    startPosition: [8, 5, 2], // Initial static position
    endPosition: [35, -15, 2], // Moves far right and down
    triggerStart: 0.15, // Starts moving at 15% scroll
    triggerEnd: 0.7, // Completes movement by 70% scroll
    isStatic: true, // Make it visible immediately
    scale: 2.0,
    floatAmount: 0.3, // Gentle float
  },
  {
    url: "/icons/star-abstract-shape-animated-3d-icon-1042881958811.glb",
    startPosition: [-8, 12, 2],
    endPosition: [-25, 12, 2],
    triggerStart: 0,
    triggerEnd: 0.8,
    isStatic: true, // This makes it show immediately
    scale: 1.8,
    floatAmount: 0.4,
  },
  {
    url: "/icons/twisted-circle-abstract-shape-animated-3d-icon-1057449839409.glb",
    startPosition: [8, 12, 2],
    endPosition: [25, 12, 2],
    triggerStart: 0,
    triggerEnd: 0.8,
    isStatic: true, // This makes it show immediately
    scale: 1.8,
    floatAmount: 0.4,
  },

  // Animated icons that appear on scroll
  {
    url: "/icons/bouncing-cube-animated-3d-icon-1317725137205.glb",
    startPosition: [-10, -5, 2],
    endPosition: [-25, -5, 2],
    triggerStart: 0.2,
    triggerEnd: 0.9,
    isStatic: false,
    scale: 2.0,
    floatAmount: 0.6,
  },
  {
    url: "/icons/floating-cubes-loading-animated-3d-icon-514489560289.glb",
    startPosition: [10, -5, 2],
    endPosition: [25, -5, 2],
    triggerStart: 0.2,
    triggerEnd: 0.9,
    isStatic: false,
    scale: 2.0,
    floatAmount: 0.6,
  },
  {
    url: "/icons/rotating-cube-loading-animated-3d-icon-323338265846.glb",
    startPosition: [0, 8, 2],
    endPosition: [-20, 8, 2],
    triggerStart: 0.3,
    triggerEnd: 1.0,
    isStatic: false,
    scale: 2.2,
    floatAmount: 0.5,
  },
  {
    url: "/icons/waving-plane-abstract-animated-3d-icon-772525492989.glb",
    startPosition: [0, 8, 2],
    endPosition: [20, 8, 2],
    triggerStart: 0.3,
    triggerEnd: 1.0,
    isStatic: false,
    scale: 2.2,
    floatAmount: 0.5,
  },
];

function ScrollIcon({
  url,
  startPosition,
  endPosition,
  triggerStart,
  triggerEnd,
  scrollProgress,
  scale = 2.5,
  isStatic = false,
  floatAmount = 0,
}) {
  const groupRef = useRef();
  const [mixer, setMixer] = useState(null);
  const time = useRef(0);

  // Load the model with its animations
  const { scene, animations } = useGLTF(url);

  // Create a clone of the scene to avoid sharing issues
  const clonedScene = useMemo(() => {
    if (scene) {
      return scene.clone(true);
    }
    return null;
  }, [scene]);

  // Set up animation mixer when the scene is loaded
  useEffect(() => {
    if (clonedScene && animations.length > 0) {
      const newMixer = new THREE.AnimationMixer(clonedScene);

      // Play all animations
      animations.forEach((clip) => {
        const action = newMixer.clipAction(clip);
        action.play();
      });

      setMixer(newMixer);
    }

    return () => {
      if (mixer) {
        mixer.stopAllAction();
        mixer.uncacheRoot(clonedScene);
      }
    };
  }, [animations, clonedScene, url]);

  // Calculate current position with floating effect
  const currentPosition = useMemo(() => {
    // For initially static icons that will move later
    let progress = 0;

    if (scrollProgress >= triggerStart && scrollProgress <= triggerEnd) {
      const range = triggerEnd - triggerStart;
      progress = (scrollProgress - triggerStart) / range;
      // Add double easing for even smoother movement
      progress = easeInOutCubic(easeInOutCubic(progress));
    } else if (scrollProgress > triggerEnd) {
      progress = 1;
    }

    // If static and before trigger point, stay at start position
    if (isStatic && scrollProgress < triggerStart) {
      const x = startPosition[0];
      let y = startPosition[1];
      const z = startPosition[2];

      // Add floating effect if specified
      if (floatAmount > 0) {
        y += Math.sin(time.current * 0.5) * floatAmount;
      }

      return [x, y, z];
    }

    // Otherwise calculate animated position
    const x = startPosition[0] + (endPosition[0] - startPosition[0]) * progress;
    let y = startPosition[1] + (endPosition[1] - startPosition[1]) * progress;
    const z = startPosition[2] + (endPosition[2] - startPosition[2]) * progress;

    // Add floating effect if specified
    if (floatAmount > 0) {
      y += Math.sin(time.current * 0.5) * floatAmount * (1 - progress * 0.5); // Slower floating
    }

    return [x, y, z];
  }, [
    scrollProgress,
    startPosition,
    endPosition,
    triggerStart,
    triggerEnd,
    isStatic,
    floatAmount,
  ]);

  // Calculate opacity based on scroll progress
  const opacity = useMemo(() => {
    if (isStatic) return 1;

    if (scrollProgress < triggerStart) return 0;
    if (scrollProgress > triggerEnd) return 0;

    const fadeInStart = triggerStart;
    const fadeInEnd = triggerStart + 0.1;
    const fadeOutStart = triggerEnd - 0.1;
    const fadeOutEnd = triggerEnd;

    if (scrollProgress <= fadeInEnd) {
      return (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    }

    if (scrollProgress >= fadeOutStart) {
      return 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    }

    return 1;
  }, [scrollProgress, triggerStart, triggerEnd, isStatic]);

  // Update animation and position
  useFrame((state, delta) => {
    time.current += delta; // Slower time update for gentler floating

    if (mixer) {
      mixer.update(delta * 0.2); // Even slower animations
    }

    if (groupRef.current) {
      groupRef.current.position.set(...currentPosition);

      // Custom rotation based on position and time
      if (!isStatic) {
        const rotationSpeed = 0.04; // Slower rotation
        groupRef.current.rotation.y += delta * rotationSpeed;

        // Add slight tilt based on horizontal position
        const tiltAmount = 0.15; // Reduced tilt
        const targetTilt = (currentPosition[0] / 20) * tiltAmount;
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          targetTilt,
          delta
        );
      }

      // Apply opacity with smooth transition
      groupRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.opacity = opacity;
          child.material.transparent = true;
          // Add className for CSS scaling
          child.userData.className = isStatic
            ? "three-icon static"
            : "three-icon";
        }
      });
    }
  });

  if (!clonedScene) return null;

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

function Scene({ scrollProgress }) {
  return (
    <>
      {/* Enhanced lighting for initial visibility */}
      <ambientLight intensity={2.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={3.0}
        color="#ffffff"
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={2.0}
        color="#ffffff"
      />
      <pointLight position={[0, 0, 15]} intensity={2.5} color="#ffffff" />
      <hemisphereLight intensity={1.2} groundColor="#000000" />

      {homeIcons.map((iconConfig, index) => (
        <Suspense key={index} fallback={null}>
          <ScrollIcon {...iconConfig} scrollProgress={scrollProgress} />
        </Suspense>
      ))}
    </>
  );
}

// Preload all models
homeIcons.forEach((icon) => {
  useGLTF.preload(icon.url);
});

export default function Animated3DBackground() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Calculate scroll progress as a value between 0 and 1
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      const maxScroll = documentHeight - windowHeight;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="absolute inset-x-0 h-full -z-10 opacity-100 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 25],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
        style={{ position: "fixed", top: 0, height: "100vh", width: "100%" }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
