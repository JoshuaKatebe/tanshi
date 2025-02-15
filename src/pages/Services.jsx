'use client';

import React from 'react';
import back3 from '/src/assets/back3.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { LifebuoyIcon, NewspaperIcon, PhoneIcon, CodeBracketIcon } from '@heroicons/react/20/solid';

const cards = [
  {
    name: 'Web Development',
    description: 'We create modern, responsive websites tailored to your business needs.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Mobile App Development',
    description: 'Custom mobile applications to bring your ideas to life on iOS and Android.',
    icon: NewspaperIcon,
  },
  {
    name: 'Web3 Development',
    description: 'Unlock the power of decentralization with our cutting-edge Web3 solutions.',
    icon: PhoneIcon,
  },
  {
    name: 'Graphic Design',
    description: 'Stand out with visually stunning graphics that leave a lasting impression.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Company Registration with PACRA',
    description: 'Simplify your company setup process with our PACRA registration services.',
    icon: NewspaperIcon,
  },
  {
    name: 'IT Support',
    description: 'Reliable IT support to keep your business running smoothly.',
    icon: PhoneIcon,
  },
  {
    name: 'Computer Lessons',
    description: 'Learn essential computer skills to stay competitive in the digital age.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Programming Lessons',
    description: 'Master the art of coding with hands-on programming lessons from experts.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Web App & Website Creation',
    description: 'Transform your vision into functional, user-friendly web applications.',
    icon: NewspaperIcon,
  },
];
const frequencies = [
    { value: 'once', label: 'One time Payment' },
    { value: 'monthly', label: 'Monthly Fee' },
  ]
  const tiers = [
    {
      name: 'Starter',
      id: 'tier-starter',
      href: '/contact',
      featured: false,
      description: 'Establish your online presence with a singular high quality webpage',
      price: { once: 'K200', monthly: 'K0' },
      mainFeatures: ['Single Webpage', 'High quality design', 'Product catalogue'],
    },
    {
      name: 'Premium',
      id: 'tier-scale',
      href: '/contact',
      featured: true,
      description: 'Our best premium Digtal Solution to take business to the next level',
      price: { once: 'K1500', monthly: 'K200' },
      mainFeatures: [
        'Online eccomerce store',
        'Unlimited Webpages',
        'Free IT surport',
        'online payment processing',
        'Custom Backend',
        'Free Graphics Design',
      ],
    },
    {
      name: 'Basic',
      id: 'tier-growth',
      href: '/contact',
      featured: false,
      description: 'Fully functioning website with upto 6 pages',
      price: { once: 'K500', monthly: 'K100' },
      mainFeatures: ['Fully functional website', 'Content Blog', 'Website Updates and upgrades', 'Monthly free IT support'],
    },
  ]
  const sections = [
    {
      name: 'Catered for business',
      features: [
        { name: 'Full online presence', tiers: { Starter: true, Premium: true, Basic: true } },
        { name: 'Quality Design and Development', tiers: { Starter: true, Premium: true, Basic: true } },
        { name: 'Number of WebPages', tiers: { Starter: '1 Webpage', Premium: 'Unlimited Webpages', Basic: '6 Webpages' } },
        { name: 'Monthly free IT suport', tiers: { Starter: '1', Premium: 'Unlimited ', Basic: '4' } },
        { name: 'Website Management', tiers: { Starter: false, Premium: true, Basic: true } },
        { name: 'Online Blog', tiers: { Starter: false, Premium: true, Basic: false } },
        { name: 'Free Website updates', tiers: { Starter: false, Premium: true, Basic: false } },
      ],
    },
    {
      name: 'Other perks',
      features: [
        { name: 'SSL security', tiers: { Starter: true, Premium: true, Basic: true } },
        { name: 'Online Security', tiers: { Starter: true, Premium: true, Basic: true } },
        { name: 'Graphic Design', tiers: { Starter: false, Premium: true, Basic: true } },
        { name: 'Search Engine Optimisation', tiers: { Starter: true, Premium: true, Basic: true } },
        { name: 'Multi Page Website', tiers: { Starter: false, Premium: true, Basic: true } },
        { name: 'Online Payment Processing', tiers: { Starter: false, Premium: true, Basic: false } },
        { name: 'Online Ecommerce Store', tiers: { Starter: false, Premium: true, Basic: false } },
      ],
    },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Sevices() {
    const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <Header/>
      <section className="py-16 bg-gray-100" id="services">
  <div className="relative isolate px-6 pt-14 lg:px-8">
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      style={{
        backgroundImage: `url(${back3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Our Services
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Discover a broad range of services tailored to meet your digital needs. From innovative web development to seamless mobile applications and reliable IT support, we are dedicated to empowering your business and ensuring your success in the digital landscape.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/contact"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </a>
          <a href="/about" className="text-sm font-semibold leading-6 text-gray-300">
            Learn More <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Services Section */}
      <section className="py-16" id="services">
  <div className="relative isolate overflow-hidden bg-gray-200 py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Our Services</h2>
        <p className="mt-6 text-lg leading-8 text-gray-700">
          Discover our wide range of services designed to meet your digital needs and empower your growth.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        {cards.map((card) => (
          <div key={card.name} className="flex gap-x-4 rounded-xl bg-white shadow-lg p-6 ring-1 ring-inset ring-gray-300 transition-transform transform hover:scale-105 animate-fade-in">
            <card.icon aria-hidden="true" className="h-7 w-5 flex-none text-indigo-400" />
            <div className="text-base leading-7">
              <h3 className="font-semibold text-gray-900">{card.name}</h3>
              <p className="mt-2 text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="/contact"
          className="inline-block bg-indigo-600 px-6 py-3 text-white text-sm font-semibold uppercase rounded-lg shadow-md hover:bg-indigo-500 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>

      {/* Promo Section */}
      <section className="py-16 bg-gradient-to-r from-[--mint-green] to-[--vivid-sky-blue] text-gray-900">
      <div className="bg-gradient-to-r from-[#ff80b5] to-[#9089fc] py-16 lg:py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-white animate-pulse">
      🎉 New Year Promo: Web Development Starting at K500! 🎉
    </h2>
    <p className="mt-4 text-lg leading-8 text-white">
      🚀 Kickstart your online presence with our special New Year offer! A single webpage for just K200! 
      Contact us today to learn more and elevate your business!
    </p>
    <a
      href="/contact"
      className="mt-8 inline-block bg-white px-6 py-3 text-sm font-semibold uppercase rounded-lg shadow-md hover:bg-[#ff6f61] transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
    >
      Get Started
    </a>
  </div>
</div>
      </section>

      <section>
      <div className="isolate overflow-hidden">
      <div className="flow-root bg-gray-900 pb-16 pt-24 sm:pt-32 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10">
            <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
              Web Development Prices
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
              We are commited to providing quality services no matter the your budget. Find out what works best for you price range
            </p>
            <div className="mt-16 flex justify-center">
              <fieldset aria-label="Payment frequency">
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
                >
                  {frequencies.map((option) => (
                    <Radio
                      key={option.value}
                      value={option}
                      className="cursor-pointer rounded-full px-2.5 py-1 data-[checked]:bg-indigo-500"
                    >
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
          </div>
          <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
            <svg
              viewBox="0 0 1208 1024"
              aria-hidden="true"
              className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
            >
              <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)" />
              <defs>
                <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div
              aria-hidden="true"
              className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
            />
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured
                    ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
                    : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                  'relative rounded-2xl',
                )}
              >
                <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? 'text-gray-900' : 'text-white',
                      'text-sm font-semibold leading-6',
                    )}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                    <div className="mt-2 flex items-center gap-x-4">
                      <p
                        className={classNames(
                          tier.featured ? 'text-gray-900' : 'text-white',
                          'text-4xl font-bold tracking-tight',
                        )}
                      >
                        {tier.price[frequency.value]}
                      </p>
                      <div className="text-sm leading-5">
                        <p className={tier.featured ? 'text-gray-900' : 'text-white'}>USD</p>
                        <p
                          className={tier.featured ? 'text-gray-500' : 'text-gray-400'}
                        >{`Billed ${frequency.value}`}</p>
                      </div>
                    </div>
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className={classNames(
                        tier.featured
                          ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                          : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                        'rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                      )}
                    >
                      Buy this plan
                    </a>
                  </div>
                  <div className="mt-8 flow-root sm:mt-10">
                    <ul
                      role="list"
                      className={classNames(
                        tier.featured
                          ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                          : 'divide-white/5 border-white/5 text-white',
                        '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0',
                      )}
                    >
                      {tier.mainFeatures.map((mainFeature) => (
                        <li key={mainFeature} className="flex gap-x-3 py-2">
                          <CheckIcon
                            aria-hidden="true"
                            className={classNames(
                              tier.featured ? 'text-indigo-600' : 'text-gray-500',
                              'h-6 w-5 flex-none',
                            )}
                          />
                          {mainFeature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative bg-gray-50 lg:pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          {/* Feature comparison (up to lg) */}
          <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
            <h2 id="mobile-comparison-heading" className="sr-only">
              Feature comparison
            </h2>

            <div className="mx-auto max-w-2xl space-y-16">
              {tiers.map((tier) => (
                <div key={tier.id} className="border-t border-gray-900/10">
                  <div
                    className={classNames(
                      tier.featured ? 'border-indigo-600' : 'border-transparent',
                      '-mt-px w-72 border-t-2 pt-10 md:w-80',
                    )}
                  >
                    <h3
                      className={classNames(
                        tier.featured ? 'text-indigo-600' : 'text-gray-900',
                        'text-sm font-semibold leading-6',
                      )}
                    >
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{tier.description}</p>
                  </div>

                  <div className="mt-10 space-y-10">
                    {sections.map((section) => (
                      <div key={section.name}>
                        <h4 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h4>
                        <div className="relative mt-6">
                          {/* Fake card background */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block"
                          />

                          <div
                            className={classNames(
                              tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                              'relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0',
                            )}
                          >
                            <dl className="divide-y divide-gray-200 text-sm leading-6">
                              {section.features.map((feature) => (
                                <div
                                  key={feature.name}
                                  className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                >
                                  <dt className="pr-4 text-gray-600">{feature.name}</dt>
                                  <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                    {typeof feature.tiers[tier.name] === 'string' ? (
                                      <span
                                        className={tier.featured ? 'font-semibold text-indigo-600' : 'text-gray-900'}
                                      >
                                        {feature.tiers[tier.name]}
                                      </span>
                                    ) : (
                                      <>
                                        {feature.tiers[tier.name] === true ? (
                                          <CheckIcon aria-hidden="true" className="mx-auto h-5 w-5 text-indigo-600" />
                                        ) : (
                                          <XMarkIcon aria-hidden="true" className="mx-auto h-5 w-5 text-gray-400" />
                                        )}

                                        <span className="sr-only">
                                          {feature.tiers[tier.name] === true ? 'Yes' : 'No'}
                                        </span>
                                      </>
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          {/* Fake card border */}
                          <div
                            aria-hidden="true"
                            className={classNames(
                              tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                              'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block',
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature comparison (lg+) */}
          <section aria-labelledby="comparison-heading" className="hidden lg:block">
            <h2 id="comparison-heading" className="sr-only">
              Feature comparison
            </h2>

            <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
              {tiers.map((tier) => (
                <div key={tier.id} aria-hidden="true" className="-mt-px">
                  <div
                    className={classNames(
                      tier.featured ? 'border-indigo-600' : 'border-transparent',
                      'border-t-2 pt-10',
                    )}
                  >
                    <p
                      className={classNames(
                        tier.featured ? 'text-indigo-600' : 'text-gray-900',
                        'text-sm font-semibold leading-6',
                      )}
                    >
                      {tier.name}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{tier.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="-mt-6 space-y-16">
              {sections.map((section) => (
                <div key={section.name}>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">{section.name}</h3>
                  <div className="relative -mx-8 mt-10">
                    {/* Fake card backgrounds */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    >
                      <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                      <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                      <div className="h-full w-full rounded-lg bg-white shadow-sm" />
                    </div>

                    <table className="relative w-full border-separate border-spacing-x-8">
                      <thead>
                        <tr className="text-left">
                          <th scope="col">
                            <span className="sr-only">Feature</span>
                          </th>
                          {tiers.map((tier) => (
                            <th key={tier.id} scope="col">
                              <span className="sr-only">{tier.name} tier</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.features.map((feature, featureIdx) => (
                          <tr key={feature.name}>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900"
                            >
                              {feature.name}
                              {featureIdx !== section.features.length - 1 ? (
                                <div className="absolute inset-x-8 mt-3 h-px bg-gray-200" />
                              ) : null}
                            </th>
                            {tiers.map((tier) => (
                              <td key={tier.id} className="relative w-1/4 px-4 py-0 text-center">
                                <span className="relative h-full w-full py-3">
                                  {typeof feature.tiers[tier.name] === 'string' ? (
                                    <span
                                      className={classNames(
                                        tier.featured ? 'font-semibold text-indigo-600' : 'text-gray-900',
                                        'text-sm leading-6',
                                      )}
                                    >
                                      {feature.tiers[tier.name]}
                                    </span>
                                  ) : (
                                    <>
                                      {feature.tiers[tier.name] === true ? (
                                        <CheckIcon aria-hidden="true" className="mx-auto h-5 w-5 text-indigo-600" />
                                      ) : (
                                        <XMarkIcon aria-hidden="true" className="mx-auto h-5 w-5 text-gray-400" />
                                      )}

                                      <span className="sr-only">
                                        {feature.tiers[tier.name] === true ? 'Yes' : 'No'}
                                      </span>
                                    </>
                                  )}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Fake card borders */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    >
                      {tiers.map((tier) => (
                        <div
                          key={tier.id}
                          className={classNames(
                            tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                            'rounded-lg',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
      </section>

     

      <Footer/>
    </div>
  );
}
