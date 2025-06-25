'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Brain, 
  Laptop, 
  Settings, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Code,
  Shield,
  Zap,
  Users,
  Target,
  Layers,
  TrendingUp,
  Lightbulb,
  Package,
  Wifi,
  Database,
  Cloud,
  Bot,
  Eye,
  Cpu
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive, and optimized websites that deliver exceptional user experiences and drive business growth.",
      features: [
        "Responsive design for all devices",
        "SEO optimized for search engines", 
        "Fast loading and performance focused",
        "Custom business solutions",
        "E-commerce platforms",
        "Content Management Systems"
      ],
      technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL"],
      pricing: "From K500",
      timeline: "2-6 days",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development", 
      description: "Custom Android applications built with performance and user experience in mind, tailored to your specific goals.",
      features: [
        "Native Android development",
        "Cross-platform solutions",
        "User-centric design",
        "Performance optimized",
        "App Store deployment",
        "Maintenance & updates"
      ],
      technologies: ["Android", "Kotlin", "Flutter", "React Native", "Firebase"],
      pricing: "From K1000",
      timeline: "1-10 weeks",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Brain,
      title: "AI & IoT Innovation",
      description: "Cutting-edge solutions powered by artificial intelligence and embedded systems that connect digital and physical worlds.",
      features: [
        "Computer vision systems",
        "IoT sensor networks", 
        "Machine learning models",
        "Smart automation",
        "Data analytics",
        "Predictive maintenance"
      ],
      technologies: ["Python", "OpenCV", "YOLO", "Arduino", "ESP32", "Raspberry Pi"],
      pricing: "From K1500",
      timeline: "1-16 weeks",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Settings,
      title: "Custom Software",
      description: "Tailored business software from POS systems to ERPs that simplify, automate, and scale your operations.",
      features: [
        "Point of Sale systems",
        "Enterprise Resource Planning",
        "Inventory management",
        "Customer Relationship Management",
        "Financial reporting",
        "Workflow automation"
      ],
      technologies: ["C#", ".NET", "SQL Server", "React", "Node.js", "Cloud"],
      pricing: "From K1000",
      timeline: "2-12 weeks", 
      color: "from-orange-600 to-red-600"
    },
    {
      icon: Laptop,
      title: "Hardware & Equipment",
      description: "Reliable laptops, Arduino and ESP32 kits, and tech accessories for students, developers, and hobbyists.",
      features: [
        "Quality laptop sales",
        "Arduino & ESP32 kits",
        "Development accessories",
        "Student-friendly pricing",
        "Technical support",
        "Warranty & repairs"
      ],
      technologies: ["Hardware", "Arduino", "ESP32", "Sensors", "Components"],
      pricing: "From K2000",
      timeline: "1-2 days",
      color: "from-yellow-600 to-orange-600"
    },
    {
      icon: Sparkles,
      title: "Digital Transformation",
      description: "Complete digital makeover for businesses ready to embrace the future of technology and automation.",
      features: [
        "Process automation",
        "Cloud migration",
        "Digital strategy consulting",
        "Technology training",
        "System integration",
        "Performance optimization"
      ],
      technologies: ["Cloud Services", "APIs", "Automation", "Consulting", "Training"],
      pricing: "From K2000",
      timeline: "3-20 weeks",
      color: "from-indigo-600 to-purple-600"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business, goals, and challenges through detailed consultation.",
      icon: Target
    },
    {
      step: "02", 
      title: "Planning",
      description: "Our team creates a comprehensive project plan with timelines, milestones, and deliverables.",
      icon: Lightbulb
    },
    {
      step: "03",
      title: "Development",
      description: "We build your solution using the latest technologies and best practices for optimal results.",
      icon: Code
    },
    {
      step: "04",
      title: "Testing",
      description: "Rigorous testing ensures your solution works flawlessly across all devices and scenarios.",
      icon: Shield
    },
    {
      step: "05",
      title: "Deployment",
      description: "We handle the launch process and ensure everything runs smoothly in your environment.",
      icon: Zap
    },
    {
      step: "06",
      title: "Support",
      description: "Ongoing maintenance and support to keep your solution running at peak performance.",
      icon: Users
    }
  ];

  const stats = [
    { value: "50+", label: "Projects Delivered", icon: Target },
    { value: "98%", label: "Client Satisfaction", icon: CheckCircle },
    { value: "24/7", label: "Support Available", icon: Shield },
    { value: "5+", label: "Years Experience", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{ left: '10%', top: '20%' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ right: '10%', top: '60%' }}
          animate={{
            x: [0, -80, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 25, repeat: Infinity }}
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 bg-blue-500/20 backdrop-blur-xl px-6 py-3 rounded-full text-blue-300 mb-8 border border-blue-500/30"
            >
              <Sparkles size={20} />
              <span className="font-semibold">Our Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Digital Solutions
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                That Transform
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              From cutting-edge AI and IoT solutions to robust web applications and mobile apps, 
              we deliver technology that drives real business results across Zambia and beyond.
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

      {/* Services Grid */}
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
              What We <span className="text-blue-400">Create</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              Comprehensive digital solutions designed to transform your business and accelerate growth
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl group relative overflow-hidden"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`p-4 bg-gradient-to-r ${service.color}/20 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30`}>
                      <service.icon size={32} className="text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-green-400 font-semibold">{service.pricing}</span>
                        <span className="text-blue-300">{service.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-blue-100/90 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-3">Features Include:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center text-blue-200/80 text-sm"
                        >
                          <CheckCircle size={16} className="text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, i) => (
                        <span key={i} className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our <span className="text-blue-400">Process</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              A proven methodology that ensures your project is delivered on time, on budget, and exceeds expectations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-8 rounded-2xl border border-blue-500/20 shadow-2xl group backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mr-4">
                      {step.step}
                    </div>
                    <step.icon size={32} className="text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Transform Your <span className="text-blue-400">Business?</span>
            </h2>
            <p className="text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's discuss your project and create a custom solution that drives real results. 
              Get a free consultation and quote today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-blue-500/30"
              >
                <Target size={24} />
                Get Free Quote
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400/50 text-blue-200 px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-xl hover:border-blue-400 transition-colors"
              >
                <Users size={24} />
                Book Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
