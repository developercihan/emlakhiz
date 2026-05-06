import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Play, Info, Layers } from 'lucide-react';

const VirtualTour = () => {
  const containerRef = useRef(null);
  const [activeView, setActiveView] = useState('exterior');

  useEffect(() => {
    if (!containerRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // LUXURY LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xC5A059, 1.2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // DUMMY VOLUMETRIC DATA (SPARK SIMULATION)
    // Gerçek implementasyonda .splat dosyası yüklenecek
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 120, 20);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xC5A059,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 1,
      transparent: true,
      opacity: 0.8,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.005;
      mesh.rotation.z += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="py-24 md:py-40 bg-[#05050A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-xs uppercase tracking-[0.4em]">Spatial Intelligence</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
              Boyutların <br /> <span className="text-white/40 italic">Ötesinde.</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            {['exterior', 'interior', 'drone'].map((view) => (
              <button 
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-6 py-3 border text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeView === view ? 'bg-accent border-accent text-white' : 'border-white/10 text-white/40 hover:border-white/30'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-video w-full bg-black rounded-[3rem] border border-white/5 overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
          {/* THREE.JS CONTAINER */}
          <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

          {/* HUD OVERLAY */}
          <div className="absolute inset-0 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-white font-mono text-[10px] tracking-[0.2em] uppercase">SPARK_VOLUMETRIC_ENGINE_v1.0</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-48 h-1 bg-white/5 overflow-hidden">
                  <div className="w-2/3 h-full bg-accent animate-[scan_3s_infinite_linear]" />
                </div>
                <span className="text-white/20 text-[8px] font-mono uppercase text-right">SCANNING_DATA...</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] max-w-sm pointer-events-auto">
                <h3 className="text-2xl font-black text-white uppercase mb-4">Gerçek Zamanlı Deneyim</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Spark motoru sayesinde, mülkü piksel piksel değil, atom atom incelersiniz. Fotorealistik 3D tur teknolojisinin zirvesi.
                </p>
                <button className="flex items-center gap-4 text-accent font-black uppercase text-xs tracking-widest group/btn">
                  <Play size={16} className="fill-accent group-hover/btn:scale-125 transition-transform" /> TURA BAŞLA
                </button>
              </div>

              <div className="flex flex-col gap-4 pointer-events-auto">
                {[Sparkles, Layers, Info].map((Icon, i) => (
                  <button key={i} className="w-14 h-14 bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* VIGNETTE EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
