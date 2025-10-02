import { motion } from 'motion/react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side - Name/Brand */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Small ocean-themed logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl relative overflow-hidden shadow-lg">
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-700/60 to-transparent"
              animate={{
                height: ['30%', '60%', '30%']
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white/80 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4
              }}
            />
            {/* Logo center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm">US</span>
            </div>
          </div>
          
          {/* Name */}
          <motion.div className="flex flex-col">
            <motion.span 
              className="font-bold text-xl text-gray-900 tracking-wide"
              animate={{
                color: ['#111827', '#0891b2', '#111827']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Xu Haiyang
            </motion.span>
            <span className="text-sm text-gray-500 tracking-wider">uniqsea.com</span>
          </motion.div>
        </motion.div>

        {/* Right Side - Navigation */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="relative px-5 py-2 transition-colors duration-200 rounded-full"
              >
                <span
                  className={`relative z-10 font-medium ${
                    activeSection === section.id
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section.label}
                </span>
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-full"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}