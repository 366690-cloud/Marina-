import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Wallet, 
  Building2, 
  Copy, 
  Check, 
  PackageCheck
} from 'lucide-react';
import { CartItem, OrderConfirmation, Subdomain } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountRate: number;
  onOrderComplete: (order: OrderConfirmation) => void;
  currentSubdomain: Subdomain;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountRate,
  onOrderComplete,
  currentSubdomain,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [name, setName] = useState('Alejandro Gómez');
  const [email, setEmail] = useState('alejandro.gomez@ejemplo.com');
  const [address, setAddress] = useState('Calle Gran Vía 42, 3º B');
  const [city, setCity] = useState('Madrid');
  const [zip, setZip] = useState('28013');
  const [paymentMethod, setPaymentMethod] = useState<'everywhere_pay' | 'card' | 'cash'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const isHalloween = currentSubdomain === 'halloween';
  const discountAmount = subtotal * discountRate;
  const shippingCost = subtotal >= 29 ? 0 : 4.99;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleConfirmOrder = () => {
    const randomTracking = `EWM-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomOrderId = `#ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderConfirmation = {
      orderId: randomOrderId,
      trackingNumber: randomTracking,
      customerName: name,
      email,
      address: `${address}, ${city} (${zip})`,
      items: [...items],
      total,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      estimatedDelivery: 'Mañana antes de las 19:00h',
      paymentMethod: paymentMethod === 'card' ? 'Tarjeta de Crédito (12 cuotas)' : (paymentMethod === 'everywhere_pay' ? 'EverywherePay' : 'Efectivo en Punto de Pago'),
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onOrderComplete(newOrder);
  };

  const handleCopyTracking = () => {
    if (confirmedOrder) {
      navigator.clipboard?.writeText(confirmedOrder.trackingNumber);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      
      <div className={`relative w-full max-w-2xl my-auto rounded-2xl shadow-2xl overflow-hidden border ${
        isHalloween 
          ? 'bg-[#151125] border-orange-900/60 text-slate-100' 
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight">
              Everywhere<span className={isHalloween ? 'text-orange-400' : 'text-blue-600'}>Checkout</span>
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              · Compra Segura
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on step */}
        <div className="p-6">
          
          {step === 'shipping' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>1. Datos de entrega y destinatario</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Nombre completo</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 mb-1 font-medium">Dirección (Calle, número, piso)</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Ciudad / Localidad</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-medium">Código Postal</label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-100 dark:border-white/10">
                <span className="text-sm font-bold">
                  Total a pagar: ${total.toFixed(2)}
                </span>
                <button
                  onClick={() => setStep('payment')}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Continuar al Pago
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span>2. Selecciona el medio de pago</span>
              </div>

              <div className="space-y-2.5 text-xs">
                
                {/* Option 1: Card */}
                <label 
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-xs'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-bold">Tarjeta de Crédito / Débito</p>
                      <p className="text-slate-500 text-[11px]">Hasta 12 cuotas sin interés con Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-blue-600"
                  />
                </label>

                {/* Option 2: EverywherePay */}
                <label 
                  onClick={() => setPaymentMethod('everywhere_pay')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'everywhere_pay'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-xs'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold">EverywherePay (Dinero en cuenta)</p>
                      <p className="text-slate-500 text-[11px]">Acreditación instantánea con saldo disponible</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'everywhere_pay'}
                    onChange={() => setPaymentMethod('everywhere_pay')}
                    className="accent-blue-600"
                  />
                </label>

                {/* Option 3: Cash points */}
                <label 
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-xs'
                      : 'border-slate-200 dark:border-white/10 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-bold">Efectivo en puntos de cobro</p>
                      <p className="text-slate-500 text-[11px]">Paga en tiendas de conveniencia u oficinas autorizadas</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="accent-blue-600"
                  />
                </label>

              </div>

              {/* Order items recap */}
              <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-lg text-xs space-y-1">
                <div className="flex justify-between font-medium text-slate-500">
                  <span>Productos ({items.length}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Descuento aplicado:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Envío FULL 24h:</span>
                  <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-white/10">
                  <span>Total Final:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setStep('shipping')}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium"
                >
                  ← Volver a Dirección
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all cursor-pointer ${
                    isHalloween
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  Confirmar y Pagar
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Transacción encriptada con protección total al comprador</span>
              </div>
            </div>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 animate-in zoom-in" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  ¡Compra Confirmada con Éxito!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enviamos el comprobante y factura a <strong>{confirmedOrder.email}</strong>
                </p>
              </div>

              {/* Order details badge */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Número de Pedido:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{confirmedOrder.orderId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Código de Rastreo FULL:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-emerald-600">{confirmedOrder.trackingNumber}</span>
                    <button
                      onClick={handleCopyTracking}
                      className="p-1 hover:text-blue-600"
                      title="Copiar tracking"
                    >
                      {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Entrega Estimada:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{confirmedOrder.estimatedDelivery}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Dirección:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{confirmedOrder.address}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-white/10 font-bold">
                  <span>Monto Total Cobrado:</span>
                  <span className="text-base text-slate-900 dark:text-white tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
