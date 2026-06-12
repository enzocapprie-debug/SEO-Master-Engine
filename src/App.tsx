import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  FileCode, 
  Zap, 
  ShieldCheck, 
  Link2, 
  Laptop, 
  Search, 
  Activity, 
  CheckCircle2, 
  Flame,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import MetaTagOptimizer from './components/MetaTagOptimizer';
import SchemaGenerator from './components/SchemaGenerator';
import SpeedBooster from './components/SpeedBooster';
import RobotsTxtGenerator from './components/RobotsTxtGenerator';
import BacklinkStrategy from './components/BacklinkStrategy';

type TabId = 'meta' | 'schema' | 'speed' | 'robots' | 'backlinks';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('meta');

  // Interactive Global Domain settings
  const [globalDomain, setGlobalDomain] = useState('www.activatepro.cc');

  const tabs = [
    { id: 'meta', label: 'Meta Tags', icon: Globe },
    { id: 'schema', label: 'Schema (JSON-LD)', icon: FileCode },
    { id: 'speed', label: 'Speed & Performance', icon: Zap },
    { id: 'robots', label: 'Robots.txt', icon: ShieldCheck },
    { id: 'backlinks', label: 'Backlink Pro-Plan', icon: Link2 },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans selection:bg-[#58a6ff]/30 selection:text-[#58a6ff] pb-16">
      
      {/* Decorative top ambient bar */}
      <div className="h-1 bg-gradient-to-r from-sky-400 via-[#58a6ff] to-indigo-500 animate-pulse"></div>

      {/* Hero Header Section */}
      <header className="border-b border-[#30363d] bg-[#161b22]/70 backdrop-blur-md sticky top-0 z-50 py-4.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                SEO Engine Live
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              ActivatePro SEO Master Engine
            </h1>
            <p className="text-xs md:text-sm text-[#8b949e] mt-0.5">
              Complete code optimization, advanced scripts, and meta-architecture for{' '}
              <span className="text-[#58a6ff] font-mono font-medium underline select-all">{globalDomain}</span>
            </p>
          </div>

          {/* Interactive domain controller */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-1.5 flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-[#8b949e] pl-2 font-mono uppercase hidden sm:inline">
              Focus domain:
            </span>
            <input
              type="text"
              value={globalDomain}
              onChange={(e) => setGlobalDomain(e.target.value || 'www.activatepro.cc')}
              className="bg-[#161b22] border border-[#30363d] rounded px-2.5 py-1 text-xs font-mono text-[#58a6ff] focus:outline-none focus:border-[#58a6ff] transition-all min-w-[150px] flex-1 sm:flex-initial"
              placeholder="e.g. www.activatepro.cc"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* Core Stats Overview Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#161b22] border border-[#30363d] p-4.5 rounded-xl flex items-center gap-3.5 shadow-md">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider block">Indexability Score</span>
              <strong className="text-lg text-white font-mono block mt-0.5">100%</strong>
              <span className="text-[10px] text-[#8b949e] block mt-0.5">Canonical tags pre-configured</span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] p-4.5 rounded-xl flex items-center gap-3.5 shadow-md">
            <div className="p-2.5 bg-[#58a6ff]/10 text-[#58a6ff] rounded-lg border border-emerald-500/20" style={{ borderColor: 'rgba(88, 166, 255, 0.2)' }}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider block">Est. Page Speed Impact</span>
              <strong className="text-lg text-white font-mono block mt-0.5">+44% faster</strong>
              <span className="text-[10px] text-[#8b949e] block mt-0.5">Lazy Loading & script deferring</span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] p-4.5 rounded-xl flex items-center gap-3.5 shadow-md">
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider block">Structured Data</span>
              <strong className="text-lg text-white font-mono block mt-0.5">Automatic</strong>
              <span className="text-[10px] text-[#8b949e] block mt-0.5">JSON-LD Schema ready</span>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] p-4.5 rounded-xl flex items-center gap-3.5 shadow-md">
            <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider block">Domain Backlinks</span>
              <strong className="text-lg text-white font-mono block mt-0.5">Pro-Strategy</strong>
              <span className="text-[10px] text-[#8b949e] block mt-0.5">Deployed with free microtools</span>
            </div>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-1.5 shadow-md flex flex-wrap gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-[#21262d] text-white border border-[#30363d] shadow' 
                    : 'text-[#8b949e] hover:text-white hover:bg-[#1f242c]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#58a6ff]' : 'text-[#8b949e]'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content with Framer Motion Layout animations */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {activeTab === 'meta' && <MetaTagOptimizer />}
              {activeTab === 'schema' && <SchemaGenerator />}
              {activeTab === 'speed' && <SpeedBooster />}
              {activeTab === 'robots' && <RobotsTxtGenerator />}
              {activeTab === 'backlinks' && <BacklinkStrategy />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Informative Bosnian SEO FAQ Banner */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-[#30363d] pb-3">
            <Sparkles className="w-5 h-5 text-[#58a6ff]" />
            <h3 className="font-semibold text-white text-base">Quick Guide: Why & How to Apply These Optimizations?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#8b949e] leading-relaxed">
            <div className="space-y-2">
              <strong className="text-white block font-sans text-sm">1. Meta Tags Prevent Errors</strong>
              <p>
                Blogger has a tendency to generate duplicate content when creating archives or search pages. Robots meta directives bundled in our code solve this problem by directing Google to only index main posts and static pages.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-white block font-sans text-sm">2. Core Web Vitals are a Google Requirement</strong>
              <p>
                Page speed directly affects search rankings. Our Core Web Vitals script improves LCP and TBT by deferring heavy Blogger scripts and lazy loading images and media assets.
              </p>
            </div>
            <div className="space-y-2">
              <strong className="text-white block font-sans text-sm">3. Build Authority Completely Free</strong>
              <p>
                By hosting free, highly useful widgets on your subdomain (such as tools.activatepro.cc), you attract developers and administrators, securing permanent and authoritative natural backlinks.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-6 border-t border-[#30363d] text-center text-xs text-[#8b949e] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>ActivatePro SEO Master Engine © 2026. Code generated with maximum focus on Core Web Vitals and Google algorithm standards.</p>
        <div className="flex gap-4">
          <a href="#meta-tag-optimizer" className="hover:text-white transition-colors">Meta Optimizer</a>
          <span>•</span>
          <a href="#schema-generator" className="hover:text-white transition-colors">Schema Gen</a>
          <span>•</span>
          <a href="#speed-booster" className="hover:text-white transition-colors">Speed Booster</a>
        </div>
      </footer>
    </div>
  );
}
