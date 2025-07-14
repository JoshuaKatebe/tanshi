'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Heart, Crown, Star, Sparkles, Gift, Camera, MapPin, Calendar, Clock, Phone, Mail } from 'lucide-react';

const WeddingFlyer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isCard1Flipped, setIsCard1Flipped] = useState(false);
  const [isCard2Flipped, setIsCard2Flipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const finalMessageRef = useRef(null);

  const weddingQuotes = useMemo(() => [
    "Two souls, one heart, forever intertwined",
    "Love is the bridge between two hearts",
    "In your arms, I found my home",
    "Together we create our own fairy tale",
    "Forever begins with 'I Do'"
  ], []);

  const finalMessage = "Join us as we say 'I Do' ✨";

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 25,
        y: (e.clientY - window.innerHeight / 2) / 25
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced heart confetti effect
  const triggerHearts = () => {
    setShowHearts(true);
    const heartEmojis = ['💕', '💖', '💝', '💗', '💓', '🌹', '✨'];
    
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (15 + Math.random() * 15) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.filter = 'drop-shadow(0 0 8px rgba(255,182,193,0.8))';
        heart.style.animation = `heartFall ${4 + Math.random() * 3}s ease-out forwards`;
        
        if (!document.querySelector('#heart-style')) {
          const style = document.createElement('style');
          style.id = 'heart-style';
          style.textContent = `
            @keyframes heartFall {
              0% { 
                transform: translateY(-100vh) rotate(0deg) scale(0.8); 
                opacity: 1; 
              }
              20% { 
                transform: translateY(-80vh) rotate(72deg) scale(1.2); 
                opacity: 1; 
              }
              100% { 
                transform: translateY(100vh) rotate(360deg) scale(0.5); 
                opacity: 0; 
              }
            }
          `;
          document.head.appendChild(style);
        }
        
        document.body.appendChild(heart);
        setTimeout(() => {
          if (document.body.contains(heart)) {
            document.body.removeChild(heart);
          }
        }, 7000);
      }, i * 50);
    }
  };

  // Enhanced typing effect
  useEffect(() => {
    if (isVisible && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const type = () => {
        if (index < finalMessage.length) {
          setTypedText(finalMessage.slice(0, index + 1));
          index++;
          setTimeout(type, 100);
        } else {
          setTimeout(() => {
            triggerHearts();
          }, 800);
        }
      };
      setTimeout(type, 2500);
    }
  }, [isVisible, finalMessage, isTyping]);

  // Animation intervals
  useEffect(() => {
    setIsVisible(true);
    
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % weddingQuotes.length);
    }, 5000);

    const cardFlipInterval1 = setInterval(() => {
      setIsCard1Flipped((prev) => !prev);
    }, 7000);

    const cardFlipInterval2 = setInterval(() => {
      setIsCard2Flipped((prev) => !prev);
    }, 9000);

    return () => { 
      clearInterval(quoteInterval); 
      clearInterval(cardFlipInterval1); 
      clearInterval(cardFlipInterval2); 
    };
  }, [weddingQuotes.length]);

  // Enhanced floating particles with romantic colors
  const particles = Array.from({ length: 25 }, (_, i) => (
    <div
      key={i}
      className="absolute rounded-full opacity-40 blur-sm"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${4 + Math.random() * 8}px`,
        height: `${4 + Math.random() * 8}px`,
        background: ['#ffb3d6', '#ffc3e0', '#ffe5f2', '#f8d7da', '#ffeaa7'][Math.floor(Math.random() * 5)],
        animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 3}s`,
        transform: `translate(${mousePosition.x * (i % 3)}px, ${mousePosition.y * (i % 3)}px)`
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 overflow-x-hidden relative">
      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,182,193,0.5); }
          50% { box-shadow: 0 0 40px rgba(255,182,193,0.8); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
        .animate-delay-600 { animation-delay: 0.6s; }
        .animate-delay-700 { animation-delay: 0.7s; }
        .animate-delay-800 { animation-delay: 0.8s; }
        .animate-delay-900 { animation-delay: 0.9s; }
        .animate-delay-1000 { animation-delay: 1.0s; }
        .animate-delay-1100 { animation-delay: 1.1s; }
        .animate-delay-1200 { animation-delay: 1.2s; }
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(255,182,193,0.8);
        }
        .backdrop-blur-romantic {
          backdrop-filter: blur(12px) saturate(150%);
        }
        .gradient-romantic {
          background: linear-gradient(135deg, 
            rgba(255,182,193,0.2) 0%, 
            rgba(255,218,185,0.2) 25%, 
            rgba(255,240,245,0.2) 50%, 
            rgba(255,182,193,0.2) 75%, 
            rgba(255,218,185,0.2) 100%);
        }
      `}</style>

      {/* Enhanced Background with Romantic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/90 via-pink-900/90 to-purple-900/90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,182,193,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,218,185,0.3),transparent_50%)]"></div>

      {/* Enhanced Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles}
        
        {/* Enhanced floating decorative elements */}
        <div className="absolute top-10 left-4 md:left-10 text-pink-300 opacity-60 animate-pulse" 
             style={{transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`}}>
          <Sparkles size={28} />
        </div>
        <div className="absolute top-32 right-8 md:right-16 text-rose-300 opacity-70 animate-heartbeat" 
             style={{transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`}}>
          <Heart size={24} fill="currentColor" />
        </div>
        <div className="absolute bottom-32 left-4 md:left-8 text-pink-300 opacity-60 animate-pulse" 
             style={{transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`}}>
          <Star size={32} />
        </div>
        <div className="absolute top-1/2 left-1/2 text-rose-300 opacity-40 animate-pulse" 
             style={{transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`}}>
          <Sparkles size={26} />
        </div>
        <div className="absolute bottom-1/3 right-8 md:right-12 text-pink-300 opacity-60 animate-heartbeat" 
             style={{transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`}}>
          <Heart size={30} fill="currentColor" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 md:px-6 py-8 max-w-6xl mx-auto">
        {/* Enhanced Header Section */}
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <Heart className="text-rose-400 animate-heartbeat text-shadow-glow" size={36} fill="currentColor" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent text-shadow-glow">
              You're Invited
            </h1>
            <Heart className="text-rose-400 animate-heartbeat text-shadow-glow" size={36} fill="currentColor" />
          </div>
          
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif text-shadow-glow">
              To Our Wedding
            </h2>
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-pink-300 animate-bounce">
              <Sparkles size={28} />
            </div>
          </div>
        </div>

        {/* Enhanced Bride & Groom Names */}
        <div className={`text-center mb-12 md:mb-16 px-2 ${isVisible ? 'animate-fadeInUp animate-delay-200' : 'opacity-0'}`}>
          <div className="gradient-romantic backdrop-blur-romantic rounded-3xl p-6 md:p-8 border border-pink-300/30 shadow-2xl relative animate-glow">
            <div className="absolute top-4 left-4 text-pink-300/50 text-4xl md:text-6xl font-serif">"</div>
            <div className="absolute bottom-4 right-4 text-pink-300/50 text-4xl md:text-6xl font-serif rotate-180">"</div>
            
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
              <div className="text-2xl md:text-3xl animate-heartbeat">💕</div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-rose-300 to-transparent"></div>
            </div>
            
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif text-shadow-glow">
              [Bride Name] & [Groom Name]
            </h3>
            <p className="text-lg md:text-xl text-rose-100 leading-relaxed">
              Together with their families, request the honor of your presence
            </p>
            
            <div className="mt-6 flex justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Couple Photo */}
        <div className={`flex justify-center mb-12 md:mb-16 ${isVisible ? 'animate-fadeInUp animate-delay-400' : 'opacity-0'}`}>
          <div className="relative">
            <div className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 text-pink-400 z-10 animate-bounce">
              <Crown size={44} />
            </div>
            
            <div className="relative group hover:scale-105 transition-all duration-500">
              <div className="absolute -inset-6 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              <div className="absolute -inset-3 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl opacity-80"></div>
              
              <div className="relative w-72 h-96 md:w-80 md:h-[28rem] bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl p-3 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-medium">
                  <div className="text-center">
                    <Camera size={56} className="mx-auto mb-3 text-gray-400" />
                    <p className="text-lg">Couple Photo Here</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                <p className="text-pink-200 font-serif italic text-sm md:text-base">
                  "Two hearts becoming one"
                </p>
              </div>
              
              <div className="absolute -top-3 -right-3 text-pink-300 animate-pulse">
                <Sparkles size={32} />
              </div>
              <div className="absolute -bottom-3 -left-3 text-rose-300 animate-heartbeat">
                <Heart size={28} fill="currentColor" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Wedding Details Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 px-2 ${isVisible ? 'animate-fadeInUp animate-delay-600' : 'opacity-0'}`}>
          {/* Enhanced Date & Time Card */}
          <div className="relative h-56 md:h-52 cursor-pointer group" style={{ perspective: 1000 }}>
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-700 hover:duration-300"
              style={{ 
                transformStyle: "preserve-3d",
                transform: isCard1Flipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}
            >
              {/* Enhanced Front */}
              <div className="absolute inset-0 gradient-romantic backdrop-blur-romantic rounded-2xl p-6 border border-pink-300/30 shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                   style={{ backfaceVisibility: "hidden" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="text-pink-300 animate-pulse" size={36} />
                  <h3 className="text-xl md:text-2xl font-bold text-white text-shadow-glow">When</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-rose-100 font-semibold text-lg md:text-xl">[Wedding Date]</p>
                  <div className="flex items-center gap-2">
                    <Clock className="text-pink-300" size={22} />
                    <p className="text-rose-100 text-lg">[Time]</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-pink-300/50 animate-pulse">
                  <Sparkles size={24} />
                </div>
              </div>
              
              {/* Enhanced Back */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-rose-500/30 backdrop-blur-romantic rounded-2xl p-6 border border-pink-300/40 shadow-xl"
                   style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="text-rose-300 animate-heartbeat" size={36} fill="currentColor" />
                  <h3 className="text-xl md:text-2xl font-bold text-white text-shadow-glow">Our Special Day</h3>
                </div>
                <p className="text-rose-100 leading-relaxed text-lg">
                  "Mark your calendars! We can't wait to celebrate this magical moment with you."
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Location Card */}
          <div className="relative h-56 md:h-52 cursor-pointer group" style={{ perspective: 1000 }}>
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-700 hover:duration-300"
              style={{ 
                transformStyle: "preserve-3d",
                transform: isCard2Flipped ? "rotateY(180deg)" : "rotateY(0deg)"
              }}
            >
              {/* Enhanced Front */}
              <div className="absolute inset-0 gradient-romantic backdrop-blur-romantic rounded-2xl p-6 border border-pink-300/30 shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                   style={{ backfaceVisibility: "hidden" }}>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-pink-300 animate-pulse" size={36} />
                  <h3 className="text-xl md:text-2xl font-bold text-white text-shadow-glow">Where</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-rose-100 font-semibold text-lg md:text-xl">[Venue Name]</p>
                  <p className="text-rose-100 text-base">[Address]</p>
                  <p className="text-rose-100 text-base">[City, State]</p>
                </div>
                <div className="absolute bottom-4 right-4 text-pink-300/50 animate-pulse">
                  <Star size={24} />
                </div>
              </div>
              
              {/* Enhanced Back */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-romantic rounded-2xl p-6 border border-pink-300/40 shadow-xl"
                   style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-pink-300 animate-pulse" size={36} />
                  <h3 className="text-xl md:text-2xl font-bold text-white text-shadow-glow">Perfect Setting</h3>
                </div>
                <p className="text-rose-100 leading-relaxed text-lg">
                  "In the most beautiful setting, surrounded by love and joy."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Additional Photo */}
        <div className={`flex justify-center mb-12 md:mb-16 ${isVisible ? 'animate-fadeInUp animate-delay-800' : 'opacity-0'}`}>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl border-4 border-white shadow-2xl overflow-hidden h-48 md:h-56 w-80 md:w-96 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <Camera size={48} className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 font-medium text-lg">Engagement Photo Here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quote Carousel */}
        <div className={`text-center mb-12 md:mb-16 px-2 ${isVisible ? 'animate-fadeInUp animate-delay-1000' : 'opacity-0'}`}>
          <div className="gradient-romantic backdrop-blur-romantic rounded-3xl p-8 md:p-10 border border-pink-300/30 shadow-2xl min-h-36 flex items-center justify-center animate-glow">
            <div className="relative">
              <div className="absolute -top-6 -left-6 text-pink-300/30 text-6xl font-serif">"</div>
              <div className="absolute -bottom-6 -right-6 text-pink-300/30 text-6xl font-serif">"</div>
              <p className="text-xl md:text-2xl lg:text-3xl text-rose-100 font-serif italic transition-all duration-1000 text-shadow-glow px-8">
                {weddingQuotes[currentQuote]}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced RSVP Section */}
        <div className={`text-center mb-12 md:mb-16 px-2 ${isVisible ? 'animate-fadeInUp animate-delay-1200' : 'opacity-0'}`}>
          <div className="gradient-romantic backdrop-blur-romantic rounded-3xl p-8 md:p-10 border border-pink-300/30 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3 text-shadow-glow">
              <Gift className="text-pink-300 animate-bounce" size={36} />
              RSVP
            </h3>
            <p className="text-rose-100 text-lg md:text-xl leading-relaxed mb-8">
              Please confirm your attendance by [RSVP Date]
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 hover:bg-white/20 transition-colors duration-300">
                <Phone className="text-pink-300" size={24} />
                <span className="text-white text-lg">[Phone Number]</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 hover:bg-white/20 transition-colors duration-300">
                <Mail className="text-pink-300" size={24} />
                <span className="text-white text-lg">[Email Address]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Final Message */}
        <div ref={finalMessageRef} className="text-center px-2 mb-12">
          <div className="gradient-romantic backdrop-blur-romantic rounded-3xl p-8 md:p-10 border border-rose-300/40 shadow-2xl animate-glow">
            <div className="min-h-20 flex items-center justify-center">
              <div className="inline-flex items-center gap-3 text-2xl md:text-3xl lg:text-4xl font-bold text-white flex-wrap justify-center">
                <Heart className="text-rose-400 animate-heartbeat text-shadow-glow" size={40} fill="currentColor" />
                <span className="bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent text-shadow-glow">
                  {typedText}
                  {isTyping && typedText.length < finalMessage.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
                {typedText.length === finalMessage.length && (
                  <Heart className="text-rose-400 animate-heartbeat text-shadow-glow" size={40} fill="currentColor" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Wedding Rings */}
        <div className="text-center mb-8">
          <div className="text-6xl md:text-7xl animate-bounce filter drop-shadow-lg">
            💍
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingFlyer;