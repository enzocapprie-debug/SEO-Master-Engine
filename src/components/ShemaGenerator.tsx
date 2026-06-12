import React, { useState } from 'react';
import { SchemaConfig } from '../types';
import { Copy, Check, Info, FileCode } from 'lucide-react';

export default function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState<'BlogPosting' | 'WebSite' | 'Organization'>('BlogPosting');
  const [config, setConfig] = useState<SchemaConfig>({
    schemaType: 'BlogPosting',
    canonicalUrl: 'https://www.activatepro.cc/2026/06/seo-optimization.html',
    title: 'How to Optimize Blogger for Fast Loading',
    description: 'Guide and scripts to improve page speed and search visibility on the Blogger platform.',
    featuredImage: 'https://www.activatepro.cc/images/seo-guide.jpg',
    authorName: 'ActivatePro Author',
    authorProfileUrl: 'https://www.blogger.com/profile/1234567890',
    publisherName: 'ActivatePro',
    publisherLogo: 'https://www.activatepro.cc/logo.png'
  });

  const [copied, setCopied] = useState(false);

  const generateSchema = (): string => {
    if (schemaType === 'BlogPosting') {
      return `<!-- [START] JSON-LD Schema Markup for Structured Data (Post) -->
<b:if cond='data:view.isPost'>
  <script type='application/ld+json'>
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${config.canonicalUrl}"
    },
    "headline": "${config.title}",
    "description": "${config.description || config.title}",
    "image": "${config.featuredImage || 'https://www.activatepro.cc/logo.png'}",
    "datePublished": "<data:view.createdDate.iso8601/>",
    "dateModified": "<data:view.lastModifiedDate.iso8601/>",
    "author": {
      "@type": "Person",
      "name": "${config.authorName}",
      "url": "${config.authorProfileUrl}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "${config.publisherName}",
      "logo": {
        "@type": "ImageObject",
        "url": "${config.publisherLogo}"
      }
    }
  }
  </script>
</b:if>
<!-- [END] JSON-LD Schema Markup -->`;
    } else if (schemaType === 'WebSite') {
      return `<!-- [START] JSON-LD Schema Markup for Homepage (WebSite & SearchBox) -->
<b:if cond='data:view.isHomepage'>
  <script type='application/ld+json'>
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "${config.publisherName}",
    "url": "<data:blog.homepageUrl.canonical/>",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "<data:blog.homepageUrl.canonical/>search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</b:if>
<!-- [END] JSON-LD Schema Markup -->`;
    } else {
      return `<!-- [START] JSON-LD Schema for Organization (Social Profiles & Identity) -->
<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${config.publisherName}",
  "url": "https://www.activatepro.cc",
  "logo": "${config.publisherLogo}",
  "sameAs": [
    "https://facebook.com/activatepro",
    "https://twitter.com/activatepro",
    "https://github.com/activatepro"
  ]
}
</script>
<!-- [END] JSON-LD Schema for Organization -->`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSchema());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="schema-generator">
      {/* Settings Panel */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="w-5 h-5 text-[#58a6ff]" />
            <h3 className="font-semibold text-white text-lg">Schema Configuration</h3>
          </div>

          {/* Selector */}
          <div className="flex bg-[#0d1117] rounded-lg p-1 border border-[#30363d] mb-4">
            {(['BlogPosting', 'WebSite', 'Organization'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSchemaType(t)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all text-center ${
                  schemaType === t
                    ? 'bg-[#30363d] text-white shadow-sm'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                {t === 'BlogPosting' ? 'Article' : t === 'WebSite' ? 'Website' : 'Organization'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {schemaType === 'BlogPosting' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Canonical Post URL
                  </label>
                  <input
                    type="text"
                    value={config.canonicalUrl}
                    onChange={(e) => setConfig({ ...config, canonicalUrl: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                    placeholder="https://www.activatepro.cc/2026/06/post.html"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                    placeholder="Article title"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Post Description (Meta description)
                  </label>
                  <textarea
                    rows={2}
                    value={config.description}
                    onChange={(e) => setConfig({ ...config, description: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm resize-none"
                    placeholder="Short introduction to the article..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    value={config.featuredImage}
                    onChange={(e) => setConfig({ ...config, featuredImage: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                    placeholder="https://www.activatepro.cc/images/post-image.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={config.authorName}
                      onChange={(e) => setConfig({ ...config, authorName: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                      Author Profile URL
                    </label>
                    <input
                      type="text"
                      value={config.authorProfileUrl}
                      onChange={(e) => setConfig({ ...config, authorProfileUrl: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                      placeholder="https://www.blogger.com/profile/..."
                    />
                  </div>
                </div>
              </>
            )}

            {(schemaType === 'BlogPosting' || schemaType === 'WebSite' || schemaType === 'Organization') && (
              <div className="pt-2 border-t border-[#30363d] space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Publisher / Site Name
                  </label>
                  <input
                    type="text"
                    value={config.publisherName}
                    onChange={(e) => setConfig({ ...config, publisherName: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                    placeholder="ActivatePro"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Publisher Logo
                  </label>
                  <input
                    type="text"
                    value={config.publisherLogo}
                    onChange={(e) => setConfig({ ...config, publisherLogo: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff] text-sm"
                    placeholder="https://www.activatepro.cc/logo.png"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Column */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex-1 flex flex-col relative min-h-[400px]">
          <div className="flex items-center justify-between pb-3 border-b border-[#30363d] mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 rounded text-[10px] bg-sky-500/10 text-[#58a6ff] border border-sky-500/20 font-bold font-mono">
                JSON-LD
              </span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Structured Schema Markup</h4>
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
            <pre className="text-teal-400/95 overflow-x-auto whitespace-pre select-all">
              {generateSchema()}
            </pre>
          </div>

          <div className="mt-4 bg-[#0d1117] border border-[#30363d] rounded-lg p-3 flex items-start gap-3">
            <div className="p-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
              <Info className="w-4 h-4" />
            </div>
            <p className="text-xs text-[#8b949e] leading-snug">
              <strong className="text-[#c9d1d9] block mb-0.5">Indexing Tip:</strong> 
              Place this snippet inside the <code className="text-[#c9d1d9] bg-[#30363d] px-1 rounded">&lt;head&gt;</code> tag of your theme. Google will then correctly interpret authorship, publisher info, and content type, enabling rich snippet visual features in search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
