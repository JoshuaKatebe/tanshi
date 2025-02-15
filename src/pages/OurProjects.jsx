'use client';

import React from 'react';
import WayDash from '/src/assets/WayDash.png';
import AgriDash from '/src/assets/AgriDash.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LifebuoyIcon, NewspaperIcon, PhoneIcon, CodeBracketIcon } from '@heroicons/react/20/solid';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Powered by ICP',
    description:
      'Decentralized technology for enhanced transparency.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure',
    description: 'Easy and secure online ticket booking.',
    icon: LockClosedIcon,
  },
  {
    name: 'Design',
    description: 'An intuitive interface designed for all users.',
    icon: ServerIcon,
  },
]

const features2 = [
    {
      name: 'For the People',
      description:
        'Aimed at promoting agricultural growth and resilience.',
      icon: CloudArrowUpIcon,
    },
    {
      name: 'Secure',
      description: 'Digital representation of land ownership through NFTs.',
      icon: LockClosedIcon,
    },
    {
      name: 'Design',
      description: 'A user-friendly dashboard to track investments.',
      icon: ServerIcon,
    },
  ]

export default function OurProjects() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <Header/>
      <section className="py-16 bg-gray-100" id="hero">
  <div className="relative isolate px-6 pt-14 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      style={{
        backgroundImage: `url('/src/assets/back2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        Our Projects: Transforming Ideas into Reality
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
        At Tanshi Digital Solutions, we believe in the power of technology to solve real-world challenges. Our projects reflect our dedication to innovation, accessibility, and making a meaningful impact on our communities. Here’s a closer look at some of our key initiatives.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* About Us Section */}
      <section className="py-16 bg-gray-100" id="about">
      <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">WayFare: Revolutionizing Bus Travel in Zambia</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              WayFare is a web3-based bus ticketing platform that simplifies inter-provincial travel in Zambia. Built with Motoko and React on the Internet Computer, WayFare makes it easy for users to book tickets securely and efficiently. By leveraging decentralization, we’ve enhanced data security, reduced costs, and provided users with a seamless travel planning experience.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={WayDash}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
</section>

      {/* Services Section */}
      <section className="py-16 bg-gray-100" id="about">
      <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">AgriLink: Empowering Agriculture Through Technology</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              AgriLink is an AgriTech platform designed to empower farmers and investors in Zambia. It facilitates impactful agricultural investments, even during challenging times like droughts or economic difficulties. By integrating NFTs to represent land ownership, AgriLink bridges the gap between technology and sustainable farming.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features2.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={AgriDash}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
</section>

      {/* Promo Section */}
      <section className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Computer Literacy Program: Bridging the Knowledge Gap</h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Our Computer Literacy Program is dedicated to empowering Zambians with essential digital skills. For just K50 per month, participants can learn everything from basic computer operations to advanced topics like OS installation, driver updates, and programming. 
        This program aims to equip individuals with the knowledge and confidence to navigate the digital world, enhancing their career prospects and contributing to their personal growth.
      </p>
    </div>
    <div className="mt-12 text-center">
      <h3 className="text-2xl font-semibold text-gray-900">Program Highlights:</h3>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="transition-transform transform hover:scale-105 p-6 bg-white rounded-lg shadow-lg">
          <h4 className="text-lg font-bold text-gray-900">Beginner to Advanced Training</h4>
          <p className="mt-2 text-gray-700">Comprehensive training that caters to all skill levels, ensuring everyone can participate and learn.</p>
        </div>
        <div className="transition-transform transform hover:scale-105 p-6 bg-white rounded-lg shadow-lg">
          <h4 className="text-lg font-bold text-gray-900">Hands-on Sessions</h4>
          <p className="mt-2 text-gray-700">Engaging sessions that provide practical experience with both software and hardware components.</p>
        </div>
        <div className="transition-transform transform hover:scale-105 p-6 bg-white rounded-lg shadow-lg">
          <h4 className="text-lg font-bold text-gray-900">Affordable Pricing</h4>
          <p className="mt-2 text-gray-700">Our pricing structure is designed to be inclusive, making digital skills accessible to everyone.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Additional Content */}
      <section className="py-16 bg-gray-50" id="contact">
      <div className="bg-white py-16 lg:py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-center text-[--vivid-sky-blue]">Contact Us</h2>
    <p className="mt-6 text-center text-lg leading-8">
      Ready to transform your ideas into reality? Reach out to us today and let's build something amazing together.
    </p>
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in">
        <h3 className="text-lg font-semibold">Email</h3>
        <p className="mt-2 text-lg text-[--picton-blue] hover:underline">
          <a href="mailto:tanshidigitalsolutions@gmail.com">tanshidigitalsolutions@gmail.com</a>
        </p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in">
        <h3 className="text-lg font-semibold">Phone</h3>
        <p className="mt-2 text-lg text-[--picton-blue]">+260761583901</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in">
        <h3 className="text-lg font-semibold">Location</h3>
        <p className="mt-2 text-lg text-gray-600">Lusaka, Zambia</p>
      </div>
    </div>
  </div>
</div>
      </section>

      <Footer/>
    </div>
  );
}
