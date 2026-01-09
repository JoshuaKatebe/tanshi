'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Lock } from 'lucide-react';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300">
            <div className="container mx-auto px-6 py-12 max-w-4xl">
                <Link href="/checkout" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                    <ArrowLeft size={20} /> Back to Checkout
                </Link>

                <header className="mb-12 border-b border-slate-800 pb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
                    <p className="text-lg text-slate-400">Please read these terms carefully before using our services.</p>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <FileText className="text-blue-500" /> 1. Agreement to Terms
                        </h2>
                        <p className="leading-relaxed">
                            By accessing our website and using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Shield className="text-blue-500" /> 2. Services
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Tanshi Digital Solutions provides web development, software engineering, and related digital services. We reserve the right to withdraw or amend our service, and any service or material we provide, in our sole discretion without notice.
                        </p>
                        <p className="leading-relaxed">
                            We will not be liable if for any reason all or any part of our services are unavailable at any time or for any period.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Lock className="text-blue-500" /> 3. Privacy & Data Protection
                        </h2>
                        <p className="leading-relaxed">
                            Your use of our services is also governed by our Privacy Policy. We are committed to protecting your personal information and processing it in accordance with applicable data protection laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Payment Terms</h2>
                        <p className="leading-relaxed">
                            Payments for services are due as specified in your individual service agreement or invoice. All prices are subject to change without notice. We accept various payment methods including mobile money key providers (Airtel, MTN, Zamtel).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
                        <p className="leading-relaxed">
                            The content, features, and functionality of our services are and will remain the exclusive property of Tanshi Digital Solutions and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Tanshi Digital Solutions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have any questions about these Terms, please contact us at: <br />
                            <span className="text-blue-400">info@tanshidigital.com</span>
                        </p>
                    </section>
                </div>

                <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} Tanshi Digital Solutions. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default TermsPage;
