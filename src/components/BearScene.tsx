"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type HoverState = "idle" | "cta";

// ─── BEAR-GROUP WORLD Y OFFSET ────────────────────────────────────────────────
// All "bear-local" coordinates below are relative to this offset the group sits at.
const BEAR_Y = -0.62;

// ─── MATERIALS ────────────────────────────────────────────────────────────────
export function useBearMats() {
    return useMemo(() => {
        const body = new THREE.MeshStandardMaterial({
            color: "#161e2b", roughness: 0.65, metalness: 0.4,
        });
        const accent = new THREE.MeshStandardMaterial({
            color: "#1f293b", roughness: 0.75, metalness: 0.25,
        });
        const sclera = new THREE.MeshStandardMaterial({
            color: "#d0e8ff", roughness: 0.15,
        });
        const pupil = new THREE.MeshStandardMaterial({
            color: "#00D4FF",
            emissive: new THREE.Color("#00D4FF"),
            emissiveIntensity: 3.5,
            roughness: 0,
        });
        const nose = new THREE.MeshStandardMaterial({
            color: "#050505", roughness: 0.45, metalness: 0.55,
        });
        const desk = new THREE.MeshStandardMaterial({
            color: "#080808", roughness: 0.9, metalness: 0.05,
        });
        const laptopShell = new THREE.MeshStandardMaterial({
            color: "#0d0d0d", roughness: 0.2, metalness: 0.85,
        });
        const screen = new THREE.MeshStandardMaterial({
            color: "#000612",
            emissive: new THREE.Color("#00D4FF"),
            emissiveIntensity: 4,
            roughness: 0.05,
        });
        const kbBase = new THREE.MeshStandardMaterial({
            color: "#101014", roughness: 0.35, metalness: 0.65,
        });
        // MeshBasicMaterial = always-on emissive, unaffected by scene lighting
        // Kept as objects so we can animate their .color in useFrame
        const keyCap = new THREE.MeshBasicMaterial({ color: "#005566" });
        const keyCapBright = new THREE.MeshBasicMaterial({ color: "#00D4FF" });
        const mug = new THREE.MeshStandardMaterial({
            color: "#141414", roughness: 0.1, metalness: 0.9,
        });
        // ── ACCESSORY MATERIALS ──────────────────────────────────────────────────
        const headphone = new THREE.MeshStandardMaterial({
            color: "#111111", roughness: 0.08, metalness: 0.95,
        });
        const headphonePad = new THREE.MeshStandardMaterial({
            color: "#0a0a0a", roughness: 0.9, metalness: 0.0,
        });
        const glassMat = new THREE.MeshStandardMaterial({
            color: "#006688", roughness: 0.0, metalness: 0.5,
            transparent: true, opacity: 0.55,
        });
        const badge = new THREE.MeshStandardMaterial({
            color: "#00D4FF",
            emissive: new THREE.Color("#00D4FF"),
            emissiveIntensity: 3.0,
            roughness: 0,
        });
        const jointChrome = new THREE.MeshStandardMaterial({
            color: "#1a2a2f", roughness: 0.05, metalness: 1.0,
        });
        const tailMat = new THREE.MeshStandardMaterial({
            color: "#111111", roughness: 0.8, metalness: 0.1,
        });
        return { body, accent, sclera, pupil, nose, desk, laptopShell, screen, kbBase, keyCap, keyCapBright, mug, headphone, headphonePad, glassMat, badge, jointChrome, tailMat };
    }, []);
}

type Mats = ReturnType<typeof useBearMats>;

// ─── KEYBOARD — chromatic RGB cycling keys ────────────────────────────────────
function Keyboard({ mats }: { mats: Mats }) {
    const ROWS = 5, COLS = 13;
    const KW = 0.054, KD = 0.054, KH = 0.013, GAP = 0.009;
    const STEP = KW + GAP;
    const BOARD_W = COLS * STEP - GAP;
    const BOARD_D = ROWS * STEP - GAP;
    const kbLightRef = useRef<THREE.PointLight>(null!);

    // Animate keyboard key color and glow through cyan → blue → violet → cyan
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Hue cycles 0.55 (blue) → 0.7 (purple) → 0.55 slowly
        const hue = 0.58 + Math.sin(t * 0.4) * 0.1;
        mats.keyCap.color.setHSL(hue, 1.0, 0.28);
        mats.keyCapBright.color.setHSL(hue + 0.04, 1.0, 0.55);
        // Light color also shifts
        if (kbLightRef.current) {
            kbLightRef.current.color.setHSL(hue, 1.0, 0.6);
            // Subtle intensity pulse synced with typing rhythm
            kbLightRef.current.intensity = 0.7 + Math.sin(t * 9.5 * 2) * 0.25;
        }
    });

    const keys = useMemo(() => {
        const out: React.ReactElement[] = [];
        const ox = -BOARD_W / 2 + KW / 2;
        const oz = -BOARD_D / 2 + KD / 2;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (r === ROWS - 1 && c >= 3 && c <= 9) continue;
                const bright = (r + c) % 3 === 0;
                out.push(
                    <mesh
                        key={`${r}-${c}`}
                        material={bright ? mats.keyCapBright : mats.keyCap}
                        position={[ox + c * STEP, KH / 2 + 0.005, oz + r * STEP]}
                    >
                        <boxGeometry args={[KW, KH, KD]} />
                    </mesh>
                );
            }
        }
        out.push(
            <mesh key="space" material={mats.keyCapBright} position={[0, KH / 2 + 0.005, oz + (ROWS - 1) * STEP]}>
                <boxGeometry args={[KW * 7 + GAP * 6, KH, KD]} />
            </mesh>
        );
        return out;
    }, [mats.keyCap, mats.keyCapBright]);

    return (
        <group position={[0, 0.58, 0.68]}>
            <mesh material={mats.kbBase} position={[0, 0, 0]}>
                <boxGeometry args={[BOARD_W + 0.02, 0.012, BOARD_D + 0.018]} />
            </mesh>
            <pointLight ref={kbLightRef} color="#00D4FF" intensity={0.7} distance={0.6} decay={2} position={[0, 0.05, 0]} />
            {keys}
        </group>
    );
}

// ─── HOLOGRAPHIC TECH RINGS ───────────────────────────────────────────────────
// 3 slowly rotating torus rings at different angles — like a tech halo / orbit
function HolographicRings() {
    const ring1 = useRef<THREE.Mesh>(null!);
    const ring2 = useRef<THREE.Mesh>(null!);
    const ring3 = useRef<THREE.Mesh>(null!);
    const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: "#00D4FF",
        wireframe: false,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
    }), []);
    const ringMat2 = useMemo(() => new THREE.MeshBasicMaterial({
        color: "#00ccff",
        wireframe: false,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
    }), []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Each ring rotates on a different axis at different speeds
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.22;
            ring1.current.rotation.z = t * 0.08;
            // Subtle colour breathing
            const pulse = 0.18 + Math.sin(t * 1.3) * 0.08;
            (ring1.current.material as THREE.MeshBasicMaterial).opacity = pulse;
        }
        if (ring2.current) {
            ring2.current.rotation.y = t * 0.18;
            ring2.current.rotation.x = 0.9 + t * 0.12;
        }
        if (ring3.current) {
            ring3.current.rotation.z = t * 0.14;
            ring3.current.rotation.y = t * 0.2;
            const pulse2 = 0.1 + Math.sin(t * 0.9 + 1.5) * 0.06;
            (ring3.current.material as THREE.MeshBasicMaterial).opacity = pulse2;
        }
    });

    // Rings centered on the bear's torso area
    return (
        <group position={[0, 0.48, 0]}>
            {/* Outer slow ring — vertical tilt */}
            <mesh ref={ring1} material={ringMat} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[1.55, 0.006, 4, 90]} />
            </mesh>
            {/* Mid ring — near-horizontal */}
            <mesh ref={ring2} material={ringMat2} rotation={[Math.PI / 2.2, 0.3, 0]}>
                <torusGeometry args={[1.25, 0.005, 4, 72]} />
            </mesh>
            {/* Inner tight ring — fast spin */}
            <mesh ref={ring3} material={ringMat} rotation={[0.2, 0, Math.PI / 6]}>
                <torusGeometry args={[0.98, 0.007, 4, 64]} />
            </mesh>
        </group>
    );
}

// ─── TYPING SPARK PARTICLES ───────────────────────────────────────────────────
// Tiny sparks shoot up from the keyboard area during typing
const SPARK_COUNT = 28;
interface Spark { pos: THREE.Vector3; vel: THREE.Vector3; life: number; maxLife: number; }

function TypingParticles({ hoverState }: { hoverState: HoverState }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const sparks = useRef<Spark[]>([]);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#00D4FF" }), []);

    // Initialise spark pool
    const initSpark = (): Spark => ({
        pos: new THREE.Vector3(
            (Math.random() - 0.5) * 0.7,
            BEAR_Y + 0.65,
            0.68 + (Math.random() - 0.5) * 0.3
        ),
        vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.015,
            0.018 + Math.random() * 0.025,
            (Math.random() - 0.5) * 0.01
        ),
        life: 0,
        maxLife: 0.5 + Math.random() * 0.6,
    });

    useFrame(({ clock }, delta) => {
        if (!meshRef.current) return;
        const isTyping = hoverState !== "cta";
        const t = clock.getElapsedTime();

        // Emit new sparks on keystroke beats when typing
        if (isTyping && Math.sin(t * 9.5) > 0.85) {
            if (sparks.current.length < SPARK_COUNT) {
                sparks.current.push(initSpark());
            }
        }

        // Update and render each spark
        let visible = 0;
        for (let i = 0; i < sparks.current.length; i++) {
            const s = sparks.current[i];
            s.life += delta;
            if (s.life >= s.maxLife) continue; // dead spark

            // Move upward and fade
            s.pos.add(s.vel);
            s.vel.y *= 0.97; // decelerate upward

            const progress = s.life / s.maxLife;
            const scale = (1 - progress) * 0.028;

            dummy.position.copy(s.pos);
            dummy.scale.setScalar(Math.max(scale, 0.001));
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(visible, dummy.matrix);

            // Shift spark color from white-blue → electric blue as it ages
            meshRef.current.setColorAt?.(visible, new THREE.Color().setHSL(0.6 + progress * 0.1, 1, 0.7 - progress * 0.4));
            visible++;
        }
        // Hide unused instances
        for (let j = visible; j < SPARK_COUNT; j++) {
            dummy.scale.setScalar(0);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(j, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

        // Prune dead sparks (keep array lean)
        sparks.current = sparks.current.filter(s => s.life < s.maxLife);
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, mat, SPARK_COUNT]}>
            <sphereGeometry args={[1, 4, 4]} />
        </instancedMesh>
    );
}

// ─── CINEMATIC CAMERA FLOAT ──────────────────────────────────────────────────
// Gentle, slow camera drift — makes the scene feel alive and cinematic
function CameraFloat() {
    const { camera } = useThree();
    const base = useMemo(() => camera.position.clone(), [camera]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Slow sinusoidal drift on X and Y — max ±0.06 world units
        camera.position.x = base.x + Math.sin(t * 0.18) * 0.06;
        camera.position.y = base.y + Math.sin(t * 0.13 + 0.5) * 0.04;
        // Keep always looking at the bear's head area
        camera.lookAt(0, 0.8, 0);
    });
    return null;
}

// ─── LAPTOP + SCAN LINE ───────────────────────────────────────────────────
function Laptop({ mats }: { mats: Mats }) {
    const screenLightRef = useRef<THREE.PointLight>(null!);
    const scanLineRef = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (screenLightRef.current)
            screenLightRef.current.intensity = 2.8 + Math.sin(t * 1.6) * 0.4;

        // Scan line sweeps from top to bottom of the screen over ~2.5s, then resets
        if (scanLineRef.current) {
            const SCREEN_H = 0.40;
            const cycle = (t % 2.5) / 2.5; // 0 → 1 over 2.5 seconds
            scanLineRef.current.position.y = 0.44 - cycle * SCREEN_H;
            // Fade out near the bottom
            const mat = scanLineRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = cycle < 0.85 ? 0.65 : (1 - cycle) / 0.15 * 0.65;
        }
    });

    return (
        <group position={[0, 0.60, 0.25]}>
            {/* Base */}
            <mesh material={mats.laptopShell} position={[0, 0.012, 0]}>
                <boxGeometry args={[0.76, 0.025, 0.5]} />
            </mesh>
            {/* Screen lid, pivoted open ~115° */}
            <group position={[0, 0.025, -0.24]}>
                <group rotation={[-2.0, 0, 0]}>
                    <mesh material={mats.laptopShell} position={[0, 0.24, 0]}>
                        <boxGeometry args={[0.76, 0.48, 0.028]} />
                    </mesh>
                    {/* Screen surface */}
                    <mesh material={mats.screen} position={[0, 0.24, 0.016]}>
                        <boxGeometry args={[0.68, 0.40, 0.004]} />
                    </mesh>
                    {/* ─ SCAN LINE: bright horizontal bar sweeping down ─ */}
                    <mesh ref={scanLineRef} position={[0, 0.44, 0.02]}>
                        <boxGeometry args={[0.66, 0.005, 0.003]} />
                        <meshBasicMaterial
                            color="#00D4FF"
                            transparent
                            opacity={0.65}
                        />
                    </mesh>
                    {/* Horizontal code-line strips (static, simulates a code editor) */}
                    {[0.38, 0.34, 0.30, 0.26, 0.22, 0.18, 0.14, 0.10, 0.06].map((y, i) => (
                        <mesh key={i} position={[(-0.12 + (i % 3) * 0.06), y, 0.019]}>
                            <boxGeometry args={[0.28 + (i % 4) * 0.08, 0.004, 0.001]} />
                            <meshBasicMaterial
                                color={i % 5 === 0 ? "#00D4FF" : i % 3 === 0 ? "#00A5CC" : "#0a2a2f"}
                                transparent
                                opacity={0.7}
                            />
                        </mesh>
                    ))}
                    <pointLight ref={screenLightRef} color="#00D4FF" intensity={3} distance={3.5} decay={2} position={[0, 0.24, 0.3]} />
                </group>
            </group>
        </group>
    );
}

// ─── MATRIX DATA RAIN ───────────────────────────────────────────────────────────────
// Grid of faint glowing dots behind the scene — each randomly fades in/out
const RAIN_COLS = 16, RAIN_ROWS = 10;
const RAIN_COUNT = RAIN_COLS * RAIN_ROWS;

function MatrixRain() {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#006688", transparent: true, opacity: 0.5 }), []);
    // Each dot has a random phase offset so they flicker independently
    const phases = useMemo(() => Float32Array.from({ length: RAIN_COUNT }, () => Math.random() * Math.PI * 2), []);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();
        for (let i = 0; i < RAIN_COUNT; i++) {
            const col = i % RAIN_COLS;
            const row = Math.floor(i / RAIN_COLS);
            const x = (col / (RAIN_COLS - 1) - 0.5) * 5.5;
            const y = (row / (RAIN_ROWS - 1)) * 3.5 - 0.3 + BEAR_Y;
            const z = -2.2 + Math.sin(phases[i]) * 0.3; // slight Z variation for depth

            dummy.position.set(x, y, z);
            // Opacity driven by sin with individual phase — 0.02 to 0.18
            const brightness = 0.5 + 0.5 * Math.sin(t * (0.8 + col * 0.05) + phases[i]);
            const scale = 0.018 + brightness * 0.018;
            dummy.scale.setScalar(scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
            meshRef.current.setColorAt?.(i, new THREE.Color().setHSL(0.62, 1.0, 0.12 + brightness * 0.25));
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, mat, RAIN_COUNT]}>
            <sphereGeometry args={[1, 4, 4]} />
        </instancedMesh>
    );
}

// ─── FLOATING WIREFRAME SHAPES ────────────────────────────────────────────────────
// Low-poly wireframe icosahedra / octahedra slowly orbiting the scene
function FloatingShapes() {
    const groupRef = useRef<THREE.Group>(null!);
    const shape1 = useRef<THREE.Mesh>(null!);
    const shape2 = useRef<THREE.Mesh>(null!);
    const shape3 = useRef<THREE.Mesh>(null!);
    const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
        color: "#00D4FF", wireframe: true, transparent: true, opacity: 0.35,
    }), []);
    const wireMat2 = useMemo(() => new THREE.MeshBasicMaterial({
        color: "#00D4FF", wireframe: true, transparent: true, opacity: 0.2,
    }), []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (shape1.current) {
            shape1.current.rotation.x = t * 0.28;
            shape1.current.rotation.y = t * 0.21;
            // Gentle float up/down
            shape1.current.position.y = 0.5 + Math.sin(t * 0.6) * 0.12;
        }
        if (shape2.current) {
            shape2.current.rotation.z = t * 0.19;
            shape2.current.rotation.x = t * 0.14;
            shape2.current.position.y = 0.3 + Math.sin(t * 0.5 + 1.2) * 0.1;
        }
        if (shape3.current) {
            shape3.current.rotation.y = t * 0.24;
            shape3.current.rotation.z = t * 0.16;
            shape3.current.position.y = 0.7 + Math.sin(t * 0.4 + 2.4) * 0.14;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Left side icosahedron */}
            <mesh ref={shape1} material={wireMat} position={[-2.2, 0.5, 0.2]}>
                <icosahedronGeometry args={[0.32, 0]} />
            </mesh>
            {/* Right side octahedron */}
            <mesh ref={shape2} material={wireMat2} position={[2.3, 0.3, 0.0]}>
                <octahedronGeometry args={[0.38, 0]} />
            </mesh>
            {/* Far right small icosahedron */}
            <mesh ref={shape3} material={wireMat} position={[1.6, 0.7, -0.8]}>
                <icosahedronGeometry args={[0.2, 1]} />
            </mesh>
        </group>
    );
}

// ─── BEAR HEAD ────────────────────────────────────────────────────────────────
function BearHead({
    mats,
    hoverState,
}: {
    mats: Mats;
    hoverState: HoverState;
}) {
    const headRef = useRef<THREE.Group>(null!);
    const leftEarRef = useRef<THREE.Group>(null!);
    const rightEarRef = useRef<THREE.Group>(null!);
    const lPupilRef = useRef<THREE.Mesh>(null!);
    const rPupilRef = useRef<THREE.Mesh>(null!);

    useFrame(({ pointer }) => {
        const isCTA = hoverState === "cta";
        const tY = isCTA ? pointer.x * 0.08 : pointer.x * 0.5;
        const tX = isCTA ? 0 : -pointer.y * 0.15;
        const tEar = isCTA ? 0.35 : 0;

        if (headRef.current) {
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, tY, 0.09);
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, tX, 0.09);
        }
        if (leftEarRef.current)
            leftEarRef.current.rotation.z = THREE.MathUtils.lerp(leftEarRef.current.rotation.z, -tEar, 0.1);
        if (rightEarRef.current)
            rightEarRef.current.rotation.z = THREE.MathUtils.lerp(rightEarRef.current.rotation.z, tEar, 0.1);

        const px = pointer.x * 0.022, py = pointer.y * 0.014;
        [lPupilRef, rPupilRef].forEach(r => {
            if (!r.current) return;
            r.current.position.x = THREE.MathUtils.lerp(r.current.position.x, px, 0.07);
            r.current.position.y = THREE.MathUtils.lerp(r.current.position.y, py, 0.07);
        });
    });

    // bear-local head position: Y=1.52
    return (
        <group ref={headRef} position={[0, 1.52, 0.06]}>
            {/* Skull */}
            <mesh material={mats.body}>
                <sphereGeometry args={[0.52, 32, 32]} />
            </mesh>
            {/* Ears */}
            <group ref={leftEarRef} position={[-0.42, 0.36, -0.05]}>
                <mesh material={mats.body}><sphereGeometry args={[0.18, 16, 16]} /></mesh>
                <mesh material={mats.accent} position={[0, 0, 0.07]}><sphereGeometry args={[0.1, 16, 16]} /></mesh>
            </group>
            <group ref={rightEarRef} position={[0.42, 0.36, -0.05]}>
                <mesh material={mats.body}><sphereGeometry args={[0.18, 16, 16]} /></mesh>
                <mesh material={mats.accent} position={[0, 0, 0.07]}><sphereGeometry args={[0.1, 16, 16]} /></mesh>
            </group>
            {/* Muzzle */}
            <mesh material={mats.accent} position={[0, -0.1, 0.43]}>
                <sphereGeometry args={[0.23, 20, 20]} />
            </mesh>
            <mesh material={mats.nose} position={[0, 0.03, 0.63]}>
                <sphereGeometry args={[0.07, 12, 12]} />
            </mesh>
            {/* Brows */}
            <mesh material={mats.body} position={[-0.22, 0.26, 0.41]} rotation={[0.2, 0.15, -0.2]}>
                <boxGeometry args={[0.17, 0.055, 0.06]} />
            </mesh>
            <mesh material={mats.body} position={[0.22, 0.26, 0.41]} rotation={[0.2, -0.15, 0.2]}>
                <boxGeometry args={[0.17, 0.055, 0.06]} />
            </mesh>
            {/* Left eye */}
            <group position={[-0.22, 0.12, 0.41]}>
                <mesh material={mats.sclera}><sphereGeometry args={[0.09, 16, 16]} /></mesh>
                <mesh ref={lPupilRef} material={mats.pupil} position={[0, 0, 0.07]}>
                    <sphereGeometry args={[0.042, 12, 12]} />
                </mesh>
            </group>
            {/* Right eye */}
            <group position={[0.22, 0.12, 0.41]}>
                <mesh material={mats.sclera}><sphereGeometry args={[0.09, 16, 16]} /></mesh>
                <mesh ref={rPupilRef} material={mats.pupil} position={[0, 0, 0.07]}>
                    <sphereGeometry args={[0.042, 12, 12]} />
                </mesh>
            </group>

            {/* ── PROGRAMMER GLASSES ─────────────────────────── */}
            {/* Sit just in front of the eyes, angled outward slightly */}
            <group position={[0, 0.18, 0.5]} rotation={[0.08, 0, 0]}>
                {/* Left lens ring */}
                <mesh material={mats.glassMat} position={[-0.22, 0, 0]}>
                    <torusGeometry args={[0.072, 0.009, 8, 28]} />
                </mesh>
                {/* Right lens ring */}
                <mesh material={mats.glassMat} position={[0.22, 0, 0]}>
                    <torusGeometry args={[0.072, 0.009, 8, 28]} />
                </mesh>
                {/* Bridge */}
                <mesh material={mats.glassMat} position={[0, 0, 0]}>
                    <boxGeometry args={[0.1, 0.009, 0.007]} />
                </mesh>
                {/* Temple arms going to sides of head */}
                <mesh material={mats.glassMat} position={[-0.31, 0, -0.04]} rotation={[0, -0.18, 0]}>
                    <boxGeometry args={[0.12, 0.007, 0.006]} />
                </mesh>
                <mesh material={mats.glassMat} position={[0.31, 0, -0.04]} rotation={[0, 0.18, 0]}>
                    <boxGeometry args={[0.12, 0.007, 0.006]} />
                </mesh>
            </group>

            {/* ── OVER-EAR HEADPHONES ────────────────────────── */}
            {/* Headband: half-torus arc centered on top of head */}
            <group position={[0, 0.18, 0]}>
                {/* Arc band going over the skull, radius matches head surface */}
                <mesh material={mats.headphone} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.58, 0.018, 8, 50, Math.PI]} />
                </mesh>
                {/* Adjustment sliders — vertical strip on each end */}
                <mesh material={mats.headphone} position={[-0.58, -0.06, 0]}>
                    <boxGeometry args={[0.022, 0.12, 0.022]} />
                </mesh>
                <mesh material={mats.headphone} position={[0.58, -0.06, 0]}>
                    <boxGeometry args={[0.022, 0.12, 0.022]} />
                </mesh>
                {/* Left ear cup */}
                <group position={[-0.58, -0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <mesh material={mats.headphonePad}>
                        <cylinderGeometry args={[0.12, 0.12, 0.055, 20]} />
                    </mesh>
                    {/* Outer chrome ring */}
                    <mesh material={mats.headphone} position={[0, 0.03, 0]}>
                        <torusGeometry args={[0.115, 0.008, 6, 20]} />
                    </mesh>
                    {/* LED indicator dot */}
                    <mesh position={[0, 0.04, 0]}>
                        <sphereGeometry args={[0.022, 8, 8]} />
                        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={4} roughness={0} />
                    </mesh>
                </group>
                {/* Right ear cup */}
                <group position={[0.58, -0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <mesh material={mats.headphonePad}>
                        <cylinderGeometry args={[0.12, 0.12, 0.055, 20]} />
                    </mesh>
                    <mesh material={mats.headphone} position={[0, -0.03, 0]}>
                        <torusGeometry args={[0.115, 0.008, 6, 20]} />
                    </mesh>
                    <mesh position={[0, -0.04, 0]}>
                        <sphereGeometry args={[0.022, 8, 8]} />
                        <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={4} roughness={0} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}

// ─── BEAR ARM (3 pivots: shoulder → elbow → wrist) ────────────────────────────
// All positions in bear-group LOCAL space.
// Shoulder anchor: [±0.53, 1.03, 0.06]
// Arm goal: hand rests near [±0.52, 0.61, 0.70] = keyboard level
// With shoulder.x=0.65, elbow.x≈0.85 → wrist world ≈ [±0.52, BEAR_Y+0.61, 0.70] ✓
const UPPER_LEN = 0.42;
const FORE_LEN = 0.40;

function BearArm({
    side,
    mats,
    elbowRef,
    wristRef,
}: {
    side: 1 | -1;
    mats: Mats;
    elbowRef: React.RefObject<THREE.Group>;
    wristRef: React.RefObject<THREE.Group>;
}) {
    const x = side * 0.53;
    const sz = side * 0.08; // slight outward z-rotation for natural spread

    return (
        // ── SHOULDER (static pivot)
        <group position={[x, 1.03, 0.06]} rotation={[0.65, 0, sz]}>
            {/* Shoulder joint chrome ball */}
            <mesh material={mats.jointChrome} position={[0, 0, 0]}>
                <sphereGeometry args={[0.13, 12, 12]} />
            </mesh>
            {/* Upper arm visual */}
            <mesh material={mats.body} position={[0, -UPPER_LEN / 2, 0]}>
                <capsuleGeometry args={[0.115, UPPER_LEN - 0.23, 8, 12]} />
            </mesh>

            {/* ── ELBOW (animated) */}
            <group ref={elbowRef} position={[0, -UPPER_LEN, 0]} rotation={[0.85, 0, 0]}>
                {/* Elbow joint chrome ball */}
                <mesh material={mats.jointChrome} position={[0, 0, 0]}>
                    <sphereGeometry args={[0.105, 10, 10]} />
                </mesh>
                {/* Forearm visual */}
                <mesh material={mats.body} position={[0, -FORE_LEN / 2, 0]}>
                    <capsuleGeometry args={[0.095, FORE_LEN - 0.19, 8, 12]} />
                </mesh>

                {/* ── WRIST */}
                <group ref={wristRef} position={[0, -FORE_LEN, 0]}>
                    {/* Wrist joint chrome ring */}
                    <mesh material={mats.jointChrome} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.095, 0.012, 6, 18]} />
                    </mesh>
                    {/* Paw */}
                    <mesh material={mats.accent} position={[0, -0.08, 0]}>
                        <sphereGeometry args={[0.115, 14, 14]} />
                    </mesh>
                    {/* Three finger nubs */}
                    {([-0.06, 0, 0.06] as const).map((fx, i) => (
                        <mesh key={i} material={mats.body} position={[fx, -0.17, 0.04]}>
                            <sphereGeometry args={[0.036, 8, 8]} />
                        </mesh>
                    ))}
                </group>
            </group>
        </group>
    );
}

// ─── BEAR (full body + animation) ────────────────────────────────────────────
function Bear({ mats, hoverState }: { mats: Mats; hoverState: HoverState }) {
    const lElbow = useRef<THREE.Group>(null!);
    const rElbow = useRef<THREE.Group>(null!);
    const lWrist = useRef<THREE.Group>(null!);
    const rWrist = useRef<THREE.Group>(null!);
    const torsoRef = useRef<THREE.Mesh>(null!);
    const tailRef = useRef<THREE.Mesh>(null!);

    useFrame(({ clock, pointer }) => {
        const t = clock.getElapsedTime();
        const isCTA = hoverState === "cta";
        const moving = Math.abs(pointer.x) + Math.abs(pointer.y) > 0.12;

        // ─ BREATHING: subtle torso scale pulse ─
        if (torsoRef.current) {
            const breath = 1 + Math.sin(t * 1.15) * 0.013;
            torsoRef.current.scale.y = breath;
            torsoRef.current.scale.x = 1 - (breath - 1) * 0.4; // slight lateral squeeze
        }

        // Wrist targets
        let lWristTarget = 0, rWristTarget = 0;
        // Elbow targets
        let elbowTarget = 0.85; // default: arms reach the desk

        if (isCTA) {
            // Arms lift: elbow straightens, wrists flat
            elbowTarget = 0.35;
            lWristTarget = 0;
            rWristTarget = 0;
        } else if (!moving) {
            // TYPING: alternating wrist keystrokes at high speed
            const spd = 9.5;
            const amp = 0.24; // clear visible range: 0 to -0.24 rad
            lWristTarget = -Math.max(0, Math.sin(t * spd)) * amp;        // downstroke
            rWristTarget = -Math.max(0, Math.sin(t * spd + Math.PI)) * amp; // opposite phase
        }
        // else (moving mouse): wrists stay at 0 (neutral hover)

        // Apply with lerp for smooth state transitions
        if (lElbow.current) lElbow.current.rotation.x = THREE.MathUtils.lerp(lElbow.current.rotation.x, elbowTarget, 0.1);
        if (rElbow.current) rElbow.current.rotation.x = THREE.MathUtils.lerp(rElbow.current.rotation.x, elbowTarget, 0.1);
        if (lWrist.current) lWrist.current.rotation.x = THREE.MathUtils.lerp(lWrist.current.rotation.x, lWristTarget, 0.2);
        if (rWrist.current) rWrist.current.rotation.x = THREE.MathUtils.lerp(rWrist.current.rotation.x, rWristTarget, 0.2);

        // ─ TAIL WAG: gentle left-right when idle, excited wag during CTA ─
        if (tailRef.current) {
            const wagSpeed = isCTA ? 6.0 : 2.2;
            const wagAmp = isCTA ? 0.45 : 0.18;
            tailRef.current.rotation.z = Math.sin(t * wagSpeed) * wagAmp;
        }
    });

    return (
        <group>
            {/* Neck — short capsule connecting torso to head */}
            <mesh material={mats.body} position={[0, 1.38, 0.04]}>
                <capsuleGeometry args={[0.19, 0.16, 6, 12]} />
            </mesh>
            {/* Torso — ref for breathing */}
            <mesh ref={torsoRef} material={mats.body} position={[0, 1.08, 0]} scale={[1, 1, 0.85]}>
                <capsuleGeometry args={[0.43, 0.72, 12, 20]} />
            </mesh>
            {/* Belly accent */}
            <mesh material={mats.accent} position={[0, 1.0, 0.35]} scale={[0.58, 0.68, 0.28]}>
                <sphereGeometry args={[0.43, 20, 20]} />
            </mesh>
            {/* ─ GLOWING CHEST CORE BADGE (arc-reactor style) ─ */}
            {/* Outer metallic ring */}
            <mesh material={mats.jointChrome} position={[0, 1.08, 0.44]}>
                <torusGeometry args={[0.075, 0.011, 8, 24]} />
            </mesh>
            {/* Inner emissive core */}
            <mesh material={mats.badge} position={[0, 1.08, 0.445]}>
                <sphereGeometry args={[0.048, 12, 12]} />
            </mesh>
            {/* Tiny point light from the badge */}
            <pointLight color="#00D4FF" intensity={0.8} distance={0.6} decay={2} position={[0, 1.08, 0.5]} />
            {/* Hips */}
            <mesh material={mats.body} position={[0, 0.62, 0.1]} scale={[1.1, 0.46, 0.9]}>
                <sphereGeometry args={[0.43, 20, 20]} />
            </mesh>
            {/* ─ TAIL: small stubby sphere behind the hips, animated ─ */}
            <mesh ref={tailRef} material={mats.tailMat} position={[0, 0.75, -0.38]}>
                <sphereGeometry args={[0.11, 12, 12]} />
            </mesh>
            {/* Legs */}
            {([-0.28, 0.28] as const).map((lx, i) => {
                const s = i === 0 ? 1 : -1;
                return (
                    <group key={i}>
                        <mesh material={mats.body} position={[lx, 0.3, 0.2]} rotation={[0.6, 0, s * 0.1]}>
                            <capsuleGeometry args={[0.16, 0.28, 8, 12]} />
                        </mesh>
                        <mesh material={mats.body} position={[lx, 0.06, 0.4]} rotation={[0.1, 0, 0]}>
                            <capsuleGeometry args={[0.13, 0.2, 8, 12]} />
                        </mesh>
                        <mesh material={mats.accent} position={[lx, 0.01, 0.54]}>
                            <sphereGeometry args={[0.14, 12, 12]} />
                        </mesh>
                    </group>
                );
            })}
            {/* Arms — 3-pivot hierarchy */}
            <BearArm side={-1} mats={mats} elbowRef={lElbow} wristRef={lWrist} />
            <BearArm side={1} mats={mats} elbowRef={rElbow} wristRef={rWrist} />
            {/* Head */}
            <BearHead mats={mats} hoverState={hoverState} />
        </group>
    );
}

// ─── DESK ─────────────────────────────────────────────────────────────────────
function Desk({ mats }: { mats: Mats }) {
    return (
        // desk in bear-group local space; tabletop surface at Y=0.58
        <group>
            {/* Tabletop */}
            <mesh material={mats.desk} position={[0, 0.555, 0.72]} receiveShadow castShadow>
                <boxGeometry args={[2.8, 0.05, 1.4]} />
            </mesh>
            {/* Legs */}
            {([-1.2, 1.2] as const).map((lx) => (
                <mesh key={lx} material={mats.desk} position={[lx, 0.12, 0.72]}>
                    <boxGeometry args={[0.07, 0.86, 0.07]} />
                </mesh>
            ))}
            {/* Mug */}
            <group position={[0.78, 0.59, 0.38]}>
                <mesh material={mats.mug} position={[0, 0.1, 0]} castShadow>
                    <cylinderGeometry args={[0.08, 0.07, 0.2, 16]} />
                </mesh>
                <mesh material={mats.mug} position={[0.085, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <torusGeometry args={[0.035, 0.013, 8, 14]} />
                </mesh>
                {/* Coffee surface */}
                <mesh position={[0, 0.18, 0]}>
                    <cylinderGeometry args={[0.073, 0.073, 0.004, 14]} />
                    <meshStandardMaterial color="#1a0800" roughness={0.05} />
                </mesh>
            </group>
        </group>
    );
}

// ─── CINEMATIC LIGHTS ─────────────────────────────────────────────────────────
// Goal: extreme-contrast electric blue/cyan rim lights on a very dark background.
// The matte-black bear becomes dramatically visible as an outlined silhouette.
function Lights() {
    return (
        <>
            {/* Near-zero ambient so the dark bear only lights up from rims */}
            <ambientLight intensity={0.3} color="#ffffff" />
            <hemisphereLight args={["#00D4FF", "#000000", 0.2]} />

            {/* ── PRIMARY RIM: electric blue from far behind-right ── */}
            <spotLight
                color="#00A5CC"
                intensity={140}
                angle={0.38}
                penumbra={0.25}
                position={[3.5, 4.5, -3.5]}
                target-position={[0, 0.5, 0]}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0002}
            />

            {/* ── SECONDARY RIM: cyan from behind-left ── */}
            <spotLight
                color="#00D4FF"
                intensity={90}
                angle={0.45}
                penumbra={0.6}
                position={[-3.0, 3.5, -3.0]}
                target-position={[0, 0.5, 0]}
            />

            {/* ── FACE FILL: very dim warm-blue so face isn't pure black ── */}
            <spotLight
                color="#66aaaa"
                intensity={4}
                angle={0.7}
                penumbra={1}
                position={[0, 3, 3.5]}
                target-position={[0, 1.0, 0]}
            />

            {/* ── KEYBOARD GLOW: blueish upward fill from keyboard area ── */}
            <pointLight color="#00D4FF" intensity={1.2} distance={1.5} decay={2} position={[0, 0.65, 0.7]} />
        </>
    );
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ hoverState }: { hoverState: HoverState }) {
    const mats = useBearMats();
    return (
        <>
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 5, 14]} />

            <Lights />
            <CameraFloat />

            {/* Matrix data rain backdrop — world space */}
            <MatrixRain />

            {/* Everything lives inside the bear group for easy offset */}
            <group position={[0, BEAR_Y, 0]}>
                <Desk mats={mats} />
                <Keyboard mats={mats} />
                <Laptop mats={mats} />
                <Bear mats={mats} hoverState={hoverState} />
                {/* Holographic orbit rings centered on bear */}
                <HolographicRings />
                {/* Wireframe sci-fi shapes to the sides */}
                <FloatingShapes />
            </group>

            {/* Typing sparks (world-space, uses BEAR_Y constant internally) */}
            <TypingParticles hoverState={hoverState} />

            {/* Glowing grid floor — replaces plain dark plane */}
            <gridHelper
                args={[30, 40, "#0a2020", "#050f0f"]}
                position={[0, BEAR_Y - 0.02, 0]}
            />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, BEAR_Y - 0.025, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="#000000" roughness={1} metalness={0} />
            </mesh>
        </>
    );
}

// ─── CANVAS EXPORT ────────────────────────────────────────────────────────────────────
export default function BearScene({ hoverState }: { hoverState: HoverState }) {
    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 1.4, 4.0], fov: 44 }}
            gl={{
                antialias: true,
                alpha: false,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.3,
            }}
        >
            <Scene hoverState={hoverState} />
        </Canvas>
    );
}
