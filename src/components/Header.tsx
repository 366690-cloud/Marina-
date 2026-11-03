import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  Heart, 
  User, 
  Ghost, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  PlusCircle,
  Menu,
  X,
  ChevronDown,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Subdomain } from '../types';

interface HeaderProps {
  currentSubdomain: Subdomain;
  onSwitchSubdomain: (subdomain: Subdomain) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
  onOpenSellModal: () => void;
  onOpenPumpkinModal: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSubdomain,
  onSwitchSubdomain,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  cartCount,
  favoritesCount,
  onOpenCart,
  onOpenFavorites,
  onOpenSellModal,
  onOpenPumpkinModal,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const isHalloween = currentSubdomain === 'halloween';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState('Madrid, 28001');
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const locations = [
    'Madrid, 28001',
    'Barcelona, 08001',
    'Buenos Aires, C1002',
    'Ciudad de México, 06600',
    'Bogotá, 110111',
    'Santiago, 8320000'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className={`sticky top-0 z-40 shadow-sm transition-colors duration-300 ${
      isHalloween 
        ? 'bg-[#100d1c] border-b border-orange-900/40 text-slate-100' 
        : 'bg-[#ffe600] text-slate-900 border-b border-yellow-400'
    }`}>
      
      {/* Main Top Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          
          {/* ZONE 1: Single element brand wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSwitchSubdomain(isHalloween ? 'halloween' : 'main')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-105 shadow-sm ${
                isHalloween 
                  ? 'bg-gradient-to-tr from-orange-600 via-amber-500 to-purple-600 text-white shadow-orange-950' 
                  : 'bg-slate-900 text-amber-400'
              }`}>
                {isHalloween ? <Ghost className="w-5 h-5 text-white animate-bounce" /> : 'E'}
              </div>
              <div className="leading-tight">
                <span className={`text-xl font-extrabold tracking-tight whitespace-nowrap block ${
                  isHalloween ? 'text-white' : 'text-slate-900'
                }`}>
                  Everywhere<span className={isHalloween ? 'text-orange-400 font-spooky text-2xl tracking-wider' : 'text-blue-700'}>Market</span>
                </span>
                <span className={`text-[10px] uppercase font-semibold tracking-wider block ${
                  isHalloween ? 'text-orange-400 font-medium' : 'text-slate-700'
                }`}>
                  {isHalloween ? 'halloween.subdomain · deals 2026' : 'Compra en todas partes'}
                </span>
              </div>
            </button>
          </div>

          {/* ZONE 2: Search Input & Category Filter */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={isHalloween ? 'Buscar disfraces, máscaras led, dulces terroríficos...' : 'Buscar productos, marcas y más...'}
                className={`w-full py-2.5 pl-4 pr-11 text-sm rounded-lg shadow-sm border transition-all outline-none ${
                  isHalloween 
                    ? 'bg-[#1e192f] border-orange-500/30 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500' 
                    : 'bg-white border-transparent text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              <button
                type="submit"
                aria-label="Buscar"
                className={`absolute right-1.5 p-1.5 rounded-md transition-colors ${
                  isHalloween ? 'text-orange-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ZONE 3: Primary Actions (Vender, Favoritos, Carrito) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Halloween Sound Toggle */}
            {isHalloween && (
              <button
                onClick={onToggleAudio}
                title={isAudioPlaying ? 'Silenciar ambiente espeluznante' : 'Activar sonido Halloween'}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-orange-950/80 border border-orange-700/50 text-orange-300 hover:bg-orange-900 transition-colors"
              >
                {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden xl:inline">{isAudioPlaying ? 'Música Spooky' : 'Activar Sonido'}</span>
              </button>
            )}

            {/* Mystery Pumpkin Cracker Button (Halloween Subdomain) */}
            {isHalloween && (
              <button
                onClick={onOpenPumpkinModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md transition-all animate-pulse-glow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Calabaza Sorpresa</span>
              </button>
            )}

            {/* Sell Button */}
            <button
              onClick={onOpenSellModal}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                isHalloween
                  ? 'bg-purple-950/60 border border-purple-700/50 text-purple-200 hover:bg-purple-900/80'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Vender</span>
            </button>

            {/* Favorites Icon */}
            <button
              onClick={onOpenFavorites}
              className={`relative p-2 rounded-md transition-colors ${
                isHalloween ? 'hover:bg-white/10 text-slate-300' : 'hover:bg-black/10 text-slate-800'
              }`}
              title="Mis Favoritos"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className={`relative p-2 rounded-md transition-colors flex items-center gap-1.5 ${
                isHalloween ? 'hover:bg-white/10 text-orange-400' : 'hover:bg-black/10 text-slate-900'
              }`}
              title="Carrito de compras"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-800 dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Second Row: Location & Secondary Navigation Links */}
        <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Location Delivery Selector */}
          <div className="relative flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" />
            <span className="opacity-75">Enviar a:</span>
            <button
              onClick={() => setIsEditingLocation(!isEditingLocation)}
              className="font-semibold underline underline-offset-2 flex items-center gap-0.5 hover:opacity-80"
            >
              <span>{location}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isEditingLocation && (
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white text-slate-900 shadow-xl border border-slate-200 p-2 z-50">
                <p className="text-[11px] font-medium text-slate-500 mb-1 px-1">Selecciona tu ciudad:</p>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setIsEditingLocation(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-slate-100 transition-colors"
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Category / Nav links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-medium">
            <button
              onClick={() => onSelectCategory('Todas las Categorías')}
              className={`hover:opacity-80 transition-opacity ${selectedCategory === 'Todas las Categorías' ? 'font-bold underline' : ''}`}
            >
              Todas las Categorías
            </button>
            <button
              onClick={() => onSelectCategory('Tecnología')}
              className={`hover:opacity-80 transition-opacity ${selectedCategory === 'Tecnología' ? 'font-bold underline' : ''}`}
            >
              Tecnología
            </button>
            <button
              onClick={() => onSelectCategory('Disfraces & Cosplay')}
              className={`hover:opacity-80 transition-opacity flex items-center gap-1 ${
                selectedCategory === 'Disfraces & Cosplay' ? 'font-bold underline' : ''
              }`}
            >
              <span>Disfraces</span>
              {isHalloween && <span className="text-[10px] px-1 bg-orange-600 text-white rounded">BOO</span>}
            </button>
            <button
              onClick={() => onSelectCategory('Hogar & Electrodomésticos')}
              className={`hover:opacity-80 transition-opacity ${selectedCategory === 'Hogar & Electrodomésticos' ? 'font-bold underline' : ''}`}
            >
              Hogar
            </button>
            <button
              onClick={() => onSelectCategory('Herramientas')}
              className={`hover:opacity-80 transition-opacity ${selectedCategory === 'Herramientas' ? 'font-bold underline' : ''}`}
            >
              Herramientas
            </button>
            <button
              onClick={() => onSwitchSubdomain(isHalloween ? 'main' : 'halloween')}
              className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded transition-all ${
                isHalloween
                  ? 'bg-amber-400 text-slate-900 hover:bg-amber-300'
                  : 'bg-orange-600 text-white hover:bg-orange-500 shadow-sm'
              }`}
            >
              <Ghost className="w-3 h-3" />
              <span>{isHalloween ? 'Ir a Mercado General' : 'Ofertas Halloween 60% OFF'}</span>
            </button>
          </nav>

          {/* Right Trust Badges */}
          <div className="hidden sm:flex items-center gap-4 text-[11px] opacity-80">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-600" />
              <span>Envíos FULL 24h</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Compra Protegida</span>
            </span>
          </div>

        </div>

      </div>

      {/* Mobile search bar if on small screen */}
      <div className="md:hidden px-4 pb-2.5">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar productos y ofertas..."
            className="w-full py-2 pl-3 pr-10 text-sm rounded-lg bg-white text-slate-900 border border-transparent shadow-sm outline-none"
          />
          <button type="submit" className="absolute right-2 top-2 text-slate-500">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white px-4 py-4 space-y-3 border-t border-slate-800">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Subdominios</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onSwitchSubdomain('main'); setMobileMenuOpen(false); }}
              className={`p-2 rounded text-xs text-left font-medium ${!isHalloween ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800'}`}
            >
              everywheremarket.com
            </button>
            <button
              onClick={() => { onSwitchSubdomain('halloween'); setMobileMenuOpen(false); }}
              className={`p-2 rounded text-xs text-left font-medium ${isHalloween ? 'bg-orange-600 text-white font-bold' : 'bg-slate-800 text-orange-400'}`}
            >
              halloween.everywheremarket.com
            </button>
          </div>

          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold pt-2">Categorías</p>
          <div className="flex flex-col gap-1 text-sm">
            <button
              onClick={() => { onSelectCategory('Todas las Categorías'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-slate-200"
            >
              Todas las Categorías
            </button>
            <button
              onClick={() => { onSelectCategory('Tecnología'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-slate-200"
            >
              Tecnología
            </button>
            <button
              onClick={() => { onSelectCategory('Disfraces & Cosplay'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-orange-400 font-semibold"
            >
              🎃 Ofertas de Halloween
            </button>
            <button
              onClick={() => { onSelectCategory('Hogar & Electrodomésticos'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-slate-200"
            >
              Hogar & Electrodomésticos
            </button>
            <button
              onClick={() => { onOpenSellModal(); setMobileMenuOpen(false); }}
              className="text-left py-1 text-amber-400 font-semibold"
            >
              + Publicar Producto para Vender
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
