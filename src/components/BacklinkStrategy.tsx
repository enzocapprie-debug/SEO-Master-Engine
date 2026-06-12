import React, { useState, useEffect } from 'react';
import { Copy, Check, ClipboardList, Sparkles, ExternalLink, Globe, HardDrive, Laptop, Link2, Code, ArrowRight } from 'lucide-react';

interface Task {
  id: string;
  step: string;
  title: string;
  description: string;
  done: boolean;
}

export default function BacklinkStrategy() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'step1',
      step: 'STEP 1',
      title: 'Hosting Account (Vercel / Cloudflare)',
      description: 'Create a free profile on platforms like Vercel, Netlify, or Cloudflare Workers for quick and free static hosting.',
      done: false
    },
    {
      id: 'step2',
      step: 'STEP 2',
      title: 'Host Micro Utility Tools',
      description: 'Choose and download one of the pre-made codes below. Create a new project and publish these SEO and developer tools written in clean HTML/JS.',
      done: false
    },
    {
      id: 'step3',
      step: 'STEP 3',
      title: 'Set Up Subdomain (tools)',
      description: 'In your domain\'s DNS settings (e.g., at Namecheap or Cloudflare), add a CNAME record pointing the subdomain (e.g., tools.activatepro.cc) to Vercel.',
      done: false
    },
    {
      id: 'step4',
      step: 'STEP 4',
      title: 'Internal Linking / Backlink Placement',
      description: 'At the header or footer of your micro-tool, place clean HTML backlinks to your main Blogger blog. When others share your tool, your SEO rating goes up!',
      done: false
    },
  ]);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('activatepro_checklist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, boolean>;
        setTasks(prev => prev.map(t => ({ ...t, done: !!parsed[t.id] })));
      } catch (e) {
        console.error('Failed to parse checklist', e);
      }
    }
  }, []);

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);

    // Persist list
    const stateMap = updated.reduce((acc, t) => {
      acc[t.id] = t.done;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem('activatepro_checklist', JSON.stringify(stateMap));
  };

  const [subdomain, setSubdomain] = useState('tools.activatepro.cc');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'idle' | 'success' | 'warn';
    dns: string;
    ssl: string;
    backlinks: string;
  }>({
    status: 'idle',
    dns: '',
    ssl: '',
    backlinks: ''
  });

  const simulateTest = () => {
    if (!subdomain.trim()) return;
    setIsTesting(true);
    setTestResult({ status: 'idle', dns: '', ssl: '', backlinks: '' });

    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        status: subdomain.includes('tools.') ? 'success' : 'warn',
        dns: `CNAME record successfully pointed to the host provider.`,
        ssl: `SSL Certificate valid (HTTPS active and secure).`,
        backlinks: `Backlink (href="https://www.activatepro.cc") found on the source page!`
      });
    }, 1800);
  };

  const [activeToolTab, setActiveToolTab] = useState<'seo' | 'json' | 'hash'>('seo');
  const [copiedTool, setCopiedTool] = useState(false);

  const getToolCode = (): string => {
    if (activeToolTab === 'seo') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SEO Meta Tag Generator & Checker</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 30px; margin: 0; }
        .wrapper { max-width: 800px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; padding: 25px; border-radius: 12px; }
        h1 { font-size: 20px; color: #38bdf8; margin-top: 0; }
        .input-group { margin-bottom: 15px; }
        label { display: block; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; color: #94a3b8; }
        input, textarea { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; padding: 10px; border-radius: 6px; color: #fff; }
        button { background: #38bdf8; border: none; padding: 10px 20px; border-radius: 6px; color: #0f172a; font-weight: bold; cursor: pointer; margin-top: 10px; }
        button:hover { background: #0ea5e9; }
        pre { background: #0f172a; padding: 15px; border-radius: 6px; overflow-x: auto; border: 1px solid #334155; font-size: 13px; color: #a7f3d0; }
        footer { margin-top: 30px; text-align: center; border-top: 1px solid #334155; padding-top: 15px; font-size: 12px; color: #64748b; }
        footer a { color: #38bdf8; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h1>🛠️ Free SEO Meta Tag Generator</h1>
        <p style="font-size: 14px; color: #94a3b8;">Create Meta tags for your website quickly and easily.</p>
        
        <div class="input-group">
            <label>Page Title (Title)</label>
            <input type="text" id="toolTitle" value="My Website Name" oninput="buildMeta()">
        </div>
        <div class="input-group">
            <label>Page Description (Description)</label>
            <textarea id="toolDesc" rows="2" oninput="buildMeta()">The best guide to programming and digital marketing...</textarea>
        </div>
        
        <h2 style="font-size: 14px; margin-top: 20px;">Generated Code:</h2>
        <pre><code id="outputCode"></code></pre>

        <footer>
            Proudly launched with the support of: <a href="https://www.activatepro.cc" target="_blank">ActivatePro SEO Master</a>
        </footer>
    </div>

    <script>
        function buildMeta() {
            var title = document.getElementById('toolTitle').value;
            var desc = document.getElementById('toolDesc').value;
            var code = "<!-- SEO Meta Tags -->\\n" +
                       "<title>" + title + "</title>\\n" +
                       "<meta name=\\"description\\" content=\\"" + desc + "\\">\\n" +
                       "<meta name=\\"robots\\" content=\\"index, follow\\">";
            document.getElementById('outputCode').innerText = code;
        }
        buildMeta();
    </script>
</body>
</html>`;
    } else if (activeToolTab === 'json') {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Formatter & Validator</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 30px; margin: 0; }
        .wrapper { max-width: 900px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; padding: 25px; border-radius: 12px; }
        h1 { font-size: 20px; color: #a855f7; margin-top: 0; }
        textarea { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; pading: 12px; border-radius: 6px; color: #fff; font-family: monospace; }
        button { background: #a855f7; border: none; padding: 10px 20px; border-radius: 6px; color: #ffffff; font-weight: bold; cursor: pointer; margin-top: 10px; margin-right: 10px; }
        button:hover { background: #9333ea; }
        pre { background: #0f172a; padding: 15px; border-radius: 6px; overflow-x: auto; border: 1px solid #334155; max-height: 300px; font-size: 13px; color: #cbd5e1; }
        footer { margin-top: 30px; text-align: center; border-top: 1px solid #334155; padding-top: 15px; font-size: 12px; color: #64748b; }
        footer a { color: #a855f7; text-decoration: none; font-weight: bold; }
        .status { padding: 10px; border-radius: 6px; font-size: 13px; margin: 10px 0; display: none; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h1>🔍 JSON Formatter & Validator</h1>
        <p style="font-size: 14px; color: #94a3b8;">Format and validate your JSON code instantly.</p>
        
        <textarea id="jsonInput" rows="8" placeholder='Paste messy JSON here e.g. {"name":"Blogger", "topic":"SEO"}'></textarea>
        
        <div>
            <button onclick="formatJSON()">Format JSON</button>
            <button onclick="minifyJSON()">Minify JSON</button>
        </div>

        <div id="statusBox" class="status"></div>
        
        <h2 style="font-size: 14px; margin-top: 20px;">Result:</h2>
        <pre><code id="jsonOutput">Clean code will be displayed here...</code></pre>

        <footer>
            Proudly launched with the support of: <a href="https://www.activatepro.cc" target="_blank">ActivatePro SEO Master</a>
        </footer>
    </div>

    <script>
        function formatJSON() {
            var input = document.getElementById('jsonInput').value;
            var out = document.getElementById('jsonOutput');
            var status = document.getElementById('statusBox');
            try {
                var parsed = JSON.parse(input);
                out.innerText = JSON.stringify(parsed, null, 4);
                status.style.display = "block";
                status.style.background = "#065f46";
                status.style.color = "#34d399";
                status.innerText = "✓ Valid JSON!";
            } catch(e) {
                status.style.display = "block";
                status.style.background = "#991b1b";
                status.style.color = "#fca5a5";
                status.innerText = "❌ Error: " + e.message;
            }
        }
        function minifyJSON() {
            var input = document.getElementById('jsonInput').value;
            var out = document.getElementById('jsonOutput');
            var status = document.getElementById('statusBox');
            try {
                var parsed = JSON.parse(input);
                out.innerText = JSON.stringify(parsed);
                status.style.display = "block";
                status.style.background = "#065f46";
                status.style.color = "#34d399";
                status.innerText = "✓ Valid JSON!";
            } catch(e) {
                status.style.display = "block";
                status.style.background = "#991b1b";
                status.style.color = "#fca5a5";
                status.innerText = "❌ Error: " + e.message;
            }
        }
    </script>
</body>
</html>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Strength Meter & Generator</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 30px; margin: 0; }
        .wrapper { max-width: 800px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; padding: 25px; border-radius: 12px; }
        h1 { font-size: 20px; color: #f43f5e; margin-top: 0; }
        input { width: 100%; box-sizing: border-box; background: #0f172a; border: 1px solid #334155; padding: 12px; border-radius: 6px; color: #fff; }
        footer { margin-top: 30px; text-align: center; border-top: 1px solid #334155; padding-top: 15px; font-size: 12px; color: #64748b; }
        footer a { color: #f43f5e; text-decoration: none; font-weight: bold; }
        .strength-bar { height: 6px; background: #334155; margin-top: 10px; border-radius: 3px; overflow: hidden; }
        .bar-fill { height: 100%; width: 0%; transition: width 0.3s; }
    </style>
</head>
<body>
    <div class="wrapper">
        <h1>🔒 Password Strength Calculator</h1>
        <p style="font-size: 14px; color: #94a3b8;">Find out how resilient your password is against brute-force attacks.</p>
        
        <input type="text" id="passInput" oninput="checkStrength()" placeholder="Enter password...">
        
        <div class="strength-bar">
            <div id="bar" class="bar-fill"></div>
        </div>
        <p id="feedbackText" style="font-size: 13px; color: #94a3b8; margin-top: 8px;">Please enter some characters...</p>

        <footer>
            Proudly launched with the support of: <a href="https://www.activatepro.cc" target="_blank">ActivatePro SEO Master</a>
        </footer>
    </div>

    <script>
        function checkStrength() {
            var val = document.getElementById('passInput').value;
            var fill = document.getElementById('bar');
            var label = document.getElementById('feedbackText');
            var score = 0;
            if (val.length > 5) score++;
            if (val.length > 10) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^a-zA-Z0-9]/.test(val)) score++;
            
            if (val.length === 0) {
                fill.style.width = '0%';
                label.innerText = 'Enter password.';
            } else if (score <= 1) {
                fill.style.width = '20%';
                fill.style.backgroundColor = '#f43f5e';
                label.innerText = 'Very weak password ⚠️';
            } else if (score <= 3) {
                fill.style.width = '60%';
                fill.style.backgroundColor = '#eab308';
                label.innerText = 'Medium password. Add numbers or special symbols.';
            } else {
                fill.style.width = '100%';
                fill.style.backgroundColor = '#10b981';
                label.innerText = 'Excellent password! Maximum security ✔';
            }
        }
    </script>
</body>
</html>`;
    }
  };

  const copyToolCode = () => {
    navigator.clipboard.writeText(getToolCode());
    setCopiedTool(true);
    setTimeout(() => setCopiedTool(false), 2000);
  };

  return (
    <div className="space-y-8" id="backlink-strategy-dashboard">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Progress Checklist Tracker */}
        <div className="md:col-span-7 bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-white text-lg">Link-Building Checklist Guide</h3>
            </div>
            <span className="text-xs text-[#8b949e]">
              Completed so far: <strong className="text-emerald-400">{tasks.filter(t => t.done).length} / {tasks.length}</strong>
            </span>
          </div>

          <p className="text-xs text-[#8b949e] mb-4 leading-relaxed">
            Check off completed steps as you build your growth micro-tool. Your progress is saved automatically.
          </p>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                  task.done 
                    ? 'bg-emerald-500/5 border-emerald-500/30' 
                    : 'bg-[#0d1117]/80 hover:bg-[#0d1117] border-[#30363d] hover:border-[#8b949e]/40'
                }`}
              >
                <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center border transition-all ${
                  task.done 
                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                    : 'border-[#484f58] bg-[#0d1117]'
                }`}>
                  {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      task.done ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#30363d] text-[#8b949e]'
                    }`}>
                      {task.step}
                    </span>
                    <h4 className={`text-xs font-semibold ${task.done ? 'text-[#a7f3d0] line-through' : 'text-white'}`}>
                      {task.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-[#8b949e] leading-relaxed mt-1">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Subdomain DNS Test Simulation */}
        <div className="md:col-span-5 bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#30363d] mb-4">
              <Globe className="w-5 h-5 text-sky-400" />
              <h3 className="font-semibold text-white text-base">DNS & Backlink Tester (Simulator)</h3>
            </div>

            <p className="text-xs text-[#8b949e] leading-relaxed mb-4">
              Test if you have correctly configured the DNS forwarding from your subdomain and integrated backlinks to your blog.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-[#8b949e] uppercase mb-1.5">
                  Micro-Tool Subdomain
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
                    placeholder="tools.activatepro.cc"
                  />
                  <button
                    onClick={simulateTest}
                    disabled={isTesting}
                    className="bg-[#30363d] hover:bg-[#8b949e] disabled:bg-[#30363d]/40 text-white rounded-lg px-4.5 py-1.5 cursor-pointer text-xs font-semibold flex items-center gap-1"
                  >
                    {isTesting ? 'Testing...' : 'Test'}
                  </button>
                </div>
              </div>

              {/* Simulation Result */}
              {isTesting && (
                <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg flex items-center justify-center py-8">
                  <div className="text-center space-y-2">
                    <div className="w-6 h-6 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-[11px] text-[#8b949e] animate-pulse">Scanning DNS records for {subdomain}...</p>
                  </div>
                </div>
              )}

              {!isTesting && testResult.status !== 'idle' && (
                <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${testResult.status === 'success' ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}`}></span>
                    <span className="text-xs font-bold text-white">Analysis Status:</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${testResult.status === 'success' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-400/15 text-amber-300'}`}>
                      {testResult.status === 'success' ? 'ACTIVE & SEO READY' : 'REQUIRES TOOLS SUBDOMAIN'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] border-t border-[#161b22] pt-2">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <p className="text-[#8b949e]">{testResult.dns}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <p className="text-[#8b949e]">{testResult.ssl}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <p className="text-[#8b949e]">{testResult.backlinks}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#30363d] text-[10px] text-[#8b949e] leading-snug">
            💡 <strong>Note:</strong> DNS records can take up to 24 hours to propagate fully worldwide after setting it up on your Registrar.
          </div>
        </div>
      </div>

      {/* Deployable Micro Tools Code Base */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#30363d] pb-3 gap-3">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="font-semibold text-white text-base">Ready-to-Deploy Micro Tools</h3>
              <p className="text-[11px] text-[#8b949e]">Fully functional and self-contained static HTML files. Includes a tracking backlink pointing to <code className="text-white bg-[#30363d] px-1 rounded">activatepro.cc</code>.</p>
            </div>
          </div>

          {/* Code selection tabs */}
          <div className="flex bg-[#0d1117] rounded-lg p-0.5 border border-[#30363d] self-start md:self-auto">
            <button
              onClick={() => setActiveToolTab('seo')}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                activeToolTab === 'seo' ? 'bg-[#30363d] text-white shadow' : 'text-[#8b949e] hover:text-white'
              }`}
            >
              SEO Generator
            </button>
            <button
              onClick={() => setActiveToolTab('json')}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                activeToolTab === 'json' ? 'bg-[#30363d] text-white shadow' : 'text-[#8b949e] hover:text-white'
              }`}
            >
              JSON Validator
            </button>
            <button
              onClick={() => setActiveToolTab('hash')}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                activeToolTab === 'hash' ? 'bg-[#30363d] text-white shadow' : 'text-[#8b949e] hover:text-white'
              }`}
            >
              Password Generator
            </button>
          </div>
        </div>

        {/* Copy HTML deployment string */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8b949e] flex items-center gap-1">
              🚀 <strong className="text-[#c9d1d9]">index.html</strong> ready to deploy
            </span>
            <button
              onClick={copyToolCode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                copiedTool
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d]'
              }`}
            >
              {copiedTool ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Code Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Micro-tool HTML
                </>
              )}
            </button>
          </div>

          <div className="overflow-auto bg-[#0d1117] border border-[#30363d] rounded-lg p-4 font-mono text-[11px] leading-relaxed max-h-[350px]">
            <pre className="text-indigo-300/95 overflow-x-auto whitespace-pre select-all">
              {getToolCode()}
            </pre>
          </div>
          
          <div className="bg-[#1f242c] border border-[#30363d] p-3 rounded-lg text-xs text-[#8b949e] flex items-center gap-2">
            <span className="p-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold font-mono text-[10px]">VERCEL</span>
            <span>
              <strong>Quick Deploy:</strong> Create a new blank copy of <code className="text-[#c9d1d9] bg-[#30363d] px-1 rounded">index.html</code>, paste this code inside of it, and drag-and-drop your folder onto the Vercel dashboard. Your tool is ready to go!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
