import { motion } from 'motion/react';
import { ExternalLink, Calendar, Users } from 'lucide-react';

export function Publications() {
  const publications = [
    {
      title: "Enhancing Accessibility in Mobile Interfaces: A Study on Voice-Guided Navigation",
      authors: "Xu Haiyang, Dr. Sarah Jensen, Prof. Michael Nielsen",
      venue: "CHI Conference on Human Factors in Computing Systems",
      year: "2024",
      status: "Under Review",
      abstract: "This paper explores novel approaches to voice-guided navigation in mobile applications, focusing on improving accessibility for visually impaired users.",
      tags: ["HCI", "Accessibility", "Mobile Computing"]
    },
    {
      title: "Cultural Adaptation in User Interface Design: A Cross-Cultural Study",
      authors: "Xu Haiyang, Dr. Anna Petersen",
      venue: "International Journal of Human-Computer Studies",
      year: "2024",
      status: "In Preparation",
      abstract: "An investigation into how cultural backgrounds influence user interface preferences and interaction patterns.",
      tags: ["Cross-Cultural Design", "UI/UX", "User Studies"]
    },
    {
      title: "Smart Home Interfaces for Elderly Users: Design Guidelines and Evaluation",
      authors: "Xu Haiyang, Li Wei, Dr. Sarah Jensen",
      venue: "ASSETS Conference on Computers and Accessibility",
      year: "2023",
      status: "Published",
      abstract: "A comprehensive study on designing intuitive smart home interfaces specifically tailored for elderly users' needs and capabilities.",
      tags: ["Elderly Care", "Smart Homes", "Usability"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Preparation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="mb-4 text-gray-900">Publications</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My research focuses on human-computer interaction, accessibility, and designing technology 
            that serves diverse communities and enhances user experiences.
          </p>
        </motion.div>

        <div className="space-y-8">
          {publications.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="mb-2 text-gray-900 leading-relaxed">{paper.title}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{paper.authors}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{paper.venue} • {paper.year}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(paper.status)}`}>
                    {paper.status}
                  </span>
                  {paper.status === 'Published' && (
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{paper.abstract}</p>
              
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
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
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="mb-2 text-gray-900">Research Interests</h3>
            <p className="text-gray-600 mb-4">
              I'm always interested in collaborating on projects that explore the intersection of 
              technology and human experience, particularly in accessibility and inclusive design.
            </p>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}