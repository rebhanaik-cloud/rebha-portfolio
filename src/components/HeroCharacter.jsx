import { useEffect, useRef, useState, useCallback } from 'react';

// Directional timestamps in character.mp4 (8-second video)
// 0.0s - 1.0s: Left profile gaze
// 3.8s - 4.2s: Center direct eye-contact neutral pose
// 6.8s - 7.5s: Right profile gaze
const TIME_LEFT = 0.4;
const TIME_CENTER = 3.95;
const TIME_RIGHT = 7.1;

// Linear interpolation helper
const lerp = (start, end, factor) => start + (end - start) * factor;

export default function HeroCharacter({ className = '' }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const glareRef = useRef(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Animation values stored in refs to prevent unnecessary React re-renders
  const targetTimeRef = useRef(TIME_CENTER);
  const currentTimeRef = useRef(TIME_CENTER);
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const currentTiltRef = useRef({ x: 0, y: 0 });
  const glareRefState = useRef({ x: 50, y: 50, opacity: 0 });
  const isInteractingRef = useRef(false);
  const lastActiveTimestamp = useRef(0);
  const rafIdRef = useRef(null);

  // Initialize video to neutral center gaze as soon as metadata is available
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      try {
        video.currentTime = TIME_CENTER;
        currentTimeRef.current = TIME_CENTER;
        targetTimeRef.current = TIME_CENTER;
        setIsVideoReady(true);
      } catch (err) {
        console.warn('Initial video seek deferred:', err);
      }
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleError = useCallback(() => {
    console.error('Character video failed to load, falling back to static poster.');
    setHasError(true);
  }, []);

  // Update target time and 3D tilt based on pointer coordinates
  const handlePointerCoord = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Horizontal normalization across the hero section
    // Extended boundary allows natural looking from edge to edge
    const paddingX = rect.width * 0.15;
    const minX = rect.left - paddingX;
    const maxX = rect.right + paddingX;
    const clampedX = Math.max(minX, Math.min(maxX, clientX));
    const normalizedX = (clampedX - minX) / (maxX - minX); // 0.0 (left) to 1.0 (right)

    // Directional mapping:
    // When normalizedX is 0.0 -> TIME_LEFT (~0.4s)
    // When normalizedX is 0.5 -> TIME_CENTER (~3.95s)
    // When normalizedX is 1.0 -> TIME_RIGHT (~7.1s)
    let mappedTime;
    if (normalizedX <= 0.5) {
      const t = normalizedX / 0.5;
      mappedTime = TIME_LEFT + t * (TIME_CENTER - TIME_LEFT);
    } else {
      const t = (normalizedX - 0.5) / 0.5;
      mappedTime = TIME_CENTER + t * (TIME_RIGHT - TIME_CENTER);
    }

    targetTimeRef.current = Math.max(0.1, Math.min(7.8, mappedTime));

    // Subtle 3D Card tilt calculation
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relativeX = (clientX - centerX) / (rect.width / 2);
    const relativeY = (clientY - centerY) / (rect.height / 2);

    const maxTilt = 7.5; // subtle realistic rotation in degrees
    const tiltY = Math.max(-1, Math.min(1, relativeX)) * maxTilt;
    const tiltX = -Math.max(-1, Math.min(1, relativeY)) * (maxTilt * 0.85);

    targetTiltRef.current = { x: tiltX, y: tiltY };

    // Glare position on the 3D card
    const glareX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    glareRefState.current = { x: glareX, y: glareY, opacity: 0.35 };

    isInteractingRef.current = true;
    lastActiveTimestamp.current = Date.now();
  }, []);

  // Mouse / Touch Event Handlers
  const handleMouseMove = useCallback((e) => {
    handlePointerCoord(e.clientX, e.clientY);
  }, [handlePointerCoord]);

  const handleMouseLeave = useCallback(() => {
    // Smoothly return to center neutral gaze when cursor leaves
    targetTimeRef.current = TIME_CENTER;
    targetTiltRef.current = { x: 0, y: 0 };
    glareRefState.current.opacity = 0;
    isInteractingRef.current = false;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (e.touches && e.touches[0]) {
      handlePointerCoord(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handlePointerCoord]);

  const handleTouchEnd = useCallback(() => {
    targetTimeRef.current = TIME_CENTER;
    targetTiltRef.current = { x: 0, y: 0 };
    glareRefState.current.opacity = 0;
    isInteractingRef.current = false;
  }, []);

  // Main animation loop using requestAnimationFrame
  useEffect(() => {
    const video = videoRef.current;

    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (video && video.readyState >= 2) {
        video.currentTime = TIME_CENTER;
      }
      return;
    }

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      const now = Date.now();
      // Auto-ease back to neutral if idle for > 2.8s while pointer is still
      if (isInteractingRef.current && (now - lastActiveTimestamp.current > 2800)) {
        targetTimeRef.current = TIME_CENTER;
        targetTiltRef.current = { x: 0, y: 0 };
        glareRefState.current.opacity = 0;
        isInteractingRef.current = false;
      }

      // Smooth interpolation (lerp factor: ~0.12 for snappy yet fluid rotation)
      currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, 0.12);

      // Apply video seek only when ready and meaningful delta exists (> 0.02s)
      if (video && video.readyState >= 2 && !video.seeking) {
        const delta = Math.abs(currentTimeRef.current - video.currentTime);
        if (delta > 0.025) {
          try {
            video.currentTime = currentTimeRef.current;
          } catch {
            // Suppress minor browser seek abortion warnings
          }
        }
      }

      // Lerp 3D card tilt
      currentTiltRef.current.x = lerp(currentTiltRef.current.x, targetTiltRef.current.x, 0.1);
      currentTiltRef.current.y = lerp(currentTiltRef.current.y, targetTiltRef.current.y, 0.1);

      if (cardRef.current) {
        const { x, y } = currentTiltRef.current;
        cardRef.current.style.transform = `perspective(1200px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg) translateZ(0)`;
      }

      // Specular glare effect
      if (glareRef.current) {
        const { x, y, opacity } = glareRefState.current;
        glareRef.current.style.opacity = opacity.toFixed(2);
        glareRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`;
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isVideoReady]);

  // Window-level mouse listener for smooth tracking across entire hero
  useEffect(() => {
    const onWindowMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Track within viewport height range around hero
      if (e.clientY >= rect.top - 200 && e.clientY <= rect.bottom + 200) {
        handlePointerCoord(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', onWindowMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
    };
  }, [handlePointerCoord]);

  return (
    <div
      ref={containerRef}
      className={`hero-character-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive 3D character animation that tracks cursor direction"
    >
      {/* Ambient Crimson Glow behind 3D Card */}
      <div className="character-ambient-glow" aria-hidden="true" />
      <div className="character-accent-ring ring-outer" aria-hidden="true" />
      <div className="character-accent-ring ring-inner" aria-hidden="true" />

      {/* 3D Perspective Card */}
      <div ref={cardRef} className="character-card">
        {/* Specular glare overlay */}
        <div ref={glareRef} className="character-glare" aria-hidden="true" />

        {/* Video Frame */}
        <div className="character-media-wrapper">
          {/* Static fallback poster image */}
          <img
            src="/character.png"
            alt="Rebha Naik 3D Character portrait"
            className={`character-poster ${isVideoReady && !hasError ? 'hidden' : 'visible'}`}
            loading="eager"
            fetchPriority="high"
          />

          {/* Interactive cursor-scrubbed video */}
          {!hasError && (
            <video
              ref={videoRef}
              src="/character.mp4"
              poster="/character.png"
              className={`character-video ${isVideoReady ? 'loaded' : 'loading'}`}
              playsInline
              muted
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onCanPlay={handleCanPlay}
              onError={handleError}
              aria-hidden="true"
            />
          )}

          {/* Subtle vignette border gradient */}
          <div className="character-vignette" aria-hidden="true" />
        </div>

        {/* Floating 3D Depth Badges */}
        <div className="floating-badge badge-top">
          <span className="badge-pulse-dot" />
          <span>Available for Projects</span>
        </div>

        <div className="floating-badge badge-bottom">
          <span className="badge-icon">✦</span>
          <div>
            <strong>Rebha Naik</strong>
            <small>Interactive 3D Gaze</small>
          </div>
        </div>
      </div>
    </div>
  );
}
