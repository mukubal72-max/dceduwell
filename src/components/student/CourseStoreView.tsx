import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreProduct, ProductType } from '../../types';
import { SubscriptionStoreView } from './SubscriptionStoreView';
import {
  ShoppingBag,
  ShoppingCart,
  Star,
  Zap,
  CheckCircle2,
  Filter,
  Search,
  Sparkles,
  BookOpen,
  Radio,
  FileCheck,
  FolderDown,
  Layers,
  Crown,
  Tag,
  ArrowRight,
  ShieldCheck,
  Eye,
  Clock,
  PlayCircle,
  PackageCheck,
  ChevronRight,
  Heart
} from 'lucide-react';

export const CourseStoreView: React.FC = () => {
  const {
    storeProducts,
    addToCart,
    setIsCartOpen,
    currentUser,
    courses,
    setSelectedCourseForDetail,
    toggleWishlist
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedExamCategory, setSelectedExamCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [selectedProductForModal, setSelectedProductForModal] = useState<StoreProduct | null>(null);

  const productTypeFilters: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Products', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'recorded_course', label: 'Recorded Courses', icon: <PlayCircle className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'live_course', label: 'Live Interactive Batches', icon: <Radio className="w-3.5 h-3.5 text-rose-500" /> },
    { id: 'test_series', label: 'CBT Test Series', icon: <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'study_material', label: 'Study Material & Books', icon: <FolderDown className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 'mock_test', label: 'Mock Test Packs', icon: <Zap className="w-3.5 h-3.5 text-purple-600" /> },
    { id: 'combo_package', label: 'Combo Packages', icon: <Layers className="w-3.5 h-3.5 text-indigo-600" /> },
    { id: 'membership', label: 'VIP Memberships', icon: <Crown className="w-3.5 h-3.5 text-amber-500" /> }
  ];

  // Filtering
  const filteredProducts = storeProducts
    .filter((p) => {
      if (selectedType !== 'all' && p.type !== selectedType) return false;
      if (selectedExamCategory !== 'All' && p.category !== selectedExamCategory) return false;
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.instructor && p.instructor.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.ratingCount || 0) - (a.ratingCount || 0);
    });

  const handleBuyNow = (product: StoreProduct) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Store Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <ShoppingBag className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" /> DC Maxwell Digital Course Store & Academic Storefront
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
            Comprehensive Courses, Test Series & Study Packages
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Unlock masterclasses taught by top rankers and expert faculties. Get instant access upon enrollment with lifetime notes, full NTA pattern test series, and 1-on-1 mentorship.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
              <Tag className="w-3.5 h-3.5" /> Use Code <strong className="text-white font-mono">MAXWELL50</strong> for 50% Off
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-white/10 px-3 py-1 rounded-lg border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Instant Automatic LMS Activation
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Product Type Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {productTypeFilters.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                selectedType === tab.id
                  ? 'bg-indigo-950 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search, Category & Sorting Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search courses, test series, books..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <select
              value={selectedExamCategory}
              onChange={(e) => setSelectedExamCategory(e.target.value)}
              className="bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
            >
              <option value="All">All Exam Streams</option>
              <option value="JEE">JEE Main & Advanced</option>
              <option value="NEET">NEET Medical</option>
              <option value="Commerce">Commerce & CA Foundation</option>
              <option value="Class 11-12">Class 11-12 Boards</option>
              <option value="Foundation">Class 9-10 Foundation</option>
              <option value="All Exams">All-Access Bundle</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 text-slate-700 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* If VIP Memberships is selected, render full Subscription Store */}
      {selectedType === 'membership' ? (
        <SubscriptionStoreView />
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
          const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          const isEnrolled = product.courseId && currentUser.enrolledCourseIds.includes(product.courseId);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden group hover:border-indigo-300"
            >
              {/* Product Thumbnail & Badge */}
              <div className="relative aspect-video overflow-hidden bg-slate-900">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                {/* Top Badge & Wishlist Heart */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {product.badge && (
                      <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <span className="bg-slate-900/90 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/10">
                      {product.type.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    id={`store-wishlist-toggle-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`p-1.5 rounded-full backdrop-blur-md transition shadow-md cursor-pointer ${
                      currentUser.wishlistCourseIds?.includes(product.id)
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-900 border border-white/20'
                    }`}
                    title={currentUser.wishlistCourseIds?.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        currentUser.wishlistCourseIds?.includes(product.id) ? 'fill-white text-white' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Validity Pill */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <Clock className="w-3 h-3" /> {product.validity || '1 Year Access'}
                  </span>
                  <span className="bg-rose-600/90 font-bold px-2 py-0.5 rounded text-[10px]">
                    {discountPct}% OFF
                  </span>
                </div>
              </div>

              {/* Product Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.ratingCount || 140})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 font-serif line-clamp-2 leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {product.instructor && (
                    <p className="text-[11px] text-slate-600 font-medium">
                      Lead Faculty: <strong className="text-slate-900">{product.instructor}</strong>
                    </p>
                  )}

                  {/* Feature Bullets */}
                  <div className="space-y-1 pt-1">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing and CTAs */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProductForModal(product)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="py-2 px-3 rounded-xl border border-indigo-900 text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-indigo-700" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => handleBuyNow(product)}
                      className="py-2 px-3 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Buy Now</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Product Details Drawer / Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-slate-900">
              <img
                src={selectedProductForModal.thumbnail}
                alt={selectedProductForModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40" />

              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedProductForModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                  {selectedProductForModal.type.replace('_', ' ')}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-serif">{selectedProductForModal.title}</h2>
              </div>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="flex items-center justify-between text-slate-600 border-b border-slate-100 pb-3">
                <span>Category: <strong className="text-slate-900">{selectedProductForModal.category}</strong></span>
                <span>Validity: <strong className="text-slate-900">{selectedProductForModal.validity || '1 Year'}</strong></span>
                <span>Rating: <strong className="text-amber-600">★ {selectedProductForModal.rating}</strong></span>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Product Overview</h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {selectedProductForModal.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">What is Included:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProductForModal.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium text-slate-800">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-slate-900">
                    ₹{selectedProductForModal.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-500 line-through">
                    ₹{selectedProductForModal.originalPrice.toLocaleString('en-IN')} (Incl. All Taxes)
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { addToCart(selectedProductForModal); setSelectedProductForModal(null); }}
                    className="px-4 py-2 bg-white border border-indigo-900 text-indigo-950 font-bold rounded-xl hover:bg-indigo-100 transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => { handleBuyNow(selectedProductForModal); setSelectedProductForModal(null); }}
                    className="px-5 py-2 bg-indigo-950 text-white font-bold rounded-xl hover:bg-indigo-900 transition cursor-pointer shadow-md"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
