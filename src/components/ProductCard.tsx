import React from 'react';
import { Heart, ShoppingCart, Zap, Star } from 'lucide-react';
import { Product, Subdomain } from '../types';

interface ProductCardProps {
  product: Product;
  currentSubdomain: Subdomain;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentSubdomain,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
}) => {
  const isHalloween = currentSubdomain === 'halloween';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className={`group relative flex flex-col justify-between rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
        isHalloween
          ? 'bg-[#151224] border border-orange-950/60 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/40 text-slate-100'
          : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md text-slate-900'
      }`}
    >
      {/* Visual Anchor: Product Image (Takes ~65-70% height) */}
      <div className={`relative w-full aspect-square overflow-hidden ${
        isHalloween ? 'bg-[#1f1935]' : 'bg-slate-50'
      }`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback for image loading error
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all ${
            isFavorite
              ? 'bg-red-50 text-red-500'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>

        {/* Discount Badge if available */}
        {product.discountPercentage && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-tight bg-red-600 text-white shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Fast Delivery Badge */}
        {product.isFullShipping && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
            <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
            <span>FULL</span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        
        {/* Category & Rating Row (Zero-pill discipline: unboxed clean text) */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[10px] truncate max-w-[150px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-xs tabular-nums text-slate-700 dark:text-slate-300">
                {product.rating}
              </span>
              <span className="text-[11px] text-slate-400">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className={`font-semibold text-sm line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-orange-400 transition-colors ${
            isHalloween ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {product.title}
          </h3>
        </div>

        {/* Pricing Block with Installments */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/5">
          {product.originalPrice && (
            <p className="text-xs text-slate-400 line-through tabular-nums">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tabular-nums tracking-tight">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            en {product.installments.quantity}x ${product.installments.amount.toFixed(2)} sin interés
          </p>

          <p className="text-[11px] text-slate-500 mt-1">
            {product.isFreeShipping ? 'Envío gratis en 24h' : 'Envío estándar disponible'}
          </p>
        </div>

        {/* Quick Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            isHalloween
              ? 'bg-orange-600/90 hover:bg-orange-500 text-white shadow-sm'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Agregar al carrito</span>
        </button>

      </div>
    </div>
  );
};
