'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  Zap,
  Target,
  Users,
  Award,
  Smartphone,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Rocket,
  Lightbulb,
  Shield,
  TrendingUp
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
          timeline: ''
        });
      }, 3000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "info@tanshidigital.com",
      secondary: "Get a response within 24 hours",
      action: "mailto:info@tanshidigital.com",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Phone,
      title: "Call or WhatsApp",
      primary: "+260 571 442 097",
      secondary: "Available Mon-Fri, 8AM-6PM CAT",
      action: "https://wa.me/260571442097",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "Lusaka, Zambia",
      secondary: "Schedule an in-person meeting",
      action: "#",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Globe,
      title: "Website",
      primary: "tanshidigital.com",
      secondary: "Explore our full portfolio",
      action: "https://tanshidigital.com",
      color: "from-orange-600 to-red-600"
    }
  ];

  const services = [
    "Web Development",
    "Mobile App Development", 
    "AI & IoT Solutions",
    "Custom Software",
    "Hardware & Equipment",
    "Digital Transformation",
    "Consultation Only",
    "Other"
  ];

  const budgets = [
    "Under K200",
    "K500 - K1000",
    "K1,500 - K2,500",
    "K3000 - $K5,000",
    "K5,000+",
    "Let's Discuss"
  ];

  const timelines = [
    "ASAP",
    "Within 2 days",
    "2-5 days",
    "1 week",
    "1-3 weeks",
    "1 month",
    "2 months",
    "Not sure"
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/tanshidigital", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const stats = [
    { value: "24hrs", label: "Response Time", icon: Clock },
    { value: "98%", label: "Client Satisfaction", icon: Heart },
    { value: "50+", label: "Projects Delivered", icon: Target },
    { value: "5+", label: "Years Experience", icon: Award }
  ];

  const reasons = [
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "We deliver projects on time, every time, without compromising quality."
    },
    {
      icon: Lightbulb,
      title: "Innovative Solutions",
      description: "Cutting-edge technology solutions that give you a competitive advantage."
    },
    {
      icon: Shield,
      title: "Reliable Support",
      description: "Ongoing support and maintenance to keep your systems running smoothly."
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Track record of successful projects and satisfied clients across Zambia."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          style={{ left: '5%', top: '10%' }}
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          style={{ right: '5%', top: '30%' }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
          style={{ left: '70%', bottom: '20%' }}
          animate={{
            x: [0, -60, 0],
            y: [0, -60, 0],
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
              <MessageSquare size={24} />
              <span className="font-bold text-lg">Get In Touch</span>
              <span className="text-blue-300 text-sm font-medium">• Let's Build Together</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Ready to Transform
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Your Ideas Into Reality?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Whether you need cutting-edge AI solutions, stunning websites, or innovative IoT systems, 
              we're here to bring your vision to life. Let's start the conversation.
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

      {/* Contact Methods */}
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
              Multiple Ways to <span className="text-blue-400">Connect</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              Choose the communication method that works best for you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl group relative overflow-hidden text-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`p-4 bg-gradient-to-r ${method.color} rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon size={32} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{method.title}</h3>
                  <p className="text-blue-100/90 font-semibold mb-2">{method.primary}</p>
                  <p className="text-blue-200/70 text-sm mb-6">{method.secondary}</p>
                  
                  <motion.a
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : '_self'}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${method.color} text-white px-6 py-3 rounded-xl font-semibold shadow-lg`}
                  >
                    Contact Now
                    <ArrowRight size={16} />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-10 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Send className="text-blue-400" size={32} />
                Start Your Project
              </h3>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-300 text-sm font-semibold mb-2">
                        <User size={16} className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-300 text-sm font-semibold mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-300 text-sm font-semibold mb-2">
                        <Building size={16} className="inline mr-2" />
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-300 text-sm font-semibold mb-2">
                        <Smartphone size={16} className="inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                        placeholder="+260 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-300 text-sm font-semibold mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-300 text-sm font-semibold mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                      >
                        <option value="">Select budget range</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-blue-300 text-sm font-semibold mb-2">
                        <Calendar size={16} className="inline mr-2" />
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white focus:outline-none focus:border-blue-400 backdrop-blur-sm"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-blue-300 text-sm font-semibold mb-2">
                      <MessageSquare size={16} className="inline mr-2" />
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 backdrop-blur-sm resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={24} />
                        Send Message
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle size={40} className="text-white" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h4>
                  <p className="text-blue-200/80 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours with a detailed response.
                  </p>
                  <div className="text-sm text-blue-300">
                    Form will reset automatically...
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Star className="text-blue-400" size={32} />
                  Why Choose Tanshi Digital?
                </h3>
                <p className="text-blue-100/80 text-lg leading-relaxed mb-8">
                  We're not just developers—we're your technology partners committed to turning your vision into reality 
                  with innovative solutions that drive real business results.
                </p>
              </div>

              <div className="space-y-6">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <reason.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{reason.title}</h4>
                        <p className="text-blue-200/80 leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-xl font-bold text-white mb-6">Follow Us</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-slate-800/50 border border-blue-500/20 rounded-xl text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all duration-300"
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
              Let's Build Something <span className="text-blue-400">Amazing</span>
            </h2>
            <p className="text-xl text-blue-100/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your next breakthrough is just a conversation away. Whether it's a simple website or a complex AI system, 
              we're here to make it happen.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-blue-500/30"
              >
                <Zap size={24} />
                Start Your Project
                <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/260571442097"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-400/50 text-blue-200 px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-xl hover:border-blue-400 transition-colors"
              >
                <Phone size={24} />
                WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
