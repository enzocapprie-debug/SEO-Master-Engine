import React, { useState } from 'react';
import { RobotsConfig } from '../types';
import { ShieldCheck, Copy, Check, Info, Plus, Trash2, Eye, HelpCircle } from 'lucide-react';

export default function RobotsTxtGenerator() {
  const [domain, setDomain] = useState('https://www.activatepro.cc');
  const [disallowPaths, setDisallowPaths] = useState<string[]>(['/search']);
  const [sitemaps, setSitemaps] = useState<string[]>([
    'sitemap.xml',
    'sitemap-pages.xml'
  ]);
  const [copied, setCopied] = useState(false);
  const [newPath, setNewPath] = useState('');
  const [newSitemap, setNewSitemap] = useState('');
  const [allowAdSense, setAllowAdSense] = useState(true);

  const cleanDomain = (url: string) => {
    // Remove trailing slash if present
    return url.endsWith('/') ? url.slice(0, -1) : url;
  };

  const addDisallowPath = () => {
    if (newPath.trim() && !disallowPaths.includes(newPath.trim())) {
      // Ensure slash starts if they did not type it
      let pathToAdd = newPath.trim();
      if (!pathToAdd.startsWith('/')) {
        pathToAdd = '/' + pathToAdd;
      }
      setDisallowPaths([...disallowPaths, pathToAdd]);
      setNewPath('');
    }
  };

  const removeDisallowPath = (index: number) => {
    setDisallowPaths(disallowPaths.filter((_, i) => i !== index));
  };

  const addSitemap = () => {
    if (newSitemap.trim() && !sitemaps.includes(newSitemap.trim())) {
      setSitemaps([...sitemaps, newSitemap.trim()]);
      setNewSitemap('');
    }
  };

  const removeSitemap = (index: number) => {
    setSitemaps(sitemaps.filter((_, i) => i !== index));
  };

  const generateRobotsContent = (): string => {
    let content = '';

    if (allowAdSense) {
      content += `User-agent: Mediapartners-Google\nDisallow: \n\n`;
    }

    content += `User-agent: *\n`;
    
    if (disallowPaths.length === 0) {
      content += `Disallow: \n`;
    } else {
      disallowPaths.forEach(path => {
        content += `Disallow: ${path}\n`;
      });
    }
    
    content += `Allow: /\n\n`;

    const domainUrl = cleanDomain(domain);
    sitemaps.forEach(sm => {
      // Check if sm is complete url, if not prepend domain
      const schemaPrefix = sm.startsWith('http://') || sm.startsWith('https://');
      content += `Sitemap: ${schemaPrefix ? sm : `${domainUrl}/${sm}`}\n`;
    });

    return content.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateRobotsContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="robots-txt-generator">
      {/* Design Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white text-lg font-sans">Robots.txt Customization</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                Actual Blog Domain
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                placeholder="https://www.activatepro.cc"
              />
            </div>

            {/* AdSense permission checkbox */}
            <div className="flex items-start justify-between bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
              <div className="flex-1 pr-3">
                <label className="text-xs font-semibold text-white block">AdSense Crawler (Mediapartners)</label>
                <span className="text-[10px] text-[#8b949e] leading-snug block mt-0.5">
                  Allows the Google AdSense crawler to crawl all links to show relevant ads.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none mt-1">
                <input
                  type="checkbox"
                  checked={allowAdSense}
                  onChange={(e) => setAllowAdSense(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c9d1d9] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Disallow paths editor */}
            <div>
              <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                Disallowed Paths (Disallow)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newPath}
                  onChange={(e) => setNewPath(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addDisallowPath()}
                  className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-xs"
                  placeholder="E.g., /search or /archive"
                />
                <button
                  type="button"
                  onClick={addDisallowPath}
                  className="bg-[#30363d] hover:bg-[#8b949e] text-white rounded-lg px-3 py-1.5 cursor-pointer text-xs flex items-center justify-center gap-1 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="border border-[#30363d] rounded-lg bg-[#0d1117] p-2 space-y-1 max-h-24 overflow-y-auto">
                {disallowPaths.length === 0 ? (
                  <span className="text-[11px] text-[#8b949e] italic p-1 block">No disallowed paths (Everything is indexed)</span>
                ) : (
                  disallowPaths.map((path, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-[#c9d1d9] bg-[#161b22] px-2 py-0.5 rounded border border-[#30363d]">
                      <span className="font-mono text-[11px] text-rose-400 select-all">{path}</span>
                      <button
                        onClick={() => removeDisallowPath(idx)}
                        className="text-[#8b949e] hover:text-[#ff7b72] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sitemaps editor */}
            <div>
              <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                Sitemap Files
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSitemap}
                  onChange={(e) => setNewSitemap(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSitemap()}
                  className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-xs"
                  placeholder="E.g., sitemap.xml or sitemap-pages.xml"
                />
                <button
                  type="button"
                  onClick={addSitemap}
                  className="bg-[#30363d] hover:bg-[#8b949e] text-white rounded-lg px-3 py-1.5 cursor-pointer text-xs flex items-center justify-center gap-1 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="border border-[#30363d] rounded-lg bg-[#0d1117] p-2 space-y-1 max-h-24 overflow-y-auto">
                {sitemaps.length === 0 ? (
                  <span className="text-[11px] text-[#8b949e] italic p-1 block">Add a sitemap file</span>
                ) : (
                  sitemaps.map((sm, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-[#c9d1d9] bg-[#161b22] px-2 py-0.5 rounded border border-[#30363d]">
                      <span className="font-mono text-[11px] text-teal-400 select-all truncate">{sm}</span>
                      <button
                        onClick={() => removeSitemap(idx)}
                        className="text-[#8b949e] hover:text-[#ff7b72] transition-colors animate-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex-1 flex flex-col relative min-h-[350px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d] mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono">
                TXT PLAN
              </span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Generated Robots.txt</h4>
            </div>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                copied
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy File
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-[#0d1117] border border-[#30363d] rounded-lg p-4 font-mono text-xs leading-relaxed relative">
            <pre className="text-gray-300 overflow-x-auto whitespace-pre select-all">
              {generateRobotsContent()}
            </pre>
          </div>

          <div className="mt-4 bg-[#0d1117] border border-[#30363d] rounded-lg p-3 flex items-start gap-3">
            <div className="p-1 bg-[#30363d] text-emerald-400 border border-[#30363d] rounded">
              <Info className="w-4.5 h-4.5" />
            </div>
            <p className="text-xs text-[#8b949e] leading-snug">
              <strong className="text-[#c9d1d9] block mb-0.5 font-sans">How to configure in Blogger:</strong>
              Go to <strong>Settings</strong> in Blogger -&gt; scroll down to the <strong>Crawlers and indexing</strong> section -&gt; Enable the <code className="text-[#c9d1d9] bg-[#30363d] px-1 rounded">"Enable custom robots.txt"</code> option -&gt; Click on <code className="text-[#c9d1d9] bg-[#30363d] px-1 rounded">"Custom robots.txt"</code>, paste this text, and save! Correct sitemap links guarantee complete and swift indexing of new articles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
