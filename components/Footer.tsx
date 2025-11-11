import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-[#0E0E0E] to-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-10 sm:py-14">
        {/* Glass card container */}
        <div 
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(14,14,14,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(163,255,0,0.18)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45), 0 0 28px rgba(0,255,255,0.12)',
          }}
        >
          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 - Brand */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Dent-Vision <span className="text-[#A3FF00]">AI</span>
                </h2>
                <p className="text-dv-muted mt-2">Workshop Management System</p>
              </div>
              
              <div className="space-y-3">
                <p className="text-dv-muted">AI-POWERED WORKSHOP MANAGEMENT SYSTEM</p>
              </div>
            </div>

            {/* Column 2 - Product */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {[
                  { name: 'How It Works', href: '#how-it-works' },
                  { name: 'Website Widget', href: '#widget' },
                  { name: 'Pricing', href: '#pricing' },
                  { name: 'ROI Calculator', href: '#roi' },
                  { name: 'See Demo', href: '#demo' },
                  { name: 'Partner Portal', href: '/portal' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-dv-muted hover:text-[#A3FF00] transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Resources & Company */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  {[
                    { name: 'FAQ', href: '/faq' },
                    { name: 'Docs & Guides', href: '/docs' },
                    { name: 'System Status', href: '/status' },
                    { name: 'Case Studies', href: '/case-studies' },
                    { name: 'Support', href: '/support' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-dv-muted hover:text-[#A3FF00] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  {[
                    { name: 'About', href: '/about' },
                    { name: 'Contact', href: '/contact' },
                    { name: 'Partners', href: '/partners' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-dv-muted hover:text-[#A3FF00] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4 - Legal & Contact */}
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  {[
                    { name: 'Privacy', href: '/privacy' },
                    { name: 'Terms', href: '/terms' },
                    { name: 'Cookies', href: '/cookies' },
                    { name: 'Disclaimer', href: '/disclaimer' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-dv-muted hover:text-[#A3FF00] transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <a 
                  href="mailto:contact@dent-vision.ai" 
                  className="text-dv-muted hover:text-[#A3FF00] transition-colors"
                >
                  contact@dent-vision.ai
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div 
            className="h-px my-8 w-full"
            style={{
              background: 'linear-gradient(90deg, rgba(0,255,255,.18), rgba(163,255,0,.18))',
            }}
          />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-sm text-dv-muted">
            <div> 2023 Dent Vision AI. All rights reserved.</div>
            <div className="text-center md:text-left mt-4 md:mt-0">
              <p className="text-sm">
                Dent-Vision AI is currently in beta testing. The platform assists PDR workshops and specialists through automated AI analysis and estimates based on your defined pricing and submitted photos. It includes tools for quotes, proposals, workflow tracking, technician management, and performance insights. As AI estimates are automated, variations may occur. Final repair costs must be confirmed after a physical inspection. By signing in, you acknowledge and accept these terms.
              </p>
              <p className="mt-2">
                2025 Dent-Vision AI • An Auto Care Quotes innovation | <a href="mailto:contact@dent-vision.ai" className="hover:text-[#A3FF00] transition-colors">contact@dent-vision.ai</a>
              </p>
                <option>EN</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
