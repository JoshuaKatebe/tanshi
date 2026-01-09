'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle,
    CreditCard,
    Lock,
    ShieldCheck,
    Loader2,
    ArrowRight,
    User,
    Mail,
    Smartphone,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { initiatePayment, checkPaymentStatus, sendReceiptEmail } from './actions';

const CheckoutPage = () => {
    const [loading, setLoading] = useState(false);
    const [paymentStep, setPaymentStep] = useState('input'); // input, processing, authorizing, success
    const [selectedMethod, setSelectedMethod] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Pre-selected package details
    const packageDetails = {
        name: "Business Pro",
        price: 5000,
        features: [
            'Up to 20 pages',
            'Customer dashboards',
            'Basic CRM features',
            'Payment integrations',
            'Advanced analytics'
        ]
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!selectedMethod) {
            alert('Please select a payment method');
            return;
        }

        if (!acceptedTerms) {
            alert('Please accept terms and conditions');
            return;
        }

        setLoading(true);
        setPaymentStep('processing');

        const formData = new FormData(e.target);
        formData.append('package_name', packageDetails.name);
        // Note: Amount is handled in the server action for safety/testing (fixed to K1)
        formData.append('payment_method', selectedMethod);

        // 1. Initiate Payment
        const initResult = await initiatePayment(formData);

        if (!initResult.success) {
            setErrorMessage(initResult.error);
            setPaymentStep('input');
            setLoading(false);
            return;
        }

        const { depositId } = initResult;

        // 2. Poll for status
        setPaymentStep('authorizing');

        let attempts = 0;
        const maxAttempts = 24; // 2 minutes (approx 5s interval)
        const pollInterval = 5000;

        const poll = async () => {
            if (attempts >= maxAttempts) {
                setErrorMessage('Payment timed out. Please check your phone or try again.');
                setPaymentStep('input');
                setLoading(false);
                return;
            }

            attempts++;
            const statusResult = await checkPaymentStatus(depositId);

            if (statusResult.success) {
                if (statusResult.status === 'COMPLETED') {
                    // Payment Success!
                    // 3. Send Email
                    await sendReceiptEmail(
                        formData.get('email'),
                        packageDetails.name,
                        1, // Charged amount (K1)
                        selectedMethod
                    );

                    setPaymentStep('success');
                    setLoading(false);
                } else if (statusResult.status === 'FAILED' || statusResult.status === 'CANCELLED') {
                    setErrorMessage('Payment was failed or cancelled.');
                    setPaymentStep('input');
                    setLoading(false);
                } else {
                    // Still pending, wait and poll again
                    setTimeout(poll, pollInterval);
                }
            } else {
                // Error checking status, just retry
                setTimeout(poll, pollInterval);
            }
        };

        // Start polling
        setTimeout(poll, pollInterval);
    };

    const paymentMethods = [
        { id: 'Airtel Money', name: 'Airtel Money', logo: '/airtel_logo.png', color: 'border-red-500/50 bg-red-500/5' },
        { id: 'MTN Money', name: 'MTN Money', logo: '/mtn_logo.png', color: 'border-yellow-500/50 bg-yellow-500/5' },
        { id: 'Zamtel Money', name: 'Zamtel Money', logo: '/zamtel_logo.png', color: 'border-green-500/50 bg-green-500/5' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-sans selection:bg-blue-500/30">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-700" />
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-400 mb-4 hover:text-blue-300 transition-colors">
                        <CreditCard size={20} />
                        <span className="font-semibold tracking-wide">SECURE CHECKOUT</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                        Finalize Your Order
                    </h1>
                </motion.div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Left Column: Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 sticky top-8 hover:border-blue-500/40 transition-colors duration-500">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <ShieldCheck className="text-blue-400" />
                                Order Summary
                            </h2>

                            <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 rounded-2xl p-6 mb-8 border border-blue-500/10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{packageDetails.name}</h3>
                                        <span className="text-blue-300 text-sm">Professional Web Package</span>
                                    </div>
                                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/20">
                                        Selected
                                    </span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {packageDetails.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                                            <CheckCircle size={16} className="text-blue-400 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                                    <span className="text-slate-400">Total Price</span>
                                    <span className="text-3xl font-bold text-white">
                                        {new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(packageDetails.price)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-400 bg-slate-950/50 p-4 rounded-xl">
                                <Lock size={16} className="text-green-400" />
                                <p>Transactions are encrypted and secured. We never store your complete payment credentials.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Payment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <AnimatePresence mode="wait">
                            {paymentStep === 'input' && (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    {/* Personal Info */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-200 ml-1">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        name="name"
                                                        required
                                                        type="text"
                                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-blue-200 ml-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        name="email"
                                                        required
                                                        type="email"
                                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-blue-200 ml-1">Mobile Money Number</label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                <input
                                                    name="phone"
                                                    required
                                                    type="tel"
                                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                                                    placeholder="097 123 4567"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-white mb-4">Select Payment Method</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {paymentMethods.map((method) => (
                                                <div
                                                    key={method.id}
                                                    onClick={() => setSelectedMethod(method.id)}
                                                    className={`
                            relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 h-32
                            ${selectedMethod === method.id
                                                            ? `border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]`
                                                            : 'border-slate-800 bg-slate-900/30 hover:border-slate-600 hover:bg-slate-800'
                                                        }
                          `}
                                                >
                                                    {selectedMethod === method.id && (
                                                        <div className="absolute top-2 right-2 text-blue-400">
                                                            <CheckCircle size={20} className="fill-blue-500/20" />
                                                        </div>
                                                    )}
                                                    <div className="w-16 h-16 relative flex items-center justify-center">
                                                        {/* Using standard img tag as per requirement to verify local files */}
                                                        <img
                                                            src={method.logo}
                                                            alt={method.name}
                                                            className="object-contain max-w-full max-h-full drop-shadow-lg"
                                                        />
                                                    </div>
                                                    <span className={`text-sm font-medium ${selectedMethod === method.id ? 'text-blue-300' : 'text-slate-400'}`}>
                                                        {method.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Terms */}
                                    <div className="pt-4 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="terms"
                                                    checked={acceptedTerms}
                                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-600 bg-slate-900/50 checked:border-blue-500 checked:bg-blue-500 transition-all"
                                                />
                                                <CheckCircle className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={12} />
                                            </div>
                                            <label htmlFor="terms" className="text-sm text-slate-400 cursor-pointer select-none">
                                                I agree to the <Link href="/terms" className="text-blue-400 hover:underline">Terms & Conditions</Link> and <Link href="/terms" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                                            </label>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {errorMessage && (
                                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-center gap-3">
                                            <AlertCircle className="text-red-500" size={20} />
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        Pay Now <span className="bg-white/20 px-2 py-0.5 rounded text-sm">ZMW {packageDetails.price.toLocaleString()}</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>

                                </motion.form>
                            )}

                            {['processing', 'authorizing'].includes(paymentStep) && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-slate-900/50 border border-blue-500/20 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
                                >
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Smartphone className="text-blue-400 animate-pulse" size={32} />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {paymentStep === 'processing' ? 'Initiating Payment...' : 'Check Your Phone'}
                                    </h3>

                                    <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                                        {paymentStep === 'processing'
                                            ? 'Connecting to the payment gateway secure server.'
                                            : `We've sent a prompt to your number. Please enter your PIN to authorize the payment of ZMW ${packageDetails.price.toLocaleString()}.`}
                                    </p>

                                    {paymentStep === 'authorizing' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-8 flex items-center gap-2 text-sm text-blue-300 bg-blue-500/10 px-4 py-2 rounded-full"
                                        >
                                            <Loader2 className="animate-spin" size={14} />
                                            Waiting for confirmation...
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {paymentStep === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-500/30 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        type="spring"
                                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                                    >
                                        <CheckCircle className="text-white w-12 h-12" />
                                    </motion.div>

                                    <h3 className="text-3xl font-bold text-white mb-4">Payment Successful!</h3>

                                    <p className="text-green-200/80 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                                        Thank you for your business. Your transaction has been completed successfully.
                                    </p>

                                    <div className="bg-slate-900/50 rounded-xl p-6 mb-8 w-full max-w-sm border border-slate-700">
                                        <div className="flex items-center gap-3 text-slate-300 mb-2">
                                            <Mail className="text-blue-400" size={20} />
                                            <span>A receipt has been sent to your email.</span>
                                        </div>
                                    </div>

                                    <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex items-center gap-2">
                                        Return Home <ChevronRight size={18} />
                                    </Link>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
