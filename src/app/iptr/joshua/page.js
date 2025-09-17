'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Code, Database, Globe, Monitor, Zap, Target, Eye, Heart, TrendingUp, AlertTriangle, CheckCircle, XCircle, ArrowRight, User, Award, Building, Calendar, Users, Settings, Lightbulb, BookOpen, Star } from 'lucide-react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

const FloatingCard = ({ children, delay = 0, className = "" }) => (
  <div 
    className={`transform transition-all duration-1000 ease-out ${className}`}
    style={{
      animation: `floatUp 0.8s ease-out ${delay}s both, float 6s ease-in-out infinite`
    }}
  >
    {children}
  </div>
);

const TypewriterText = ({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span className={className}>{displayText}</span>;
};

const PresentationSlide = ({ children, className = "" }) => (
  <div className={`min-h-screen flex items-center justify-center p-8 relative z-10 ${className}`}>
    <div className="max-w-7xl w-full">
      {children}
    </div>
  </div>
);

const slides = [
  // Slide 1: DMI ST.EUGENE UNIVERSITY IPTR Presentation
  {
    id: 1,
    component: () => (
      <PresentationSlide className="text-center">
        <div className="space-y-8">
          <FloatingCard delay={0.2}>
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/dmiLogo.png" alt="DMI Logo" className="h-22 w-auto" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                DMI ST.EUGENE UNIVERSITY
              </h1>
              <p className="text-2xl text-blue-200">Chibombo - Zambia</p>
            </div>
          </FloatingCard>
          
          <FloatingCard delay={0.6} className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6">
              <TypewriterText text="Industrial Practical Training Report" delay={500} />
            </h2>
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl text-purple-200">Devenergia</p>
                <p className="text-lg text-blue-200">June 16 - August 15, 2025</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 2: Student Details
  {
    id: 2,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Student Details</h2>
        </FloatingCard>
        
        <div className="max-w-4xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-blue-300/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">Student Name</h3>
                    <p className="text-2xl text-white font-bold">Joshua Katebe</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">Course</h3>
                    <p className="text-xl text-white">Bachelor of Engineering</p>
                    <p className="text-lg text-blue-200">Computer Science</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">Register Number</h3>
                    <p className="text-2xl text-white font-bold">23211055004</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">Semester</h3>
                    <p className="text-xl text-white">VI</p>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 3: Declaration
  {
    id: 3,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Declaration</h2>
        </FloatingCard>
        
        <div className="max-w-5xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl p-12 border border-green-300/30">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <p className="text-lg text-green-100 leading-relaxed text-center">
                  "I Joshua Katebe hereby declare that this IPTR submitted to DMI ST. EUGENE UNIVERSITY in the partial fulfillment of requirements for the award of the degree of Bachelor of Science in Computer Science is a record of the original work done by me under the supervision of Mr. ERICK NJEKWA"
                </p>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-green-300 font-semibold">Student</p>
                    <p className="text-white text-lg">Joshua Katebe</p>
                    <p className="text-green-200">Register: 23211055004</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-300 font-semibold">Supervisor</p>
                    <p className="text-white text-lg">Mr. Erick Njekwa</p>
                    <p className="text-green-200">Devenergia</p>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 4: Acknowledgement
  {
    id: 4,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Acknowledgement</h2>
        </FloatingCard>
        
        <div className="max-w-6xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-10 border border-purple-300/30">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">University Leadership</h3>
                    <ul className="text-purple-100 space-y-1">
                      <li>• Rev. Fr. Dr. J.E. Arul Raj, OMI - Founder & Chancellor</li>
                      <li>• Dr. T.X.A. Ananth - President, University Council</li>
                      <li>• Prof. Douglas Kunda - Vice Chancellor</li>
                      <li>• Dr. Arockia Venice - Deputy Vice Chancellor</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Academic Support</h3>
                    <ul className="text-purple-100 space-y-1">
                      <li>• Dr. J. Esther - Dean, School of Computer Science</li>
                      <li>• Mrs. Vijayalakshmi - Head of Department</li>
                      <li>• Mr. Patrick Mwenya - Class Advisor</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-pink-300 mb-4 text-center">Gratitude</h3>
                  <p className="text-pink-100 leading-relaxed text-center">
                    Special thanks to Almighty God for His abundant blessings and guidance throughout this journey. Grateful for the unwavering support from the DMI Group of Institutions and all faculty members who contributed to the successful completion of this industrial practical training.
                  </p>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 5: Introduction
  {
    id: 5,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Introduction</h2>
        </FloatingCard>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-8 border border-blue-300/30">
              <div className="flex items-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Training Overview</h3>
              </div>
              <div className="space-y-4 text-blue-100">
                <p>10-week Industrial Practical Training at Devenergia, a subsidiary of Innovate General Insurance specializing in software development and IT solutions.</p>
                <p>Comprehensive exposure to full-stack development, transitioning from backend to complete software engineering responsibilities.</p>
                <p>Practical experience with modern web development technologies and professional software development practices.</p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.6}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl p-8 border border-purple-300/30">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Training Period</h3>
              </div>
              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-purple-300 font-semibold">Duration</p>
                  <p className="text-white text-lg">June 16 - August 15, 2025</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <p className="text-purple-300 font-semibold">Focus Areas</p>
                  <p className="text-white">ASP.NET Backend Development</p>
                  <p className="text-white">Next.js Frontend Development</p>
                  <p className="text-white">Full-Stack Integration</p>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 6: Objectives
  {
    id: 6,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">IPTR Objectives</h2>
        </FloatingCard>
        
        <div className="max-w-5xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-10 border border-orange-300/30">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Enable students to learn social responsibility",
                  "Learn from people's experience and create empowering facilities",
                  "Increase civic and citizenship awareness and skills",
                  "Provide cross-cultural experiences for students",
                  "Better prepare students for career/continuing education"
                ].map((objective, index) => (
                  <div key={index} className="flex items-start p-6 bg-white/10 rounded-2xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-orange-100 leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 7: Organization Mission & Vision
  {
    id: 7,
    component: () => (
      <PresentationSlide>
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">Organization Mission & Vision</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <FloatingCard delay={0.3} className="group">
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-10 border border-blue-300/30 transform transition-all duration-500 group-hover:scale-105 h-full">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Mission</h3>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-lg text-blue-100 leading-relaxed">
                  To deliver innovative software solutions that empower businesses to achieve their digital transformation goals while maintaining the highest standards of security, reliability, and user experience.
                </p>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.6} className="group">
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-10 border border-purple-300/30 transform transition-all duration-500 group-hover:scale-105 h-full">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Vision</h3>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <p className="text-lg text-purple-100 leading-relaxed">
                  To become a leading technology partner in the region, recognized for excellence in software development, innovation in digital solutions, and commitment to client success.
                </p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 8: Organization Strategies
  {
    id: 8,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Organization Strategies</h2>
        </FloatingCard>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-300/30">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Strategic Focus Areas</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Diversification', desc: 'Expanding beyond internal IT to serve external markets' },
                  { title: 'Innovation', desc: 'Developing original products alongside client services' },
                  { title: 'Technology Excellence', desc: 'Maintaining cutting-edge development capabilities' },
                  { title: 'Hybrid Operations', desc: 'Flexible work arrangements to attract top talent' }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <h4 className="text-green-300 font-semibold mb-1">{item.title}</h4>
                    <p className="text-green-100 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.6}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl p-8 border border-blue-300/30">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Key Objectives</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Establish strong market presence in custom software development',
                  'Build portfolio of proprietary products',
                  'Maintain seamless IT operations for parent company',
                  'Develop skilled, adaptable workforce',
                  'Create sustainable revenue streams'
                ].map((objective, index) => (
                  <div key={index} className="flex items-start p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100 text-sm">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 9: Organization Chart
  {
    id: 9,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Organization Structure</h2>
        </FloatingCard>
        
        <div className="max-w-6xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-10 border border-purple-300/30">
              <div className="flex flex-col items-center space-y-8">
                {/* Parent Company */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Innovate General Insurance</h3>
                  <p className="text-purple-200">Parent Company</p>
                </div>

                {/* Connection Line */}
                <div className="w-px h-12 bg-gradient-to-b from-purple-400 to-blue-400"></div>

                {/* Subsidiary */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Devenergia</h3>
                  <p className="text-green-200">Software Development Subsidiary</p>
                  <p className="text-sm text-gray-300 mt-2">Established 2022</p>
                </div>

                {/* Services */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
                    <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">External Services</h4>
                    <p className="text-sm text-gray-300">Custom software development for clients</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
                    <Monitor className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">Internal IT</h4>
                    <p className="text-sm text-gray-300">IT infrastructure management</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
                    <Lightbulb className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">Innovation</h4>
                    <p className="text-sm text-gray-300">Original product development</p>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 10: Working Conditions
  {
    id: 10,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Working Conditions</h2>
        </FloatingCard>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl p-8 border border-indigo-300/30">
              <div className="flex items-center mb-6">
                <Monitor className="w-8 h-8 text-indigo-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Work Environment</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-indigo-300 font-semibold mb-2">Hybrid Model</h4>
                  <p className="text-indigo-100">50% remote work, 50% office-based</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-indigo-300 font-semibold mb-2">Flexibility</h4>
                  <p className="text-indigo-100">Flexible scheduling promoting work-life balance</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-indigo-300 font-semibold mb-2">Facilities</h4>
                  <p className="text-indigo-100">Modern office with necessary development tools</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.6}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl p-8 border border-green-300/30">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Professional Development</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-100">Regular progress meetings</span>
                </div>
                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-100">Open communication channels</span>
                </div>
                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-100">Mentorship with senior developers</span>
                </div>
                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-100">Cross-functional collaboration</span>
                </div>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Continue with remaining slides...
  // Slide 11: SWOT Analysis
  {
    id: 11,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">SWOT Analysis</h2>
        </FloatingCard>
        
        <div className="grid grid-cols-2 gap-6">
          <FloatingCard delay={0.2}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-6 border border-green-300/30 h-full">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Strengths</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-100">
                <li>• Emerging market agility</li>
                <li>• Diverse service portfolio</li>
                <li>• Modern technology stack</li>
                <li>• Flexible work culture</li>
                <li>• Financial backing from parent company</li>
              </ul>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.4}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-3xl p-6 border border-red-300/30 h-full">
              <div className="flex items-center mb-4">
                <XCircle className="w-6 h-6 text-red-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Weaknesses</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-100">
                <li>• Limited market recognition</li>
                <li>• Small team size</li>
                <li>• Dependency on parent company</li>
                <li>• Resource allocation challenges</li>
              </ul>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.6}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-6 border border-blue-300/30 h-full">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Opportunities</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Growing digital transformation market</li>
                <li>• Insurance technology integration</li>
                <li>• Regional expansion potential</li>
                <li>• Product development opportunities</li>
              </ul>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.8}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl p-6 border border-yellow-300/30 h-full">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mr-2" />
                <h3 className="text-xl font-bold text-white">Threats</h3>
              </div>
              <ul className="space-y-2 text-sm text-yellow-100">
                <li>• Established competition</li>
                <li>• Rapid technology evolution</li>
                <li>• Economic fluctuations</li>
                <li>• Talent retention challenges</li>
              </ul>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 12: Learning Outcomes
  {
    id: 12,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Learning Outcomes</h2>
        </FloatingCard>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl p-8 border border-purple-300/30 h-full">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-purple-300 font-semibold mb-2">Backend Development</h4>
                  <p className="text-purple-100 text-sm">ASP.NET, API development, database management</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-purple-300 font-semibold mb-2">Frontend Development</h4>
                  <p className="text-purple-100 text-sm">Next.js, Tailwind CSS, responsive design</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <h4 className="text-purple-300 font-semibold mb-2">Full-Stack Integration</h4>
                  <p className="text-purple-100 text-sm">End-to-end application development</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.6}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl p-8 border border-green-300/30 h-full">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Professional Skills</h3>
              </div>
              <div className="space-y-4">
                {[
                  'Adaptability and flexibility',
                  'Communication and collaboration',
                  'Project management',
                  'Problem-solving techniques',
                  'Time management'
                ].map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-green-100 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>

          <FloatingCard delay={0.9}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl p-8 border border-blue-300/30 h-full">
              <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Industry Insights</h3>
              </div>
              <div className="space-y-4 text-blue-100 text-sm">
                <p>Understanding of software development in the insurance industry context</p>
                <p>Exposure to client service delivery and project management</p>
                <p>Insight into challenges of technology startups</p>
                <p>Appreciation for continuous learning in technology careers</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 13: Conclusion
  {
    id: 13,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Conclusion</h2>
        </FloatingCard>
        
        <div className="max-w-5xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-300/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Key Achievements</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">Technical Growth</h4>
                    <p className="text-purple-100">Successfully transitioned from backend specialist to full-stack developer, mastering ASP.NET, Next.js, and Tailwind CSS</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">Professional Development</h4>
                    <p className="text-purple-100">Enhanced adaptability, communication, and collaborative problem-solving skills in a hybrid work environment</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-pink-300 mb-3">Industry Insights</h4>
                    <p className="text-pink-100">Gained valuable understanding of software development in the insurance sector and startup dynamics</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-pink-300 mb-3">Future Preparation</h4>
                    <p className="text-pink-100">Built solid foundation for future career development in software engineering with comprehensive full-stack experience</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg text-white italic">
                  "This internship experience has not only provided technical and professional development but has also reinforced the exciting potential of a career in software development."
                </p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 14: Recomendations
  {
    id: 14,
    component: () => (
      <PresentationSlide>
        <FloatingCard>
          <h2 className="text-5xl font-bold text-center mb-12 text-white">Recomendations</h2>
        </FloatingCard>
        
        <div className="max-w-5xl mx-auto">
          <FloatingCard delay={0.3}>
            <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-300/30">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Points to note</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">Updated Syllabus</h4>
                    <p className="text-purple-100">The DMI and other stake holders should update the Syllabus as current information being taught is out of date</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-purple-300 mb-3">Getting with the Times</h4>
                    <p className="text-purple-100">Most frameworks, tools and technologies we are told to use are deprecated or obsolete and needs updating</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-pink-300 mb-3">Adoption of industry standards</h4>
                    <p className="text-pink-100">The use of industry standard practices, tools and frameworks such as ASP.NET, Next.js, and Devops should be encouraged</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-pink-300 mb-3">Need for practice</h4>
                    <p className="text-pink-100">DMI needs to learn towards more practical knowledge of theory as student leave school and don't know how to apply themselves</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg text-white italic">
                  "This internship experience has not only provided technical and professional development but has also reinforced the exciting potential of a career in software development."
                </p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  },

  // Slide 15: Thank You
  {
    id: 15,
    component: () => (
      <PresentationSlide className="text-center">
        <div className="space-y-8">
          <FloatingCard delay={0.2}>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-8">
              <TypewriterText text="Thank You" delay={500} />
            </h1>
          </FloatingCard>
          
          <FloatingCard delay={0.6} className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-3xl font-bold text-white">Joshua Katebe</h2>
                <p className="text-xl text-purple-200">Register: 23211055004</p>
                <p className="text-lg text-blue-200">Computer Science Engineering</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Supervisor</h3>
                <p className="text-white">Mr. Erick Njekwa</p>
                <p className="text-purple-200 text-sm">Devenergia</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Institution</h3>
                <p className="text-white">DMI ST.EUGENE UNIVERSITY</p>
                <p className="text-blue-200 text-sm">Chibombo, Zambia</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-lg text-gray-300">Questions & Discussion</p>
            </div>
          </FloatingCard>
        </div>
      </PresentationSlide>
    )
  }
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      <style jsx>{`
        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
      
      {/* Slide Counter */}
      <div className="fixed top-8 right-8 z-50 backdrop-blur-xl bg-white/10 rounded-full px-6 py-3 border border-white/20">
        <span className="text-white font-semibold">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg shadow-white/50' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        {slides[currentSlide]?.component()}
      </div>
    </div>
  );
};

export default Presentation;
