import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  ShoppingCart,
  Trash2,
  BookOpen,
  Star,
  Zap,
  ArrowRight,
  ShieldCheck,
  Tag,
  Gift,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

export const WishlistView: React.FC = () => {
  const {
    currentUser,
    courses,
    comboPackages,
    storeProducts,
    isInWishlist,
    toggleWishlist,
    addToCart,
    setSelectedCourseForDetail,
    setView,
    remarketingCampaigns
  } = useApp();

  const wishlistedIds = currentUser.wishlistCourseIds || [];

  // Resolve wishlisted items from courses and combo packages
  const wishlistItems = wishlistedIds.map(id => {
    const course = courses.find(c => c.id === id);
    if (course) {
      return {
        id: course.id,
        type: 'course' as const,
        title: course.title,
        tagline: course.tagline,
        category: course.category,
        targetExam: course.targetExam,
        price: course.price,
        originalPrice: course.originalPrice || Math.round(course.price * 1.5),
        rating: course.rating,
        thumbnail: course.thumbnail,
        facultyName: course.facultyName,
        chaptersCount: course.chapters?.length || 8,
        lessonsCount: course.chapters?.reduce((acc, ch) => acc + (ch.lessons?.length || 0), 0) || 45,
        originalObject: course
      };
    }

    const combo = comboPackages.find(cb => cb.id === id);
    if (combo) {
      return {
        id: combo.id,
        type: 'combo' as const,
        title: combo.title,
        tagline: combo.description,
        category: combo.targetExam,
        targetExam: combo.targetExam,
        price: combo.bundlePrice,
        originalPrice: combo.originalTotalValue,
        rating: 4.95,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
        facultyName: 'Curated Faculty Bundle',
        chaptersCount: 16,
        lessonsCount: combo.coursesIncluded.length * 30,
        originalObject: combo
      };
    }

    const product = storeProducts.find(p => p.id === id);
    if (product) {
      return {
        id: product.id,
        type: 'product' as const,
        title: product.title,
        tagline: product.category,
        category: product.category,
        targetExam: product.tags?.[0] || 'Competitive Exams',
        price: product.price,
        originalPrice: product.originalPrice || Math.round(product.price * 1.4),
        rating: product.rating,
        thumbnail: product.image,
        facultyName: 'DC Maxwell Publications',
        chaptersCount: 1,
        lessonsCount: 1,
        originalObject: product
      };
    }

    return null;
  }).filter(Boolean) as Array<{
    id: string;
    type: 'course' | 'combo' | 'product';
    title: string;
    tagline?: string;
    category: string;
    targetExam?: string;
    price: number;
    originalPrice: number;
    rating: number;
    thumbnail: string;
    facultyName?: string;
    chaptersCount: number;
    lessonsCount: number;
    originalObject: any;
  }>;

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

  // Check active remarketing campaigns targeting any wishlisted item
  const activePromo = remarketingCampaigns.find(camp => 
    wishlistedIds.includes(camp.targetCourseId)
  );

  const handleAddAllToCart = () => {
    wishlistItems.forEach(item => {
      if (item.type === 'course') {
        addToCart(item.originalObject);
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">My Saved Wishlist</h1>
          </div>
          <p className="text-sm text-slate-500">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'course' : 'courses & programs'} saved for later reference and scholarship updates.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              id="add-all-wishlist-to-cart-btn"
              onClick={handleAddAllToCart}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* Remarketing Promo Alert Banner */}
      {activePromo && (
        <div className="mt-6 p-4 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-white text-orange-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Special Wishlist Scholarship
                </span>
                <span className="text-xs font-medium text-amber-100">Limited Time Offer</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold mt-1">
                Extra {activePromo.discountPercentage}% Off on "{activePromo.targetCourseTitle}"!
              </h3>
              <p className="text-xs text-amber-100 mt-0.5">
                Use Promo Code <strong className="bg-white/25 px-1.5 py-0.5 rounded font-mono text-white">{activePromo.couponCode}</strong> at checkout.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const targetCourse = courses.find(c => c.id === activePromo.targetCourseId);
              if (targetCourse) {
                addToCart(targetCourse);
              }
            }}
            className="px-4 py-2 bg-white text-orange-600 hover:bg-orange-50 rounded-xl text-xs font-bold whitespace-nowrap shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            Claim Offer Now
          </button>
        </div>
      )}

      {/* Main Grid */}
      {wishlistItems.length === 0 ? (
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Your wishlist is currently empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Explore our premier JEE, NEET, CA & CBSE foundation batches and tap the heart icon to save courses for future enrollment.
          </p>
          <button
            id="explore-catalog-from-wishlist-btn"
            onClick={() => setView('website')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                id={`wishlist-card-${item.id}`}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row items-start gap-4 relative group"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-44 h-32 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded-md backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {item.targetExam || 'Competitive Exam'}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {item.rating}
                    </span>
                  </div>

                  <h3 
                    onClick={() => {
                      if (item.type === 'course') {
                        setSelectedCourseForDetail(item.originalObject);
                      }
                    }}
                    className="text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-600 transition cursor-pointer line-clamp-1"
                  >
                    {item.title}
                  </h3>

                  {item.tagline && (
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {item.tagline}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    {item.facultyName && (
                      <span className="font-medium text-slate-700">By {item.facultyName}</span>
                    )}
                    <span>•</span>
                    <span>{item.chaptersCount} Chapters</span>
                    <span>•</span>
                    <span>{item.lessonsCount} Video Lectures</span>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`remove-wishlist-item-${item.id}`}
                        onClick={() => toggleWishlist(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <button
                        id={`add-to-cart-wishlist-${item.id}`}
                        onClick={() => {
                          if (item.type === 'course' || item.type === 'product') {
                            addToCart(item.originalObject);
                          }
                        }}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist Summary Card */}
          <div className="lg:col-span-1">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs sticky top-24">
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Wishlist Summary</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {wishlistItems.length} Courses
                </span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Total Base Value</span>
                  <span className="line-through text-slate-400">
                    ₹{(totalValue + totalSavings).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Standard Batch Discount</span>
                  <span>- ₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-800">Total Payable</span>
                  <span className="text-xl font-extrabold text-slate-900">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  id="checkout-all-wishlist-btn"
                  onClick={handleAddAllToCart}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Enroll All Items Now</span>
                </button>
              </div>

              {/* Assurances */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Instant 1-Click Access Upon Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Lifetime Revision & Test Series Vault</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Government Recognised Verified Certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
