import React from 'react';
import { Zap, ShieldCheck, CreditCard, Sparkles, ArrowRight, Truck } from 'lucide-react';
import { Subdomain } from '../types';

interface MainHeroProps {
  onSwitchSubdomain: (subdomain: Subdomain) => void;
  onExploreDeals: () => void;
}

export const MainHero: React.FC<MainHeroProps> = ({
  onSwitchSubdomain,
  onExploreDeals,
}) => {
  return (
    <div className="w-full bg-white border-b border-slate-200">
      
      {/* Top Value Banner */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Propositions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-md text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>La alternativa definitiva a Mercado Libre</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Compra y vende de todo. <br />
              <span className="text-blue-600">Envíos FULL en 24h</span> garantizados.
            </h1>

            <p className="text-base text-slate-600 max-w-xl leading-relaxed">
              EverywhereMarket conecta millones de compradores con tiendas oficiales y pequeños vendedores. Disfruta de cuotas sin interés, protección total al comprador y tarifas justas.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreDeals}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explorar Ofertas del Día</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSwitchSubdomain('halloween')}
                className="px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ir al Especial Halloween (-60%)</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Envío gratis desde $29</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Hasta 12 cuotas fijas</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Compra 100% protegida</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_marketplace_shopping_1793105685539.jpg"
                alt="EverywhereMarket Productos Estrella"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                  Campaña Destacada
                </span>
                <p className="text-xl font-bold mt-1">
                  Tecnología & Estilo para tu día a día
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Descubre las tiendas oficiales con garantía y entrega en el mismo día.
                </p>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="absolute -bottom-3 -left-3 bg-white border border-slate-200 rounded-xl p-3 shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Everywhere FULL</p>
                <p className="text-[11px] text-slate-500">Llega hoy mismo en tu ciudad</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
