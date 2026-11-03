import React, { useState } from 'react';
import { Globe, Lock, ArrowRight, Copy, Check, Sparkles, Ghost } from 'lucide-react';
import { Subdomain } from '../types';

interface SubdomainBarProps {
  currentSubdomain: Subdomain;
  onSwitchSubdomain: (subdomain: Subdomain) => void;
}

export const SubdomainBar: React.FC<SubdomainBarProps> = ({
  currentSubdomain,
  onSwitchSubdomain,
}) => {
  const [copied, setCopied] = useState(false);

  const domainUrl = currentSubdomain === 'halloween'
    ? 'https://halloween.everywheremarket.com'
    : 'https://everywheremarket.com';

  const handleCopy = () => {
    navigator.clipboard?.writeText(domainUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHalloween = currentSubdomain === 'halloween';

  return (
    <div className={`w-full border-b transition-colors duration-300 text-xs ${
      isHalloween
        ? 'bg-[#120f1e] border-orange-950/60 text-slate-300'
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Domain Indicator and Switcher Badges */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5 font-medium text-slate-400">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Red de Dominios:</span>
          </div>

          <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10">
            <button
              onClick={() => onSwitchSubdomain('main')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                !isHalloween
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>everywheremarket.com</span>
              {!isHalloween && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
            </button>

            <button
              onClick={() => onSwitchSubdomain('halloween')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isHalloween
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                  : 'text-orange-400 hover:text-orange-300'
              }`}
            >
              <Ghost className="w-3 h-3" />
              <span>halloween.everywheremarket.com</span>
              {isHalloween && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </button>
          </div>
        </div>

        {/* Center: Simulated Address Bar */}
        <div className="hidden lg:flex items-center bg-black/50 border border-white/10 rounded-md px-3 py-1 text-slate-300 w-80 max-w-sm justify-between shadow-inner">
          <div className="flex items-center gap-2 truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="font-mono text-[11px] text-slate-400 truncate">
              {domainUrl}
            </span>
          </div>
          <button
            onClick={handleCopy}
            title="Copiar enlace directo al subdominio"
            className="text-slate-400 hover:text-white transition-colors ml-2"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Right: Quick Action Banner */}
        <div className="flex items-center gap-2 text-[11px] shrink-0">
          {!isHalloween ? (
            <button
              onClick={() => onSwitchSubdomain('halloween')}
              className="group flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Entrar al subdominio especial de <strong>Halloween</strong></span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={() => onSwitchSubdomain('main')}
              className="group flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Volver a <strong>Mercado Principal</strong></span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
