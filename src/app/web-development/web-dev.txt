
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteForm from '../../components/QuoteForm';
import EmailJSInit from '../../components/EmailJSInit';
import { 
  Calculator, 
  CalendarCheck,
  CheckCircle, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Sparkles,
  Package,
  Plus,
  ArrowRight,
  Shield,
  Zap,
  Target,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Settings,
  Award,
  Search,
  ShoppingCart,
  MessageCircle,
  BarChart3,
  Smartphone,
  Palette,
  Code,
  Lightbulb,
  BookOpen,
  Camera,
  Megaphone,
  Building,
  Briefcase,
  Heart,
  Lock,
  Rocket,
  Eye,
  MousePointer,
  CreditCard,
  Wifi,
  Database,
  Server,
  FileText,
  Languages,
  Share2,
  RefreshCw,
  Headphones,
  ChevronDown,
  ChevronUp,
  Info,
  X,
  Download,
  ArrowDown,
  Pointer
} from 'lucide-react';

const WebDevelopmentPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [extraPages, setExtraPages] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState({});
  const [maintenance, setMaintenance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [breakdown, setBreakdown] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showFeatureDetails, setShowFeatureDetails] = useState({});
  const [activeSection, setActiveSection] = useState('packages');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showInitialGuide, setShowInitialGuide] = useState(true);
  const [showCustomizationGuide, setShowCustomizationGuide] = useState(false);
  const [showQuoteGuide, setShowQuoteGuide] = useState(false);
  const [showFormGuide, setShowFormGuide] = useState(false);
  const [showConfirmationGuide, setShowConfirmationGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const websiteBenefits = [
    {
      icon: Search,
      title: "Online Visibility",
      description: "Be found by customers searching for your services 24/7",
      stats: "81% of consumers research online before buying"
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Increase sales with professional online presence",
      stats: "Companies with websites grow 40% faster"
    },
    {
      icon: Users,
      title: "Customer Trust",
      description: "Build credibility with professional web presence",
      stats: "75% won't buy from businesses without websites"
    },
    {
      icon: Smartphone,
      title: "Mobile Customers",
      description: "Reach customers on their phones and tablets",
      stats: "60% of searches happen on mobile devices"
    },
    {
      icon: Clock,
      title: "Always Open",
      description: "Your business works while you sleep",
      stats: "Generate leads and sales 24/7"
    },
    {
      icon: DollarSign,
      title: "Cost Effective",
      description: "Much cheaper than traditional advertising",
      stats: "70% lower cost than print advertising"
    }
  ];

  const packages = [
    { 
      name: 'LITE', 
      price: 400, 
      pages: 1, 
      description: 'Perfect for Hustlers and Small Startups', 
      domain: 'subdomain or addon for .com', 
      hosting: 'Free (Static)', 
      time: 'Same-day to 2 days',
      color: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        'Single-page website',
        'Mobile responsive design',
        'WhatsApp chat button',
        'Basic Email integration',
        'Basic contact information',
        'Social media links'
      ],
      useCases: [
        'Personal portfolios',
        'Small entrepreneurs',
        'Students',
        'Side hustlers',
        'Quick online presence'
      ],
      businesses: ['Small entrepreneurs', 'Students', 'Side hustlers', 'Personal brands']
    },
    { 
      name: 'STARTER', 
      price: 800, 
      pages: 5, 
      description: 'Great for small Businesses', 
      domain: 'subdomain or addon for .com', 
      hosting: 'Free (Static)', 
      time: 'Same-day to 2 days',
      color: 'from-green-500 to-emerald-500',
      popular: false,
      features: [
        'All Starter features',
        'Blog system',
        'Contact form',
        'WhatsApp button',
        'Responsive design',
        'Basic Email integration',
      ],
      useCases: [
        'Bloggers',
        'Content creators',
        'Small businesses',
        'Freelancers',
        'Service providers'
      ],
      businesses: ['Content creators', 'Freelancers', 'Small service providers']
    },
    { 
      name: 'BUSINESS', 
      price: 1800, 
      pages: 5, 
      description: 'Branding & Functional Business Websites', 
      domain: '.com domain included', 
      hosting: 'Free (Static)', 
      time: '3-7 days',
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'Up to 5 pages',
        'Custom design matching your brand',
        'Smooth animations',
        'Advanced blog (likes/comments)',
        'WhatsApp chat',
        '.com domain included',
        'No footer credit',
        'Professional appearance',
        'SEO optimization',
        'Email integration',
        'Customer management',
      ],
      useCases: [
        'Startups',
        'SMEs',
        'Professional services',
        'Brand showcase',
        'Lead generation'
      ],
      businesses: ['Startups', 'SMEs', 'Professional services', 'Growing businesses']
    },
    { 
      name: 'BUSINESS PLUS', 
      price: 2800, 
      pages: 10, 
      description: 'Advanced Features & Tracking', 
      domain: '.com domain included', 
      hosting: 'Free (Static)', 
      time: '3-7 days',
      color: 'from-orange-500 to-red-500',
      popular: false,
      features: [
        'Up to 10 pages',
        'Advanced order tracking',
        'Simple customer profiles',
        'Dashboards',
        'Business emails',
        'Expanded Firebase blog with interactivity',
        'Social media integration',
        'Analytics setup',
        'Contact forms'
      ],
      useCases: [
        
        'Service businesses',
        'Customer management',
        'Content marketing',
        'Professional presence'
      ],
      businesses: ['Service companies', 'E-commerce', 'Content businesses', 'Agencies']
    },
    { 
      name: 'BUSINESS PRO', 
      price: 5000, 
      pages: 20, 
      description: 'Digital Business Operations', 
      domain: '.com domain included', 
      hosting: 'Client Paid', 
      time: '7-14 days',
      color: 'from-indigo-500 to-purple-500',
      popular: false,
      features: [
        'Up to 20 pages',
        'Customer dashboards',
        'CRM features',
        'Order management',
        'Basic ERP (staff management, basic payroll)',
        'Social media integration',
        'Payment integrations (MTN MoMo, Airtel, Payfast)',
        'Automated email responders',
        'Advanced analytics',
        'Multi-user access'
      ],
      useCases: [
        'Digital operations',
        'Customer management',
        'E-commerce',
        'Service automation',
        'Team collaboration'
      ],
      businesses: ['Established businesses', 'E-commerce', 'Service companies', 'Digital operations']
    },
    { 
      name: 'ENTERPRISE', 
      price: 10000, 
      pages: 'Unlimited', 
      description: 'Fully Custom Business Systems', 
      domain: 'Any domain', 
      hosting: 'Negotiable', 
      time: 'From 2 weeks',
      color: 'from-gradient-to-r from-yellow-500 to-orange-500',
      popular: false,
      features: [
        'Tailored multi-page websites',
        'Custom business systems',
        'Advanced dashboards',
        'AI chatbots',
        'Progressive web apps (PWA)',
        'Complex e-commerce systems',
        'API integrations',
        'Unlimited custom features',
        'Dedicated support',
        'Custom training'
      ],
      useCases: [
        'Large organizations',
        'Complex systems',
        'Custom solutions',
        'Enterprise operations',
        'Multi-branch businesses'
      ],
      businesses: ['Large businesses', 'Organizations', 'Enterprises', 'Custom requirements']
    }
  ];

  const features = [
    { 
      id: 'email', 
      name: 'Professional Email', 
      price: 40, 
      monthly: true, 
      description: 'Custom email setup (contact@yourdomain.com) (FREE with BUSINESS PRO)', 
      icon: Mail,
      details: {
        whatItIs: 'Custom email addresses using your domain name',
        whyNeedIt: 'Builds trust and professionalism with customers',
        howItWorks: 'We set up email accounts that use your website domain',
        benefits: ['Professional appearance', 'Better deliverability', 'Brand consistency', 'Customer trust']
      }
    },
    { 
      id: 'seo', 
      name: 'Advanced SEO', 
      price: 150, 
      description: 'Search engine optimization + analytics (FREE with BUSINESS+)', 
      icon: TrendingUp,
      details: {
        whatItIs: 'Optimization to help customers find you on Google',
        whyNeedIt: 'Most customers find businesses through search engines',
        howItWorks: 'We optimize your content, meta tags, and structure for search engines',
        benefits: ['More website visitors', 'Higher Google rankings', 'Better local visibility', 'Increased sales']
      }
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp Integration', 
      price: 50, 
      description: 'Live chat button (FREE with STARTER packages)', 
      icon: MessageCircle,
      details: {
        whatItIs: 'Direct WhatsApp chat button on your website',
        whyNeedIt: 'Customers prefer WhatsApp for quick communication',
        howItWorks: 'Visitors click the button to start WhatsApp chat with you',
        benefits: ['Instant customer communication', 'Higher conversion rates', 'Better customer service', 'Local preference']
      }
    },
    { 
      id: 'ecommerce', 
      name: 'E-commerce Setup', 
      price: 2000, 
      description: 'Online store functionality (FREE for BUSINESS PRO)', 
      icon: ShoppingCart,
      details: {
        whatItIs: 'Complete online store with product catalog and checkout',
        whyNeedIt: 'Sell products 24/7 without physical store limitations',
        howItWorks: 'We build a secure online store with payment processing',
        benefits: ['Sell online 24/7', 'Reach more customers', 'Reduce overhead costs', 'Track inventory']
      }
    },
    { 
      id: 'blog-system', 
      name: 'Advanced Blog System', 
      price: 300, 
      description: 'Content management for regular updates (FREE with BUSINESS )', 
      icon: BookOpen,
      details: {
        whatItIs: 'Easy-to-use system for publishing articles and updates',
        whyNeedIt: 'Fresh content improves Google rankings and customer engagement',
        howItWorks: 'Simple editor to add new posts, images, and updates',
        benefits: ['Better SEO rankings', 'Customer engagement', 'Share expertise', 'Build authority']
      }
    },
    { 
      id: 'social', 
      name: 'Social Media Feed', 
      price: 300, 
      description: 'Live social media integration (FREE with BUSINESS PRO)', 
      icon: Share2,
      details: {
        whatItIs: 'Display your latest social media posts on your website',
        whyNeedIt: 'Keep website content fresh and show social proof',
        howItWorks: 'Automatically displays your latest Facebook/Instagram posts',
        benefits: ['Fresh content', 'Social proof', 'Increased engagement', 'Cross-platform presence']
      }
    },
    { 
      id: 'forms', 
      name: 'Custom Forms', 
      price: 150, 
      description: 'Advanced contact/booking forms (FREE with BUSINESS)', 
      icon: FileText,
      details: {
        whatItIs: 'Customized forms for specific business needs',
        whyNeedIt: 'Collect specific information from customers efficiently',
        howItWorks: 'We create forms tailored to your business processes',
        benefits: ['Better lead qualification', 'Streamlined processes', 'Data collection', 'Professional appearance']
      }
    },
    {
  id: 'booking-system',
  name: 'Advanced Booking System',
  price: 350,
  description: 'Simple and efficient booking system integration (FREE with BUSINESS+)',
  icon: CalendarCheck,
  details: {
    whatItIs: 'A streamlined booking system for appointments or reservations directly on your website',
    whyNeedIt: 'Make it easy for customers to book appointments or reserve services without calling or messaging manually',
    howItWorks: 'We set up an easy-to-use booking system tailored to your business, with calendar integration, automated confirmations, and optional payment collection',
    benefits: [
      'Reduce missed appointments with reminders',
      'Improve customer convenience',
      'Manage bookings in one place',
      'Increase efficiency and reduce no-shows',
      'Professional and modern client experience'
    ]
  }
},
    { 
      id: 'multilang', 
      name: 'Multi-language', 
      price: 400, 
      description: 'Bilingual website setup', 
      icon: Languages,
      details: {
        whatItIs: 'Website available in multiple languages',
        whyNeedIt: 'Reach customers who prefer local languages',
        howItWorks: 'We create separate language versions of your content',
        benefits: ['Reach more customers', 'Local market appeal', 'Better user experience', 'Competitive advantage']
      }
    },
    { 
      id: 'payment', 
      name: 'Payment Integration', 
      price: 500, 
      description: 'Set up billing with cards and mobile money (FREE for K5000+ packages)', 
      icon: CreditCard,
      details: {
        whatItIs: 'Secure payment processing for online transactions',
        whyNeedIt: 'Accept payments directly through your website',
        howItWorks: 'We integrate secure payment gateways for cards and mobile money',
        benefits: ['Accept online payments', 'Secure transactions', 'Multiple payment options', 'Automated billing']
      }
    },
    { 
      id: 'domain', 
      name: 'Premium Domain', 
      price: 150, 
      description: 'Domains exceeding package allowance (FREE with BUSINESS)', 
      icon: Award,
      details: {
        whatItIs: 'Premium domain names (.com, .org, .net, .co, etc.)',
        whyNeedIt: 'Better branding and easier to remember',
        howItWorks: 'We help you choose and register the perfect domain',
        benefits: ['Better branding', 'Easier to remember', 'Professional appearance', 'Better SEO']
      }
    }
  ];

  const maintenancePlans = [
    { 
      name: 'Basic Maintenance', 
      price: 250, 
      features: ['Regular updates', 'Minor content changes', 'Plugin/theme updates', 'Email support'],
      color: 'from-blue-500 to-cyan-500',
      icon: Shield,
      details: {
        whatItIs: 'Essential website maintenance and updates',
        whyNeedIt: 'Keep your website secure and running smoothly',
        includes: ['Security updates', 'Content updates', 'Bug fixes', 'Email support'],
        responseTime: '48 hours'
      }
    },
    { 
      name: 'Professional Maintenance', 
      price: 500, 
      features: ['Everything in Basic', 'Priority support', 'Monthly performance reports', 'Security monitoring', 'Phone support'],
      color: 'from-green-500 to-emerald-500',
      icon: Zap,
      details: {
        whatItIs: 'Comprehensive website maintenance with priority support',
        whyNeedIt: 'Ensure optimal performance and quick issue resolution',
        includes: ['All Basic features', 'Priority support', 'Performance monitoring', 'Monthly reports', 'Phone support'],
        responseTime: '24 hours'
      }
    },
    { 
      name: 'Comprehensive Maintenance', 
      price: 1000, 
      features: ['Everything in Basic', 'Priority support', 'Monthly performance reports', 'Security monitoring', 'Phone support'],
      color: 'from-green-500 to-emerald-500',
      icon: Zap,
      details: {
        whatItIs: 'Comprehensive website maintenance with priority support',
        whyNeedIt: 'Ensure optimal performance and quick issue resolution',
        includes: ['All Basic features', 'Priority support', 'Performance monitoring', 'Monthly reports', 'Phone support'],
        responseTime: '24 hours'
      }
    },
    { 
      name: 'Enterprise Maintenance', 
      price: 2500, 
      features: ['Everything in Professional', 'Feature additions', 'Advanced bug fixes', 'Custom development hours', 'Dedicated support'],
      color: 'from-purple-500 to-pink-500',
      icon: Star,
      details: {
        whatItIs: 'Premium maintenance with custom development support',
        whyNeedIt: 'For businesses requiring ongoing development and dedicated support',
        includes: ['All Professional features', 'Custom development', 'Feature additions', 'Dedicated support', 'Advanced fixes'],
        responseTime: '4 hours'
      }
    }
  ];

  const calculatePrice = () => {
    let total = selectedPackage;
    let newBreakdown = [];
    
    if (selectedPackage > 0) {
      const packageInfo = packages.find(p => p.price === selectedPackage);
      newBreakdown.push({ name: `${packageInfo.name} Package`, price: selectedPackage });
    }

    if (extraPages > 0) {
      const extraPagesCost = extraPages * 100;
      total += extraPagesCost;
      newBreakdown.push({ name: `Extra Pages (${extraPages})`, price: extraPagesCost });
    }

    Object.entries(selectedFeatures).forEach(([featureId, isSelected]) => {
      if (isSelected) {
        const feature = features.find(f => f.id === featureId);
        let featurePrice = feature.price;
        
        if (featureId === 'domain' && selectedPackage >= 1800) featurePrice = 0;
        if (featureId === 'booking-system' && selectedPackage >= 2500) featurePrice = 0;
        if (featureId === 'email' && selectedPackage >= 4000) featurePrice = 0;
        if (featureId === 'forms' && selectedPackage >= 1800) featurePrice = 0;
        if (featureId === 'seo' && selectedPackage >= 2400) featurePrice = 0;
        if (featureId === 'whatsapp' && selectedPackage >= 600) featurePrice = 0;
        if (featureId === 'ecommerce' && selectedPackage >= 5000) featurePrice = 0;
        if (featureId === 'blog-system' && selectedPackage >= 2400) featurePrice = 0;
        if (featureId === 'payment' && selectedPackage >= 4000) featurePrice = 0;
        
        total += featurePrice;
        newBreakdown.push({ 
          name: feature.name + (featurePrice === 0 ? ' (FREE)' : ''), 
          price: featurePrice 
        });
      }
    });

    setTotalPrice(total);
    setBreakdown(newBreakdown);
    setShowResults(true);
  };

  useEffect(() => {
    if (selectedPackage > 0) {
      calculatePrice();
    }
  }, [selectedPackage, extraPages, selectedFeatures, maintenance]);

  const handleFeatureChange = (featureId) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const toggleFeatureDetails = (featureId) => {
    setShowFeatureDetails(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePackageSelect = (packagePrice) => {
    setSelectedPackage(packagePrice);
    setShowInitialGuide(false);
    setShowCustomizationGuide(true);
    setTimeout(() => {
      scrollToSection('customization');
    }, 300);
  };

  const handleCalculatePrice = () => {
    calculatePrice();
    setShowCustomizationGuide(false);
    setShowQuoteGuide(true);
    setTimeout(() => {
      scrollToSection('results');
    }, 300);
  };

  const handleGetQuote = () => {
    setShowQuoteForm(true);
    setShowQuoteGuide(false);
    setShowFormGuide(true);
    setTimeout(() => {
      scrollToSection('quote-form');
    }, 300);
  };

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Add snap scroll styles and tutorial animations
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      .snap-section {
        scroll-snap-align: start;
        min-height: 100vh;
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
      .floating-guide {
        animation: float 3s ease-in-out infinite;
      }
      .bounce-arrow {
        animation: bounce 2s ease-in-out infinite;
      }
      .pulse-highlight {
        animation: pulse 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const generateQuoteText = () => {
    const selectedPkg = packages.find(p => p.price === selectedPackage);
    let text = `TANSHI DIGITAL SOLUTIONS - WEB DEVELOPMENT QUOTE\n\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n\n`;
    text += `SELECTED PACKAGE: ${selectedPkg?.name || 'None'}\n`;
    text += `Package Price: K${selectedPackage.toLocaleString()}\n\n`;
    
    text += `BREAKDOWN:\n`;
    breakdown.forEach(item => {
      text += `- ${item.name}: K${item.price.toLocaleString()}\n`;
    });
    
    text += `\nTOTAL COST: K${totalPrice.toLocaleString()}\n`;
    
    if (maintenance > 0) {
      text += `\nMAINTENANCE: K${maintenance}/month\n`;
    }
    
    text += `\n\nContact Information:\n`;
    text += `Email: info@tanshidigital.com\n`;
    text += `Phone: +260 571 442 097\n`;
    text += `Website: tanshidigital.com\n`;
    
    return text;
  };

  const downloadCSV = () => {
    const selectedPkg = packages.find(p => p.price === selectedPackage);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Item,Price (ZMW)\n";
    csvContent += `"${selectedPkg?.name || ''} Package",${selectedPackage}\n`;
    
    breakdown.forEach(item => {
      csvContent += `"${item.name}",${item.price}\n`;
    });
    
    csvContent += `"Total",${totalPrice}\n`;
    
    if (maintenance > 0) {
      csvContent += `"Monthly Maintenance",${maintenance}\n`;
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tanshi_quote_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    // Create a simple PDF using browser print functionality
    const quoteText = generateQuoteText();
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write('<html><head><title>Tanshi Digital Solutions Quote</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { font-family: Arial, sans-serif; padding: 40px; }');
    printWindow.document.write('h1 { color: #1e40af; }');
    printWindow.document.write('pre { white-space: pre-wrap; font-family: Arial, sans-serif; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1>Web Development Quote</h1>');
    printWindow.document.write('<pre>' + quoteText + '</pre>');
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownloadQuote = () => {
    // Show options for PDF or CSV
    const choice = window.confirm('Click OK to download as PDF, Cancel for CSV format');
    if (choice) {
      downloadPDF();
    } else {
      downloadCSV();
    }
  };

  const handleWhatsAppContact = () => {
    const selectedPkg = packages.find(p => p.price === selectedPackage);
    const phoneNumber = '260571442097'; // Remove + and spaces
    
    let message = `Hi Tanshi Digital Solutions! 👋\n\n`;
    message += `I'm interested in your web development services.\n\n`;
    message += `📋 *My Quote Details:*\n`;
    message += `Package: *${selectedPkg?.name || 'None'}*\n`;
    message += `Total Cost: *K${totalPrice.toLocaleString()}*\n`;
    
    if (extraPages > 0) {
      message += `Extra Pages: ${extraPages}\n`;
    }
    
    const selectedFeaturesList = Object.entries(selectedFeatures)
      .filter(([_, isSelected]) => isSelected)
      .map(([featureId]) => features.find(f => f.id === featureId)?.name)
      .filter(Boolean);
    
    if (selectedFeaturesList.length > 0) {
      message += `\nSelected Add-ons:\n`;
      selectedFeaturesList.forEach(feature => {
        message += `• ${feature}\n`;
      });
    }
    
    if (maintenance > 0) {
      message += `\nMaintenance: K${maintenance}/month\n`;
    }
    
    message += `\nPlease send me more information about this quote. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };
  // Tutorial Guide Component
  const TutorialGuide = ({ show, position, children, onDismiss }) => {
    if (!show) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`fixed z-50 ${position} floating-guide`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-xl max-w-xs">
          <button
            onClick={onDismiss}
            className="absolute -top-2 -right-2 bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
          >
            <X size={16} />
          </button>
          {children}
        </div>
      </motion.div>
    );
  };

  // Floating Arrow Component
  const FloatingArrow = ({ show, position, direction = 'down' }) => {
    if (!show) return null;
    
    const rotations = {
      down: 'rotate-0',
      up: 'rotate-180',
      left: 'rotate-90',
      right: '-rotate-90'
    };
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed z-40 ${position} bounce-arrow`}
      >
        <div className={`text-blue-400 ${rotations[direction]}`}>
          <ArrowDown size={48} strokeWidth={3} />
        </div>
      </motion.div>
    );
  };

  // Highlight Overlay Component
  const HighlightOverlay = ({ show, targetId }) => {
    if (!show) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-30 pointer-events-none"
      >
        <div className="absolute inset-0 bg-black/50" />
        <div 
          id={`highlight-${targetId}`}
          className="absolute pulse-highlight"
          style={{
            boxShadow: '0 0 0 2000px rgba(0, 0, 0, 0.5)',
            borderRadius: '1rem',
            border: '3px dashed #60A5FA'
          }}
        />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Tutorial Guides */}
      <AnimatePresence>
        {/* Initial Package Selection Guide */}
        <TutorialGuide
          show={showInitialGuide}
          position={isMobile ? "top-20 left-4 right-4" : "top-32 right-8"}
          onDismiss={() => setShowInitialGuide(false)}
        >
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Pointer className="text-yellow-300" size={24} />
              <h3 className="font-bold text-lg">Welcome! Let's get started</h3>
            </div>
            <p className="text-sm mb-3">
              Select a package below to begin building your perfect website. Each package is tailored for different business needs.
            </p>
            <p className="text-xs text-blue-100">
              Tip: Click on any package to see more details and customize it!
            </p>
          </div>
        </TutorialGuide>

        {/* Package Selection Arrow */}
        <FloatingArrow
          show={showInitialGuide}
          position={isMobile ? "top-80 left-1/2 -translate-x-1/2" : "top-96 left-1/2 -translate-x-1/2"}
          direction="down"
        />

        {/* Customization Guide */}
        <TutorialGuide
          show={showCustomizationGuide}
          position={isMobile ? "top-20 left-4 right-4" : "top-32 left-8"}
          onDismiss={() => setShowCustomizationGuide(false)}
        >
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="text-yellow-300" size={24} />
              <h3 className="font-bold text-lg">Customize Your Package</h3>
            </div>
            <p className="text-sm mb-3">
              Great choice! Now you can add extra pages and features to your package if needed or skip
            </p>
            <p className="text-xs text-blue-100">
              Scroll down to see all available add-ons!
            </p>
          </div>
        </TutorialGuide>

        {/* Quote Button Guide */}
        <TutorialGuide
          show={showQuoteGuide}
          position={isMobile ? "bottom-32 left-4 right-4" : "bottom-48 right-8"}
          onDismiss={() => setShowQuoteGuide(false)}
        >
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <MousePointer className="text-yellow-300" size={24} />
              <h3 className="font-bold text-lg">Ready for Your Quote?</h3>
            </div>
            <p className="text-sm mb-3">
              Perfect! Your total is calculated. Click the "Get a Quote" button to request your personalized quote.
            </p>
            {isMobile && (
              <p className="text-xs text-blue-100">
                The button is highlighted below!
              </p>
            )}
          </div>
        </TutorialGuide>

        {/* Quote Button Arrow for Mobile */}
        {isMobile && (
          <FloatingArrow
            show={showQuoteGuide}
            position="bottom-20 right-8"
            direction="down"
          />
        )}

        {/* Form Guide */}
        <TutorialGuide
          show={showFormGuide}
          position={isMobile ? "top-20 left-4 right-4" : "top-32 right-8"}
          onDismiss={() => setShowFormGuide(false)}
        >
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-yellow-300" size={24} />
              <h3 className="font-bold text-lg">Almost There!</h3>
            </div>
            <p className="text-sm mb-3">
              Fill in your contact details below and we'll send you a detailed quote.
            </p>
            <p className="text-xs text-blue-100">
              We'll get back to you within 24 hours!
            </p>
          </div>
        </TutorialGuide>
      </AnimatePresence>
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
              <Calculator size={20} />
              <span className="font-semibold">Web Development Solutions</span>
            </motion.div>
  
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Build Your Dream
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Digital Presence
              </span>
            </motion.h1>
  
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Explore our range of customizable web development packages. Compare features, calculate costs, and find the perfect solution for your business.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                <Target className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-xl font-bold text-white">20+</div>
                <div className="text-sm text-slate-300">Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                <Clock className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-xl font-bold text-white">3-5 days</div>
                <div className="text-sm text-slate-300">Delivery</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                <Users className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-xl font-bold text-white">98%</div>
                <div className="text-sm text-slate-300">Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                <Shield className="mx-auto mb-2 text-blue-400" size={24} />
                <div className="text-xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-300">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  
      {/* Packages Section */}
      <section id="packages" className="relative z-10 py-20 px-6 snap-section">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-blue-400">Package</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              Select the perfect package for your business needs and see the full breakdown
            </p>
          </motion.div>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => handlePackageSelect(pkg.price)}
                className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedPackage === pkg.price
                    ? 'border-blue-400 bg-gradient-to-br from-blue-900/60 to-blue-800/40'
                    : 'border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/10 hover:border-blue-500/40'
                } backdrop-blur-xl group ${
                  showInitialGuide && index === 1 ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-slate-900' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                    K{pkg.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{pkg.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pages:</span>
                      <span className="text-white font-semibold">{pkg.pages}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Timeline:</span>
                      <span className="text-white font-semibold">{pkg.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Domain:</span>
                      <span className="text-white font-semibold text-xs">{pkg.domain}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    {pkg.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center text-xs text-slate-300">
                        <CheckCircle size={12} className="text-green-400 mr-1" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                    {pkg.features.length > 3 && (
                      <p className="text-xs text-blue-400">+{pkg.features.length - 3} more features</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      {selectedPackage > 0 && (
        <section id="customization" className="relative z-10 py-20 px-6 snap-section">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Customize Your <span className="text-blue-400">Solution</span>
                </h2>
                <p className="text-blue-100/80">Add extra features and pages to perfect your package</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Package Details */}
                <div>
                  <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-600 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Package size={20} className="text-blue-400" />
                      Selected Package
                    </h3>
                    {packages.find(p => p.price === selectedPackage) && (
                      <div>
                        <h4 className="text-xl font-bold text-blue-400 mb-2">
                          {packages.find(p => p.price === selectedPackage).name} Package
                        </h4>
                        <p className="text-slate-300 mb-4">
                          {packages.find(p => p.price === selectedPackage).description}
                        </p>
                        <div className="space-y-2">
                          {packages.find(p => p.price === selectedPackage).features.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm text-slate-300">
                              <CheckCircle size={14} className="text-green-400 mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Extra Pages */}
                  <div className="mb-6">
                    <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Plus size={20} className="text-blue-400" />
                      Additional Pages
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range"
                        value={extraPages}
                        onChange={(e) => setExtraPages(parseInt(e.target.value))}
                        min="0" 
                        max="20"
                        className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="bg-slate-700 px-4 py-2 rounded-lg min-w-[100px] text-center">
                        {extraPages} pages
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">K100 per additional page</p>
                  </div>
                </div>

                {/* Right Column - Features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-blue-400" />
                    Additional Features
                  </h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {features.map((feature) => {
                      const isFree = (
                        (feature.id === 'whatsapp' && selectedPackage >= 600) ||
                        (feature.id === 'ecommerce' && selectedPackage >= 2500) ||
                        (feature.id === 'blog' && selectedPackage >= 600) ||
                        (feature.id === 'payment' && selectedPackage >= 2500)
                      );
                      
                      return (
                        <motion.div
                          key={feature.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedFeatures[feature.id]
                              ? 'border-blue-400 bg-blue-900/40'
                              : 'border-slate-600 bg-slate-800/40 hover:border-blue-500/50'
                          }`}
                          onClick={() => handleFeatureChange(feature.id)}
                        >
                          <div className="flex items-center gap-3">
                            <feature.icon size={20} className="text-blue-400" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{feature.name}</h4>
                              <p className="text-xs text-slate-400">{feature.description}</p>
                            </div>
                            <div className="text-right">
                              {isFree ? (
                                <span className="text-green-400 font-bold text-sm">FREE</span>
                              ) : (
                                <span className="text-blue-400 font-bold">
                                  K{feature.price}{feature.monthly ? '/mo' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Maintenance Plans */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-blue-400" />
                  Maintenance Plan (Optional)
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {maintenancePlans.map((plan) => (
                    <motion.div
                      key={plan.name}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setMaintenance(maintenance === plan.price ? 0 : plan.price)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        maintenance === plan.price
                          ? 'border-blue-400 bg-blue-900/40'
                          : 'border-slate-600 bg-slate-800/40 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="text-center">
                        <plan.icon size={24} className="text-blue-400 mx-auto mb-2" />
                        <h4 className="font-semibold text-white mb-2">{plan.name}</h4>
                        <div className={`text-xl font-bold mb-3 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                          K{plan.price}/month
                        </div>
                        <ul className="text-xs text-slate-400 space-y-1">
                          {plan.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle size={10} className="text-green-400" />
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCalculatePrice}
                className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg"
              >
                <Calculator size={24} />
                Calculate Total Cost
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Results Section */}
{showResults && (
        <section id="results" className="relative z-10 py-20 px-6 snap-section">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-8 rounded-3xl shadow-2xl border border-green-500/30 backdrop-blur-xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">
                  Your Investment
                </h2>
                <div className="text-5xl font-bold text-green-400 mb-2">
                  K{totalPrice.toLocaleString()}
                </div>
                <p className="text-blue-100/80">One-time project cost</p>
                {maintenance > 0 && (
                  <p className="text-blue-300 mt-2">
                    + K{maintenance}/month for maintenance
                  </p>
                )}
              </div>

              <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-600">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-400" />
                  Cost Breakdown
                </h4>
                <div className="space-y-2">
                  {breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 text-slate-300 border-b border-slate-700 last:border-0">
                      <span>{item.name}</span>
                      <span className="font-semibold">K{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 text-white font-bold text-lg pt-4 border-t border-slate-600">
                    <span>Total</span>
                    <span>K{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone size={20} />
                  Contact via WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadQuote}
                  className="flex-1 border-2 border-blue-400/50 text-blue-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Quote
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetQuote}
                  className={`flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg ${
                    showQuoteGuide ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-slate-900' : ''
                  }`}
                >
                  <Mail size={20} />
                  Get a Quote
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {showQuoteForm && (
        <section id="quote-form" className="relative z-10 py-20 px-6 snap-section">
          <div className="container mx-auto max-w-4xl">
            <QuoteForm packageData={{
              name: packages.find(p => p.price === selectedPackage)?.name || 'Custom',
              price: selectedPackage,
              extraPages,
              addons: breakdown,
              maintenance,
              totalPrice,
              breakdown,
            }} />
          </div>
        </section>
      )}

      {/* Feature Comparison Table */}
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
              Compare <span className="text-blue-400">Features</span>
            </h2>
            <p className="text-xl text-blue-100/70 max-w-3xl mx-auto">
              Detailed comparison of what's included in each package
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-slate-900/50 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="text-left p-4 text-blue-300">Features</th>
                  {packages.map(pkg => (
                    <th key={pkg.name} className="text-center p-4">
                      <div className="text-white font-bold">{pkg.name}</div>
                      <div className="text-blue-400 text-sm">K{pkg.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Number of Pages', values: packages.map(p => p.pages) },
                  { feature: 'Responsive Design', values: ['✓', '✓', '✓', '✓', '✓'] },
                  { feature: 'SEO Optimization', values: ['Basic', 'Basic', 'Advanced', 'Advanced', 'Premium'] },
                  { feature: 'Custom Domain', values: ['Subdomain', '✓', '✓', '✓', '✓'] },
                  { feature: 'SSL Certificate', values: ['✓', '✓', '✓', '✓', '✓'] },
                  { feature: 'Admin Panel', values: ['−', '✓', '✓', '✓', '✓'] },
                  { feature: 'E-commerce', values: ['−', '−', 'Add-on', '✓', '✓'] },
                  { feature: 'Support Period', values: ['1 month', '2 months', '3 months', '6 months', '12 months'] },
                ].map((row, index) => (
                  <tr key={index} className="border-t border-slate-700">
                    <td className="p-4 text-slate-300">{row.feature}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="p-4 text-center">
                        {value === '✓' ? (
                          <CheckCircle size={20} className="text-green-400 mx-auto" />
                        ) : value === '−' ? (
                          <span className="text-slate-500">−</span>
                        ) : (
                          <span className="text-white">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-12 rounded-3xl border border-blue-500/20 backdrop-blur-xl"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get <span className="text-blue-400">Started?</span>
            </h2>
            <p className="text-xl text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let's bring your digital vision to life
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-300">Contact Information</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Mail size={20} className="text-blue-400" />
                    <span>info@tanshidigital.com</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Phone size={20} className="text-blue-400" />
                    <span>+260 571 442 097</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Globe size={20} className="text-blue-400" />
                    <span>tanshidigital.com</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <MapPin size={20} className="text-blue-400" />
                    <span>Lusaka, Zambia</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-300">Why Choose Tanshi?</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Local Expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Affordable Pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Modern Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Ongoing Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Quality Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/contact" passHref legacyBehavior>
  <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl border border-blue-500/30 mx-auto"
            >
              <Target size={24} />
              Get Free Consultation
              <ArrowRight size={20} />
            </motion.a>
</Link>
            

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <strong>Note:</strong> All prices are in Zambian Kwacha (ZMW). Current exchange rate: $1 = K24. 
                Free consultation available!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default WebDevelopmentPage;

