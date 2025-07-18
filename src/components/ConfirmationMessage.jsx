import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Download, MessageCircle, ArrowLeft } from 'lucide-react';

const ConfirmationMessage = ({ orderNumber, onBack, onDownload, onWhatsApp }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 p-8 rounded-3xl shadow-2xl border border-green-500/30 backdrop-blur-xl"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex"
        >
          <div className="bg-green-500/20 p-4 rounded-full mb-6">
            <CheckCircle size={64} className="text-green-400" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-4 text-white"
        >
          Quote Request Submitted!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/60 p-6 rounded-2xl mb-6 border border-slate-600"
        >
          <p className="text-lg text-slate-300 mb-3">
            Thank you for your interest in our web development services.
          </p>
          <p className="text-2xl font-bold text-blue-400 mb-3">
            Your Order Number: #{orderNumber}
          </p>
          <p className="text-sm text-slate-400">
            Please save this number for future reference
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-3">What happens next?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-600">
              <div className="text-blue-400 font-bold mb-2">1. Review</div>
              <p className="text-sm text-slate-300">
                Our team will review your requirements and prepare a detailed quote
              </p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-600">
              <div className="text-blue-400 font-bold mb-2">2. Contact</div>
              <p className="text-sm text-slate-300">
                We'll reach out within 24 hours with your personalized quote
              </p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-600">
              <div className="text-blue-400 font-bold mb-2">3. Discuss</div>
              <p className="text-sm text-slate-300">
                We'll discuss the project details and answer any questions
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onWhatsApp}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownload}
            className="border-2 border-blue-400/50 text-blue-200 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download Summary
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="border-2 border-slate-600 text-slate-300 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Calculator
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
        >
          <p className="text-blue-200 text-sm">
            <strong>Need immediate assistance?</strong> Call us at{' '}
            <a href="tel:+260761583901" className="underline hover:text-blue-300">
              +260 761 583 901
            </a>{' '}
            or email{' '}
            <a href="mailto:info@tanshidigitalsolutions.site" className="underline hover:text-blue-300">
              info@tanshidigitalsolutions.site
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConfirmationMessage;
