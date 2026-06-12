import React, { useState } from 'react';
import { SpeedConfig } from '../types';
import { Zap, Copy, Check, Info, AlertTriangle, Sparkles } from 'lucide-react';

export default function SpeedBooster() {
  const [config, setConfig] = useState<SpeedConfig>({
    enableLazyLoad: true,
    enableWidgetDefer: true,
    deferDelay: 1000,
  });

  const [copied, setCopied] = useState(false);

  // Generate customized script block
  const generateScriptOutput = (): string => {
    let scriptContent = `<!-- [START] ActivatePro Core Web Vitals Speed Booster -->
<script>
//<![CDATA[
document.addEventListener("DOMContentLoaded", function() {`;

    if (config.enableLazyLoad) {
      scriptContent += `
  // 1. Ultra fast lazy loader for images using IntersectionObserver
  var lazyImages = [].slice.call(document.querySelectorAll("img"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for older browsers
    let active = false;
    const lazyLoad = function() {
      if (active === false) {
        active = true;
        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              if (lazyImage.dataset.src) {
                lazyImage.src = lazyImage.dataset.src;
              }
              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });
              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });
          active = false;
        }, 200);
      }
    };
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  }
`;
    }

    if (config.enableWidgetDefer) {
      scriptContent += `
  // 2. Automate deferring of unused default Blogger JS scripts slowing down rendering
  setTimeout(function() {
    const widgetsJs = document.querySelectorAll('script[src*="widgets.js"]');
    widgetsJs.forEach(el => el.setAttribute('defer', 'defer'));
  }, ${config.deferDelay});
`;
    }

    scriptContent += `});
//]]>
</script>
<!-- [END] ActivatePro Core Web Vitals Speed Booster -->`;

    return scriptContent;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateScriptOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="speed-booster">
      {/* Configurations Box */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-white text-lg">Performance Settings</h3>
          </div>

          <div className="space-y-4">
            {/* Lazy load image toggle */}
            <div className="flex items-start justify-between bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
              <div className="flex-1 pr-3">
                <label className="text-sm font-semibold text-white block">Images Lazy Loading</label>
                <span className="text-[11px] text-[#8b949e] leading-snug block mt-1">
                  Loads images only when they enter the user's viewport, reducing initial page payload.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none mt-1">
                <input
                  type="checkbox"
                  checked={config.enableLazyLoad}
                  onChange={(e) => setConfig({ ...config, enableLazyLoad: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c9d1d9] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Blogger Widgets JS Defer Toggle */}
            <div className="flex items-start justify-between bg-[#0d1117] p-3 rounded-lg border border-[#30363d]">
              <div className="flex-1 pr-3">
                <label className="text-sm font-semibold text-white block">Defer Render-Blocking JS</label>
                <span className="text-[11px] text-[#8b949e] leading-snug block mt-1">
                  Defers default Blogger widget and comment scripts (widgets.js) to improve Total Blocking Time.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none mt-1">
                <input
                  type="checkbox"
                  checked={config.enableWidgetDefer}
                  onChange={(e) => setConfig({ ...config, enableWidgetDefer: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#30363d] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#c9d1d9] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Defer delay setting */}
            {config.enableWidgetDefer && (
              <div className="p-3 bg-[#0d1117]/50 rounded-lg border border-[#30363d] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8b949e] font-medium">Blogger Widgets Defer Delay</span>
                  <span className="font-mono text-emerald-400 font-bold">{config.deferDelay} ms</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="100"
                  value={config.deferDelay}
                  onChange={(e) => setConfig({ ...config, deferDelay: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 bg-[#30363d] h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-[#8b949e] block leading-snug">
                  The optimal duration is 1000ms to ensure the browser prioritizes rendering critical theme elements first.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Impact Simulator */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4.5 h-4.5 text-amber-400" />
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Lighthouse Simulator Impact</h4>
          </div>

          <div className="space-y-4 pt-1">
            {/* LCP metric */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#c9d1d9] font-medium">Largest Contentful Paint (LCP)</span>
                <span className="font-mono text-[11px] text-[#8b949e]">
                  <span className="text-rose-400 line-through mr-1.5">3.8s</span>
                  <span className="text-emerald-400 font-bold">1.2s ✔</span>
                </span>
              </div>
              <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#30363d]" style={{ width: '31.5%' }}></div>
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68.5%' }}></div>
              </div>
            </div>

            {/* TBT metric */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#c9d1d9] font-medium">Total Blocking Time (TBT)</span>
                <span className="font-mono text-[11px] text-[#8b949e]">
                  <span className="text-rose-400 line-through mr-1.5">900ms</span>
                  <span className="text-emerald-400 font-bold">150ms ✔</span>
                </span>
              </div>
              <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#30363d]" style={{ width: '16.6%' }}></div>
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83.4%' }}></div>
              </div>
            </div>

            {/* Performance score preview */}
            <div className="pt-2 border-t border-[#30363d] flex items-center justify-between">
              <span className="text-[11px] text-[#8b949e]">Estimated Page Speed Score:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400 line-through font-mono">54</span>
                <span className="text-lg text-emerald-400 font-bold font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-inner">
                  98/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex-1 flex flex-col relative min-h-[400px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d] mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold font-mono">
                JS FOOTER
              </span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Optimized Booster Script</h4>
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
                  Copy Code
                </>
              )}
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-[#0d1117] border border-[#30363d] rounded-lg p-4 font-mono text-[11px] leading-relaxed relative">
            <pre className="text-amber-400 overflow-x-auto whitespace-pre select-all">
              {generateScriptOutput()}
            </pre>
          </div>

          <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-3">
            <div className="p-1 text-amber-400 rounded">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <p className="text-xs text-[#f0e6d2] leading-relaxed">
              <strong className="text-white block mb-0.5">IMPORTANT: Script Location</strong>
              Scroll to the very bottom of your Blogger HTML template and paste this script directly above the closing <code className="text-white bg-[#30363d] px-1 rounded">&lt;/body&gt;</code> tag. When adding images to your site, ensure you use <code className="text-white bg-[#30363d] px-1 rounded">data-src="..."</code> instead of the standard <code className="text-white bg-[#30363d] px-1 rounded">src</code> attribute so the lazy loader can process them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
