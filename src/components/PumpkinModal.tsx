import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Gift } from 'lucide-react';
import { spookyAudio } from '../utils/spookyAudio';

interface PumpkinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
}

export const PumpkinModal: React.FC<PumpkinModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
}) => {
  if (!isOpen) return null;

  const [isCracked, setIsCracked] = useState(false);
  const [isCracking, setIsCracking] = useState(false);
  const [copied, setCopied] = useState(false);

  const couponCode = 'SPOOKY30';

  const handleCrackPumpkin = () => {
    if (isCracked || isCracking) return;
    setIsCracking(true);
    spookyAudio.playTrickOrTreatJingle();

    setTimeout(() => {
      setIsCracking(false);
      setIsCracked(true);
      onApplyCoupon(couponCode);
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      
      <div className="relative w-full max-w-md bg-[#16112a] border border-orange-500/50 rounded-2xl shadow-2xl p-6 text-center text-white overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Glow ambient */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-orange-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Truco o Trato Especial</span>
        </div>

        <h3 className="text-2xl font-black font-spooky tracking-wider text-orange-400 mb-2">
          {isCracked ? '¡Calabaza Desbloqueada!' : '¡Rompe la Calabaza Encantada!'}
        </h3>

        <p className="text-xs text-slate-300 max-w-xs mx-auto mb-6">
          {isCracked 
            ? '¡Has liberado el hechizo de descuento! Ya está aplicado en tu carrito de compras.' 
            : 'Haz clic sobre la gran calabaza para romperla y revelar tu cupón de Halloween.'}
        </p>

        {/* Interactive Pumpkin Element */}
        <div className="py-4 flex justify-center">
          <button
            onClick={handleCrackPumpkin}
            disabled={isCracked}
            className={`text-8xl select-none transition-all duration-300 focus:outline-none ${
              !isCracked
                ? 'cursor-pointer hover:scale-110 active:scale-95 animate-bounce'
                : 'scale-100'
            } ${isCracking ? 'animate-ping' : ''}`}
            title={isCracked ? 'Ya abierta' : 'Haz clic para romperla'}
          >
            {isCracked ? '💥🎃✨' : '🎃'}
          </button>
        </div>

        {/* Revealed Coupon Block */}
        {isCracked ? (
          <div className="mt-4 p-4 rounded-xl bg-orange-950/50 border border-orange-500/60 space-y-3">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block">
              30% DE DESCUENTO EN TODO EL MARKETPLACE
            </span>
            <div className="flex items-center justify-center gap-2 bg-black/60 py-2 px-4 rounded-lg border border-orange-400/40">
              <span className="font-mono text-xl font-black text-orange-400 tracking-wider">
                {couponCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 text-slate-300 hover:text-white"
                title="Copiar código"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium">
              ✓ Aplicado automáticamente a tu sesión actual
            </p>
          </div>
        ) : (
          <button
            onClick={handleCrackPumpkin}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            <span>Tocar para Romper Calabaza</span>
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-xs text-slate-400 hover:text-white transition-colors"
        >
          {isCracked ? 'Continuar comprando ofertas' : 'Cerrar por ahora'}
        </button>

      </div>

    </div>
  );
};
