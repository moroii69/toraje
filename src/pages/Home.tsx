import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileUp, Download, Shield, Clock, ArrowRight } from 'lucide-react';

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const relativeWords = ["Secure", "Protected", "Confidential", "Encrypted", "Private"];
  const canvasRef = useRef(null);

  // Simple word change animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % relativeWords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 3D interactive element - simple floating cube
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    const size = 40;
    const centerX = 50;
    const centerY = 50;

    // Draw a simple 3D cube
    const drawCube = (angle) => {
      ctx.clearRect(0, 0, 100, 100);

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Cube vertices
      const vertices = [
        [-size/2, -size/2, -size/2],
        [size/2, -size/2, -size/2],
        [size/2, size/2, -size/2],
        [-size/2, size/2, -size/2],
        [-size/2, -size/2, size/2],
        [size/2, -size/2, size/2],
        [size/2, size/2, size/2],
        [-size/2, size/2, size/2]
      ];

      // Projected vertices
      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y axis
        const rotX = x * cos - z * sin;
        const rotZ = z * cos + x * sin;

        // Simple projection
        const scale = 400 / (400 + rotZ);
        return [centerX + rotX * scale, centerY + y * scale];
      });

      // Draw edges
      ctx.strokeStyle = '#22c55e'; // Emerald color
      ctx.lineWidth = 1;

      // Draw cube edges
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(projected[a][0], projected[a][1]);
        ctx.lineTo(projected[b][0], projected[b][1]);
        ctx.stroke();
      });
    };

    const animate = () => {
      angle += 0.01;
      drawCube(angle);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Background noise pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      ></div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-black pointer-events-none"></div>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 relative z-10">
        {/* Hero section */}
        <section className="flex flex-col items-center text-center mt-8 mb-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Secure file sharing
            <div className="mt-2">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                {relativeWords[currentWordIndex]}
              </span>
            </div>
          </h1>

          <p className="text-gray-400 text-lg max-w-md mb-12">
            Upload files securely and share with a 6-digit code.
            Auto-deletion after 69 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/upload"
              className="group flex items-center px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-medium rounded-full transition-all duration-300"
            >
              <FileUp className="w-5 h-5 mr-2" />
              Upload
              <ArrowRight className="w-5 h-5 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link
              to="/retrieve"
              className="flex items-center px-8 py-3 bg-black border border-gray-800 hover:border-emerald-600/50 hover:bg-emerald-950/20 text-white font-medium rounded-full transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Retrieve file
            </Link>
          </div>
        </section>

        {/* 3D interactive element */}
        <div className="flex justify-center mb-16">
          <div className="relative w-24 h-24">
            <canvas
              ref={canvasRef}
              width="100"
              height="100"
              className="absolute top-0 left-0 w-full h-full cursor-pointer"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-emerald-400 text-sm pointer-events-none">
              Secured
            </div>
          </div>
        </div>

        {/* Features section with subtle divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mx-auto mb-16"></div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="w-6 h-6 text-emerald-400" />,
              title: 'Secure sharing',
              description: 'End-to-end encryption with unique 6-digit access codes',
            },
            {
              icon: <Clock className="w-6 h-6 text-emerald-400" />,
              title: 'Auto-deletion',
              description: 'Files automatically deleted after 69 minutes',
            },
            {
              icon: <FileUp className="w-6 h-6 text-emerald-400" />,
              title: 'Easy upload',
              description: 'Simple drag-and-drop interface for files up to 20MB',
            },
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-900/50 backdrop-blur-sm bg-black/30">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-sm text-gray-600 hover:text-gray-400 transition-colors duration-300 text-center">
            © Mohammed Ufraan – Because 69 minutes is all the privacy I can afford.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 backdrop-blur-sm bg-gray-900/20 border border-gray-800/50 rounded-xl transition-all duration-300 hover:border-emerald-900/50 hover:bg-emerald-950/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-emerald-950/50">
          {icon}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default Home;