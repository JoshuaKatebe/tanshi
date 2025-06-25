'use client'
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Shield, 
  Wind, 
  Lock, 
  Gem, 
  Brain, 
  TrendingUp, 
  Users, 
  Zap, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Play,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  Target,
  Award,
  Cpu,
  Camera,
  Wifi,
  Battery,
  BookOpen,
  Calendar,
  FileText,
  Lightbulb,
  BarChart3,
  Globe
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

const FeatureCard = ({ icon: Icon, title, description, features, color }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br ${color} p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-sm`}
    >
      <div className="flex items-center mb-6">
        <div className="p-3 bg-white/20 rounded-xl mr-4">
          <Icon size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/90 mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center text-white/80"
          >
            <CheckCircle size={16} className="mr-2 text-green-300" />
            {feature}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const StatCard = ({ value, label, icon: Icon, color, suffix = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-r ${color} p-6 rounded-xl text-white text-center shadow-lg`}
    >
      <Icon size={32} className="mx-auto mb-2 opacity-80" />
      <div className="text-3xl font-bold mb-1">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
      <div className="text-sm opacity-90">{label}</div>
    </motion.div>
  );
};

const TimelineItem = ({ phase, month, tasks, status }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 mb-8"
    >
      <div className={`w-4 h-4 rounded-full mt-2 ${status === 'completed' ? 'bg-green-500' : status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2">{phase}</h3>
        <p className="text-blue-400 mb-3">{month}</p>
        <ul className="space-y-1">
          {tasks.map((task, index) => (
            <li key={index} className="text-white/80 text-sm flex items-center gap-2">
              <CheckCircle size={12} className={status === 'completed' ? 'text-green-400' : 'text-gray-400'} />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const MineGuard360Website = () => {
  const [activeModule, setActiveModule] = useState(0);
  
  const modules = [
    {
      icon: Shield,
      title: "Advanced Safety Intelligence",
      description: "Real-time PPE detection, multi-gas monitoring, worker vitals tracking, and emergency response automation.",
      features: [
        "YOLOv11 PPE Detection (94% accuracy)",
        "Multi-gas monitoring (CO, CO₂, CH₄, H₂S)",
        "Worker fatigue & activity detection",
        "Dynamic emergency evacuation routing"
      ],
      color: "from-red-600 to-red-800"
    },
    {
      icon: Wind,
      title: "Smart Ventilation Control",
      description: "AI-driven airflow optimization based on personnel count, equipment activity, and real-time air quality.",
      features: [
        "Computer vision personnel counting",
        "Equipment vibration monitoring",
        "45% energy savings achieved",
        "Predictive fan maintenance alerts"
      ],
      color: "from-blue-600 to-blue-800"
    },
    {
      icon: Lock,
      title: "Intelligent Security System",
      description: "Computer vision perimeter protection with facial recognition, threat classification, and automated response.",
      features: [
        "Facial recognition against employee DB",
        "Vehicle intrusion & license plate detection",
        "Suspicious behavior analysis",
        "Wildlife & environmental threat detection"
      ],
      color: "from-purple-600 to-purple-800"
    },
    {
      icon: Gem,
      title: "Automated Quality Control",
      description: "Machine learning mineral sorting with spectral analysis for copper, cobalt identification and impurity detection.",
      features: [
        "Copper & cobalt ore identification",
        "Pneumatic automated sorting system",
        "Reduce impurities from 12% to <3%",
        "15% increase in copper concentrate grade"
      ],
      color: "from-green-600 to-green-800"
    },
    {
      icon: Brain,
      title: "Central Intelligence Hub",
      description: "NVIDIA Jetson-powered edge computing platform with offline capability and predictive analytics engine.",
      features: [
        "NVIDIA Jetson Nano/Xavier processing",
        "1TB SSD + 256GB local storage",
        "4G/5G + LoRaWAN communication",
        "24V battery backup system"
      ],
      color: "from-orange-600 to-orange-800"
    }
  ];

  const stats = [
    { value: 4000, label: "Annual Savings (K ZMW)", icon: DollarSign, color: "from-green-500 to-green-600", suffix: "k" },
    { value: 94, label: "AI Detection Accuracy", icon: Target, color: "from-blue-500 to-blue-600", suffix: "%" },
    { value: 45, label: "Energy Savings", icon: Zap, color: "from-yellow-500 to-yellow-600", suffix: "%" },
    { value: 80, label: "Fatality Reduction Target", icon: Shield, color: "from-red-500 to-red-600", suffix: "%" }
  ];

  const implementationPhases = [
    {
      phase: "Phase 1: Core Safety System",
      month: "Month 1-2",
      tasks: [
        "PPE detection model training (YOLOv11)",
        "ESP32 sensor network prototyping", 
        "Basic alert system implementation",
        "Field testing in controlled environment"
      ],
      status: "completed"
    },
    {
      phase: "Phase 2: Smart Ventilation", 
      month: "Month 2-3",
      tasks: [
        "Personnel counting system integration",
        "Fan control automation",
        "Energy optimization algorithms", 
        "Pilot installation at test site"
      ],
      status: "in-progress"
    },
    {
      phase: "Phase 3: Security & Quality Control",
      month: "Month 3-4", 
      tasks: [
        "Security camera network setup",
        "Mineral sorting system development",
        "Threat detection model training",
        "Integration testing"
      ],
      status: "planned"
    },
    {
      phase: "Phase 4: Full System Integration",
      month: "Month 4-5",
      tasks: [
        "Central hub deployment",
        "Dashboard development", 
        "Data analytics implementation",
        "Comprehensive system testing"
      ],
      status: "planned"
    },
    {
      phase: "Phase 5: Commercial Deployment",
      month: "Month 5-6",
      tasks: [
        "Partner mine pilot program",
        "System optimization based on feedback",
        "Scaling and production planning", 
        "Regulatory compliance certification"
      ],
      status: "planned"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white mb-8 border border-white/20"
            >
              <Shield size={20} />
              <span className="font-semibold">MineGuard 360</span>
              <span className="text-sm opacity-80">by Tanshi Digital Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Complete AI + IoT
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Intelligence Platform
              </span>
              <span className="block text-3xl md:text-4xl text-white/80 mt-4">
                for Modern Mining
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionizing Zambian mining through real-time intelligence. 
              Preventing accidents, optimizing operations, maximizing profitability, 
              and ensuring quality with cutting-edge AI and IoT technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="/MineGuard_360.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-xl"
              >
                <FileText size={20} />
                Download Brochure
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Proven Impact for Zambian Mining</h2>
            <p className="text-white/70 text-lg">Real results, measurable improvements</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement - Updated with Correct Data */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Zambian Mining in 
                <span className="text-red-400"> Crisis</span>
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                2024 has been devastating for Zambian mining safety, with a shocking 
                128% increase in fatalities compared to 2023.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: AlertTriangle, text: "98 reported mining accidents in 2024", color: "text-red-400" },
                  { icon: AlertTriangle, text: "31 fatalities (up from 19 in 2023)", color: "text-red-500" },
                  { icon: DollarSign, text: "K21,880 cost per fatal accident", color: "text-yellow-400" },
                  { icon: TrendingUp, text: "K500,000 regulatory fines per incident", color: "text-orange-400" },
                  { icon: Eye, text: "K5 million annual losses for mid-sized mines", color: "text-blue-400" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <item.icon size={24} className={item.color} />
                    <span className="text-white/90">{item.text}</span>
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
              <div className="bg-gradient-to-br from-red-600/20 to-yellow-600/20 p-8 rounded-2xl border border-red-500/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Recent Tragedies (2024)</h3>
                <div className="space-y-4">
                  {[
                    "8 killed in Chingola mine collapse (Oct 2024)",
                    "10 killed in Mumbwa mining incident (Oct 2024)", 
                    "9 killed in Lusaka mining accident (Aug 2024)",
                    "40% PPE non-compliance rate across sites",
                    "5+ minute delays in gas leak detection",
                    "30% energy waste from manual ventilation"
                  ].map((incident, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="text-white/80">{incident}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Complete Mining Intelligence Ecosystem</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Five integrated modules working together to create the smartest, safest, and most profitable mining operation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureCard {...module} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Implementation Roadmap</h2>
            <p className="text-white/70 text-lg">From prototype to full deployment in 6 months</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="border-l-2 border-white/20 pl-8 relative">
              {implementationPhases.map((phase, index) => (
                <TimelineItem key={index} {...phase} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section - Updated with Correct ZMW Values */}
      <section className="py-20 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                K<AnimatedCounter end={4000} />k+ Annual Savings
                <span className="block text-2xl text-green-400 mt-2">80% cost reduction per incident</span>
              </h2>
              <p className="text-white/80 text-lg mb-8">
                MineGuard 360 transforms mining economics by preventing costly incidents, 
                reducing energy waste, and improving operational efficiency across all systems.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Financial Impact (ZMW)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-white/80">
                    <span>Before MineGuard 360:</span>
                    <span className="font-semibold text-red-400">K5,000,000/year</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>With MineGuard 360:</span>
                    <span className="font-semibold text-green-400">K1,000,000/year</span>
                  </div>
                  <div className="flex justify-between text-white/80 border-t border-white/20 pt-3">
                    <span className="font-bold">Annual Savings:</span>
                    <span className="font-bold text-green-400">K4,000,000</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Fatal Accident Cost", before: "K21,880", after: "Prevented", savings: "K21,880" },
                { label: "Regulatory Fines", before: "K500,000", after: "Prevented", savings: "K500,000" },
                { label: "Incident Costs (10/year)", before: "K5,000,000", after: "K1,000,000", savings: "K4,000,000" },
                { label: "Energy Efficiency", before: "30% waste", after: "45% savings", savings: "K400,000" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                >
                  <h4 className="font-semibold text-white mb-2">{item.label}</h4>
                  <div className="text-sm text-white/70 mb-1">Before: {item.before}</div>
                  <div className="text-sm text-white/70 mb-2">After: {item.after}</div>
                  <div className="text-green-400 font-bold">{item.savings}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - Updated with Correct Information */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Meet the Innovators</h2>
            <p className="text-white/70 text-lg mb-4">Tanshi Digital Solutions - Building the future of African mining</p>
            <p className="text-white/60">3rd Year Computer Science Engineers, DMI St. Eugene University</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Joshua Katebe",
                role: "CEO & Lead Developer",
                expertise: "Backend & AI Development",
                id: "23211055004",
                focus: "System architecture and AI model development",

                skills: ["YOLOv11", "Machine Learning", "Python", "Backend Systems"],
                image: "/josh.png"
              },
              {
                name: "Bwalya Musunka Lampi", 
                role: "COO & Frontend Lead",
                expertise: "Frontend & Mobile App Development",
                id: "23211055011",
                focus: "Dashboard design and user experience",
                skills: ["React", "UI/UX Design", "Mobile Development", "Data Visualization"],
                image: "/bwalya.png"
              },
              {
                name: "Steward Changala",
                role: "CTO & Hardware Specialist", 
                expertise: "IoT & Embedded Systems",
                id: "24213055038",
                focus: "Sensor networks and hardware integration",
                skills: ["ESP32", "MicroPython", "IoT Sensors", "Hardware Design"],
                image: "/steward.png"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-xl border border-white/10 shadow-xl"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-2">{member.name}</h3>
                <p className="text-blue-400 text-center mb-2">{member.role}</p>
                <p className="text-white/70 text-sm text-center mb-2">Student ID: {member.id}</p>
                <p className="text-white/60 text-sm text-center mb-4">{member.expertise}</p>
                <p className="text-white/80 text-sm text-center mb-4">{member.focus}</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Student Advantage Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-6">Why Our Student Team Excels</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: "Fresh Energy", desc: "Rapid solutions and iterative improvements" },
                { icon: Brain, title: "Cutting-Edge Learning", desc: "Latest in YOLOv11, IoT, and edge computing" },
                { icon: Globe, title: "Local Insight", desc: "Understanding Zambian mining conditions" },
                { icon: Users, title: "Collaborative Spirit", desc: "Ready to partner with industry leaders" }
              ].map((advantage, index) => (
                <div key={index} className="text-center">
                  <advantage.icon size={32} className="mx-auto mb-3 text-blue-400" />
                  <h4 className="font-semibold text-white mb-2">{advantage.title}</h4>
                  <p className="text-white/70 text-sm">{advantage.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Enterprise-Grade Technology Stack</h2>
            <p className="text-white/70 text-lg">Built for harsh mining environments with proven reliability</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cpu, title: "NVIDIA Jetson Nano/Xavier", desc: "Edge AI Processing", color: "from-green-500 to-green-600" },
              { icon: Camera, title: "YOLOv11 Custom Models", desc: "94% Detection Accuracy", color: "from-blue-500 to-blue-600" },
              { icon: Wifi, title: "ESP32 IoT Network", desc: "Sensor Coordination", color: "from-purple-500 to-purple-600" },
              { icon: Battery, title: "24V Backup Power", desc: "Uninterrupted Operation", color: "from-orange-500 to-orange-600" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${tech.color} p-6 rounded-xl text-white text-center shadow-lg`}
              >
                <tech.icon size={48} className="mx-auto mb-4 opacity-90" />
                <h3 className="text-lg font-bold mb-2">{tech.title}</h3>
                <p className="opacity-90 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Updated with Correct Information */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Transform Your Mine?</h2>
            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
              Join the mining revolution. Let's build the future of mining together — where technology saves lives.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: Mail, text: "joshuakatebe15@gmail.com", label: "Email" },
                { icon: Phone, text: "+260 977 487 852", label: "Phone" },
                { icon: MapPin, text: "9 miles Lusaka, Zambia", label: "Location" }
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center"
                >
                  <contact.icon size={32} className="mx-auto mb-3 text-blue-400" />
                  <h3 className="font-semibold text-white mb-2">{contact.label}</h3>
                  <p className="text-white/80">{contact.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/MineGuard_360.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center gap-2"
              >
                <FileText size={20} />
                Download Brochure
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <p className="text-white/60 mb-2">University Partnership</p>
              <p className="text-white/80 font-semibold">DMI St. Eugene University</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Shield size={24} className="text-blue-400" />
              <span className="text-xl font-bold text-white">MineGuard 360</span>
            </motion.div>
            <p className="text-white/60 mb-2">Smart. Safe. Profitable.</p>
            <p className="text-white/60 mb-4">Built by Tanshi Digital Solutions</p>
            <p className="text-white/40 text-sm">
              © 2025 Tanshi Digital Solutions. Building the future of African mining technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MineGuard360Website;
