"use client";

import { forwardRef, useEffect, useRef, useMemo, FC, ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

type UniformValue = THREE.IUniform<unknown> | unknown;

interface ExtendMaterialConfig {
  header: string;
  vertexHeader?: string;
  fragmentHeader?: string;
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean };
  uniforms?: Record<string, UniformValue>;
  vertex?: Record<string, string>;
  fragment?: Record<string, string>;
}

type ShaderWithDefines = THREE.ShaderLibShader & {
  defines?: Record<string, string | number | boolean>;
};

function extendMaterial<T extends THREE.Material = THREE.Material>(
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,
  cfg: ExtendMaterialConfig
): THREE.ShaderMaterial {
  const physical = THREE.ShaderLib.physical as ShaderWithDefines;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = physical.defines ?? {};

  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms);

  const defaults = new BaseMaterial(cfg.material || {}) as T & {
    color?: THREE.Color;
    roughness?: number;
    metalness?: number;
    envMap?: THREE.Texture;
    envMapIntensity?: number;
  };

  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ("roughness" in defaults) uniforms.roughness.value = defaults.roughness;
  if ("metalness" in defaults) uniforms.metalness.value = defaults.metalness;
  if ("envMap" in defaults) uniforms.envMap.value = defaults.envMap;
  if ("envMapIntensity" in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] =
      u !== null && typeof u === "object" && "value" in u
        ? (u as THREE.IUniform<unknown>)
        : ({ value: u } as THREE.IUniform<unknown>);
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ""}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ""}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) {
    vert = vert.replace(inc, `${inc}\n${code}`);
  }
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) {
    frag = frag.replace(inc, `${inc}\n${code}`);
  }

  const mat = new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog,
  });

  return mat;
}

const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

// Simplex 3D noise for shader
const noiseGLSL = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
float cnoise(vec3 P){
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;
  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x,Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x,Pf1.y,Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy,Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy,Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x,Pf1.yz));
  float n111 = dot(g111, Pf1);
  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;

const vertexShaderCode = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  vUv = uv;
  vPosition = modelPosition.xyz;
}
`;

const fragmentShaderCode = `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uNoiseScale;
uniform float uNoiseStrength;
varying vec2 vUv;
varying vec3 vPosition;
${noiseGLSL}

void main() {
  float noiseVal = cnoise(vec3(vUv.x * uNoiseScale, vUv.y * uNoiseScale, uTime * 0.3));
  float alpha = smoothstep(0.0, 0.6, vUv.x) * smoothstep(1.0, 0.4, vUv.x);
  alpha *= smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
  alpha *= uOpacity;
  alpha *= 1.0 + noiseVal * uNoiseStrength;
  gl_FragColor = vec4(uColor, alpha);
}
`;

function createBeamMaterial(
  color: THREE.Color,
  opacity: number,
  noiseScale: number,
  noiseStrength: number
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: color },
      uOpacity: { value: opacity },
      uTime: { value: 0 },
      uNoiseScale: { value: noiseScale },
      uNoiseStrength: { value: noiseStrength },
    },
    vertexShader: vertexShaderCode,
    fragmentShader: fragmentShaderCode,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

interface BeamLineProps {
  width: number;
  height: number;
  color: THREE.Color;
  opacity: number;
  noiseScale: number;
  noiseStrength: number;
  position: [number, number, number];
  rotation: number;
}

const BeamLine: FC<BeamLineProps> = ({
  width,
  height,
  color,
  opacity,
  noiseScale,
  noiseStrength,
  position,
  rotation,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const mat = createBeamMaterial(color, opacity, noiseScale, noiseStrength);
    materialRef.current = mat;
    meshRef.current.material = mat;
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, rotation]}>
      <planeGeometry args={[width, height]} />
    </mesh>
  );
};

type Beam = {
  color: THREE.Color;
  width: number;
  height: number;
  opacity: number;
  noiseScale: number;
  noiseStrength: number;
  position: [number, number, number];
  rotation: number;
};

interface BeamsBackgroundProps {
  beams?: Beam[];
  className?: string;
}

const defaultBeams: Beam[] = [
  { color: new THREE.Color("#0815A6"), width: 12, height: 30, opacity: 0.15, noiseScale: 2.5, noiseStrength: 0.4, position: [-6, -4, 0], rotation: 0.3 },
  { color: new THREE.Color("#0815A6"), width: 10, height: 28, opacity: 0.12, noiseScale: 3.0, noiseStrength: 0.35, position: [4, 2, 0], rotation: -0.5 },
  { color: new THREE.Color("#3B82F6"), width: 14, height: 32, opacity: 0.1, noiseScale: 2.0, noiseStrength: 0.3, position: [-2, 5, 0], rotation: 0.15 },
  { color: new THREE.Color("#60A5FA"), width: 8, height: 24, opacity: 0.13, noiseScale: 3.5, noiseStrength: 0.45, position: [5, -3, 0], rotation: -0.25 },
  { color: new THREE.Color("#0815A6"), width: 11, height: 26, opacity: 0.08, noiseScale: 2.8, noiseStrength: 0.38, position: [0, -6, 0], rotation: 0.6 },
  { color: new THREE.Color("#3B82F6"), width: 9, height: 22, opacity: 0.11, noiseScale: 3.2, noiseStrength: 0.42, position: [-5, 1, 0], rotation: -0.35 },
];

const BeamScene: FC<{ beams?: Beam[] }> = ({ beams }) => {
  const config = beams ?? defaultBeams;

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={60} />
      {config.map((beam, i) => (
        <BeamLine key={i} {...beam} />
      ))}
    </>
  );
};

const BeamsBackground: FC<BeamsBackgroundProps> = ({
  beams,
  className = "",
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <BeamScene beams={beams} />
      </Canvas>
    </div>
  );
};

export default BeamsBackground;
