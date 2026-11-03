import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem, Subdomain } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  discountRate: number;
  onApplyCoupon: (code: string) => boolean;
  currentSubdomain: Subdomain;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  discountRate,
  onApplyCoupon,
  currentSubdomain,
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const isHalloween = currentSubdomain === 'halloween';

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const freeShippingThreshold = 29.0;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.some(i => i.product.isFreeShipping);
  const shippingCost = items.length === 0 ? 0 : (isFreeShipping ? 0 : 4.99);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const ok = onApplyCoupon(code);
    if (ok) {
      setCouponSuccess(`¡Cupón ${code} aplicado con éxito!`);
      setCouponInput('');
    } else {
      setCouponError('Cupón inválido. Prueba con SPOOKY30 o EVERYWHERE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      
      <div className={`w-full max-w-md h-full flex flex-col shadow-2xl transition-all ${
        isHalloween
          ? 'bg-[#130f22] border-l border-orange-900/60 text-slate-100'
          : 'bg-white border-l border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-orange-400" />
            <h2 className="font-bold text-base">Carrito de Compras</h2>
            <span className="text-xs text-slate-400 font-medium">({items.length} {items.length === 1 ? 'producto' : 'productos'})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 text-xs">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <span>🎉</span> ¡Tienes ENVÍO GRATIS garantizado!
            </p>
          ) : (
            <div>
              <p className="text-slate-600 dark:text-slate-300">
                Agrega <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> más para obtener <strong>Envío Gratis</strong>
              </p>
              <div className="w-full bg-slate-200 dark:bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-bold text-slate-700 dark:text-slate-200">Tu carrito está vacío</p>
              <p className="text-xs text-slate-400 max-w-xs">
                Explora los millones de productos o descubre las ofertas de Halloween con hasta 60% OFF.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={item.product.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-white/10 flex gap-3 items-center bg-white dark:bg-white/5 shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg bg-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs truncate">
                    {item.product.title}
                  </h4>
                  <p className="text-xs font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-slate-200 dark:border-white/20 rounded-md text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Coupon, Calculations and Checkout Button */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-white/10 space-y-3 bg-slate-50 dark:bg-[#18142b]">
            
            {/* Coupon Code Input */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Código de descuento (ej: SPOOKY30)"
                    className="w-full py-1.5 pl-7 pr-3 text-xs uppercase border rounded-lg bg-white dark:bg-black/30 border-slate-300 dark:border-white/20 outline-none"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-bold bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-lg hover:opacity-90"
                >
                  Aplicar
                </button>
              </form>

              {appliedCoupon && (
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <Check className="w-3 h-3" />
                  <span>Cupón activo: <strong>{appliedCoupon}</strong> (-{(discountRate * 100).toFixed(0)}%)</span>
                </div>
              )}
              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-500 mt-1">{couponSuccess}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Descuento aplicado:</span>
                  <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Envío:</span>
                <span className="font-semibold tabular-nums">
                  {shippingCost === 0 ? <strong className="text-emerald-600 dark:text-emerald-400">Gratis</strong> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/10">
                <span>Total:</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={onProceedToCheckout}
              className={`w-full py-3 px-4 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isHalloween
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <span>Continuar Compra</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Compra 100% segura con EverywherePay</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
