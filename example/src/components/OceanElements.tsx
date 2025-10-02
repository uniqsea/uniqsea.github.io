import { motion } from 'motion/react';

// Wave SVG Component
export function WavePattern({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  return (
    <motion.svg
      width="100%"
      height="150"
      viewBox="0 0 1200 150"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
          <stop offset="50%" stopColor="rgba(147, 51, 234, 0.4)" />
          <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
          <stop offset="50%" stopColor="rgba(99, 102, 241, 0.3)" />
          <stop offset="100%" stopColor="rgba(45, 212, 191, 0.4)" />
        </linearGradient>
      </defs>
      
      <motion.path
        d="M0,80 Q300,40 600,80 T1200,80 L1200,150 L0,150 Z"
        fill="url(#waveGradient)"
        animate={animate ? {
          d: [
            "M0,80 Q300,40 600,80 T1200,80 L1200,150 L0,150 Z",
            "M0,70 Q300,50 600,70 T1200,70 L1200,150 L0,150 Z",
            "M0,80 Q300,40 600,80 T1200,80 L1200,150 L0,150 Z"
          ]
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.path
        d="M0,60 Q300,20 600,60 T1200,60 L1200,80 L0,80 Z"
        fill="url(#waveGradient2)"
        animate={animate ? {
          d: [
            "M0,60 Q300,20 600,60 T1200,60 L1200,80 L0,80 Z",
            "M0,50 Q300,30 600,50 T1200,50 L1200,70 L0,70 Z",
            "M0,60 Q300,20 600,60 T1200,60 L1200,80 L0,80 Z"
          ]
        } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </motion.svg>
  );
}

// Bubbles Component
export function FloatingBubbles({ className = "" }: { className?: string }) {
  const bubbles = [
    { id: 1, size: 25, x: 20, y: 30, delay: 0 },
    { id: 2, size: 15, x: 70, y: 60, delay: 1 },
    { id: 3, size: 20, x: 40, y: 80, delay: 0.5 },
    { id: 4, size: 12, x: 80, y: 20, delay: 1.5 },
    { id: 5, size: 18, x: 60, y: 40, delay: 0.8 },
    { id: 6, size: 22, x: 30, y: 70, delay: 1.2 }
  ];

  return (
    <svg width="400" height="400" viewBox="0 0 400 400" className={className} style={{ display: 'block' }}>
      <defs>
        <radialGradient id="bubbleGradient">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.7)" />
          <stop offset="70%" stopColor="rgba(147, 51, 234, 0.5)" />
          <stop offset="100%" stopColor="rgba(16, 185, 129, 0.3)" />
        </radialGradient>
      </defs>
      {bubbles.map((bubble) => (
        <motion.circle
          key={bubble.id}
          cx={`${bubble.x}%`}
          cy={`${bubble.y}%`}
          r={bubble.size}
          fill="url(#bubbleGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1.3, 1],
            opacity: [0, 0.8, 1, 0.6],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 6,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// Ocean Flow Lines
export function OceanFlow({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="600"
      height="400"
      viewBox="0 0 600 400"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
          <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
          <stop offset="100%" stopColor="rgba(16, 185, 129, 0.4)" />
        </linearGradient>
      </defs>
      
      {/* Flowing lines */}
      <motion.path
        d="M0,200 Q150,120 300,200 T600,200"
        stroke="url(#flowGradient)"
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M0,240 Q150,160 300,240 T600,240"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
      />
      <motion.path
        d="M0,160 Q150,80 300,160 T600,160"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
      />
    </motion.svg>
  );
}

// Organic Shapes (like sea creatures or coral)
export function OrganicShapes({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      <defs>
        <radialGradient id="organicGradient">
          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
        </radialGradient>
      </defs>
      
      {/* Abstract organic shape */}
      <motion.path
        d="M100,20 C140,20 180,50 180,100 C180,150 140,180 100,180 C60,180 20,150 20,100 C20,50 60,20 100,20 Z"
        fill="url(#organicGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ duration: 2, delay: 1 }}
      />
      
      {/* Smaller organic elements */}
      <motion.circle
        cx="150"
        cy="60"
        r="15"
        fill="rgba(147, 51, 234, 0.2)"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 1.5, delay: 2 }}
      />
      <motion.ellipse
        cx="50"
        cy="140"
        rx="20"
        ry="10"
        fill="rgba(59, 130, 246, 0.15)"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.1, 1] }}
        transition={{ duration: 1.5, delay: 2.5 }}
      />
    </motion.svg>
  );
}

// Depth Layers (like water depth visualization)
export function DepthLayers({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="300"
      height="400"
      viewBox="0 0 300 400"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <defs>
        <linearGradient id="depthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(219, 234, 254, 0.3)" />
          <stop offset="30%" stopColor="rgba(147, 197, 253, 0.2)" />
          <stop offset="60%" stopColor="rgba(59, 130, 246, 0.15)" />
          <stop offset="100%" stopColor="rgba(29, 78, 216, 0.1)" />
        </linearGradient>
      </defs>
      
      {Array.from({ length: 5 }, (_, i) => (
        <motion.rect
          key={i}
          x="0"
          y={i * 80}
          width="300"
          height="80"
          fill="url(#depthGradient)"
          opacity={1 - i * 0.15}
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 2, delay: i * 0.2 }}
        />
      ))}
    </motion.svg>
  );
}

// Animated Ocean Current
export function OceanCurrent({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      width="600"
      height="200"
      viewBox="0 0 600 200"
      className={className}
    >
      <defs>
        <linearGradient id="currentGradient">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.0)" />
          <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0.0)" />
        </linearGradient>
      </defs>
      
      <motion.path
        d="M-100,100 Q150,50 300,100 T700,100"
        stroke="url(#currentGradient)"
        strokeWidth="40"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
}