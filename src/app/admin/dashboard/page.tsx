'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Lock, 
  User, 
  AlertCircle, 
  Loader2, 
  Shield, 
  PlusCircle, 
  Package, 
  CheckCircle, 
  X, 
  Info, 
  RefreshCw,
  LogOut,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  ChevronDown,
  Edit,
  Trash2,
  Filter,
  Search,
  MoreHorizontal
} from 'lucide-react';

interface Quote {
  id: string;
  order_id: string;
  package_name: string;
  total_price: number;
  status: string;
  created_at: string;
  progress_messages?: Array<{
    id: string;
    message: string;
    status: string;
    created_at: string;
  }>;
}

// Floating background orbs component
const FloatingOrb = ({ size, color, delay, duration, x, y }: {
  size: string;
  color: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) => (
  <motion.div
    className={`absolute ${size} ${color} rounded-full opacity-10 blur-xl`}
    style={{ left: x, top: y }}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'submitted':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
      {status.replace('_', ' ').toUpperCase()}
    </span>
  );
};

// Stats card component
const StatsCard = ({ title, value, icon: Icon, trend, trendValue }: {
  title: string;
  value: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  trend?: 'up' | 'down';
  trendValue?: string;
}) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-xl shadow-xl"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl">
        <Icon size={24} className="text-blue-300" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          <TrendingUp size={16} className={trend === 'down' ? 'rotate-180' : ''} />
          {trendValue}
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-blue-200/70 text-sm">{title}</p>
  </motion.div>
);

// Quote card component
const QuoteCard = ({ quote, index, onUpdateProgress }: {
  quote: Quote;
  index: number;
  onUpdateProgress: (quote: Quote) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5, scale: 1.01 }}
    className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 p-6 rounded-2xl border border-blue-500/20 shadow-xl backdrop-blur-sm relative overflow-hidden group"
  >
    {/* Subtle glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <Package size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Order #{quote.order_id}</h3>
            <p className="text-blue-200/70 text-sm">{quote.package_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={quote.status} />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <MoreHorizontal size={16} />
          </motion.button>
        </div>
      </div>

      {/* Quote details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-green-400" />
          <span className="text-white font-semibold">K{quote.total_price.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-400" />
          <span className="text-blue-200/80 text-sm">
            {new Date(quote.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Progress section */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Clock size={16} className="text-blue-400" />
          Progress Updates
        </h4>
        {quote.progress_messages && quote.progress_messages.length > 0 ? (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {quote.progress_messages.map((message: { id: string; message: string; created_at: string }, idx: number) => (
              <div key={message.id} className="flex items-start gap-3 p-3 bg-blue-900/20 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-blue-100/90 text-sm">{message.message}</p>
                  <p className="text-blue-300/60 text-xs mt-1">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-blue-200/60 text-sm italic">No progress updates yet</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onUpdateProgress(quote)}
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
        >
          <PlusCircle size={16} />
          Update Progress
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 border border-blue-500/30 text-blue-300 rounded-lg font-medium text-sm hover:bg-blue-500/10 transition-colors"
        >
          <Eye size={16} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const AdminDashboardPage = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [progressStatus, setProgressStatus] = useState('info');
  const [updateQuoteStatus, setUpdateQuoteStatus] = useState(false);
  const [newQuoteStatus, setNewQuoteStatus] = useState('');
  
// Helper function to calculate revenue
  const calculateRevenue = (quotes: Quote[]) => {
    let revenue = 0;
    quotes.forEach(({ total_price, status }) => {
      if (status === 'completed') {
        revenue += total_price;
      } else if (status === 'in_progress' || status === 'submitted') {
        revenue += total_price / 2;
      }
    });
    return revenue;
  };

  // Function to fetch quotes from database
  const fetchQuotes = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/admin/quotes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to fetch quotes');
      }

      const data = await response.json();
      if (data.success) {
        setQuotes(data.quotes);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch quotes');
      }
    } catch (err) {
      setError('Unable to fetch quotes. Please try again.');
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleUpdateProgress = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowProgressModal(true);
    setProgressMessage('');
    setProgressStatus('info');
    setUpdateQuoteStatus(false);
    setNewQuoteStatus(quote.status);
  };

  const submitProgressUpdate = async () => {
    if (!selectedQuote || !progressMessage.trim()) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Log the data being sent
    const requestData = {
      quote_id: selectedQuote.id,
      message: progressMessage,
      status: progressStatus,
      update_quote_status: updateQuoteStatus ? newQuoteStatus : null
    };
    
    console.log('[Admin Dashboard] Submitting progress update:', requestData);
    console.log('[Admin Dashboard] Update quote status?', updateQuoteStatus);
    console.log('[Admin Dashboard] New quote status:', newQuoteStatus);

    try {
      const response = await fetch('/api/admin/progress', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      const data = await response.json();
      
      console.log('[Admin Dashboard] Response:', data);
      
      if (data.success) {
        setShowProgressModal(false);
        fetchQuotes(); // Refresh the quotes
        setError(''); // Clear any previous errors
      } else {
        throw new Error(data.message || 'Failed to update progress');
      }
    } catch (err) {
      console.error('[Admin Dashboard] Error updating progress:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update progress';
      setError(`Error: ${errorMessage}. Please check console for details.`);
      
      // Don't close the modal on error so user can see what happened
      // setShowProgressModal(false);
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesFilter = filter === 'all' || quote.status === filter;
    const matchesSearch = quote.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.package_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { title: 'Total Orders', value: quotes.length.toString(), icon: Package, trend: 'up' as const, trendValue: '+12%' },
    { title: 'Active Projects', value: quotes.filter(q => q.status === 'in_progress').length.toString(), icon: Clock, trend: 'up' as const, trendValue: '+3' },
    { title: 'Revenue (Monthly)', value: `K${calculateRevenue(quotes).toLocaleString()}`, icon: DollarSign, trend: 'up' as const, trendValue: '+18%' },
    { title: 'Completion Rate', value: `${Math.round((quotes.filter(q => q.status === 'completed').length / quotes.length) * 100) || 0}%`, icon: CheckCircle, trend: 'up' as const, trendValue: '+5%' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <FloatingOrb size="w-64 h-64" color="bg-blue-500" delay={0} duration={8} x="10%" y="20%" />
        <FloatingOrb size="w-48 h-48" color="bg-cyan-500" delay={2} duration={10} x="80%" y="60%" />
        <FloatingOrb size="w-32 h-32" color="bg-blue-400" delay={4} duration={6} x="60%" y="10%" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-900/80 to-blue-900/60 backdrop-blur-xl border-b border-blue-500/20 sticky top-0 z-50"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Shield size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-blue-200/70 text-sm">Tanshi Digital Solutions</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main content */}
        <div className="container mx-auto px-6 py-8">
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 p-4 rounded-lg mb-6 border border-red-500/30 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
              </div>
            </motion.div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </div>

          {/* Filters and search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-slate-800/60 to-blue-900/40 backdrop-blur-xl p-6 rounded-2xl border border-blue-500/20 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-slate-800/50 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-slate-800/50 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Status</option>
                  <option value="submitted">Submitted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-blue-200/70">
                <span className="text-sm">
                  {filteredQuotes.length} of {quotes.length} orders
                </span>
              </div>
            </div>
          </motion.div>

          {/* Orders grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} onUpdateProgress={handleUpdateProgress} />
            ))}
          </div>

          {/* Empty state */}
          {filteredQuotes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Package size={32} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No orders found</h3>
              <p className="text-blue-200/70">
                {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter' : 'No orders available at the moment'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Progress Update Modal */}
      {showProgressModal && selectedQuote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowProgressModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-blue-500/20 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Update Progress</h3>
              <button
                onClick={() => setShowProgressModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Order: {selectedQuote.order_id}
                </label>
                <p className="text-sm text-blue-200/70">{selectedQuote.package_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Progress Message
                </label>
                <textarea
                  value={progressMessage}
                  onChange={(e) => setProgressMessage(e.target.value)}
                  placeholder="Enter progress update message..."
                  className="w-full px-3 py-2 bg-slate-700/50 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Message Type
                </label>
                <select
                  value={progressStatus}
                  onChange={(e) => setProgressStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="payment">Payment</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="updateStatus"
                  checked={updateQuoteStatus}
                  onChange={(e) => setUpdateQuoteStatus(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-blue-500/30 rounded focus:ring-blue-500/20"
                />
                <label htmlFor="updateStatus" className="text-sm text-blue-200">
                  Update project status
                </label>
              </div>

              {updateQuoteStatus && (
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    New Status
                  </label>
                  <select
                    value={newQuoteStatus}
                    onChange={(e) => setNewQuoteStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700/50 text-white rounded-lg border border-blue-500/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="submitted">Submitted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowProgressModal(false)}
                className="flex-1 px-4 py-2 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitProgressUpdate}
                disabled={!progressMessage.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-cyan-700 transition-colors"
              >
                Update Progress
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
