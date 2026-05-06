import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Float, Html, Sky, ContactShadows, Environment } from '@react-three/drei';
import { Sparkles, Play, Info, Layers, Maximize2, Move, Home, Camera } from 'lucide-react';

// HIGH-END ARCHITECTURAL VILLA COMPONENT
const LuxuryVillaModel = () => {
  const group = useRef();

  return (
    <group ref={group}>
      {/* MAIN WING - LARGE GLASS BOX */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 2.5, 4]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          metalness={0.05} 
          roughness={0.05} 
          transmission={0.05}
          thickness={1}
        />
      </mesh>

      {/* CANTILEVERED UPPER FLOOR (Çıkma) */}
      <mesh position={[2, 2.8, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.2, 4.5]} />
        <meshPhysicalMaterial 
          color="#1a1a1a" 
          metalness={0.2} 
          roughness={0.1} 
        />
      </mesh>

      {/* LARGE PANORAMIC WINDOWS (The 'Villa' Look) */}
      <mesh position={[0, 1.2, 2.01]}>
        <planeGeometry args={[5.5, 2.1]} />
        <meshPhysicalMaterial 
          color="#aaddff" 
          metalness={1} 
          roughness={0} 
          transmission={1} 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* POOL WITH WATER PHYSICS SIMULATION */}
      <group position={[0, 0, 5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[10, 6]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 4]} />
          <meshPhysicalMaterial 
            color="#0066ff" 
            metalness={0.9}
            roughness={0.1}
            transmission={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* DECORATIVE PILLARS & ACCENTS */}
      <mesh position={[-2.8, 1.2, 2.2]} castShadow>
        <boxGeometry args={[0.2, 2.5, 0.2]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[2.8, 1.2, 2.2]} castShadow>
        <boxGeometry args={[0.2, 2.5, 0.2]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* GARDEN / GROUND */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
};

const VirtualTour = () => {
  const [activeView, setActiveView] = useState('exterior');

  return (
    <section className="py-24 md:py-40 bg-[#020205] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-24 relative z-10">
        
        {/* HEADER SECTION - Positioned for clarity */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-[10px] uppercase tracking-[0.5em]">Elite Spatial Scan</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
              Mekansal <br /> <span className="text-white/40 italic">Otorite.</span>
            </h2>
          </div>
          
          <div className="flex bg-white/[0.03] border border-white/10 p-2 rounded-2xl backdrop-blur-3xl">
            {[
              { id: 'exterior', label: 'Dış Cephe', icon: <Home size={14} /> },
              { id: 'living', label: 'İç Mekan', icon: <Layers size={14} /> },
              { id: 'drone', label: 'Drone View', icon: <Camera size={14} /> }
            ].map((view) => (
              <button 
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                  activeView === view.id ? 'bg-accent text-white shadow-[0_10px_30px_rgba(197,160,89,0.3)]' : 'text-white/40 hover:text-white'
                }`}
              >
                {view.icon} {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D VIEWER CONTAINER */}
        <div className="relative aspect-[21/9] w-full bg-[#050508] rounded-[3rem] border border-white/5 overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
          
          {/* R3F CANVAS */}
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[12, 8, 15]} fov={30} />
            <Suspense fallback={<Html center><div className="text-accent font-mono animate-pulse tracking-widest text-sm">INITIALIZING_VILLA_SCAN...</div></Html>}>
              <Environment preset="city" />
              <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
              <Stage intensity={0.5} environment="city" contactShadow={{ opacity: 0.2, blur: 3 }}>
                <LuxuryVillaModel />
              </Stage>
              <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={20} blur={2.4} far={4.5} />
              <OrbitControls 
                enableZoom={true} 
                autoRotate={activeView === 'exterior'} 
                autoRotateSpeed={0.4}
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 6}
                makeDefault
              />
            </Suspense>
          </Canvas>

          {/* HUD OVERLAY - Fixed Positioning to avoid blocking model */}
          <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4 bg-black/60 backdrop-blur-3xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_15px_#C5A059]" />
                  <span className="text-white font-mono text-[10px] tracking-[0.3em] uppercase">VILLA_PROTO_v4.2</span>
                </div>
              </div>
              
              <div className="flex gap-4 pointer-events-auto">
                <button className="w-14 h-14 bg-white/5 hover:bg-accent border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all shadow-xl">
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end">
              {/* Info Card - Shifted left and more transparent to focus on villa */}
              <div className="bg-black/40 backdrop-blur-3xl border border-white/5 p-12 rounded-[4rem] max-w-sm pointer-events-auto border-l-accent border-l-4 translate-y-6">
                <div className="flex items-center gap-3 mb-6 text-accent">
                  <Move size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">360° Uzamsal Kontrol</span>
                </div>
                <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter italic">Azure Mansion</h3>
                <p className="text-white/30 text-xs leading-relaxed mb-8 font-medium">
                  Mimari mükemmelliğin dijital izdüşümü. Mouse ile mülkü serbestçe inceleyebilir, derinlikleri keşfedebilirsiniz.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-accent text-[8px] uppercase font-bold mb-1">Mülk Alanı</p>
                    <p className="text-xl font-black text-white font-mono">1.250m²</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-accent text-[8px] uppercase font-bold mb-1">Yatırım Değeri</p>
                    <p className="text-xl font-black text-white font-mono">₺240M</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pointer-events-auto">
                {[Sparkles, Layers, Info].map((Icon, i) => (
                  <button key={i} className="w-16 h-16 bg-black/60 border border-white/10 backdrop-blur-3xl rounded-3xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all group shadow-2xl">
                    <Icon size={24} className="group-hover:scale-125 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VIGNETTE & POST-PROCESSING LOOK */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
