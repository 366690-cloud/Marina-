import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Heart, 
  Check, 
  Share2, 
  Award,
  ChevronRight
} from 'lucide-react';
import { Product, Subdomain } from '../types';

interface ProductModalProps {
  product: Product | null;
  currentSubdomain: Subdomain;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currentSubdomain,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBuyNow,
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('28001');
  const [copiedLink, setCopiedLink] = useState(false);

  const isHalloween = currentSubdomain === 'halloween';

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      
      <div 
        className={`relative w-full max-w-4xl my-auto rounded-2xl shadow-2xl overflow-hidden border transition-all ${
          isHalloween
            ? 'bg-[#151125] border-orange-900/60 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 dark:border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span>Inicio</span>
            <ChevronRight className="w-3 h-3" />
            <span>{product.category}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="truncate max-w-[200px] text-slate-800 dark:text-slate-300 font-medium">
              {product.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              title="Compartir enlace"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleFavorite(product)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
              title="Guardar en favoritos"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto">
          
          {/* Left Column: Product Gallery & Highlights */}
          <div className="md:col-span-7 space-y-6">
            
            <div className={`relative rounded-xl overflow-hidden aspect-square border ${
              isHalloween ? 'bg-[#1c1630] border-orange-900/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isFullShipping && (
                <div className="absolute top-3 left-3 flex items-center gap-1 text-xs font-black text-emerald-400 bg-black/70 px-2.5 py-1 rounded backdrop-blur-sm">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>ENVÍO FULL 24H</span>
                </div>
              )}
            </div>

            {/* Description & Features */}
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Descripción del producto
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>

              <h4 className="font-bold text-base text-slate-900 dark:text-white pt-2">
                Características principales
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-5 space-y-5">
            
            {/* Condition & SoldCount */}
            <div className="text-xs text-slate-400">
              <span>{product.condition}</span>
              <span className="mx-1.5">·</span>
              <span>+{product.soldCount} vendidos</span>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              <span className="font-bold tabular-nums">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount} opiniones de compradores)</span>
            </div>

            {/* Price block */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums block">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold tabular-nums tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                en {product.installments.quantity}x ${product.installments.amount.toFixed(2)} sin interés
              </p>
            </div>

            {/* Shipping Simulator */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                <Truck className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">
                    {product.isFreeShipping ? 'Envío gratis a todo el país' : 'Envío estándar con descuento'}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Llega mañana comprando dentro de las próximas 3 horas.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-slate-500">Código Postal:</span>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-20 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none"
                />
                <span className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer">
                  Calcular
                </span>
              </div>
            </div>

            {/* Stock selector */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="font-semibold">Cantidad:</span>
              <div className="flex items-center border border-slate-300 dark:border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-white/10 font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-slate-400 text-[11px]">
                ({product.stock} disponibles)
              </span>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onBuyNow(product, quantity)}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm cursor-pointer"
              >
                Comprar ahora
              </button>

              <button
                onClick={() => onAddToCart(product, quantity)}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-all text-sm border cursor-pointer ${
                  isHalloween
                    ? 'bg-orange-600/20 border-orange-500/50 hover:bg-orange-600/30 text-orange-300'
                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700'
                }`}
              >
                Agregar al carrito
              </button>
            </div>

            {/* Seller Reputation info */}
            <div className="p-3 rounded-lg border border-slate-100 dark:border-white/10 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Vendido por {product.seller.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {product.seller.level}
                </span>
                <span>·</span>
                <span>+{product.seller.salesCount.toLocaleString()} ventas concretadas</span>
              </div>
            </div>

            {/* Buyer Protection Guarantee */}
            <div className="space-y-1.5 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Compra Protegida Everywhere</strong>: Recibe lo que esperabas o te devolvemos el dinero.</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-500 shrink-0" />
                <span>30 días de devolución gratis desde que lo recibes.</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
