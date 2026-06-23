"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Ported from the React Bits <Silk /> shader (originally @react-three/fiber).
// Driven here through ogl — already this project's WebGL dependency — so we
// avoid pulling in the three.js / react-three-fiber stack for one effect. The
// plane's `vUv` is reconstructed from gl_FragCoord against the resolution.
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform vec2  uResolution;

out vec4 fragColor;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  vec2  vUv     = gl_FragCoord.xy / uResolution;
  float rnd     = noise(gl_FragCoord.xy);
  vec2  uv      = rotateUvs(vUv * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  fragColor = col;
}
`;

type SilkContext = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

// Keep the WebGL context alive across re-renders so prop changes only push new
// uniform values rather than rebuilding the renderer.
const ctxMap = new WeakMap<HTMLElement, SilkContext>();

export interface SilkProps {
  /** Animation speed of the silk flow. Higher is faster. */
  speed?: number;
  /** Scale of the silk pattern. */
  scale?: number;
  /** Hex colour of the silk. */
  color?: string;
  /** Intensity of the film-grain noise. */
  noiseIntensity?: number;
  /** Rotation of the pattern, in radians. */
  rotation?: number;
  className?: string;
}

const Silk = ({
  speed = 5,
  scale = 1,
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
  className = "",
}: SilkProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect 1: build the WebGL context once, pause when offscreen / tab hidden.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.backgroundColor = "transparent";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);

    const c = new Color(color);
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: [c.r, c.g, c.b] },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uNoiseIntensity: { value: noiseIntensity },
        uResolution: { value: [1, 1] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { renderer, program, mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [
        w * renderer.dpr,
        h * renderer.dpr,
      ];
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    let last = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;

    const loop = (t: number) => {
      // Match the upstream cadence: uTime advances by 0.1 * delta-seconds.
      const delta = last ? (t - last) / 1000 : 0;
      last = t;
      program.uniforms.uTime.value += 0.1 * delta;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) tryStart();
        else tryStop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) tryStart();
      else tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      ctxMap.delete(container);
      try {
        container.removeChild(canvas);
      } catch {
        /* ignore */
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // renderer created once

  // Effect 2: sync props to uniforms — no GPU teardown.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const u = ctx.program.uniforms;

    const c = new Color(color);
    u.uColor.value = [c.r, c.g, c.b];
    u.uSpeed.value = speed;
    u.uScale.value = scale;
    u.uRotation.value = rotation;
    u.uNoiseIntensity.value = noiseIntensity;
  }, [color, speed, scale, rotation, noiseIntensity]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full overflow-hidden ${className}`.trim()}
    />
  );
};

export default Silk;
