import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "VoiceNav: Accessible Mobile Navigation",
      description: "A voice-guided navigation system designed specifically for visually impaired users, featuring advanced spatial audio cues and intelligent route optimization.",
      image: "accessibility mobile app",
      technologies: ["React Native", "Web Speech API", "Machine Learning", "iOS/Android"],
      status: "In Development",
      period: "2024 - Present",
      category: "Accessibility",
      highlights: [
        "99% accuracy in voice recognition",
        "Tested with 50+ visually impaired users",
        "Winner of Accessibility Innovation Award"
      ]
    },
    {
      title: "CulturalUI: Cross-Cultural Design System",
      description: "A comprehensive design system and component library that adapts to different cultural preferences and interaction patterns, making digital products more inclusive.",
      image: "design system interface",
      technologies: ["React", "TypeScript", "Storybook", "Figma API"],
      status: "Research Phase",
      period: "2024",
      category: "Design Systems",
      highlights: [
        "Supports 15+ cultural adaptations",
        "Open-source component library",
        "Integrated with major design tools"
      ]
    },
    {
      title: "ElderConnect: Smart Home Dashboard",
      description: "An intuitive smart home interface designed for elderly users, featuring large buttons, voice control, and simplified navigation patterns.",
      image: "smart home elderly interface",
      technologies: ["Vue.js", "IoT Integration", "Voice UI", "Progressive Web App"],
      status: "Completed",
      period: "2023",
      category: "Healthcare",
      highlights: [
        "85% usability improvement",
        "Deployed in 3 assisted living facilities",
        "Published in ASSETS 2023"
      ]
    },
    {
      title: "UniQ Learning Platform",
      description: "A personalized learning platform that adapts to individual learning styles and cultural backgrounds, making education more accessible and effective.",
      image: "learning platform education",
      technologies: ["Next.js", "AI/ML", "WebRTC", "PostgreSQL"],
      status: "Prototype",
      period: "2023",
      category: "Education",
      highlights: [
        "Adaptive learning algorithms",
        "Multi-language support",
        "Real-time collaboration features"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Development':
        return 'bg-blue-100 text-blue-800';
      case 'Research Phase':
        return 'bg-purple-100 text-purple-800';
      case 'Prototype':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Accessibility':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Design Systems':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Healthcare':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Education':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-gray-900">Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Exploring innovative solutions at the intersection of technology and human experience. 
            Each project represents a commitment to making technology more accessible and inclusive.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                <ImageWithFallback
                  src={`https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=300&fit=crop`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-900">{project.title}</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{project.period}</span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="mb-2 text-gray-900">Key Highlights</h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Tag className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-700">Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="mb-2 text-white">Interested in Collaboration?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, research opportunities, 
              or ways to make technology more accessible and inclusive.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                View All Projects
              </button>
              <button className="border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}