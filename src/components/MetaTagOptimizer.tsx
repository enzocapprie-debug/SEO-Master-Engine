import React, { useState } from 'react';
import { MetaConfig } from '../types';
import { Copy, Check, Eye, Settings, Globe, Plus, Trash2 } from 'lucide-react';

export default function MetaTagOptimizer() {
  const [config, setConfig] = useState<MetaConfig>({
    blogTitle: 'ActivatePro',
    slogan: 'The Best Tools, Scripts, and Optimization',
    defaultLogo: 'https://www.activatepro.cc/logo.png',
    dnsPrefetchList: [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
      'pagead2.googlesyndication.com',
      'blogger.googleusercontent.com'
    ],
    enableErrorRobots: true,
    enableArchiveRobots: true,
    enableOpenGraph: true,
  });

  const [copied, setCopied] = useState(false);
  const [newDns, setNewDns] = useState('');
  const [activePreviewTab, setActivePreviewTab] = useState<'google' | 'social'>('google');

  const addDns = () => {
    if (newDns.trim() && !config.dnsPrefetchList.includes(newDns.trim())) {
      setConfig({
        ...config,
        dnsPrefetchList: [...config.dnsPrefetchList, newDns.trim()]
      });
      setNewDns('');
    }
  };

  const removeDns = (index: number) => {
    setConfig({
      ...config,
      dnsPrefetchList: config.dnsPrefetchList.filter((_, i) => i !== index)
    });
  };

  const generateCode = (): string => {
    const dnsPrefetchBlocks = config.dnsPrefetchList
      .map(url => `  <link href='//${url}' rel='dns-prefetch'/>`)
      .join('\n');

    return `<!-- [START] ${config.blogTitle} Advanced Meta Setup -->
<meta charset='utf-8'/>
<meta content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0' name='viewport'/>

<!-- Dynamic Titles Optimized for Google -->
<b:if cond='data:view.isHomepage'>
  <title><data:blog.title/> | ${config.slogan}</title>
<b:else/>
  <b:if cond='data:view.isPage'>
    <title><data:view.title/> - <data:blog.title/></title>
  <b:else/>
    <b:if cond='data:view.isPost'>
      <title><data:view.title/> - ${config.blogTitle}</title>
    </b:if>
  </b:if>
</b:if>

<!-- Canonical URL (Prevents duplicate content) -->
<link expr:href='data:view.url.canonical' rel='canonical'/>

<!-- DNS Prefetching for faster loading of external resources -->
${dnsPrefetchBlocks}

<!-- Advanced management of Google Bots (Robots Meta) -->
<b:if cond='data:view.isErrorPage'>
  ${config.enableErrorRobots ? "<meta content='noindex,noarchive' name='robots'/>" : "<!-- Error page default indexing -->"}
<b:else/>
  <b:if cond='data:view.isArchive'>
    ${config.enableArchiveRobots ? "<meta content='noindex,follow' name='robots'/>" : "<!-- Archive default indexing -->"}
  <b:else/>
    <meta content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' name='robots'/>
  </b:if>
</b:if>
${config.enableOpenGraph ? `
<!-- Open Graph and Twitter Cards (Social Media SEO) -->
<meta expr:content='data:view.title' property='og:title'/>
<meta expr:content='data:view.url.canonical' property='og:url'/>
<meta content='website' property='og:type'/>
<meta expr:content='data:blog.title' property='og:site_name'/>
<b:if cond='data:view.hasFeaturedImage'>
  <meta expr:content='data:view.featuredImage' property='og:image'/>
<b:else/>
  <meta content='${config.defaultLogo}' property='og:image'/>
</b:if>` : ''}
<!-- [END] ${config.blogTitle} Advanced Meta Setup -->`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="meta-tag-optimizer">
      {/* Settings Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-[#58a6ff]" />
            <h3 className="font-semibold text-white text-lg">Meta Setup Configuration</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                Blog Title (Brand)
              </label>
              <input
                type="text"
                value={config.blogTitle}
                onChange={(e) => setConfig({ ...config, blogTitle: e.target.value })}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                placeholder="E.g., ActivatePro"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                Slogan / Main Homepage Description
              </label>
              <input
                type="text"
                value={config.slogan}
                onChange={(e) => setConfig({ ...config, slogan: e.target.value })}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                placeholder="The Best Tools, Scripts, and Optimization"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                Default Logo (Image URL)
              </label>
              <input
                type="text"
                value={config.defaultLogo}
                onChange={(e) => setConfig({ ...config, defaultLogo: e.target.value })}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                placeholder="https://www.activatepro.cc/logo.png"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider">
                  DNS Prefetching Domains
                </label>
                <span className="text-[10px] text-[#8b949e] bg-[#30363d] px-2 py-0.5 rounded">
                  Faster Loading
                </span>
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDns}
                  onChange={(e) => setNewDns(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addDns()}
                  className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-xs"
                  placeholder="E.g., fonts.googleapis.com"
                />
                <button
                  onClick={addDns}
                  type="button"
                  className="bg-[#30363d] hover:bg-[#8b949e] text-white rounded-lg px-3 py-1 cursor-pointer transition-colors text-xs flex items-center justify-center gap-1 font-medium"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
              <div className="max-h-28 overflow-y-auto border border-[#30363d] rounded-lg bg-[#0d1117] p-2 space-y-1">
                {config.dnsPrefetchList.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs text-[#c9d1d9] bg-[#161b22] px-2 py-1 rounded border border-[#30363d]">
                    <span className="font-mono text-[11px] truncate select-all">{item}</span>
                    <button
                      onClick={() => removeDns(index)}
                      className="text-[#8b949e] hover:text-[#ff7b72] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#30363d] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#c9d1d9] font-medium">Enable Open Graph & Twitter SEO</span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={config.enableOpenGraph}
                    onChange={(e) => setConfig({ ...config, enableOpenGraph: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c9d1d9] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#58a6ff]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#c9d1d9] font-medium block">Deindex Error Pages</span>
                  <span className="text-[10px] text-[#8b949e] block">Prevents indexing of errors</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={config.enableErrorRobots}
                    onChange={(e) => setConfig({ ...config, enableErrorRobots: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c9d1d9] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#58a6ff]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#c9d1d9] font-medium block">Deindex Archives</span>
                  <span className="text-[10px] text-[#8b949e] block">Prevents duplicate content</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={config.enableArchiveRobots}
                    onChange={(e) => setConfig({ ...config, enableArchiveRobots: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c9d1d9] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#58a6ff]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code & Preview Column */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        {/* Previews */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex flex-col h-[230px]">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#58a6ff]" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">SEO Visual Simulator</h4>
            </div>
            <div className="flex bg-[#0d1117] rounded-lg p-0.5 border border-[#30363d]">
              <button
                onClick={() => setActivePreviewTab('google')}
                className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
                  activePreviewTab === 'google'
                    ? 'bg-[#30363d] text-white shadow-sm'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                Google Search
              </button>
              <button
                onClick={() => setActivePreviewTab('social')}
                className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
                  activePreviewTab === 'social'
                    ? 'bg-[#30363d] text-white shadow-sm'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                Social Media (OG)
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {activePreviewTab === 'google' ? (
              <div className="w-full bg-white dark:bg-[#1a1a1a] p-4 rounded-lg border border-gray-100 dark:border-neutral-800 shadow-sm max-w-md">
                <div className="flex items-center text-xs text-[#202124] dark:text-[#bdc1c6] mb-1 truncate">
                  <span className="font-mono text-[10px] bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[#5f6368] dark:text-[#9aa0a6] mr-1">Address</span>
                  https://www.activatepro.cc
                </div>
                <h4 className="text-[#1a0dab] dark:text-[#8ab4f8] text-base hover:underline font-normal cursor-pointer truncate mb-1">
                  {config.blogTitle} | {config.slogan}
                </h4>
                <p className="text-gray-600 dark:text-[#bdc1c6] text-xs line-clamp-2">
                  Complete code optimization, advanced scripts, and meta-architecture for {config.blogTitle}. Discover the best tools and speed up your Blogger site...
                </p>
              </div>
            ) : (
              <div className="w-full max-w-sm border border-neutral-700 bg-black/40 rounded-xl overflow-hidden shadow-md flex flex-col">
                <div className="h-20 bg-neutral-800 flex items-center justify-center overflow-hidden">
                  <img
                    src={config.defaultLogo}
                    alt="Preview logo"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback on error
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="text-xs text-[#8b949e] italic block" style={{ display: config.defaultLogo ? 'none' : 'block' }}>No logo image</span>
                </div>
                <div className="p-3 border-t border-neutral-700">
                  <span className="text-[10px] text-[#58a6ff] font-mono tracking-wider block">WWW.ACTIVATEPRO.CC</span>
                  <h4 className="text-xs font-semibold text-white truncate mt-1">{config.blogTitle} | {config.slogan}</h4>
                  <p className="text-[10px] text-[#8b949e] line-clamp-2 mt-0.5">Automatic configuration of optimized Open Graph tags for seamless sharing.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generate Code Block */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex-1 flex flex-col relative min-h-[300px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d] mb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4.5 h-4.5 text-[#58a6ff]" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Optimized Blogger HTML Code</h4>
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
                  Copy HTML
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-[#0d1117] border border-[#30363d] rounded-lg p-4 font-mono text-[11px] leading-relaxed relative">
            <pre className="text-emerald-400/90 select-all overflow-x-auto whitespace-pre">
              {generateCode()}
            </pre>
          </div>
          <div className="mt-3 text-[11px] text-[#8b949e] flex items-start gap-1">
            <span className="text-amber-500">💡</span>
            Insert this code inside your Blogger template directly after the opening <code className="text-[#c9d1d9] bg-[#30363d] px-1 rounded">&lt;head&gt;</code> tag.
          </div>
        </div>
      </div>
    </div>
  );
}
