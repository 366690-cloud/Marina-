import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Filter, 
  Zap, 
  Truck, 
  Ghost, 
  RotateCcw, 
  ArrowUpDown, 
  Check, 
  HelpCircle,
  ExternalLink,
  ShoppingBag,
  ShieldAlert,
  Star
} from 'lucide-react';
import { Subdomain, Product, CartItem, OrderConfirmation, FilterState } from './types';
import { INITIAL_PRODUCTS, CATEGORIES, HALLOWEEN_CATEGORIES } from './data/products';
import { SubdomainBar } from './components/SubdomainBar';
import { Header } from './components/Header';
import { MainHero } from './components/MainHero';
import { HalloweenHero } from './components/HalloweenHero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PumpkinModal } from './components/PumpkinModal';
import { SellModal } from './components/SellModal';
import { spookyAudio } from './utils/spookyAudio';

export default function App() {
  // Subdomain routing state
  const [subdomain, setSubdomain] = useState<Subdomain>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash.includes('halloween') || window.location.search.includes('halloween')) {
        return 'halloween';
      }
    }
    return 'main';
  });

  // Catalog products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ewm_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ewm_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ewm_favorites');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem('ewm_coupon') || null;
  });
  const [discountRate, setDiscountRate] = useState<number>(() => {
    const rate = localStorage.getItem('ewm_discount_rate');
    return rate ? parseFloat(rate) : 0;
  });

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las Categorías');
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);
  const [onlyFullShipping, setOnlyFullShipping] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<'all' | 'Nuevo' | 'Reacondicionado'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'discount_desc' | 'rating_desc'>('relevance');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPumpkinOpen, setIsPumpkinOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('ewm_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('ewm_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ewm_products', JSON.stringify(products));
  }, [products]);

  // Handle subdomain change and update hash/browser title
  const handleSwitchSubdomain = (newSub: Subdomain) => {
    setSubdomain(newSub);
    if (newSub === 'halloween') {
      window.location.hash = 'halloween';
      document.title = 'Halloween Deals · halloween.everywheremarket.com';
    } else {
      window.location.hash = 'main';
      document.title = 'EverywhereMarket · El marketplace de todas partes';
      if (isAudioPlaying) {
        spookyAudio.stopEerieAmbience();
        setIsAudioPlaying(false);
      }
    }
  };

  // Toggle Audio
  const handleToggleAudio = () => {
    const playing = spookyAudio.toggle();
    setIsAudioPlaying(playing);
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SPOOKY30') {
      setAppliedCoupon('SPOOKY30');
      setDiscountRate(0.30);
      localStorage.setItem('ewm_coupon', 'SPOOKY30');
      localStorage.setItem('ewm_discount_rate', '0.30');
      return true;
    }
    if (clean === 'HALLOWEEN2026') {
      setAppliedCoupon('HALLOWEEN2026');
      setDiscountRate(0.20);
      localStorage.setItem('ewm_coupon', 'HALLOWEEN2026');
      localStorage.setItem('ewm_discount_rate', '0.20');
      return true;
    }
    if (clean === 'EVERYWHERE10') {
      setAppliedCoupon('EVERYWHERE10');
      setDiscountRate(0.10);
      localStorage.setItem('ewm_coupon', 'EVERYWHERE10');
      localStorage.setItem('ewm_discount_rate', '0.10');
      return true;
    }
    return false;
  };

  // Favorites action
  const handleToggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  // New product publish action
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Subdomain filter: if on halloween subdomain, prioritize or only show halloween specials / relevant products
      if (subdomain === 'halloween' && !product.isHalloweenSpecial && product.subdomain !== 'halloween') {
        // In Halloween subdomain, show Halloween products, unless the user explicitly searched for something else
        if (!searchQuery && selectedCategory === 'Todas las Categorías') {
          return false;
        }
      }

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      // Category filter
      if (
        selectedCategory !== 'Todas las Categorías' &&
        selectedCategory !== 'Todas las Ofertas Terroríficas'
      ) {
        if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Free shipping
      if (onlyFreeShipping && !product.isFreeShipping) {
        return false;
      }

      // FULL shipping
      if (onlyFullShipping && !product.isFullShipping) {
        return false;
      }

      // Condition
      if (selectedCondition !== 'all' && product.condition !== selectedCondition) {
        return false;
      }

      // Favorites only
      if (showFavoritesOnly && !favorites.includes(product.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'discount_desc') return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      return 0; // relevance
    });
  }, [
    products,
    subdomain,
    searchQuery,
    selectedCategory,
    onlyFreeShipping,
    onlyFullShipping,
    selectedCondition,
    showFavoritesOnly,
    favorites,
    sortBy,
  ]);

  const isHalloween = subdomain === 'halloween';
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isHalloween ? 'bg-[#0e0b1a] text-slate-100' : 'bg-[#f4f4f7] text-slate-900'
    }`}>
      
      {/* 1. Interactive Domain Switcher Bar */}
      <SubdomainBar
        currentSubdomain={subdomain}
        onSwitchSubdomain={handleSwitchSubdomain}
      />

      {/* 2. Top Header with Search and Navigation */}
      <Header
        currentSubdomain={subdomain}
        onSwitchSubdomain={handleSwitchSubdomain}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onOpenSellModal={() => setIsSellOpen(true)}
        onOpenPumpkinModal={() => setIsPumpkinOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* 3. Hero Campaign Section (Switches between Main & Halloween Subdomain) */}
      {!searchQuery && !showFavoritesOnly && (
        isHalloween ? (
          <HalloweenHero
            onOpenPumpkinModal={() => setIsPumpkinOpen(true)}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSwitchToMain={() => handleSwitchSubdomain('main')}
          />
        ) : (
          <MainHero
            onSwitchSubdomain={handleSwitchSubdomain}
            onExploreDeals={() => setSelectedCategory('Tecnología')}
          />
        )
      )}

      {/* 4. Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {showFavoritesOnly ? (
                  'Mis Productos Favoritos'
                ) : isHalloween ? (
                  'Catálogo Espeluznante de Halloween'
                ) : (
                  'Ofertas Destacadas y Envíos FULL'
                )}
              </h2>
              {isHalloween && (
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-orange-600 text-white">
                  HALLOWEEN 2026
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Mostrando <strong className="text-slate-900 dark:text-white">{filteredProducts.length}</strong> productos disponibles con garantía de entrega
            </p>
          </div>

          {/* Controls: Sort Dropdown & Quick Toggles */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            {showFavoritesOnly && (
              <button
                onClick={() => setShowFavoritesOnly(false)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Ver todos los productos
              </button>
            )}

            {/* Quick Filter: Free Shipping */}
            <button
              onClick={() => setOnlyFreeShipping(!onlyFreeShipping)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyFreeShipping
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Envío Gratis</span>
              {onlyFreeShipping && <Check className="w-3 h-3" />}
            </button>

            {/* Quick Filter: FULL Delivery */}
            <button
              onClick={() => setOnlyFullShipping(!onlyFullShipping)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyFullShipping
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white dark:bg-white/5 border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>FULL 24h</span>
              {onlyFullShipping && <Check className="w-3 h-3" />}
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-lg px-2.5 py-1">
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent text-slate-800 dark:text-slate-200 text-xs font-medium outline-none cursor-pointer"
              >
                <option value="relevance" className="dark:bg-slate-900">Más relevantes</option>
                <option value="discount_desc" className="dark:bg-slate-900">Mayor descuento</option>
                <option value="price_asc" className="dark:bg-slate-900">Menor precio</option>
                <option value="price_desc" className="dark:bg-slate-900">Mayor precio</option>
                <option value="rating_desc" className="dark:bg-slate-900">Mejor valorados</option>
              </select>
            </div>

          </div>
        </div>

        {/* Layout Grid: Sidebar Filters (desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 space-y-6 text-xs">
            
            {/* Category Filter */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#151125] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Categorías
              </h3>
              <div className="space-y-1">
                {(isHalloween ? HALLOWEEN_CATEGORIES : CATEGORIES).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-1.5 px-2 rounded-md transition-colors ${
                      selectedCategory === cat
                        ? (isHalloween ? 'bg-orange-600 text-white font-bold' : 'bg-blue-50 text-blue-700 font-bold')
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#151125] border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                Condición
              </h3>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'Cualquiera' },
                  { id: 'Nuevo', label: 'Nuevo de fábrica' },
                  { id: 'Reacondicionado', label: 'Reacondicionado certificado' }
                ].map((item) => (
                  <label 
                    key={item.id}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === item.id}
                      onChange={() => setSelectedCondition(item.id as typeof selectedCondition)}
                      className="accent-blue-600 dark:accent-orange-500"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subdomain Switcher Box in Sidebar */}
            <div className={`p-4 rounded-xl border ${
              isHalloween 
                ? 'bg-purple-950/40 border-purple-800/40 text-purple-200' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {isHalloween ? <Ghost className="w-4 h-4 text-orange-400" /> : <Sparkles className="w-4 h-4 text-amber-600" />}
                <span>{isHalloween ? 'Subdominio Halloween Activo' : 'Especial de Halloween'}</span>
              </div>
              <p className="text-[11px] leading-relaxed mb-3 opacity-90">
                {isHalloween 
                  ? 'Estás navegando en halloween.everywheremarket.com con descuentos de terror hasta 60% OFF.' 
                  : 'Visita nuestro subdominio con disfraces, máscaras y golosinas para Trick-or-Treat.'}
              </p>
              <button
                onClick={() => handleSwitchSubdomain(isHalloween ? 'main' : 'halloween')}
                className={`w-full py-2 px-3 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isHalloween
                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                    : 'bg-orange-600 text-white hover:bg-orange-500'
                }`}
              >
                <span>{isHalloween ? 'Ir a Mercado Principal' : 'Ver Ofertas de Halloween'}</span>
              </button>
            </div>

            {/* Why EverywhereMarket vs Mercado Libre */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2.5">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                ¿Por qué EverywhereMarket?
              </h4>
              <ul className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Envíos FULL más rápidos que la competencia</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Hasta 12 cuotas fijas sin interés</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Devolución gratuita durante 30 días</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Comisión reducida para vendedores</span>
                </li>
              </ul>
            </div>

          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  No se encontraron productos con estos filtros
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Prueba restableciendo los filtros o cambiando la búsqueda para ver más ofertas disponibles.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Todas las Categorías');
                    setOnlyFreeShipping(false);
                    setOnlyFullShipping(false);
                    setSelectedCondition('all');
                    setShowFavoritesOnly(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currentSubdomain={subdomain}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                    onSelectProduct={setSelectedProduct}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* 5. Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        currentSubdomain={subdomain}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedCoupon={appliedCoupon}
        discountRate={discountRate}
        onApplyCoupon={handleApplyCoupon}
        currentSubdomain={subdomain}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}
        discountRate={discountRate}
        onOrderComplete={(order) => {
          // Clear cart on completion
          setCartItems([]);
        }}
        currentSubdomain={subdomain}
      />

      <PumpkinModal
        isOpen={isPumpkinOpen}
        onClose={() => setIsPumpkinOpen(false)}
        onApplyCoupon={(code) => {
          handleApplyCoupon(code);
        }}
      />

      <SellModal
        isOpen={isSellOpen}
        onClose={() => setIsSellOpen(false)}
        onAddProduct={handleAddProduct}
        currentSubdomain={subdomain}
      />

      {/* 6. Footer (Mercado Libre Style) */}
      <footer className="mt-auto border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0814] text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px]">
                Acerca de EverywhereMarket
              </h4>
              <ul className="space-y-1.5">
                <li><a href="#about" className="hover:underline">Quiénes somos</a></li>
                <li><a href="#investors" className="hover:underline">Inversionistas</a></li>
                <li><a href="#careers" className="hover:underline">Trabaja con nosotros</a></li>
                <li><a href="#press" className="hover:underline">Sala de prensa</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px]">
                Comprar & Vender
              </h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setIsSellOpen(true)} className="hover:underline text-left">Vender en la plataforma</button></li>
                <li><a href="#full" className="hover:underline">Envíos FULL 24h</a></li>
                <li><a href="#guarantee" className="hover:underline">Compra Protegida</a></li>
                <li><a href="#pay" className="hover:underline">EverywherePay</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px]">
                Subdominios & Eventos
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <button 
                    onClick={() => handleSwitchSubdomain('halloween')}
                    className="hover:underline text-orange-500 font-semibold text-left flex items-center gap-1"
                  >
                    <span>🎃 halloween.everywheremarket.com</span>
                  </button>
                </li>
                <li><a href="#blackfriday" className="hover:underline">Black Friday Preview</a></li>
                <li><a href="#cyber" className="hover:underline">Cyber Week 2026</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase text-[11px]">
                Ayuda & Seguridad
              </h4>
              <ul className="space-y-1.5">
                <li><a href="#help" className="hover:underline">Centro de atención al cliente</a></li>
                <li><a href="#security" className="hover:underline">Seguridad en compras</a></li>
                <li><a href="#terms" className="hover:underline">Términos y condiciones</a></li>
                <li><a href="#privacy" className="hover:underline">Privacidad de datos</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <p>
              © 2026 EverywhereMarket S.R.L. · Todos los derechos reservados. El marketplace que revoluciona el comercio electrónico.
            </p>
            <div className="flex items-center gap-3">
              <span>Subdominio actual: <strong>{isHalloween ? 'halloween.everywheremarket.com' : 'everywheremarket.com'}</strong></span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
