'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search, 
  Package, 
  CheckCircle, 
  Clock, 
  X, 
  Loader2,
  Mail,
  Phone,
  User,
  Calendar,
  DollarSign,
  FileText,
  Info,
  AlertCircle,
  CreditCard,
  Activity,
  Rocket,
  Copy,
  ExternalLink,
  MessageCircle,
  Building,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';

// Utility functions (you'll need to implement these based on your actual utils)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'submitted':
      return 'text-blue-400';
    case 'in_progress':
      return 'text-yellow-400';
    case 'completed':
      return 'text-green-400';
    case 'cancelled':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case 'submitted':
      return 'bg-blue-500/10 border-blue-500/20';
    case 'in_progress':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'completed':
      return 'bg-green-500/10 border-green-500/20';
    case 'cancelled':
      return 'bg-red-500/10 border-red-500/20';
    case 'payment':
      return 'bg-purple-500/10 border-purple-500/20';
    case 'success':
      return 'bg-green-500/10 border-green-500/20';
    case 'warning':
      return 'bg-yellow-500/10 border-yellow-500/20';
    case 'info':
      return 'bg-blue-500/10 border-blue-500/20';
    default:
      return 'bg-gray-500/10 border-gray-500/20';
  }
};

interface ProgressMessage {
  id: string;
  message: string;
  status: 'info' | 'success' | 'warning' | 'payment';
  created_at: string;
  created_by: string;
}

interface TrackingInfo {
  order_id: string;
  package_name: string;
  package_price: number;
  extra_pages: number;
  addons: any[];
  maintenance: number;
  total_price: number;
  status: 'submitted' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  contacts: Array<{
    name: string;
    email: string;
    phone?: string;
    contact_method: string;
  }>;
  quote_details: Array<{
    business_summary?: string;
    project_goals?: string;
    file_url?: string;
  }>;
  referrals: Array<{
    referrer_name?: string;
    code?: string;
  }>;
  progress_messages: ProgressMessage[];
}

const FloatingOrb = ({ size, color, delay, duration, x, y }: {
  size: string;
  color: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) => (
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

const TrackOrderPage = () => {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [hasCheckedUrl, setHasCheckedUrl] = useState(false);

  // Check for orderId in URL on component mount
  useEffect(() => {
    const urlOrderId = searchParams.get('orderId');
    if (urlOrderId && !hasCheckedUrl) {
      setOrderId(urlOrderId);
      setHasCheckedUrl(true);
      // Automatically fetch the order
      handleTrackOrder(urlOrderId);
    }
  }, [searchParams, hasCheckedUrl]);

  const handleTrackOrder = async (orderIdToTrack?: string) => {
    const idToUse = orderIdToTrack || orderId;
    
    if (!idToUse.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/track-order?orderId=${idToUse}`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        setTrackingInfo(null);
      } else {
        setTrackingInfo(data.quote);
      }
    } catch (err) {
      setError('Error fetching tracking information');
      setTrackingInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-5 h-5" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <X className="w-5 h-5" />;
      case 'payment':
        return <CreditCard className="w-5 h-5" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'payment':
        return 'text-purple-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateInvoiceData = () => {
    if (!trackingInfo) return null;
    
    const contact = trackingInfo.contacts[0];
    const invoiceData = {
      orderID: trackingInfo.order_id,
      clientName: contact?.name || 'N/A',
      clientEmail: contact?.email || 'N/A',
      packageName: trackingInfo.package_name,
      packagePrice: trackingInfo.package_price,
      extraPages: trackingInfo.extra_pages,
      addons: trackingInfo.addons,
      maintenance: trackingInfo.maintenance,
      totalPrice: trackingInfo.total_price,
      status: trackingInfo.status,
      createdAt: trackingInfo.created_at,
      updatedAt: trackingInfo.updated_at
    };
    
    return invoiceData;
  };

  const downloadReport = () => {
    if (!trackingInfo) return;
    
    const contact = trackingInfo.contacts[0];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Item,Details\n";
    csvContent += `"Order ID","${trackingInfo.order_id}"\n`;
    csvContent += `"Client Name","${contact?.name || 'N/A'}"\n`;
    csvContent += `"Client Email","${contact?.email || 'N/A'}"\n`;
    csvContent += `"Package","${trackingInfo.package_name}"\n`;
    csvContent += `"Package Price","K${trackingInfo.package_price}"\n`;
    csvContent += `"Extra Pages","${trackingInfo.extra_pages}"\n`;
    csvContent += `"Maintenance","K${trackingInfo.maintenance}/month"\n`;
    csvContent += `"Total Price","K${trackingInfo.total_price}"\n`;
    csvContent += `"Status","${trackingInfo.status}"\n`;
    csvContent += `"Created","${formatDate(trackingInfo.created_at)}"\n`;
    csvContent += `"Last Updated","${formatDate(trackingInfo.updated_at)}"\n`;
    
    // Add addons
    if (trackingInfo.addons && trackingInfo.addons.length > 0) {
      csvContent += `"Add-ons","${trackingInfo.addons.map(addon => addon.name).join(', ')}"\n`;
    }
    
    // Add progress messages
    csvContent += "\n\nProgress Messages:\n";
    csvContent += "Date,Message,Status,Created By\n";
    trackingInfo.progress_messages.forEach(msg => {
      csvContent += `"${formatDate(msg.created_at)}","${msg.message}","${msg.status}","${msg.created_by}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `order_report_${trackingInfo.order_id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <FloatingOrb size="w-64 h-64" color="bg-blue-500" delay={0} duration={8} x="10%" y="20%" />
        <FloatingOrb size="w-48 h-48" color="bg-cyan-500" delay={2} duration={10} x="80%" y="60%" />
        <FloatingOrb size="w-32 h-32" color="bg-blue-400" delay={4} duration={6} x="60%" y="10%" />
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl px-6 py-3 rounded-full text-white mb-8 border border-blue-500/30">
            <Package size={24} className="text-blue-300" />
            <span className="font-bold text-lg">Order Tracking</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Track Your <span className="text-blue-400">Project</span>
          </h1>
          <p className="text-blue-100/80 text-xl max-w-2xl mx-auto">
            Enter your order ID to see real-time updates on your project progress
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., TDS-QT-12345)"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-blue-500/30 rounded-2xl text-white placeholder-blue-300/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTrackOrder()}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Search size={20} />
                )}
                {isLoading ? 'Tracking...' : 'Track Order'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl p-6 rounded-2xl text-center">
                <AlertCircle className="mx-auto mb-3 text-red-400" size={32} />
                <p className="text-red-300 text-lg font-medium">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tracking Information */}
        <AnimatePresence>
          {trackingInfo && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8"
            >
              {/* Order Overview */}
              <div className="lg:col-span-2 space-y-8">
                {/* Order Details Card */}
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/30 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                      <Package className="text-blue-300" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Order Details</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-blue-500/20">
                        <span className="text-blue-200/80">Order ID</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-mono">{trackingInfo.order_id}</span>
                          <button
                            onClick={() => copyToClipboard(trackingInfo.order_id)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-blue-500/20">
                        <span className="text-blue-200/80">Package</span>
                        <span className="text-white font-semibold">{trackingInfo.package_name}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-blue-500/20">
                        <span className="text-blue-200/80">Total Price</span>
                        <span className="text-green-400 font-bold text-lg">K{trackingInfo.total_price}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-blue-500/20">
                        <span className="text-blue-200/80">Status</span>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getStatusBgColor(trackingInfo.status)} border ${getStatusColor(trackingInfo.status)}`}>
                          {getStatusIcon(trackingInfo.status)}
                          <span className="capitalize font-semibold">{trackingInfo.status.replace('_', ' ')}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-blue-500/20">
                        <span className="text-blue-200/80">Created</span>
                        <span className="text-white">{formatDate(trackingInfo.created_at)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center py-3 border-b border-blue-500/20">
                        <span className="text-blue-200/80">Last Updated</span>
                        <span className="text-white">{formatDate(trackingInfo.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/30 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                      <Activity className="text-blue-300" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Progress Timeline</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {trackingInfo.progress_messages
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .map((progress, index) => (
                        <motion.div
                          key={progress.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`relative p-6 rounded-2xl border backdrop-blur-sm ${getStatusBgColor(progress.status)} group hover:scale-[1.02] transition-transform`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-xl ${getProgressColor(progress.status)} bg-current/20`}>
                              {getStatusIcon(progress.status)}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium mb-2">{progress.message}</p>
                              <div className="flex items-center gap-4 text-sm text-blue-200/60">
                                <span className="flex items-center gap-1">
                                  <Calendar size={14} />
                                  {formatDate(progress.created_at)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User size={14} />
                                  {progress.created_by}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                {trackingInfo.contacts && trackingInfo.contacts.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-xl p-6 rounded-3xl border border-blue-500/30 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                        <MessageCircle className="text-blue-300" size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-white">Contact Info</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {trackingInfo.contacts.map((contact, index) => (
                        <div key={index} className="p-4 bg-slate-800/30 rounded-xl border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <User size={16} className="text-blue-400" />
                            <span className="text-white font-medium">{contact.name}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Mail size={14} className="text-blue-400" />
                            <span className="text-blue-200/80 text-sm">{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-blue-400" />
                              <span className="text-blue-200/80 text-sm">{contact.phone}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-xl p-6 rounded-3xl border border-blue-500/30 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                      <Sparkles className="text-blue-300" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                  </div>
                  
                  <div className="space-y-3">
                    
                      <button className="w-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl hover:from-blue-600/30 hover:to-cyan-600/30 transition-all flex items-center gap-3">
                        
                        <MessageCircle size={16} />
                        Contact Support
                      </button>
                    
                    
                    <button 
                      onClick={() => setShowInvoiceModal(true)}
                      className="w-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl hover:from-blue-600/30 hover:to-cyan-600/30 transition-all flex items-center gap-3"
                    >
                      <ExternalLink size={16} />
                      View Invoice
                    </button>
                    
                    <button 
                      onClick={downloadReport}
                      className="w-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-200 px-4 py-3 rounded-xl hover:from-blue-600/30 hover:to-cyan-600/30 transition-all flex items-center gap-3"
                    >
                      <FileText size={16} />
                      Download Report
                    </button>
                  </div>
                </div>

                {/* Status Guide */}
                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-xl p-6 rounded-3xl border border-blue-500/30 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
                      <Info className="text-blue-300" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">Status Guide</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-blue-400" />
                      <span className="text-blue-200/80">Submitted - Order received</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Loader2 size={16} className="text-yellow-400" />
                      <span className="text-blue-200/80">In Progress - Work started</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-blue-200/80">Completed - Project finished</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Invoice Modal */}
      {showInvoiceModal && trackingInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowInvoiceModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-blue-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Invoice</h3>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Invoice Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b border-blue-500/20 pb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Tanshi Digital Solutions</h2>
                <p className="text-blue-200/70">Web Development & Digital Services</p>
                <p className="text-blue-200/70 text-sm">info@tanshidigitalsolutions.site | +260 761 583 901</p>
              </div>

              {/* Invoice Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Invoice Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200/70">Order ID:</span>
                      <span className="text-white font-mono">{trackingInfo.order_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200/70">Date:</span>
                      <span className="text-white">{formatDate(trackingInfo.created_at)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200/70">Status:</span>
                      <span className={`capitalize ${getStatusColor(trackingInfo.status)}`}>
                        {trackingInfo.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Client Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-200/70">Name:</span>
                      <span className="text-white">{trackingInfo.contacts[0]?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200/70">Email:</span>
                      <span className="text-white">{trackingInfo.contacts[0]?.email || 'N/A'}</span>
                    </div>
                    {trackingInfo.contacts[0]?.phone && (
                      <div className="flex justify-between">
                        <span className="text-blue-200/70">Phone:</span>
                        <span className="text-white">{trackingInfo.contacts[0].phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Items</h4>
                <div className="bg-slate-800/30 rounded-xl p-4 border border-blue-500/20">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-blue-500/20">
                      <div>
                        <span className="text-white font-medium">{trackingInfo.package_name}</span>
                        <p className="text-blue-200/70 text-sm">Base package</p>
                      </div>
                      <span className="text-green-400 font-semibold">K{trackingInfo.package_price.toLocaleString()}</span>
                    </div>
                    
                    {trackingInfo.extra_pages > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-blue-500/20">
                        <div>
                          <span className="text-white font-medium">Extra Pages</span>
                          <p className="text-blue-200/70 text-sm">{trackingInfo.extra_pages} additional pages</p>
                        </div>
                        <span className="text-green-400 font-semibold">K{(trackingInfo.extra_pages * 50).toLocaleString()}</span>
                      </div>
                    )}

                    {trackingInfo.addons && trackingInfo.addons.length > 0 && (
                      trackingInfo.addons.map((addon: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-blue-500/20">
                          <div>
                            <span className="text-white font-medium">{addon.name}</span>
                            <p className="text-blue-200/70 text-sm">Add-on service</p>
                          </div>
                          <span className="text-green-400 font-semibold">K{addon.price.toLocaleString()}</span>
                        </div>
                      ))
                    )}

                    {trackingInfo.maintenance > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-blue-500/20">
                        <div>
                          <span className="text-white font-medium">Monthly Maintenance</span>
                          <p className="text-blue-200/70 text-sm">Ongoing support & updates</p>
                        </div>
                        <span className="text-green-400 font-semibold">K{trackingInfo.maintenance.toLocaleString()}/month</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-blue-500/20">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-green-400">K{trackingInfo.total_price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-500/20">
                <h4 className="text-lg font-semibold text-white mb-2">Payment Information</h4>
                <p className="text-blue-200/70 text-sm mb-2">
                  Payment Terms: 50% upfront, 50% on completion
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-200/70">First Payment:</span>
                    <span className="text-green-400 font-semibold ml-2">
                      K{(trackingInfo.total_price / 2).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-200/70">Final Payment:</span>
                    <span className="text-green-400 font-semibold ml-2">
                      K{(trackingInfo.total_price / 2).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 px-4 py-2 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/10 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors"
              >
                Print Invoice
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TrackOrderPage;
