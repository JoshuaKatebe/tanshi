'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Laptop, 
  Settings, 
  Star,
  Shield,
  Bot,
  Accessibility,
  Home,
  Package,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  Zap,
  Target,
  Users,
  Award,
  Heart,
  Lightbulb,
  Rocket,
  ChevronRight,
  Play,
  ExternalLink,
  Download,
  MessageSquare,
  Sparkles,
  Layers,
  TrendingUp,
  Package2,
  Search
} from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
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
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const FloatingOrb = ({ size, color, delay, duration, x, y }) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full opacity-20 blur-xl`}
    style={{ left: x, top: y }}
    animate={{
      y: [0, -50, 0],
      x: [0, 30, 0],
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

const ServiceCard = ({ icon: Icon, title, description, features, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl group relative overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300 border border-blue-500/30">
            <Icon size={32} className="text-blue-300" />
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-blue-100/90 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
              className="flex items-center text-blue-200/80"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ icon: Icon, title, description, technologies, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-8 rounded-2xl border border-blue-500/20 shadow-2xl group backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-slate-300 mb-6 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, icon: Icon, suffix = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gradient-to-br from-blue-600/30 to-cyan-600/20 p-8 rounded-2xl text-white text-center shadow-xl border border-blue-500/30 backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
      <div className="relative z-10">
        <Icon size={40} className="mx-auto mb-4 text-blue-300" />
        <div className="text-4xl font-bold mb-2 text-white">
          <AnimatedCounter end={value} suffix={suffix} />
        </div>
        <div className="text-blue-200/80 font-medium">{label}</div>
      </div>
    </motion.div>
  );
};

const TanshiHomepage = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Modern, responsive, and optimized websites that deliver exceptional user experiences and drive business growth.",
      features: [
        "Responsive design for all devices",
        "SEO optimized for search engines",
        "Fast loading and performance focused",
        "Custom business solutions"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Custom Android applications built with performance and user experience in mind, tailored to your specific goals.",
      features: [
        "Native Android development",
        "Cross-platform solutions",
        "User-centric design",
        "Performance optimized"
      ]
    },
    {
      icon: Brain,
      title: "AI & IoT Innovation",
      description: "Cutting-edge solutions powered by artificial intelligence and embedded systems that connect digital and physical worlds.",
      features: [
        "Computer vision systems",
        "IoT sensor networks",
        "Machine learning models",
        "Smart automation"
      ]
    },
    {
      icon: Laptop,
      title: "Hardware & Equipment",
      description: "Reliable laptops, Arduino and ESP32 kits, and tech accessories for students, developers, and hobbyists.",
      features: [
        "Quality laptop sales",
        "Arduino & ESP32 kits",
        "Development accessories",
        "Student-friendly pricing"
      ]
    },
    {
      icon: Settings,
      title: "Custom Software",
      description: "Tailored business software from POS systems to ERPs that simplify, automate, and scale your operations.",
      features: [
        "Point of Sale systems",
        "Enterprise Resource Planning",
        "Inventory management",
        "Custom business solutions"
      ]
    },
    {
      icon: Sparkles,
      title: "Digital Transformation",
      description: "Complete digital makeover for businesses ready to embrace the future of technology and automation.",
      features: [
        "Process automation",
        "Cloud migration",
        "Digital strategy consulting",
        "Technology training"
      ]
    }
  ];

  const projects = [
    {
      icon: Shield,
      title: "MineGuard",
      description: "Smart mining safety system integrating AI and IoT to monitor helmet usage, detect hazardous environments, and optimize airflow.",
      technologies: ["Computer Vision", "IoT Sensors", "Fan Automation", "Blockchain"]
    },
    {
      icon: Bot,
      title: "Mona AI",
      description: "Offline AI assistant for PC with local command recognition, facial detection, and speech interaction for productivity and security.",
      technologies: ["Ollama", "Python", "Computer Vision", "TTS/STT"]
    },
    {
      icon: Accessibility,
      title: "Smart Cane for the Blind",
      description: "Mobility-enhancing tool with ultrasonic sensors and voice guidance to improve safety for the visually impaired.",
      technologies: ["Ultrasonic Sensors", "Voice Guidance", "Arduino", "Accessibility"]
    },
    {
      icon: Home,
      title: "Rental Property Manager",
      description: "Digital platform for landlords to handle bookings, payments, expenses, and tenant communication in one place.",
      technologies: ["Property Management", "Payment Integration", "Communication", "Analytics"]
    },
    {
      icon: Package,
      title: "Inventory & POS Systems",
      description: "Custom ERP and point-of-sale solutions with product tracking, staff accounts, sales reports, and mobile compatibility.",
      technologies: ["POS Systems", "Inventory Tracking", "Sales Analytics", "Mobile Compatible"]
    },
    {
      icon: Layers,
      title: "E-commerce Platform",
      description: "Complete online store solution with payment processing, inventory management, and customer analytics.",
      technologies: ["E-commerce", "Payment Gateway", "Analytics", "Mobile Responsive"]
    }
  ];

  const stats = [
    { value: 50, label: "Projects Delivered", icon: Target, suffix: "+" },
    { value: 98, label: "Client Satisfaction", icon: Heart, suffix: "%" },
    { value: 5, label: "Years Experience", icon: Award, suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Background Animation */}
      <div className="fixed inset-0 z-0">
        {/* Floating orbs */}
        <FloatingOrb size="w-64 h-64" color="bg-blue-500" delay={0} duration={8} x="10%" y="20%" />
        <FloatingOrb size="w-48 h-48" color="bg-cyan-500" delay={2} duration={10} x="80%" y="60%" />
        <FloatingOrb size="w-32 h-32" color="bg-blue-400" delay={4} duration={6} x="60%" y="10%" />
        <FloatingOrb size="w-56 h-56" color="bg-indigo-500" delay={1} duration={12} x="20%" y="70%" />
        <FloatingOrb size="w-40 h-40" color="bg-cyan-400" delay={3} duration={9} x="90%" y="20%" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Particle system */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl px-8 py-4 rounded-full text-white mb-12 border border-blue-500/30 shadow-2xl"
            >
              <Rocket size={24} className="text-blue-300" />
              <span className="font-bold text-lg">Tanshi Digital Solutions</span>
              <span className="text-blue-300 text-sm font-medium">• Zambian Innovation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight"
            >
              Empowering Innovation
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Through Technology
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
            >
              From intelligent automation to enterprise software and cutting-edge AI solutions, 
              we transform businesses through innovative technology that drives real results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/web-development" passHref legacyBehavior>
  <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-2xl border border-blue-500/30"
              >
                <Play size={24} />
                Start Your Project
                <ArrowRight size={20} />
              </motion.a>
</Link>
              <Link href="/track-order" passHref legacyBehavior>
  <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400/50 text-blue-200 px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 backdrop-blur-xl hover:border-blue-400 transition-colors"
              >
                <Package2 size={24} />
                Track Your Order
              </motion.a>
</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Simplified */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted Across <span className="text-blue-400">Zambia</span>
            </h2>
            <p className="text-blue-200/70 text-xl">Delivering excellence that speaks for itself</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              What We <span className="text-blue-400">Create</span>
            </h2>
            <p className="text-blue-100/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Comprehensive digital solutions designed to transform your business and accelerate growth
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-slate-900/40 to-blue-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-blue-200/70 text-xl">Innovation in action - transforming ideas into reality</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Who We 
                <span className="text-blue-400"> Partner With</span>
              </h2>
              <p className="text-blue-100/80 text-xl mb-12 leading-relaxed">
                We collaborate with forward-thinking clients across Zambia, delivering 
                tailored technology solutions that drive meaningful impact and sustainable growth.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Users, text: "Small businesses ready to embrace digital transformation", color: "text-blue-400" },
                  { icon: Lightbulb, text: "Tech enthusiasts seeking cutting-edge hardware and mentorship", color: "text-cyan-400" },
                  { icon: Target, text: "Enterprises requiring robust custom software ecosystems", color: "text-blue-500" },
                  { icon: Brain, text: "Visionary organizations exploring AI and IoT possibilities", color: "text-cyan-500" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={28} className={item.color} />
                    </div>
                    <span className="text-blue-100/90 text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 p-10 rounded-3xl border border-blue-500/30 backdrop-blur-xl shadow-2xl">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Star className="text-blue-400" size={32} />
                  Why Choose Us?
                </h3>
                <div className="space-y-5">
                  {[
                    "Full-cycle development from concept to deployment",
                    "Passionate commitment to innovation and quality",
                    "Scalable solutions that grow with your business", 
                    "Reliable support with guaranteed timely delivery",
                    "Zambian expertise with global technology standards"
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex-shrink-0" />
                      <span className="text-blue-100/90 text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Let's Build <span className="text-blue-400">Together</span>
            </h2>
            <p className="text-blue-100/80 text-xl mb-16 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your vision into reality? Whether it's automation, mobile apps, 
              or breakthrough IoT solutions—let's create something extraordinary.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              {[
                { icon: Mail, text: "info@tanshidigitalsolutions.site", label: "Email Us" },
                { icon: Phone, text: "+260 761 583 901", label: "Call or WhatsApp" },
                { icon: Globe, text: "tanshidigitalsolutions.site", label: "Visit Website" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-800/40 to-cyan-800/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-500/30 text-center group cursor-pointer shadow-xl"
                >
                  <contact.icon size={40} className="mx-auto mb-4 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-white mb-3 text-lg">{contact.label}</h3>
                  <p className="text-blue-200/80">{contact.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/web-development" passHref legacyBehavior>
  <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl flex items-center justify-center gap-3 border border-blue-500/30"
              >
                <Mail size={24} />
                Get Your Quote
                <ArrowRight size={20} />
              </motion.a>
</Link>
              <Link href="/projects" passHref legacyBehavior>
  <motion.a
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400/50 text-blue-200 px-12 py-5 rounded-2xl font-bold text-xl backdrop-blur-xl hover:border-blue-400 transition-colors flex items-center justify-center gap-3"
              >
                <ExternalLink size={24} />
                View Portfolio
              </motion.a>
</Link>
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="relative z-10 py-16 bg-gradient-to-r from-slate-950/80 to-blue-950/60 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Rocket size={28} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Tanshi Digital Solutions</span>
            </motion.div>
            <p className="text-blue-200/80 mb-2 text-lg">Empowering Innovation Through Technology</p>
            <p className="text-blue-300/60 mb-6">Zambian-rooted • Globally minded</p>
            <div className="w-24 h-px bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6" />
            <p className="text-blue-400/60 text-sm">
              © 2025 Tanshi Digital Solutions. Building the future of technology in Zambia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TanshiHomepage;