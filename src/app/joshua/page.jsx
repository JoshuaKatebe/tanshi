'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Brain, 
  Rocket, 
  Users, 
  Mail, 
  Github, 
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Award,
  Building,
  GraduationCap,
  Shield,
  Smartphone,
  Globe,
  Zap,
  Eye,
  Camera,
  Wifi,
  Bot,
  Leaf,
  Home,
  Bus,
  Target,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Download,
  Play,
  ArrowRight,
  BookOpen,
  Calendar,
  Trophy,
  Coffee
} from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration * 60);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Enhanced floating particles animation
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const projects = [
    {
      title: "MineGuard 360",
      description: "Complete AI + IoT intelligence platform for mining safety with helmet detection, gas sensors, and blockchain logging. Built for MineTech Hackathon.",
      tech: ["YOLOv11", "Computer Vision", "IoT", "Blockchain", "ESP32", "NVIDIA Jetson"],
      category: "AI/IoT",
      icon: Shield,
      color: "from-red-600 to-orange-600",
      status: "Award Winner",
      impact: "94% accuracy, 80% safety improvement"
    },
    {
      title: "Mona AI",
      description: "Offline AI Assistant with command recognition, face detection, voice feedback, and PC automation using local LLM.",
      tech: ["Ollama", "OpenCV", "ESP32", "Python", "Speech Recognition", "Computer Vision"],
      category: "AI",
      icon: Bot,
      color: "from-purple-600 to-blue-600",
      status: "In Development",
      impact: "100% offline, autonomous PC control"
    },
    {
      title: "Smart Cane for the Blind",
      description: "Arduino-powered mobility tool with ultrasonic sensors, voice assistance, audiobooks, and tactile feedback.",
      tech: ["Arduino", "Ultrasonic Sensors", "Voice AI", "Mobile App", "OLED"],
      category: "IoT",
      icon: Eye,
      color: "from-green-600 to-teal-600",
      status: "Prototype Complete",
      impact: "Enhanced mobility for visually impaired"
    },
    {
      title: "Real Estate Platform",
      description: "Airbnb-style property management system with rent tracking, expense management, and landlord-tenant features.",
      tech: ["React", "Node.js", "Database", "Mobile App", "Payment Integration"],
      category: "Web",
      icon: Home,
      color: "from-blue-600 to-cyan-600",
      status: "Production Ready",
      impact: "Complete property management solution"
    },
    {
      title: "AgriLink Smart Farming",
      description: "Smart agriculture monitoring with environmental sensors and potential Web3 land ownership system (paused due to regulations).",
      tech: ["IoT Sensors", "Environmental Monitoring", "Web3", "React", "Arduino"],
      category: "IoT/Web3",
      icon: Leaf,
      color: "from-emerald-600 to-green-600",
      status: "Paused",
      impact: "Smart farming for Zambian agriculture"
    },
    {
      title: "WayFare Bus System",
      description: "Web3-powered bus ticketing system using Motoko for secure and verifiable ticket purchases (discontinued).",
      tech: ["Motoko", "Web3", "Blockchain", "Smart Contracts", "ICP"],
      category: "Web3",
      icon: Bus,
      color: "from-yellow-600 to-orange-600",
      status: "Discontinued",
      impact: "Blockchain-based transport solution"
    }
  ];

  const skills = [
    { 
      icon: Code, 
      name: "Web Development", 
      techs: ["JavaScript", "React", "Node.js", "C#", ".NET", "Express"],
      level: 90,
      experience: "3+ years"
    },
    { 
      icon: Cpu, 
      name: "IoT & Hardware", 
      techs: ["Arduino", "ESP32", "Raspberry Pi", "Sensors", "Circuit Design"],
      level: 85,
      experience: "2+ years"
    },
    { 
      icon: Brain, 
      name: "AI & Computer Vision", 
      techs: ["YOLO", "OpenCV", "Ollama", "Machine Learning", "Python"],
      level: 80,
      experience: "2+ years"
    },
    { 
      icon: Smartphone, 
      name: "Mobile Development", 
      techs: ["Android", "Kotlin", "Flutter", "Cross-platform"],
      level: 75,
      experience: "1+ years"
    },
    { 
      icon: Users, 
      name: "Leadership", 
      techs: ["Team Management", "Strategy", "Presentations", "Coordination"],
      level: 88,
      experience: "2+ years"
    },
    { 
      icon: Globe, 
      name: "Cloud & DevOps", 
      techs: ["Git", "GitHub", "Deployment", "APIs", "Databases"],
      level: 70,
      experience: "2+ years"
    }
  ];

  const websites = [
    {
      title: "YouEngage Foundation",
      description: "Youth empowerment organization website with leadership development programs and community initiatives.",
      url: "https://www.youengagefoundation.org/",
      tech: ["React", "Responsive Design", "Modern UI"],
      image: "🌟"
    },
    {
      title: "HideAway Apartments",
      description: "Premium serviced apartments website for US Embassy guests and corporate travelers in Lusaka & Kitwe.",
      url: "https://hideaway-pi.vercel.app/",
      tech: ["Next.js", "Tailwind CSS", "Booking System"],
      image: "🏢"
    },
    {
      title: "Red Apple Travel & Tours",
      description: "Travel agency website offering international flights, hotel bookings, and comprehensive travel services.",
      url: "https://red-apple-three.vercel.app/",
      tech: ["React", "Travel API", "Responsive"],
      image: "✈️"
    },
    {
      title: "Tanshi Digital Solutions",
      description: "Our company website showcasing digital solutions and student startup services.",
      url: "https://tanshidigital.com/",
      tech: ["React", "Business Site", "Portfolio"],
      image: "💻"
    }
  ];

  const achievements = [
    { icon: Trophy, title: "MineTech Hackathon Winner", description: "MineGuard 360 project recognition" },
    { icon: Award, title: "National Tech Expo Invite", description: "Invited to showcase innovations" },
    { icon: Star, title: "Motoko Bootcamp 2024", description: "Web3 development certification" },
    { icon: BookOpen, title: "Harvard CS50", description: "Computer Science fundamentals" },
    { icon: Code, title: "Full Stack Certifications", description: "Web and mobile development" },
    { icon: Building, title: "DevEn Internship", description: "C# .NET Backend Developer" }
  ];

  const stats = [
    { value: 15, label: "Projects Completed", icon: Rocket, suffix: "+" },
    { value: 4, label: "Websites Deployed", icon: Globe, suffix: "" },
    { value: 6, label: "Team Members", icon: Users, suffix: "" },
    { value: 94, label: "AI Model Accuracy", icon: Target, suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `linear-gradient(45deg, #3b82f6, #06b6d4)`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: particle.delay,
            }}
          />
        ))}
        
        {/* Additional geometric shapes */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute border-2 border-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          className="text-center z-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <motion.div
                className="w-full h-full bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-5xl font-bold shadow-2xl"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity }
                }}
              >
                JK
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-blue-400/50 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-2 border-2 border-cyan-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Joshua Katebe
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-6 mb-12">
            <motion.div 
              className="text-2xl md:text-3xl text-blue-200 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧑🏽‍💻 Computer Science Engineering Student
            </motion.div>
            <motion.div 
              className="text-xl md:text-2xl text-cyan-300 font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              💼 CEO & Founder | Tanshi Digital Solutions
            </motion.div>
            <motion.div 
              className="text-lg md:text-xl text-slate-300"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              💡 Innovator in AI, IoT & Digital Solutions
            </motion.div>
            <motion.div 
              className="text-base md:text-lg text-blue-300"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              🤖 Building the future, one project at a time
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <motion.a
              href="#projects"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-10 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-xl"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Rocket size={20} />
                View Projects
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              className="border-2 border-blue-400 px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-400 hover:text-slate-900 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Mail size={20} />
                Contact Me
              </span>
            </motion.a>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20"
              >
                <stat.icon className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={40} className="text-blue-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Passionate about solving real-world problems through innovative technology
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  I'm a 3rd-year Computer Science Engineering student at <span className="text-blue-400 font-semibold">DMI St. Eugene University</span> with a deep passion for building solutions that solve real-world problems.
                </p>
                <p>
                  As the founder and CEO of <span className="text-cyan-400 font-semibold">Tanshi Digital Solutions</span>, I lead a diverse team of student engineers working on impactful tech projects in AI, IoT, and digital transformation across Zambia.
                </p>
                <p>
                  From building smart mining safety systems to developing offline AI assistants, I'm always pushing the boundaries of what's possible with technology while focusing on practical solutions for African markets.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: GraduationCap, label: "3rd Year", sublabel: "CS Engineering", color: "text-blue-400" },
                  { icon: Building, label: "CEO", sublabel: "Tanshi Digital", color: "text-cyan-400" },
                  { icon: Award, label: "15+", sublabel: "Projects", color: "text-green-400" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center p-6 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-blue-500/20"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(30, 58, 138, 0.2)",
                      borderColor: "rgba(59, 130, 246, 0.5)"
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <item.icon className={`mx-auto mb-3 ${item.color}`} size={32} />
                    <div className={`text-2xl font-bold ${item.color}`}>{item.label}</div>
                    <div className="text-sm text-slate-400">{item.sublabel}</div>
                  </motion.div>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 p-4 rounded-lg border border-blue-500/20"
                  >
                    <achievement.icon className="text-yellow-400 mb-2" size={20} />
                    <h4 className="font-semibold text-white text-sm mb-1">{achievement.title}</h4>
                    <p className="text-slate-400 text-xs">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-96 h-96 mx-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-2 border-blue-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Code size={80} className="mx-auto mb-4 text-blue-400" />
                    </motion.div>
                    <div className="text-xl font-semibold text-white">Always Building</div>
                    <div className="text-sm text-slate-400">Never Stop Learning</div>
                    <div className="text-xs text-slate-500 mt-2">🚀 Innovation in Motion</div>
                  </div>
                </motion.div>
                
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-32 px-4 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Constantly evolving skillset focused on cutting-edge technologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
                }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <motion.div
                  className="mb-6 flex items-center gap-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <skill.icon size={32} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    <p className="text-sm text-slate-400">{skill.experience}</p>
                  </div>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {skill.techs.map((tech, i) => (
                    <motion.div
                      key={tech}
                      className="text-sm text-slate-300 bg-slate-700/50 px-4 py-2 rounded-full inline-block mr-2 mb-2 border border-slate-600/50 hover:border-blue-500/50 transition-colors"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.1) + (i * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Building solutions that make a real difference in people's lives
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 2,
                  boxShadow: "0 30px 60px rgba(59, 130, 246, 0.2)"
                }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${project.color} rounded-xl`}>
                        <project.icon size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                            {project.category}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            project.status === 'Award Winner' ? 'bg-yellow-500/20 text-yellow-400' :
                            project.status === 'Production Ready' ? 'bg-green-500/20 text-green-400' :
                            project.status === 'In Development' ? 'bg-blue-500/20 text-blue-400' :
                            project.status === 'Prototype Complete' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.2 }}
                      className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink size={24} />
                    </motion.div>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    {project.description}
                  </p>

                  <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-blue-500/20">
                    <div className="text-sm font-semibold text-blue-400 mb-1">Impact</div>
                    <div className="text-slate-300">{project.impact}</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="text-xs px-3 py-2 bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50 hover:border-blue-500/50 transition-colors"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.1) + (i * 0.03) }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="py-32 px-4 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Websites & Applications
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Professional websites and applications built for real clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {websites.map((website, index) => (
              <motion.div
                key={website.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(59, 130, 246, 0.2)"
                }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{website.image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {website.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      {website.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {website.tech.map((tech, i) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>Visit Website</span>
                      <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's connect and create the future together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              { icon: Mail, text: "joshuakatebe15@gmail.com", label: "Email", href: "mailto:joshuakatebe15@gmail.com" },
              { icon: Phone, text: "+260 977 487 852", label: "WhatsApp", href: "https://wa.me/260977487852" },
              { icon: MapPin, text: "Lusaka, Zambia", label: "Location", href: "#" }
            ].map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <contact.icon size={40} className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-3 text-lg">{contact.label}</h3>
                {contact.href !== "#" ? (
                  <a href={contact.href} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {contact.text}
                  </a>
                ) : (
                  <p className="text-slate-300">{contact.text}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.a
              href="mailto:joshuakatebe15@gmail.com"
              className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-500 px-12 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-xl"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
              <span>Email Me</span>
            </motion.a>

            <motion.a
              href="https://github.com/joshuakatebe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 border-2 border-blue-400 px-12 py-4 rounded-full font-semibold text-lg hover:bg-blue-400 hover:text-slate-900 transition-all"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} />
              <span>GitHub</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Tanshi Digital Solutions</h3>
            <p className="text-slate-300 mb-4">
              Student-led Zambian startup building digital tools for the future
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-400">
              <span>📧 joshuakatebe15@gmail.com</span>
              <span>📞 +260 977 487 852</span>
              <span>🌍 tanshidigital.com</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-4 border-t border-blue-500/20 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Code size={24} className="text-blue-400" />
              </motion.div>
              <span className="text-xl font-bold text-white">Joshua Katebe</span>
            </motion.div>
            <p className="text-slate-400 mb-4">
              Building the future with AI, IoT & Innovation
            </p>
            <p className="text-slate-400 mb-4">
              © 2025 Tanshi Digital Solutions. Built with passion, powered by innovation.
            </p>
            <motion.div
              className="flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Github, href: "https://github.com/joshuakatebe", label: "GitHub" },
                { icon: Mail, href: "mailto:joshuakatebe15@gmail.com", label: "Email" },
                { icon: Globe, href: "https://tanshidigital.com", label: "Website" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
