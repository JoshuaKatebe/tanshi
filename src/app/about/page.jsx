'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Brain, 
  Heart, 
  Users, 
  Target, 
  Globe, 
  Lightbulb, 
  Award, 
  CheckCircle,
  Zap,
  Shield,
  Handshake,
  Star,
  TrendingUp,
  Code,
  Smartphone,
  Settings,
  Laptop,
  Sparkles,
  ArrowRight,
  Building,
  MapPin,
  Eye,
  Cpu,
  Bot,
  Home,
  Package
} from 'lucide-react';

const AboutPage = () => {
  const mission = {
    title: "Our Mission",
    description: "To create innovative, intelligent, and accessible technology solutions that solve real-world problems across Zambia and beyond.",
    subtitle: "We build tools that empower businesses, communities, and individuals to work smarter, grow faster, and live better through the power of software, AI, and IoT."
  };

  const values = [
    {
      icon: Brain,
      title: "Innovation",
      description: "We embrace the latest in AI, IoT, and modern software development to bring bold, future-forward ideas to life.",
      color: "from-purple-600 to-blue-600"
    },
    {
      icon: Target,
      title: "Impact",
      description: "Every project we take on is designed with purpose—to make a meaningful difference in how people live, work, and connect.",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "From startups to established businesses, our clients trust us to deliver quality work, on time and on budget.",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "We believe great solutions are built through strong relationships—with our clients, our partners, and each other.",
      color: "from-orange-600 to-red-600"
    }
  ];

  const services = [
    { 
      icon: Globe, 
      title: "Website Development", 
      desc: "Business websites, e-commerce, portfolios" 
    },
    { 
      icon: Smartphone, 
      title: "Mobile App Development", 
      desc: "Android, cross-platform solutions" 
    },
    { 
      icon: Settings, 
      title: "Custom Software Systems", 
      desc: "ERPs, POS, CRMs, dashboards" 
    },
    { 
      icon: Brain, 
      title: "AI & IoT Solutions", 
      desc: "Smart sensors, automation, offline AI tools" 
    },
    { 
      icon: Laptop, 
      title: "Laptop & Tech Hardware Sales", 
      desc: "Quality hardware for students and developers" 
    },
    { 
      icon: Cpu, 
      title: "Arduino & ESP32 Kits", 
      desc: "For education, prototyping & innovation" 
    }
  ];

  const projects = [
    {
      icon: Shield,
      title: "MineGuard",
      description: "AI + IoT mining safety & compliance system",
      impact: "Smart mining technology for enhanced safety"
    },
    {
      icon: Bot,
      title: "Mona AI",
      description: "Offline AI assistant for PC with facial recognition and voice control",
      impact: "Personal AI assistant for productivity"
    },
    {
      icon: Eye,
      title: "Smart Cane for the Blind",
      description: "Assistive device with sensors and voice guidance",
      impact: "Empowering mobility for the visually impaired"
    },
    {
      icon: Home,
      title: "Rental Property Manager",
      description: "Landlord platform with payments, bookings, and expense tracking",
      impact: "Complete property management solution"
    },
    {
      icon: Package,
      title: "Inventory & POS Systems",
      description: "Custom-built tools for retail, stock, and financial tracking",
      impact: "Business automation and insights"
    },
    {
      icon: Globe,
      title: "Educational & Commercial Websites",
      description: "Built for real clients across industries",
      impact: "Digital presence for growing businesses"
    }
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered", icon: Target },
    { value: "15+", label: "Happy Clients", icon: Heart },
    { value: "5+", label: "Years Experience", icon: Award },
    { value: "6+", label: "Team Members", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Floating orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{ left: '5%', top: '10%' }}
          animate={{
            x: [0, 150, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ right: '5%', top: '50%' }}
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          style={{ left: '70%', bottom: '20%' }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 bg-blue-500/20 backdrop-blur-xl px-8 py-4 rounded-full text-blue-300 mb-8 border border-blue-500/30 shadow-2xl"
            >
              <Rocket size={24} />
              <span className="font-bold text-lg">About Tanshi Digital</span>
              <span className="text-blue-300 text-sm font-medium">• Zambian Innovation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Building the Future of
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Technology in Zambia
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              We don't just write code—we engineer solutions, design experiences, and invent possibilities. 
              Born in Zambia with a global mindset.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
                >
                  <stat.icon className="mx-auto mb-3 text-blue-400" size={32} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                  <Rocket size={40} className="text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  🚀 {mission.title}
                </h2>
              </div>
              
              <p className="text-xl text-blue-100/90 mb-8 leading-relaxed font-medium">
                {mission.description}
              </p>
              
              <p className="text-lg text-blue-200/80 leading-relaxed">
                {mission.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 p-10 rounded-3xl border border-blue-500/30 backdrop-blur-xl shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Star className="text-blue-400" size={28} />
                  Our Story
                </h3>
                <div className="space-y-6 text-blue-100/90 leading-relaxed">
                  <p>
                    💡 <strong className="text-blue-300">Tanshi Digital Solutions</strong> began as a bold idea—to turn our passion for technology into real impact.
                  </p>
                  <p>
                    🌍 Born in Zambia, we are a proudly local tech company driven by a global mindset. We've built everything from smart mining systems to custom business platforms, helping clients embrace digital transformation while exploring emerging technologies.
                  </p>
                  <p>
                    🚀 We don't just write code—we engineer solutions, design experiences, and invent possibilities.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🌍 What We <span className="text-blue-400">Stand For</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              Our core values guide every decision we make and every solution we build
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${value.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${value.color}/20 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30`}>
                      <value.icon size={32} className="text-blue-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{value.title}</h3>
                  </div>
                  <p className="text-blue-100/90 leading-relaxed text-lg">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-slate-900/40 to-blue-900/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              👥 Our <span className="text-blue-400">Services</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              We offer a full suite of tech services to help you bring your ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-8 rounded-2xl border border-blue-500/20 shadow-2xl group backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    ✅ {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🌟 Our <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              Our portfolio reflects our commitment to building impactful, intelligent tech
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                    <project.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-blue-100/90 mb-4 leading-relaxed">{project.description}</p>
                  <div className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-full text-sm border border-blue-500/20">
                    {project.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Leadership */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              👨🏽‍💼 Leadership & <span className="text-blue-400">Team</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-4xl mx-auto leading-relaxed">
              Tanshi Digital is powered by a growing team of dedicated developers, engineers, designers, and strategists. 
              We bring diverse skills to the table—but share one vision: to build technology that matters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 p-10 rounded-3xl border border-blue-500/30 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto"
          >
            <div className="text-center">
              <Users size={48} className="mx-auto mb-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white mb-6">
                If you work with us, you're not just hiring a dev team—you're partnering with problem solvers, creators, and long-term allies.
              </h3>
              <p className="text-blue-100/80 text-lg leading-relaxed">
                Our team combines technical expertise with creative problem-solving to deliver solutions that don't just meet requirements—they exceed expectations and drive real business value.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              🤝 Let's Work <span className="text-blue-400">Together</span>
            </h2>
            <p className="text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Whether you're a business owner, educator, innovator, or investor—we'd love to hear from you. 
              Let's build something amazing together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-blue-500/30"
              >
                <Heart size={24} />
                Start Partnership
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400/50 text-blue-200 px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-xl hover:border-blue-400 transition-colors"
              >
                <Users size={24} />
                Meet the Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
