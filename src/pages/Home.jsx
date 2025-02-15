'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code, Phone, Laptop, FileCode, HelpCircle, Building2, PenTool } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// SEO Schema Markup
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Tanshi Digital Solutions",
  "description": "Professional web development, mobile app development, and IT services in Zambia. We specialize in creating modern, responsive websites and applications.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lusaka",
    "addressCountry": "Zambia"
  },
  "telephone": "+260761583901",
  "email": "tanshidigitalsolutions@gmail.com",
  "url": "https://tanshidigitalsolutions.site",
  "sameAs": [
    "https://facebook.com/tanshidigitalsolutions",
    "https://twitter.com/tanshidigitalsolutions"
  ],
  "priceRange": "$$",
  "openingHours": "Mo-Fr 08:00-17:00"
};

const services = [
  {
    name: 'Web Development',
    description: 'Custom, responsive websites built with modern technologies to help your business stand out online.',
    icon: Globe,
  },
  {
    name: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    icon: Code,
  },
  {
    name: 'Web3 Development',
    description: 'Blockchain solutions and decentralized applications for the future of the web.',
    icon: FileCode,
  },
  {
    name: 'IT Support',
    description: '24/7 technical support to keep your systems running smoothly and efficiently.',
    icon: HelpCircle,
  },
  {
    name: 'Company Registration',
    description: 'Streamlined PACRA registration services to help you start your business journey.',
    icon: Building2,
  },
  {
    name: 'Graphic Design',
    description: 'Eye-catching visual designs that communicate your brand message effectively.',
    icon: PenTool,
  },
];

export default function App() {
  return (
    <div className="bg-white">
      <Header />
      
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8 lg:py-56"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Tanshi Digital Solutions
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-8">
            Empowering businesses with cutting-edge digital solutions. From web development to IT support,
            we're your partner in digital transformation.
          </p>
          
          <div className="flex gap-4">
            <a href="#services" 
               className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition duration-300">
              Explore Services
            </a>
            <a href="#contact" 
               className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition duration-300">
              Contact Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.h2 
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                className="text-4xl font-bold text-gray-900"
              >
                About Tanshi Digital
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600"
              >
                At Tanshi Digital Solutions, we're passionate about crafting innovative digital solutions
                that make a difference. Based in Zambia, we specialize in web and mobile app development,
                Web3 solutions, IT support, and more.
              </motion.p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600">▹</span>
                      Deliver excellence
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600">▹</span>
                      Drive innovation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600">▹</span>
                      Empower growth
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Our Values</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600">▹</span>
                      Quality first
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600">▹</span>
                      Client success
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600">▹</span>
                      Innovation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              className="relative h-96 rounded-xl overflow-hidden bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent" />
              <Laptop className="w-32 h-32 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-900" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xl text-gray-300"
            >
              Comprehensive digital solutions for your business needs
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <service.icon className="w-8 h-8 text-indigo-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-500">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-6xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            🎉 New Year Special Offer
          </h2>
          <p className="text-xl text-white mb-8">
            Get started with a professional website for just K500!
            Limited time offer - contact us today!
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition duration-300"
          >
            Claim Offer
          </a>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600">Ready to transform your digital presence? Get in touch!</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: 'Phone', content: '+260 761583901' },
              { icon: Globe, title: 'Email', content: 'tanshidigitalsolutions@gmail.com' },
              { icon: Building2, title: 'Location', content: 'Lusaka, Zambia' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <item.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}