import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Float, MeshDistortMaterial, Sphere, GradientTexture, Html } from '@react-three/drei';
import { Sparkles, Play, Info, Layers, Maximize2, Move } from 'lucide-react';

// VILLA STRUCTURE SIMULATION (Procedural Luxury Architecture)
const LuxuryVillaModel = () => {
  return (
    <group>
      {/* MAIN STRUCTURE - MINIMALIST CUBE BASE */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1.5, 3]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          metalness={0.1} 
          roughness={0.2} 
          transmission={0.1}
          thickness={0.5}
        />
      </mesh>

      {/* GLASS FAÇADE */}
      <mesh position={[0, 0.5, 1.51]}>
        <planeGeometry args={[3.8, 1.3]} />
        <meshPhysicalMaterial 
          color="#88ccff" 
          metalness={0.9} 
          roughness={0} 
          transmission={1} 
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* ROOF TOP TERRACE */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[4.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>

      {/* POOL AREA SIMULATION */}
      <mesh position={[0, -0.2, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#050510" />
      </mesh>
      
      <mesh position={[0, -0.15, 3.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshPhysicalMaterial 
          color="#00ffff" 
          transmission={0.8} 
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* AMBIENT PARTICLES */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[0.05, 16, 16]} position={[2, 1, 1]}>
          <meshStandardMaterial color="#C5A059" emissive="#C5A059" emissiveIntensity={2} />
        </Sphere>
      </Float>
    </group>
  );
};

const VirtualTour = () => {
  const [activeView, setActiveView] = useState('exterior');

  return (
    <section className="py-24 md:py-40 bg-[#05050A] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-xs uppercase tracking-[0.4em]">3D Spatial Logic</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
              Dijital <br /> <span className="text-white/40 italic">Mimari.</span>
            </h2>
          </div>
          
          <div className="flex bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
            {['exterior', 'living-room', 'pool'].map((view) => (
              <button 
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                  activeView === view ? 'bg-accent text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-[21/9] w-full bg-[#0A0A10] rounded-[3rem] border border-white/5 overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          {/* R3F CANVAS */}
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[8, 5, 10]} fov={35} />
            <Suspense fallback={<Html center><div className="text-accent font-mono animate-pulse">MODEL_YÜKLENİYOR...</div></Html>}>
              <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.4, blur: 2 }}>
                <LuxuryVillaModel />
              </Stage>
              <OrbitControls 
                enableZoom={false} 
                autoRotate={activeView === 'exterior'} 
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 4}
              />
            </Suspense>
          </Canvas>

          {/* HUD OVERLAY */}
          <div className="absolute inset-0 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4 bg-black/60 backdrop-blur-2xl border border-white/10 px-6 py-4 rounded-2xl">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#C5A059]" />
                  <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase">SPATIAL_ENGINE_V2_ACTIVE</span>
                </div>
                <div className="text-[8px] font-mono text-white/20 ml-6">COORD: 41.0082° N, 28.9784° E</div>
              </div>
              
              <div className="flex gap-4 pointer-events-auto">
                <button className="w-12 h-12 bg-white/5 hover:bg-accent border border-white/10 rounded-xl flex items-center justify-center text-white transition-all">
                  <Maximize2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="bg-black/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] max-w-sm pointer-events-auto border-l-accent border-l-4">
                <div className="flex items-center gap-3 mb-4 text-accent">
                  <Move size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">İnteraktif Kontrol</span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase mb-4">Obsidian Villa</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Mouse ile mülkü 360° döndürebilir, her detayı ultra-prezisyon ile inceleyebilirsiniz.
                </p>
                <div className="flex gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  <span>450m²</span>
                  <span>6+2 Oda</span>
                  <span>Zen Bahçesi</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pointer-events-auto">
                {[Sparkles, Layers, Info].map((Icon, i) => (
                  <button key={i} className="w-14 h-14 bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all group">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VIGNETTE & SCANLINES */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
