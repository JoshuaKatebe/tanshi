'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
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
  X
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
      price: 150, 
      pages: 1, 
      description: 'Perfect for Getting Started', 
      domain: 'Subdomain included', 
      hosting: 'Free (Static)', 
      time: '3-5 days',
      color: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        'Single scrolling page design',
        'Mobile-responsive layout',
        'Basic contact information',
        'Social media integration',
        'Professional design',
        'Basic SEO setup'
      ],
      useCases: [
        'Personal portfolios',
        'Event announcements',
        'Digital business cards',
        'Simple landing pages',
        'Product launches'
      ],
      businesses: ['Freelancers', 'Artists', 'Small events', 'Personal brands']
    },
    { 
      name: 'STARTER', 
      price: 600, 
      pages: 5, 
      description: 'Essential Business Presence', 
      domain: 'Domain included (up to K120)', 
      hosting: 'Free (Static)', 
      time: '1-2 weeks',
      color: 'from-green-500 to-emerald-500',
      popular: false,
      features: [
        '5 professional pages',
        'Mobile-optimized design',
        'Basic contact form',
        'Domain included',
        'SEO-friendly structure',
        'Google Maps integration',
        'Image gallery',
        'WhatsApp integration (FREE)',
        'Blog system (FREE)'
      ],
      useCases: [
        'Business websites',
        'Service showcases',
        'Company profiles',
        'Portfolio sites',
        'Small business presence'
      ],
      businesses: ['Small businesses', 'Freelancers', 'Startups', 'Consultants']
    },
    { 
      name: 'PRO', 
      price: 1500, 
      pages: 10, 
      description: 'Complete Professional Website', 
      domain: 'Domain included (up to K264)', 
      hosting: 'Free (Static)', 
      time: '2-3 weeks',
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        'Up to 10 pages',
        'Advanced contact forms',
        'Image gallery/portfolio',
        'Google Maps integration',
        'Basic analytics setup',
        'Professional email setup',
        'Advanced SEO optimization',
        'WhatsApp integration (FREE)',
        'Blog system (FREE)',
        'Social media feeds'
      ],
      useCases: [
        'Professional services',
        'E-commerce ready',
        'Content marketing',
        'Lead generation',
        'Brand showcase'
      ],
      businesses: ['Established businesses', 'Service providers', 'Consultants', 'Agencies']
    },
    { 
      name: 'BUSINESS', 
      price: 2500, 
      pages: 20, 
      description: 'Advanced Functionality', 
      domain: '.com domain included', 
      hosting: 'Client Paid', 
      time: '3-4 weeks',
      color: 'from-orange-500 to-red-500',
      popular: false,
      features: [
        'Up to 20 pages',
        'Backend functionality',
        'User login & dashboard',
        'Content management system',
        'Basic e-commerce (FREE)',
        'Email integration',
        'Payment integration (FREE)',
        'Advanced forms',
        'Multi-user access',
        'Analytics & reporting'
      ],
      useCases: [
        'Online stores',
        'Membership sites',
        'Service booking',
        'Customer portals',
        'Complex business needs'
      ],
      businesses: ['Growing businesses', 'Online stores', 'Service companies', 'Membership sites']
    },
    { 
      name: 'ENTERPRISE', 
      price: 5000, 
      pages: 'Unlimited', 
      description: 'Custom Solutions', 
      domain: 'Any domain', 
      hosting: 'Negotiable', 
      time: '4-8 weeks',
      color: 'from-indigo-500 to-purple-500',
      popular: false,
      features: [
        'Unlimited pages',
        'Full-scale systems (POS, ERP, Inventory, CRM)',
        'Custom dashboards',
        'Advanced integrations',
        'Multi-user access levels',
        'Custom development',
        'Priority support',
        'Advanced security',
        'Performance optimization',
        'Custom training'
      ],
      useCases: [
        'Enterprise systems',
        'Complex workflows',
        'Multi-location businesses',
        'Custom integrations',
        'Large-scale operations'
      ],
      businesses: ['Large businesses', 'Corporations', 'Complex requirements', 'Multi-branch operations']
    }
  ];

  const features = [
    { 
      id: 'email', 
      name: 'Professional Email', 
      price: 40, 
      monthly: true, 
      description: 'Custom email setup (contact@yourdomain.com)', 
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
      description: 'Search engine optimization + analytics', 
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
      price: 0, 
      description: 'Live chat button (FREE with K600+ packages)', 
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
      price: 500, 
      description: 'Online store functionality (FREE for K2500+ packages)', 
      icon: ShoppingCart,
      details: {
        whatItIs: 'Complete online store with product catalog and checkout',
        whyNeedIt: 'Sell products 24/7 without physical store limitations',
        howItWorks: 'We build a secure online store with payment processing',
        benefits: ['Sell online 24/7', 'Reach more customers', 'Reduce overhead costs', 'Track inventory']
      }
    },
    { 
      id: 'blog', 
      name: 'Blog System', 
      price: 100, 
      description: 'Content management for regular updates (FREE for K600+ packages)', 
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
      price: 150, 
      description: 'Live social media integration', 
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
      price: 100, 
      description: 'Advanced contact/booking forms', 
      icon: FileText,
      details: {
        whatItIs: 'Customized forms for specific business needs',
        whyNeedIt: 'Collect specific information from customers efficiently',
        howItWorks: 'We create forms tailored to your business processes',
        benefits: ['Better lead qualification', 'Streamlined processes', 'Data collection', 'Professional appearance']
      }
    },
    { 
      id: 'multilang', 
      name: 'Multi-language', 
      price: 300, 
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
      description: 'Set up billing with cards and mobile money (FREE for K2500+ packages)', 
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
      description: 'Domains exceeding package allowance', 
      icon: Award,
      details: {
        whatItIs: 'Premium domain names (.com, .org, etc.)',
        whyNeedIt: 'Better branding and easier to remember',
        howItWorks: 'We help you choose and register the perfect domain',
        benefits: ['Better branding', 'Easier to remember', 'Professional appearance', 'Better SEO']
      }
    }
  ];

  const maintenancePlans = [
    { 
      name: 'Basic Maintenance', 
      price: 100, 
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
      price: 250, 
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
      price: 500, 
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
        
        if (featureId === 'whatsapp' && selectedPackage >= 600) featurePrice = 0;
        if (featureId === 'ecommerce' && selectedPackage >= 2500) featurePrice = 0;
        if (featureId === 'blog' && selectedPackage >= 600) featurePrice = 0;
        if (featureId === 'payment' && selectedPackage >= 2500) featurePrice = 0;
        
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

