import React, { useState } from 'react';
import { X, PlusCircle, Check, Sparkles, Tag, DollarSign, Package } from 'lucide-react';
import { Product, Subdomain } from '../types';
import { CATEGORIES } from '../data/products';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  currentSubdomain: Subdomain;
}

export const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  currentSubdomain,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tecnología');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [condition, setCondition] = useState<'Nuevo' | 'Reacondicionado'>('Nuevo');
  const [description, setDescription] = useState('');
  const [isHalloween, setIsHalloween] = useState(currentSubdomain === 'halloween');
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    if (!title || isNaN(numPrice) || numPrice <= 0) return;

    const numOriginal = originalPrice ? parseFloat(originalPrice) : undefined;
    const discount = numOriginal && numOriginal > numPrice 
      ? Math.round(((numOriginal - numPrice) / numOriginal) * 100) 
      : undefined;

    const newProd: Product = {
      id: `user-${Date.now()}`,
      title,
      price: numPrice,
      originalPrice: numOriginal,
      discountPercentage: discount,
      installments: {
        quantity: 6,
        amount: Number((numPrice / 6).toFixed(2)),
        interestFree: true,
      },
      image: isHalloween 
        ? '/src/assets/images/product_halloween_costume_1793105689599.jpg' 
        : '/src/assets/images/product_wireless_headphones_1793105688414.jpg',
      category,
      subdomain: isHalloween ? 'halloween' : 'main',
      rating: 5.0,
      reviewsCount: 1,
      isFullShipping: true,
      isFreeShipping: numPrice > 29,
      condition,
      stock: parseInt(stock) || 10,
      soldCount: 0,
      seller: {
        name: 'Tu Tienda Everywhere',
        level: 'Everywhere Líder Gold',
        rating: 5.0,
        salesCount: 1,
      },
      description: description || `${title}. Producto garantizado con envío FULL en 24 horas y compra protegida.`,
      features: [
        'Garantía oficial del vendedor por 12 meses',
        'Empaque original sellado de fábrica',
        'Despacho inmediato a través de Everywhere FULL'
      ],
      tags: [category.toLowerCase(), isHalloween ? 'halloween' : 'oferta'],
      isHalloweenSpecial: isHalloween,
    };

    onAddProduct(newProd);
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      
      <div className="relative w-full max-w-xl my-auto rounded-2xl shadow-2xl overflow-hidden border bg-white dark:bg-[#161226] border-slate-200 dark:border-orange-900/60 text-slate-900 dark:text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-600 dark:text-orange-400" />
            <h3 className="font-extrabold text-base">Publicar Producto para Vender</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {published ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold">¡Publicación Creada con Éxito!</h4>
            <p className="text-xs text-slate-500">
              Tu producto ya está visible en el catálogo de EverywhereMarket con Envíos FULL.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Title */}
            <div>
              <label className="block text-slate-500 mb-1 font-semibold">
                Título de la publicación *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej: Auriculares Inalámbricos Pro o Disfraz Gótico de Halloween"
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                required
              />
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 mb-1 font-semibold">Categoría</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                >
                  {CATEGORIES.filter(c => c !== 'Todas las Categorías').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-semibold">Condición</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as 'Nuevo' | 'Reacondicionado')}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Reacondicionado">Reacondicionado</option>
                </select>
              </div>
            </div>

            {/* Price & Original Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 mb-1 font-semibold">Precio de Venta ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29.99"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-semibold">Precio Original Tachado ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="49.99"
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-500 mb-1 font-semibold">Stock disponible</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
                  required
                />
              </div>
            </div>

            {/* Subdomain selector: Halloween Special check */}
            <div className="p-3 rounded-xl border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-950/20 flex items-center justify-between">
              <div>
                <p className="font-bold text-orange-900 dark:text-orange-300">
                  ¿Publicar en halloween.everywheremarket.com?
                </p>
                <p className="text-[11px] text-orange-700 dark:text-orange-400">
                  Aparecerá en el subdominio de ofertas de terror con mayor visibilidad temática.
                </p>
              </div>
              <input
                type="checkbox"
                checked={isHalloween}
                onChange={(e) => setIsHalloween(e.target.checked)}
                className="w-4 h-4 accent-orange-600 cursor-pointer"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-500 mb-1 font-semibold">
                Descripción detallada
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalla los beneficios, especificaciones y estado del artículo..."
                rows={3}
                className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-black/30 outline-none"
              />
            </div>

            {/* CTA */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
              >
                Publicar Ahora
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
