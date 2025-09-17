'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield,
  Building, 
  Bot, 
  Eye, 
  Home, 
  Package, 
  Globe, 
  Leaf, 
  Bus, 
  ExternalLink, 
  Github,
  Play,
  Award,
  TrendingUp,
  Target,
  CheckCircle,
  Star,
  ArrowRight,
  Filter,
  Search,
  Calendar,
  Users,
  Code,
  Brain,
  Smartphone,
  Zap,
  Heart,
  Trophy,
  Layers,
  Download
} from 'lucide-react';

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'AI/IoT', 'Web', 'Mobile', 'Web3', 'Hardware'];

  const projects = [
    {
      id: 1,
      title: "YouEngage Foundation",
      description: "Youth empowerment organization website with leadership development programs and community initiatives.",
      longDescription: "A modern, responsive website for a youth empowerment organization focused on leadership development and community engagement. Features program information, event management, and volunteer coordination.",
      tech: ["React", "Next.js", "Tailwind CSS", "CMS", "Responsive Design"],
      category: "Web",
      icon: Users,
      status: "Live",
      year: "2025",
      timeline: "2 weeks",
      team: "3 members",
      impact: "Digital presence for youth empowerment",
      features: [
        "Program showcase and registration",
        "Event management system",
        "Volunteer coordination",
        "Blog and news section",
        "Mobile-responsive design",
        "SEO optimization"
      ],
      color: "from-green-600 to-emerald-600",
      image: "🌟",
      link: "https://www.youengagefoundation.org/"
    },
    {
      id: 2,
      title: "HideAway Apartments",
      description: "Premium serviced apartments website for US Embassy guests and corporate travelers in Lusaka & Kitwe.",
      longDescription: "A luxury hospitality website featuring premium serviced apartments for diplomatic and corporate guests. Includes booking system, virtual tours, and comprehensive amenity information.",
      tech: ["Next.js", "Tailwind CSS", "Booking System", "React", "Mobile Responsive"],
      category: "Web",
      icon: Building,
      status: "Live",
      year: "2025",
      timeline: "2 weeks",
      team: "3 members",
      impact: "Premium hospitality digital presence",
      features: [
        "Online booking system",
        "Virtual apartment tours",
        "Multi-location support",
        "Guest services portal",
        "Corporate booking features",
        "Luxury brand presentation"
      ],
      color: "from-purple-600 to-pink-600",
      image: "🏢",
      link: "https://hide-away-apartments.tanshidigitalsolutions.site/"
    },
    {
    "id": 3,
    "title": "Jubilee Center",
    "description": "Website for a Christian NGO equipping pastors, professionals, and youth to grow and flourish.",
    "longDescription": "Jubilee Center is a Christian non-governmental organization website that highlights its mission of equipping pastors, professionals, and young people to grow spiritually, flourish physically, and have a voice in the nation. The site showcases programs, initiatives, and organizational values.",
    "tech": ["Next.js", "Tailwind CSS", "Responsive Design"],
    "category": "Website",
    "icon": "Globe",
    "status": "Live",
    "year": "2025",
    "timeline": "2 Days",
    "team": "1 members",
    "impact": "Increased visibility and outreach for a Christian NGO.",
    "features": [
      "Organizational profile",
      "Programs and initiatives overview",
      "Contact and outreach forms",
      "Responsive design"
    ],
    "color": "from-purple-600 to-pink-500",
    "image": "✝️",
    "link": "https://jubilee.tanshidigitalsolutions.site/"
  },
    {
      id: 4,
      title: "Katly Designs",
      description: "Modern African fashion house website with gallery, consultation booking, and vibrant interactive UI.",
      longDescription: "Katly Designs is a contemporary web platform for a Zambian fashion house, celebrating African heritage through elegant, handcrafted garments. The site features a dynamic gallery, service highlights, and a seamless consultation booking experience, all wrapped in a visually rich, culturally inspired design.",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Resend API", "Lucide Icons"],
      category: "Web/App",
      icon: Star,
      status: "Live",
      year: "2025",
      timeline: "1 weeks",
      team: "1 members",
      impact: "Empowering local fashion with global reach and digital elegance",
      features: [
        "Animated hero and gallery sections",
        "Consultation booking with email notifications",
        "Responsive, mobile-friendly design",
        "Custom SVG backgrounds and gradients",
        "Service and collection highlights",
        "Unsubscribe and email compliance features"
      ],
      color: "from-orange-500 to-yellow-500",
      image: "🧵",
      link: "https://katlydesigns.tanshidigitalsolutions.site/"
    },
    {
    "id": 5,
    "title": "LHI Zambia",
    "description": "Landing page and LMS demo for Lusaka Health Institute.",
    "longDescription": "LHI Zambia project provides a modern landing page and a demo Learning Management System (LMS) for Lusaka Health Institute. It was designed to showcase how digital tools can improve education accessibility and management in the health sector.",
    "tech": ["React", "Tailwind CSS", "LMS Demo", "Responsive Design"],
    "category": "Website",
    "icon": "GraduationCap",
    "status": "Prototype Complete",
    "year": "2025",
    "timeline": "5 weeks",
    "team": "4 members",
    "impact": "Demonstrates digital learning possibilities for healthcare education.",
    "features": [
      "Landing page design",
      "LMS demo integration",
      "Program highlights",
      "Responsive design"
    ],
    "color": "from-blue-600 to-indigo-500",
    "image": "🏥",
    "link": "https://lhi-zambia.tanshidigitalsolutions.site/"
  },
  {
    "id": 6,
    "title": "Motor Insurance System",
    "description": "Demo motor insurance platform with landing page, backend server, and database integration.",
    "longDescription": "The Motor Insurance System is a functional demo developed for a developer challenge. It simulates a real insurance platform with a landing page, quote generation, policy management, and server-side database integration. The project demonstrates backend and frontend synergy in insurance tech.",
    "tech": ["Next.js", "Node.js", "Firebase", "API Integration", "Responsive Design"],
    "category": "Information System",
    "icon": "Shield",
    "status": "Production Ready",
    "year": "2025",
    "timeline": "2 weeks",
    "team": "1 members",
    "impact": "Provides a working prototype of a digital insurance platform.",
    "features": [
      "Landing page for insurance services",
      "Quote generation",
      "Policy management demo",
      "Database integration",
      "Responsive design"
    ],
    "color": "from-yellow-500 to-orange-600",
    "image": "🚗",
    "link": "https://motor-insurance.tanshidigitalsolutions.site/"
  },
   {
    "id": 7,
    "title": "AgriSmart 360",
    "description": "IoT-powered control center for managing smart greenhouses and monitoring real-time analytics.",
    "longDescription": "AgriSmart 360 is an IoT-based web application designed to help farmers and greenhouse owners manage and monitor their agricultural environments. The system provides real-time data visualization, device control, and analytics for better decision-making in precision farming.",
    "tech": ["React", "Node.js", "IoT Integration", "WebSockets", "Charts.js", "Responsive Design"],
    "category": "Information System",
    "icon": "Activity",
    "status": "Award Winner",
    "year": "2025",
    "timeline": "1 weeks",
    "team": "3 members",
    "impact": "Enables smart farming and data-driven agricultural management.",
    "features": [
      "Real-time IoT data monitoring",
      "Greenhouse device control",
      "Analytics dashboard",
      "Data visualization with charts",
      "Responsive design"
    ],
    "color": "from-green-600 to-emerald-500",
    "image": "🌱",
    "link": "https://agrismart.tanshidigitalsolutions.site/"
  },
  {
      id: 8,
      title: "MineGuard 360",
      description: "Complete AI + IoT intelligence platform for mining safety with helmet detection, gas sensors, and blockchain logging. Built for MineTech Hackathon.",
      longDescription: "MineGuard 360 is a comprehensive mining safety system that leverages computer vision, IoT sensors, and blockchain technology to create a smart safety monitoring ecosystem. The system automatically detects helmet usage, monitors air quality, and logs all data on blockchain for immutable compliance records.",
      tech: ["YOLOv11", "Computer Vision", "IoT", "Blockchain", "ESP32", "NVIDIA Jetson", "Python", "React"],
      category: "AI/IoT",
      icon: Shield,
      status: "Award Winner",
      year: "2025",
      timeline: "16 weeks",
      team: "6 members",
      impact: "94% accuracy, 80% safety improvement",
      features: [
        "Real-time helmet detection using YOLOv11",
        "Gas sensor monitoring and alerts",
        "Blockchain compliance logging",
        "Fan automation based on air quality",
        "Mobile app for supervisors",
        "Dashboard analytics"
      ],
      color: "from-red-600 to-orange-600",
      image: "🛡️",
      link: "/mineguard360"
    },
    {
      id: 9,
      title: "Red Apple Travel & Tours",
      description: "Travel agency website offering international flights, hotel bookings, and comprehensive travel services.",
      longDescription: "A full-service travel agency platform providing flight bookings, hotel reservations, tour packages, and travel advisory services. Features integrated payment processing and customer management.",
      tech: ["React", "Travel APIs", "Payment Gateway", "Responsive Design", "Node.js"],
      category: "Web",
      icon: Globe,
      status: "Live",
      year: "2025",
      timeline: "2 weeks",
      team: "1 members",
      impact: "Complete travel service platform",
      features: [
        "Flight search and booking",
        "Hotel reservation system",
        "Tour package management",
        "Customer portal",
        "Payment processing",
        "Travel documentation"
      ],
      color: "from-blue-600 to-cyan-600",
      image: "✈️",
      link: "https://redapple.tanshidigitalsolutions.site/"
    },
    
    
    {
      id: 10,
      title: "Smart Cane for the Blind",
      description: "Arduino-powered mobility tool with ultrasonic sensors, voice assistance, audiobooks, and tactile feedback.",
      longDescription: "An innovative assistive technology device that enhances mobility and independence for visually impaired individuals. The smart cane integrates multiple sensors, voice guidance, and connectivity features to provide comprehensive navigation support.",
      tech: ["Arduino", "Ultrasonic Sensors", "Voice AI", "Mobile App", "OLED", "Bluetooth"],
      category: "AI/IoT",
      icon: Eye,
      status: "Prototype Complete",
      year: "2023",
      timeline: "10 weeks",
      team: "3 members",
      impact: "Enhanced mobility for visually impaired",
      features: [
        "Obstacle detection with ultrasonic sensors",
        "Voice guidance and feedback",
        "Mobile app connectivity",
        "Audiobook functionality",
        "Emergency alert system",
        "Lightweight design"
      ],
      color: "from-green-600 to-teal-600",
      image: "👁️",
      link: "#"
    },
    {
      id: 11,
      title: "Real Estate Platform",
      description: "Airbnb-style property management system with rent tracking, expense management, and landlord-tenant features.",
      longDescription: "A comprehensive property management platform that simplifies rental property operations for landlords and provides a seamless experience for tenants. Features include automated rent collection, maintenance tracking, and financial reporting.",
      tech: ["React", "Node.js", "MongoDB", "Mobile App", "Payment Integration", "Express"],
      category: "Web",
      icon: Home,
      status: "Production Ready",
      year: "2024",
      timeline: "14 weeks",
      team: "5 members",
      impact: "Complete property management solution",
      features: [
        "Property listing and management",
        "Automated rent collection",
        "Tenant screening",
        "Maintenance request system",
        "Financial reporting",
        "Mobile app for tenants"
      ],
      color: "from-blue-600 to-cyan-600",
      image: "🏠",
      link: "#"
    },
    {
      id: 12,
      title: "Inventory & POS Systems",
      description: "Custom ERP and point-of-sale solutions with product tracking, staff accounts, sales reports, and mobile compatibility.",
      longDescription: "A comprehensive business management system that combines inventory management, point-of-sale functionality, and enterprise resource planning in one integrated platform. Designed for retail and wholesale businesses.",
      tech: ["C#", ".NET", "SQL Server", "React", "Mobile App", "Cloud"],
      category: "Web",
      icon: Package,
      status: "Production Ready",
      year: "2023-2024",
      timeline: "20 weeks",
      team: "4 members",
      impact: "Business automation and insights",
      features: [
        "Real-time inventory tracking",
        "Multi-location support",
        "Staff management system",
        "Sales analytics and reporting",
        "Mobile POS application",
        "Cloud synchronization"
      ],
      color: "from-orange-600 to-red-600",
      image: "📦",
      link: "#"
    },
    
    {
      id: 13,
      title: "AgriLink Smart Farming",
      description: "Smart agriculture monitoring with environmental sensors and potential Web3 land ownership system (paused due to regulations).",
      longDescription: "An innovative agricultural technology platform combining IoT sensors for crop monitoring with a Web3-based land ownership verification system. Currently paused due to regulatory considerations.",
      tech: ["IoT Sensors", "Environmental Monitoring", "Web3", "React", "Arduino", "Blockchain"],
      category: "Web3",
      icon: Leaf,
      status: "Paused",
      year: "2023",
      timeline: "18 weeks",
      team: "5 members",
      impact: "Smart farming for Zambian agriculture",
      features: [
        "Soil moisture monitoring",
        "Weather station integration",
        "Crop health analytics",
        "Web3 land registry",
        "Farmer mobile app",
        "Data analytics dashboard"
      ],
      color: "from-emerald-600 to-green-600",
      image: "🌱",
      link: "#"
    },
    {
      id: 14,
      title: "WayFare Bus System",
      description: "Web3-powered bus ticketing system using Motoko for secure and verifiable ticket purchases (discontinued).",
      longDescription: "A blockchain-based public transportation ticketing system designed to provide secure, transparent, and efficient ticket purchasing for bus services. Built on Internet Computer Protocol using Motoko.",
      tech: ["Motoko", "Web3", "Blockchain", "Smart Contracts", "ICP", "React"],
      category: "Web3",
      icon: Bus,
      status: "Discontinued",
      year: "2023",
      timeline: "16 weeks",
      team: "4 members",
      impact: "Blockchain-based transport solution",
      features: [
        "Smart contract ticketing",
        "Immutable transaction records",
        "Mobile ticket validation",
        "Route management",
        "Fare optimization",
        "Real-time tracking"
      ],
      color: "from-yellow-600 to-orange-600",
      image: "🚌",
      link: "#"
    }

  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { value: "15+", label: "Projects Completed", icon: Target },
    { value: "13", label: "Live Websites", icon: Globe },
    { value: "6", label: "Categories", icon: Layers },
    { value: "98%", label: "Success Rate", icon: Trophy }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Award Winner': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Production Ready': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'In Development': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Prototype Complete': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Paused': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Discontinued': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{ left: '10%', top: '20%' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          style={{ right: '10%', top: '40%' }}
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ left: '60%', bottom: '10%' }}
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
            scale: [1, 1.4, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
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
              <Trophy size={24} />
              <span className="font-bold text-lg">Our Works</span>
              <span className="text-blue-300 text-sm font-medium">• Innovation Portfolio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Projects That
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Change Everything
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              From AI-powered mining safety systems to smart mobility solutions and enterprise platforms, 
              explore our portfolio of innovative projects that solve real-world problems.
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

      {/* Filter Section */}
      <section className="relative z-10 py-12 px-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative flex-1 max-w-md"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-blue-500/20 hover:text-blue-300 border border-blue-500/20'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl group relative overflow-hidden"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 bg-gradient-to-r ${project.color} rounded-2xl text-4xl`}>
                        {project.image}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-slate-400">{project.year}</span>
                        </div>
                      </div>
                    </div>
                    
                    {project.link && project.link !== '#' && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink size={24} />
                      </motion.a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-blue-100/90 mb-6 leading-relaxed text-lg">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-900/50 p-3 rounded-lg">
                      <Calendar className="text-blue-400 mb-1" size={16} />
                      <div className="text-xs text-slate-400">Timeline</div>
                      <div className="text-sm text-white font-semibold">{project.timeline}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg">
                      <Users className="text-blue-400 mb-1" size={16} />
                      <div className="text-xs text-slate-400">Team</div>
                      <div className="text-sm text-white font-semibold">{project.team}</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-lg col-span-2 md:col-span-1">
                      <TrendingUp className="text-blue-400 mb-1" size={16} />
                      <div className="text-xs text-slate-400">Impact</div>
                      <div className="text-sm text-white font-semibold">{project.impact}</div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <Star size={16} />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center text-blue-200/80 text-sm"
                        >
                          <CheckCircle size={14} className="text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <Code size={16} />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.link && project.link !== '#' && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ExternalLink size={16} />
                        View Live
                      </motion.a>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border-2 border-blue-400/50 text-blue-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-blue-400 transition-colors"
                    >
                      <Heart size={16} />
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search size={64} className="mx-auto mb-4 text-slate-600" />
              <h3 className="text-2xl font-bold text-slate-400 mb-2">No projects found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Start Your <span className="text-blue-400">Project?</span>
            </h2>
            <p className="text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Let's bring your ideas to life with innovative technology solutions. 
              From concept to deployment, we're here to build something extraordinary.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-blue-500/30"
              >
                <Zap size={24} />
                Start Your Project
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400/50 text-blue-200 px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-xl hover:border-blue-400 transition-colors"
              >
                <Download size={24} />
                Download Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
