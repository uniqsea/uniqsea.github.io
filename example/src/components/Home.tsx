import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Mail, Github, Linkedin } from 'lucide-react';
import { WavePattern, FloatingBubbles, OceanFlow } from './OceanElements';

export function Home() {

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ocean Elements Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Very obvious ocean test elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-blue-400 opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-cyan-400 opacity-50"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-teal-400 opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <WavePattern />
        </div>
        
        {/* Floating bubbles */}
        <div className="absolute top-1/4 left-1/4 z-0">
          <FloatingBubbles />
        </div>
        
        {/* Ocean flow lines */}
        <div className="absolute top-0 right-0 z-0">
          <OceanFlow />
        </div>
      </div>

      {/* Dynamic Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen relative" style={{ zIndex: 10 }}>
          {/* Left Column - Content */}
          <div className="flex items-center justify-center px-8 py-20 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative mb-8"
              >
                {/* LOGO - This is the main logo */}
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 rounded-3xl transform rotate-3 relative overflow-hidden shadow-2xl border-4 border-blue-300/50">
                    {/* Ocean wave inside the logo */}
                    <motion.div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-800/60 via-blue-600/40 to-transparent"
                      animate={{
                        height: ['30%', '70%', '30%']
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Ocean bubbles in logo */}
                    <motion.div
                      className="absolute top-3 right-3 w-3 h-3 bg-white/80 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                    <motion.div
                      className="absolute top-6 left-4 w-2 h-2 bg-white/60 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                    
                    {/* Logo text inside */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white font-bold text-lg tracking-wider"
                        animate={{
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        US
                      </motion.div>
                    </div>
                    
                    {/* Ocean texture overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-transparent" />
                  </div>
                  
                  {/* Logo label */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-200/50 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <span className="text-xs font-medium text-blue-700">LOGO</span>
                  </motion.div>
                </div>
                <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Xu<br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Haiyang
                  </span>
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-4 mb-8"
              >
                <p className="text-xl text-gray-600 leading-relaxed">
                  HCI Researcher & Designer
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Crafting inclusive technology experiences at Aarhus University. 
                  Passionate about bridging cultural gaps through thoughtful design.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex space-x-4">
                  <motion.a
                    href="mailto:your.email@au.dk"
                    whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white p-3 rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/yourusername"
                    whileHover={{ scale: 1.05, backgroundColor: "#8B5CF6" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white p-3 rounded-xl transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/yourusername"
                    whileHover={{ scale: 1.05, backgroundColor: "#10B981" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white p-3 rounded-xl transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="pt-6"
                >
                  <p className="text-sm text-gray-400 mb-2">Currently exploring</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Accessibility</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Cultural Design</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Voice UI</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative flex items-center justify-center p-8">
            {/* Ocean background for right column */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05), rgba(147, 51, 234, 0.05))'
              }}
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05), rgba(147, 51, 234, 0.05))',
                  'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05))',
                  'linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(59, 130, 246, 0.05), rgba(16, 185, 129, 0.05))'
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              {/* Profile Image */}
              <div className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                  alt="Xu Haiyang"
                  className="w-64 h-64 rounded-3xl object-cover shadow-2xl"
                />
              </div>

              {/* Ocean-inspired Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg transform rotate-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.8), rgba(59, 130, 246, 0.8))',
                  boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
                }}
              />

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl shadow-lg transform -rotate-12"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.8), rgba(16, 185, 129, 0.8))',
                  boxShadow: '0 6px 24px rgba(16, 185, 129, 0.3)'
                }}
              />

              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-1/2 -left-12 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.8), rgba(99, 102, 241, 0.8))',
                  boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)'
                }}
              />

              {/* Ocean bubble elements */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
                className="absolute top-1/4 right-1/4 w-6 h-6 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(103, 232, 249, 0.6), rgba(59, 130, 246, 0.3))',
                  boxShadow: '0 2px 12px rgba(103, 232, 249, 0.4)'
                }}
              />
            </motion.div>

            {/* Ocean Current Pattern */}
            <div className="absolute inset-0 -z-10">
              {/* More visible ocean ripples */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-cyan-300/50 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-dashed border-blue-400/40 rounded-full"
              />
              
              {/* Large ocean ripple */}
              <motion.div
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.5, 0.1, 0.5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-teal-300/30 rounded-full"
              />
              
              {/* Floating ocean particles */}
              <motion.div
                className="absolute top-1/3 left-1/6 w-4 h-4 bg-cyan-400/60 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/6 w-3 h-3 bg-blue-400/60 rounded-full"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-2/3 right-1/3 w-2 h-2 bg-teal-400/70 rounded-full"
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.2, 0.7, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>
          </div>
        </div>

      {/* Bottom Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-8 text-sm text-gray-500 z-20"
      >
        <p>uniqsea.com — Where uniqueness meets infinite possibilities</p>
      </motion.div>
      
      {/* Additional visible ocean decorations */}
      <motion.div
        className="absolute top-10 left-10 w-8 h-8 bg-cyan-400 rounded-full z-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-32 right-16 w-6 h-6 bg-blue-500 rounded-full z-20"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-32 w-10 h-10 bg-teal-400 rounded-full z-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Ocean ripple effects */}
      <motion.div
        className="absolute top-20 left-1/3 w-16 h-16 border-4 border-cyan-300/60 rounded-full z-15"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.6, 0.2, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 border-2 border-blue-400/50 rounded-full z-15"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 0.1, 0.5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </div>
  );
}