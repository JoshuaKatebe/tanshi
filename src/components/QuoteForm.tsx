'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  FileText, 
  Upload, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader2,
  Users,
  MessageCircle
} from 'lucide-react';
import { sendQuoteConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email';

interface QuoteFormProps {
  packageData: {
    name: string;
    price: number;
    extraPages: number;
    addons: any[];
    maintenance: number;
    totalPrice: number;
    breakdown: any[];
  };
}

const QuoteForm: React.FC<QuoteFormProps> = ({ packageData }) => {
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    
    // Business Information
    businessSummary: '',
    projectGoals: '',
    
    // Referral
    referrerName: '',
    referralCode: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    orderId?: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // TODO: Handle file upload to Supabase Storage if file exists
      let fileUrl = null;
      if (file) {
        // This would be implemented with Supabase Storage
        // fileUrl = await uploadFile(file);
      }

      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package_name: packageData.name,
          package_price: packageData.price,
          extra_pages: packageData.extraPages,
          addons: packageData.addons,
          maintenance: packageData.maintenance,
          total_price: packageData.totalPrice,
          contact: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            contact_method: formData.contactMethod,
          },
          quote_details: {
            business_summary: formData.businessSummary,
            project_goals: formData.projectGoals,
            file_url: fileUrl,
          },
          referral: formData.referrerName ? {
            referrer_name: formData.referrerName,
            code: formData.referralCode,
          } : null,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({
          success: true,
          message: 'Quote submitted successfully!',
          orderId: result.order_id,
        });
        
        // Prevent duplicate email sends in development (React StrictMode)
        const emailSentKey = `email_sent_${result.order_id}`;
        if (typeof window !== 'undefined' && sessionStorage.getItem(emailSentKey)) {
          console.log('[QuoteForm] Emails already sent for this order, skipping...');
          return;
        }
        
        // Send email notifications
        console.log('[QuoteForm] Sending email notifications...');
        
        const emailData = {
          orderID: result.order_id,
          clientName: formData.name,
          clientEmail: formData.email,
          packageName: packageData.name,
          totalPrice: packageData.totalPrice,
          extraPages: packageData.extraPages,
          addons: packageData.addons.map((addon: any) => addon.name),
          maintenance: packageData.maintenance,
          businessSummary: formData.businessSummary,
          projectGoals: formData.projectGoals,
          contactMethod: formData.contactMethod,
          referrerName: formData.referrerName,
        };
        
        // Send client confirmation email
        try {
          console.log('[QuoteForm] Sending client confirmation email...');
          const clientEmailResult = await sendQuoteConfirmationEmail(emailData);
          console.log('[QuoteForm] Client email result:', clientEmailResult);
        } catch (error) {
          console.error('[QuoteForm] Failed to send client email:', error);
        }
        
        // Send admin notification email
        try {
          console.log('[QuoteForm] Sending admin notification email...');
          const adminEmailResult = await sendAdminNotificationEmail(emailData);
          console.log('[QuoteForm] Admin email result:', adminEmailResult);
        } catch (error) {
          console.error('[QuoteForm] Failed to send admin email:', error);
        }
        
        // Mark emails as sent
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(emailSentKey, 'true');
        }
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactMethod: 'email',
          businessSummary: '',
          projectGoals: '',
          referrerName: '',
          referralCode: '',
        });
        setFile(null);
      } else {
        throw new Error(result.message || 'Failed to submit quote');
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred while submitting your quote',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 p-8 rounded-3xl shadow-2xl border border-blue-500/20 backdrop-blur-xl"
    >
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Complete Your <span className="text-blue-400">Quote Request</span>
      </h2>

      {submitResult?.success ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Quote Submitted Successfully!</h3>
          <p className="text-blue-100 mb-4">Your order ID is:</p>
          <div className="bg-blue-500/20 border border-blue-400 rounded-xl p-4 inline-block mb-6">
            <code className="text-2xl font-mono text-blue-300">{submitResult.orderId}</code>
          </div>
          <p className="text-slate-300 mb-8">
            We've sent a confirmation email with your quote details and tracking information.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href={`/track-order?orderId=${submitResult.orderId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Track Your Order
            </a>
            <button
              onClick={() => setSubmitResult(null)}
              className="border border-blue-400 text-blue-300 hover:bg-blue-400/10 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Submit Another Quote
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <User className="text-blue-400" size={24} />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="+260 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Preferred Contact Method
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-400 focus:outline-none transition-colors"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Building className="text-blue-400" size={24} />
              Business Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Tell us about your business *
                </label>
                <textarea
                  name="businessSummary"
                  required
                  value={formData.businessSummary}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="Describe your business, products/services, and target audience..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Project Goals & Requirements
                </label>
                <textarea
                  name="projectGoals"
                  value={formData.projectGoals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="What do you want to achieve with your website? Any specific features or requirements?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Company Logo or Profile (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-lg text-slate-300 hover:border-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
                  >
                    <Upload size={20} />
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Information */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="text-blue-400" size={24} />
              Referral Information (Optional)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Referred By
                </label>
                <input
                  type="text"
                  name="referrerName"
                  value={formData.referrerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="Sales representative or friend's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Referral Code
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="Optional referral code"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {submitResult?.success === false && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-center gap-3"
            >
              <AlertCircle className="text-red-400" size={20} />
              <p className="text-red-200">{submitResult.message}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Submitting Quote...
              </>
            ) : (
              <>
                <Send size={24} />
                Submit Quote Request
              </>
            )}
          </motion.button>

          <p className="text-sm text-slate-400 text-center">
            By submitting this form, you agree to be contacted regarding your project requirements.
          </p>
        </form>
      )}
    </motion.div>
  );
};

export default QuoteForm;
