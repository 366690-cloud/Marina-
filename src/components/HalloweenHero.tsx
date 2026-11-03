import React, { useState, useEffect } from 'react';
import { Ghost, Sparkles, Clock, Flame, Gift, ArrowRight } from 'lucide-react';

interface HalloweenHeroProps {
  onOpenPumpkinModal: () => void;
  onSelectCategory: (category: string) => void;
  onSwitchToMain: () => void;
}

export const HalloweenHero: React.FC<HalloweenHeroProps> = ({
  onOpenPumpkinModal,
  onSelectCategory,
  onSwitchToMain,
}) => {
  // Live Countdown to Halloween 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0a0814] text-white border-b border-orange-950/80 relative overflow-hidden">
      
      {/* Background ambient glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Spooky Banner Info */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-950/80 border border-orange-600/40 text-orange-400 rounded-md text-xs font-semibold">
              <Ghost className="w-3.5 h-3.5 animate-bounce" />
              <span>Subdominio Exclusivo · halloween.everywheremarket.com</span>
            </div>

            <div className="space-y-2">
              <p className="text-orange-400 text-sm font-bold tracking-widest uppercase">
                Festival de Ofertas Tenebrosas 2026
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none">
                Precios de Miedo con hasta <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 font-spooky text-4xl sm:text-5xl lg:text-6xl tracking-wider">
                  60% de Descuento
                </span>
              </h1>
            </div>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Disfraces cinematográficos, máscaras LED, máquinas de niebla y golosinas para Trick-or-Treat con envío express garantizado antes de la noche del 31 de octubre.
            </p>

            {/* Live Countdown Box */}
            <div className="p-4 rounded-xl bg-[#141024] border border-orange-900/50 max-w-md">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Tiempo restante para el aquelarre de ofertas:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#1f1a35] py-2 px-1 rounded-lg border border-orange-500/20">
                  <span className="text-xl sm:text-2xl font-black font-mono text-white block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Días</span>
                </div>
                <div className="bg-[#1f1a35] py-2 px-1 rounded-lg border border-orange-500/20">
                  <span className="text-xl sm:text-2xl font-black font-mono text-orange-400 block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Horas</span>
                </div>
                <div className="bg-[#1f1a35] py-2 px-1 rounded-lg border border-orange-500/20">
                  <span className="text-xl sm:text-2xl font-black font-mono text-orange-400 block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Min</span>
                </div>
                <div className="bg-[#1f1a35] py-2 px-1 rounded-lg border border-orange-500/20">
                  <span className="text-xl sm:text-2xl font-black font-mono text-amber-300 block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Seg</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenPumpkinModal}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold rounded-lg shadow-lg shadow-orange-950/60 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Gift className="w-5 h-5 text-amber-200 animate-spin" />
                <span>Romper Calabaza de Descuento</span>
              </button>

              <button
                onClick={onSwitchToMain}
                className="px-5 py-3 bg-[#1e1933] hover:bg-[#282245] text-slate-300 hover:text-white font-semibold rounded-lg border border-white/10 transition-colors flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>Volver a Mercado General</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Halloween Category Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-slate-400">Filtrar por:</span>
              <button
                onClick={() => onSelectCategory('Disfraces & Cosplay')}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500 text-slate-200 transition-colors"
              >
                Disfraces & Cosplay
              </button>
              <button
                onClick={() => onSelectCategory('Máscaras & FX')}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500 text-slate-200 transition-colors"
              >
                Máscaras LED
              </button>
              <button
                onClick={() => onSelectCategory('Dulces & Golosinas')}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500 text-slate-200 transition-colors"
              >
                Golosinas 2.5kg
              </button>
              <button
                onClick={() => onSelectCategory('Efectos & Iluminación')}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500 text-slate-200 transition-colors"
              >
                Humo & Luces
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-orange-900/60 bg-[#151128] aspect-[16/10] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_halloween_spooky_1793105686815.jpg"
                alt="Mercado de Halloween Spooky Night"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0814] via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-orange-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Edición Limitada Octubre
                </span>
                <p className="text-xl font-bold mt-1">
                  Noche de Aquelarre en EverywhereMarket
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Envíos antes del 31 con devolución sin costo.
                </p>
              </div>
            </div>

            {/* Floating Pumpkin Promo Card */}
            <div 
              onClick={onOpenPumpkinModal}
              className="absolute -bottom-3 -right-3 bg-[#1a1430] border border-orange-500/50 rounded-xl p-3 shadow-xl cursor-pointer hover:border-orange-400 transition-all flex items-center gap-3 animate-float-slow"
            >
              <div className="text-3xl">🎃</div>
              <div>
                <p className="text-xs font-bold text-orange-400">Cupón Secreto Activo</p>
                <p className="text-[11px] text-slate-300">Haz clic para descubrirlo</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
