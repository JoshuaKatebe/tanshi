'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  MousePointer,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Layers,
  Film,
  Code,
  Palette,
  Box,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const eras = [
  {
    id: 1,
    name: "Early Authoring",
    years: "1960s–1980s",
    color: "from-amber-900 to-yellow-700",
    bgColor: "bg-gradient-to-br from-amber-900 to-yellow-700",
    description: "The birth of digital storytelling with card-based systems on early computers.",
    keyPoints: [
      "HyperCard (Apple, 1987) - revolutionary card-based paradigm",
      "Text-based presentation systems",
      "Limited to single computer/floppy disk"
    ],
    stats: { storage: "1.44 MB", colors: "16", resolution: "512x342" },
    demoType: "hypercard",
    icon: "💾",
    layout: "vintage"
  },
  {
    id: 2,
    name: "Multimedia Boom",
    years: "1990s",
    color: "from-purple-600 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-500",
    description: "CD-ROMs exploded with rich media. Desktop authoring became mainstream.",
    keyPoints: [
      "Macromedia Director - dominated multimedia",
      "Authorware & ToolBook - education focused",
      "CD-ROM distribution era"
    ],
    stats: { storage: "650 MB", colors: "16.7M", fps: "30" },
    demoType: "cd-rom",
    icon: "💿",
    layout: "retro"
  },
  {
    id: 3,
    name: "Web Authoring Era",
    years: "2000s",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
    description: "The internet changed everything. Flash dominated web animation.",
    keyPoints: [
      "Adobe Flash - ubiquitous for web animation",
      "HTML/CSS/JavaScript emerging",
      "Dreamweaver - visual HTML editor"
    ],
    stats: { users: "1.7B", bandwidth: "256 Kbps", websites: "172M" },
    demoType: "flash",
    icon: "🌐",
    layout: "modern"
  },
  {
    id: 4,
    name: "Interactive & Mobile Age",
    years: "2010s",
    color: "from-blue-500 to-cyan-400",
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-400",
    description: "Smartphones revolutionized content consumption. Responsive design became essential.",
    keyPoints: [
      "Responsive web design paradigm shift",
      "HTML5 replaces Flash",
      "E-learning tools like Articulate Storyline",
      "Unity for game/interactive content"
    ],
    stats: { devices: "3.5B", apps: "2.5M", touchpoints: "∞" },
    demoType: "mobile",
    icon: "📱",
    layout: "sleek"
  },
  {
    id: 5,
    name: "Cloud & AI Integration",
    years: "2020s–Now",
    color: "from-indigo-600 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-600 to-purple-500",
    description: "Collaboration in the cloud. AI-powered content generation. Endless possibilities.",
    keyPoints: [
      "Figma - collaborative cloud design",
      "Unreal Engine 5 - real-time rendering",
      "Generative AI tools (Runway, Vyond)",
      "AR/VR authoring becoming mainstream"
    ],
    stats: { latency: "< 1ms", ai_models: "100B+", metaverse: "Ready" },
    demoType: "ai",
    icon: "🤖",
    layout: "futuristic"
  }
];

// Enhanced HyperCard Demo with actual navigation
function HyperCardDemo() {
  const [currentCard, setCurrentCard] = useState(0);
  const [clicking, setClicking] = useState(false);
  
  const cards = [
    { title: "Welcome", content: "Click to explore HyperCard" },
    { title: "Cards", content: "Each card is a screen" },
    { title: "Buttons", content: "Interactive elements" },
    { title: "Scripts", content: "HyperTalk programming" },
    { title: "The End", content: "Revolutionary for its time!" }
  ];

  return (
    <div className="relative">
      {/* CRT Monitor Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/5 to-transparent animate-scan"></div>
      </div>
      
      <div className="bg-gray-200 border-8 border-gray-400 rounded-lg p-6 font-mono text-sm shadow-2xl transform perspective-1000 hover:scale-105 transition-transform">
        <div className="bg-white border-4 border-gray-600 p-4 mb-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-400"></div>
          <div className="text-center font-bold text-sm mb-3 flex items-center justify-center gap-2">
            <span>☐</span> HyperCard Stack <span>☐</span>
          </div>
          
          <div className="bg-gray-100 border-2 border-gray-500 p-6 min-h-32 relative">
            <div className={`transform transition-all duration-300 ${clicking ? 'scale-95' : ''}`}>
              <div className="font-bold text-lg mb-2">{cards[currentCard].title}</div>
              <div className="text-sm text-gray-700">{cards[currentCard].content}</div>
              
              {/* Pixel Art Decoration */}
              <div className="absolute top-2 right-2 text-2xl opacity-50">
                {['📚', '🖥️', '💡', '⚙️', '✨'][currentCard]}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4">
            <button 
              onMouseDown={() => setClicking(true)}
              onMouseUp={() => setClicking(false)}
              onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
              disabled={currentCard === 0}
              className="flex-1 bg-gray-300 border-2 border-gray-600 px-3 py-2 text-xs font-bold hover:bg-gray-400 active:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              ◄ Back
            </button>
            <button className="px-4 bg-gray-300 border-2 border-gray-600 text-xs font-bold shadow-md">
              🏠 Home
            </button>
            <button 
              onMouseDown={() => setClicking(true)}
              onMouseUp={() => setClicking(false)}
              onClick={() => setCurrentCard(Math.min(cards.length - 1, currentCard + 1))}
              disabled={currentCard === cards.length - 1}
              className="flex-1 bg-gray-300 border-2 border-gray-600 px-3 py-2 text-xs font-bold hover:bg-gray-400 active:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              Next ►
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-600 flex justify-between">
          <span>Card {currentCard + 1} of {cards.length}</span>
          <span>© 1987 Apple Computer</span>
        </div>
      </div>
    </div>
  );
}

// Enhanced CD-ROM Demo with multiple interactive elements
function CDROMDemo() {
  const [spinning, setSpinning] = useState(false);
  const [installed, setInstalled] = useState(0);
  const [selectedContent, setSelectedContent] = useState(null);
  
  const content = [
    { name: "Encyclopedia", size: "120MB", icon: "📚" },
    { name: "Games", size: "250MB", icon: "🎮" },
    { name: "Videos", size: "180MB", icon: "📹" },
    { name: "Music", size: "100MB", icon: "🎵" }
  ];

  useEffect(() => {
    if (installed > 0 && installed < 100) {
      const timer = setTimeout(() => setInstalled(prev => Math.min(prev + 2, 100)), 50);
      return () => clearTimeout(timer);
    }
  }, [installed]);

  return (
    <div className="space-y-6">
      {/* CD Animation */}
      <div className="flex justify-center">
        <div className="relative">
          <div
            className={`w-40 h-40 rounded-full bg-gradient-to-br from-gray-300 via-purple-200 to-gray-400 flex items-center justify-center shadow-2xl ${
              spinning ? 'animate-spin' : ''
            }`}
            style={spinning ? { animationDuration: '2s' } : {}}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-transparent"></div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gray-800"></div>
            </div>
            {/* CD Reflection */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent"></div>
          </div>
          
          {/* Track Lines */}
          {spinning && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
            </div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-gray-800 rounded-lg p-4 text-white">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold">MULTIMEDIA CD-ROM EXPLORER</span>
          <span className="text-xs">650 MB</span>
        </div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {content.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedContent(item);
                setInstalled(1);
              }}
              className={`p-2 rounded border ${
                selectedContent?.name === item.name 
                  ? 'bg-purple-600 border-purple-400' 
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
              } transition-all`}
            >
              <div className="text-xl">{item.icon}</div>
              <div className="text-xs font-semibold">{item.name}</div>
              <div className="text-xs opacity-60">{item.size}</div>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        {selectedContent && (
          <div className="space-y-1">
            <div className="text-xs">Installing: {selectedContent.name}</div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
                style={{ width: `${installed}%` }}
              ></div>
            </div>
            <div className="text-xs text-right">{installed}%</div>
          </div>
        )}

        {/* Play Button */}
        <button
          onClick={() => setSpinning(!spinning)}
          className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded font-bold text-sm hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-2"
        >
          {spinning ? <Pause size={16} /> : <Play size={16} />}
          {spinning ? 'Stop' : 'Play'} CD
        </button>
      </div>
    </div>
  );
}

// New Flash Animation Demo
function FlashDemo() {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const [selectedTool, setSelectedTool] = useState('select');
  
  const tools = [
    { id: 'select', icon: <MousePointer size={16} />, name: 'Selection Tool' },
    { id: 'pen', icon: <Film size={16} />, name: 'Pen Tool' },
    { id: 'text', icon: <Code size={16} />, name: 'Text Tool' },
    { id: 'paint', icon: <Palette size={16} />, name: 'Paint Bucket' }
  ];

  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => {
        setFrame(prev => (prev + 1) % 24);
      }, 1000 / 24);
      return () => clearInterval(timer);
    }
  }, [playing]);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Flash IDE Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-600 p-2 text-white text-xs font-bold flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center text-red-600 font-bold">F</div>
          <span>Flash Professional</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>

      {/* Workspace */}
      <div className="bg-gray-800 p-4">
        {/* Toolbar */}
        <div className="bg-gray-700 rounded p-2 mb-3 flex gap-1">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`p-2 rounded ${
                selectedTool === tool.id ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
              title={tool.name}
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Stage */}
        <div className="bg-white rounded-lg p-8 mb-3 relative overflow-hidden" style={{ minHeight: '200px' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100"></div>
          
          {/* Animated Elements */}
          <div className="relative">
            {/* Bouncing Ball Animation */}
            <div 
              className="absolute w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-lg transition-all duration-100"
              style={{
                left: `${20 + frame * 3}px`,
                top: `${50 + Math.sin(frame / 4) * 30}px`,
                transform: `rotate(${frame * 15}deg)`
              }}
            >
              <div className="absolute inset-2 bg-white/30 rounded-full"></div>
            </div>

            {/* Flash Text */}
            <div className="absolute top-10 right-10 text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ActionScript 3.0
            </div>

            {/* Vector Shapes */}
            <svg className="absolute bottom-10 left-10" width="80" height="80">
              <polygon 
                points="40,10 70,30 60,70 20,70 10,30" 
                fill="url(#gradient)"
                stroke="#ff6b00"
                strokeWidth="2"
                transform={`rotate(${frame * 5} 40 40)`}
              />
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="#ff9500" />
                  <stop offset="100%" stopColor="#ff0084" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-700 rounded p-2">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setPlaying(!playing)}
              className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <span className="text-xs text-gray-300">Frame: {frame + 1}/24</span>
          </div>
          
          {/* Timeline Bars */}
          <div className="flex gap-px">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className={`h-4 flex-1 ${
                  i === frame ? 'bg-red-500' : i < frame ? 'bg-red-800' : 'bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Mobile Demo with gesture interactions
function MobileDemo() {
  const [orientation, setOrientation] = useState('portrait');
  const [currentApp, setCurrentApp] = useState(0);
  const [touchPoint, setTouchPoint] = useState(null);
  
  const apps = [
    { name: 'Responsive Web', color: 'from-blue-400 to-cyan-400', icon: '🌐' },
    { name: 'Native App', color: 'from-green-400 to-emerald-400', icon: '📱' },
    { name: 'PWA', color: 'from-purple-400 to-pink-400', icon: '⚡' },
    { name: 'AR Experience', color: 'from-orange-400 to-red-400', icon: '🔮' }
  ];

  const handleTouch = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTouchPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setTimeout(() => setTouchPoint(null), 500);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div 
        className="relative border-8 border-gray-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer"
        style={{
          width: orientation === 'portrait' ? '200px' : '320px',
          height: orientation === 'portrait' ? '360px' : '200px',
        }}
        onClick={handleTouch}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-xl z-10"></div>
        
        {/* Screen Content */}
        <div className={`w-full h-full bg-gradient-to-br ${apps[currentApp].color} relative overflow-hidden`}>
          {/* Touch Ripple Effect */}
          {touchPoint && (
            <div 
              className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: touchPoint.x, top: touchPoint.y }}
            >
              <div className="w-full h-full bg-white rounded-full animate-ping"></div>
              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
            </div>
          )}

          {/* App Content */}
          <div className="flex flex-col items-center justify-center h-full text-white p-8">
            <div className="text-5xl mb-4 animate-bounce">{apps[currentApp].icon}</div>
            <div className="text-lg font-bold text-center">{apps[currentApp].name}</div>
            <div className="text-xs opacity-80 mt-2">
              {orientation === 'portrait' ? 'Portrait Mode' : 'Landscape Mode'}
            </div>
            
            {/* Gesture Hints */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="text-xs opacity-60">Tap to interact • Swipe to navigate</div>
            </div>
          </div>

          {/* App Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {apps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentApp ? 'bg-white w-6' : 'bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Box size={16} />
          Rotate Device
        </button>
        <button
          onClick={() => setCurrentApp((currentApp + 1) % apps.length)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <ArrowRight size={16} />
          Next App
        </button>
      </div>
    </div>
  );
}

// Enhanced AI Demo with more interactions
function AIDemo() {
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [prompt, setPrompt] = useState('');
  
  const styles = [
    { id: 'realistic', name: 'Photorealistic', gradient: 'from-gray-600 to-gray-800' },
    { id: 'animated', name: '3D Animation', gradient: 'from-purple-600 to-pink-600' },
    { id: 'artistic', name: 'Artistic', gradient: 'from-orange-600 to-red-600' },
    { id: 'futuristic', name: 'Cyberpunk', gradient: 'from-cyan-600 to-blue-600' }
  ];

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedContent({
        style: selectedStyle,
        elements: [
          '🎨 Advanced neural rendering',
          '🎭 Dynamic character generation',
          '🌍 Procedural world building',
          '✨ Real-time ray tracing',
          '🎵 AI-composed soundtrack'
        ]
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* AI Control Panel */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5" />
          <span className="font-bold">AI Content Generator</span>
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your multimedia experience..."
            className="w-full p-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/50"
          />
        </div>

        {/* Style Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {styles.map(style => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedStyle === style.id
                  ? 'border-white bg-white/20'
                  : 'border-white/30 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`h-2 w-full rounded bg-gradient-to-r ${style.gradient} mb-2`}></div>
              <div className="text-xs font-semibold">{style.name}</div>
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={generating}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <Zap size={16} />
              Generate with AI
            </>
          )}
        </button>
      </div>

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold">Generated Assets</span>
            <span className="text-xs opacity-60">Style: {generatedContent.style}</span>
          </div>
          
          <div className="space-y-3">
            {generatedContent.elements.map((element, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur animate-slideIn"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-xl">{element.split(' ')[0]}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{element.substring(2)}</div>
                  <div className="h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-loading"
                      style={{ animationDelay: `${i * 200}ms` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Neural Network Visualization */}
          <div className="mt-6 p-4 bg-black/30 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-xs opacity-60">Neural Processing</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded animate-pulse"
                    style={{ 
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 100}ms`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DemoComponent({ demoType }) {
  switch (demoType) {
    case 'hypercard':
      return <HyperCardDemo />;
    case 'cd-rom':
      return <CDROMDemo />;
    case 'flash':
      return <FlashDemo />;
    case 'mobile':
      return <MobileDemo />;
    case 'ai':
      return <AIDemo />;
    default:
      return null;
  }
}

// Unique Section Layouts for Each Era
function EraSection({ era, index }) {
  const [hoveredStat, setHoveredStat] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderSection = () => {
    switch (era.layout) {
      case 'vintage':
        return (
          <>
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="scanlines"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`text-white ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
                <div className="mb-8">
                  <div className="text-8xl mb-4 animate-pulse">{era.icon}</div>
                  <h2 className="text-6xl font-black mb-3 font-mono">{era.name}</h2>
                  <p className="text-2xl opacity-90 font-mono">{era.years}</p>
                </div>
                
                {/* Retro Terminal Style */}
                <div className="bg-black/50 p-4 rounded border-2 border-yellow-600 font-mono">
                  <div className="text-green-400 text-sm mb-3">{'>'} SYSTEM.INFO</div>
                  <p className="text-yellow-300 mb-4">{era.description}</p>
                  {era.keyPoints.map((point, i) => (
                    <div key={i} className="text-green-300 text-sm mb-1">
                      {'>'} {point}
                    </div>
                  ))}
                </div>

                {/* Vintage Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {Object.entries(era.stats).map(([key, value]) => (
                    <div key={key} className="bg-black/30 p-3 rounded border border-yellow-600/50">
                      <div className="text-xs opacity-60 font-mono uppercase">{key}</div>
                      <div className="text-lg font-bold text-yellow-400 font-mono">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                <DemoComponent demoType={era.demoType} />
              </div>
            </div>
          </>
        );

      case 'retro':
        return (
          <div className="relative">
            {/* 90s Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-repeat" style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              <div className={`order-2 lg:order-1 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
                <DemoComponent demoType={era.demoType} />
              </div>

              <div className={`text-white order-1 lg:order-2 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 p-8 rounded-2xl backdrop-blur">
                  <div className="text-7xl mb-4">{era.icon}</div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                    {era.name}
                  </h2>
                  <div className="text-xl mb-6 text-pink-200">{era.years}</div>
                  <p className="text-lg mb-6 text-purple-100">{era.description}</p>
                  
                  {/* 90s Style List */}
                  <div className="space-y-3">
                    {era.keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-2xl">▶</span>
                        <span className="text-sm text-purple-200">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats with 90s flair */}
                  <div className="mt-8 flex gap-4 flex-wrap">
                    {Object.entries(era.stats).map(([key, value]) => (
                      <div 
                        key={key}
                        className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-pointer"
                        onMouseEnter={() => setHoveredStat(key)}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <div className="text-xs uppercase">{key}</div>
                        <div className="text-xl font-bold">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modern':
        return (
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`text-white ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div>
                  <span className="text-7xl">{era.icon}</span>
                  <h2 className="text-6xl font-bold mt-4 mb-2">{era.name}</h2>
                  <div className="text-2xl text-orange-200">{era.years}</div>
                </div>

                <div className="h-1 w-32 bg-gradient-to-r from-orange-400 to-red-400"></div>

                <p className="text-xl leading-relaxed">{era.description}</p>

                {/* Modern Card Layout */}
                <div className="grid gap-3">
                  {era.keyPoints.map((point, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-orange-400 mt-1" />
                        <span className="text-sm">{point}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modern Stats */}
                <div className="flex gap-6">
                  {Object.entries(era.stats).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-3xl font-bold text-orange-300">{value}</div>
                      <div className="text-xs uppercase opacity-60">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
              <DemoComponent demoType={era.demoType} />
            </div>
          </div>
        );

      case 'sleek':
        return (
          <div className="relative">
            {/* Gradient Orbs */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>

            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <DemoComponent demoType={era.demoType} />
              </div>

              <div className={`text-white ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                <div className="space-y-8">
                  <div>
                    <div className="text-8xl mb-6 filter drop-shadow-lg">{era.icon}</div>
                    <h2 className="text-5xl font-light mb-2">{era.name}</h2>
                    <div className="text-cyan-300 text-xl">{era.years}</div>
                  </div>

                  <p className="text-lg text-blue-100 leading-relaxed">{era.description}</p>

                  {/* Sleek List */}
                  <div className="space-y-4">
                    {era.keyPoints.map((point, i) => (
                      <div key={i} className="group">
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform"></div>
                          <span className="text-sm text-blue-200">{point}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sleek Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(era.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {value}
                        </div>
                        <div className="text-xs uppercase text-blue-300/60 mt-1">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'futuristic':
        return (
          <div className="relative">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="absolute inset-0 bg-grid-pattern animate-grid-scroll"></div>
            </div>

            <div className="relative grid lg:grid-cols-2 gap-16 items-center">
              <div className={`text-white ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
                <div className="relative">
                  {/* Holographic Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-xl"></div>
                  
                  <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-indigo-400/30">
                    <div className="text-8xl mb-6 animate-float">{era.icon}</div>
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                      {era.name}
                    </h2>
                    <div className="text-xl text-indigo-300 mb-6">{era.years}</div>
                    
                    <p className="text-lg text-indigo-100 mb-8">{era.description}</p>

                    {/* Futuristic List with Animations */}
                    <div className="space-y-4">
                      {era.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <div className="mt-1">
                            <Layers className="w-4 h-4 text-indigo-400 group-hover:animate-spin" />
                          </div>
                          <span className="text-sm text-indigo-200 flex-1">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Futuristic Stats */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {Object.entries(era.stats).map(([key, value]) => (
                        <div key={key} className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
                          <div className="relative p-3 text-center">
                            <div className="text-xl font-bold">{value}</div>
                            <div className="text-xs uppercase opacity-80">{key}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
                <DemoComponent demoType={era.demoType} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={sectionRef}
      className={`${era.bgColor} min-h-screen flex items-center justify-center p-8 relative overflow-hidden`}
    >
      <div className="absolute top-6 left-6 z-20">
        <div className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-semibold text-white">
          Era {index + 1} of {eras.length}
        </div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {renderSection()}
      </div>
    </div>
  );
}

// Main Component
export default function EnhancedMultimediaPresentation() {
  const [sound, setSound] = useState(true);
  const [currentEra, setCurrentEra] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulated loading
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newEra = Math.min(
        Math.floor(scrollPosition / windowHeight),
        eras.length - 1
      );
      setCurrentEra(newEra);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Loading Experience
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="text-white/60 mt-4">{loadingProgress}%</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes loading {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes grid-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(50px); }
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-loading {
          animation: loading 1s ease-out forwards;
        }
        
        .animate-grid-scroll {
          animation: grid-scroll 20s linear infinite;
        }
        
        .bg-grid-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 36px),
            repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 36px);
        }
        
        .scanlines::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }
      `}</style>

      {/* Fixed Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <button
          onClick={() => setSound(!sound)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur transition-all"
          aria-label="Toggle sound"
        >
          {sound ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/50">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300"
          style={{ width: `${((currentEra + 1) / eras.length) * 100}%` }}
        ></div>
      </div>

      {/* Timeline Navigator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/60 backdrop-blur-xl rounded-full p-2 flex items-center gap-3">
          {eras.map((era, i) => (
            <button
              key={i}
              onClick={() => {
                document.getElementById(`era-${i}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative"
            >
              <div className={`transition-all ${
                currentEra === i 
                  ? 'w-12 h-12 bg-white text-black' 
                  : 'w-10 h-10 bg-white/20 hover:bg-white/30 text-white'
              } rounded-full flex items-center justify-center font-bold text-lg`}>
                {era.icon}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-black/90 text-white text-xs px-3 py-1 rounded whitespace-nowrap">
                  {era.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center max-w-5xl">
          <div className="mb-8 animate-fadeInUp">
            <Sparkles className="w-16 h-16 mx-auto text-purple-400 animate-pulse" />
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Evolution of
            </span>
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Multimedia Authoring
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl opacity-80 mb-12 font-light animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            From HyperCard to AI-Generated Worlds
          </p>

          <div className="flex justify-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
  
            <a href="/Joshua Katebe 23211055004 The Evolution of Multimedia Authoring Systems.pptx"
    download
    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-500/50"
    aria-label="Download presentation"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Download Presentation
  </a>
</div>


          <div className="flex justify-center gap-6 mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400">60+</div>
              <div className="text-sm opacity-60">Years of Innovation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">5</div>
              <div className="text-sm opacity-60">Revolutionary Eras</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400">∞</div>
              <div className="text-sm opacity-60">Creative Possibilities</div>
            </div>
          </div>

          

          
          <div className="animate-bounce">
            <ChevronDown size={48} className="mx-auto text-white/60" />
          </div>
        </div>
      </div>

      {/* Era Sections */}
      {eras.map((era, index) => (
        <div key={era.id} id={`era-${index}`}>
          <EraSection era={era} index={index} />
        </div>
      ))}

      {/* Conclusion Section */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Futuristic Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="max-w-4xl text-center relative z-10">
          <div className="mb-8">
            <Zap className="w-20 h-20 mx-auto text-indigo-400 animate-pulse" />
          </div>
          
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            The Future is Now
          </h2>
          
          <p className="text-xl opacity-80 mb-12 leading-relaxed">
            We've journeyed from simple card-based systems to AI-powered creation tools. 
            The next chapter? It's being written by creators like you, armed with tools 
            that turn imagination into reality at the speed of thought.
          </p>

          {/* Future Technologies */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🧠</div>
              <h3 className="font-bold mb-2">Neural Interfaces</h3>
              <p className="text-sm opacity-80">Direct thought-to-creation pipelines</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
              <div className="text-4xl mb-4 group-hover:animate-bounce">🌌</div>
              <h3 className="font-bold mb-2">Metaverse Native</h3>
              <p className="text-sm opacity-80">Build worlds within worlds</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
              <div className="text-4xl mb-4 group-hover:animate-bounce">∞</div>
              <h3 className="font-bold mb-2">Quantum Computing</h3>
              <p className="text-sm opacity-80">Infinite creative possibilities</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <p className="text-2xl font-bold text-indigo-300">
              What will you create next?
            </p>
            <div className="inline-flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105">
                Start Creating
              </button>
              <button className="px-8 py-3 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}