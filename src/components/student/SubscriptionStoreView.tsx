import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubscriptionPlan, StoreProduct } from '../../types';
import {
  Crown,
  Check,
  Zap,
  Sparkles,
  ShieldCheck,
  Star,
  Clock,
  Video,
  Radio,
  FileCheck,
  FolderDown,
  HelpCircle,
  ArrowRight,
  CreditCard,
  ShoppingBag,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SubscriptionStoreView: React.FC = () => {
  const {
    subscriptionPlans,
    currentUser,
    addToCart,
    setIsCartOpen,
    storeProducts
  } = useApp();

  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'quarterly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = (plan: SubscriptionPlan) => {
    // Find matching or create StoreProduct for checkout
    const storeProduct: StoreProduct = {
      id: `sub-prod-${plan.id}`,
      title: plan.name,
      category: 'DC Maxwell VIP Membership',
      type: 'premium_membership',
      price: plan.price,
      originalPrice: plan.originalPrice,
      rating: 4.9,
      ratingCount: 1420,
      description: `Unlimited VIP Access to all recorded courses, daily live masterclasses, CBT test series, and study materials for ${plan.durationDays} days.`,
      features: plan.features,
      validity: `${plan.durationDays} Days Unlimited Access`,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      isPopular: plan.isPopular
    };

    addToCart(storeProduct);
    setIsCartOpen(true);
  };

  const isAlreadySubscribed = currentUser.isSubscribed || currentUser.membershipTier === 'pro';

  const faqs = [
    {
      q: 'What is included with DC Maxwell Premium VIP Pass?',
      a: 'You get 100% unrestricted access to all recorded 4K video courses across JEE, NEET, CA, and UPSC, daily live interactive classes, full CBT test series with All-India Rank benchmarking, complete downloadable study materials & formula books, and 24x7 priority doubt clearing.'
    },
    {
      q: 'Can I access courses on multiple devices?',
      a: 'Yes, your DC Maxwell Premium account is accessible on Web, Tablets, and Mobile. For security and anti-piracy, active video streams are strictly hardware-bound to one active screen at a time.'
    },
    {
      q: 'Will I get the physical printed books and formula sheets?',
      a: 'Annual Pass subscribers receive our comprehensive printed study kits shipped directly to their registered residential address free of charge.'
    },
    {
      q: 'What happens when my subscription period ends?',
      a: 'You can easily renew your subscription plan at any time. All your notes, bookmarks, exam scorecards, and certificates earned during the subscription remain permanently in your account.'
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-amber-400/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 opacity-10 pointer-events-none hidden md:block">
          <Crown className="w-80 h-80 text-amber-300" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-400/10 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full border border-amber-400/30 tracking-wide uppercase">
            <Crown className="w-4 h-4 text-amber-400" /> DC Maxwell All-Access VIP Pass
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
            One Subscription. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
              Unlimited Access to Everything.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Stop buying individual courses. Get unlimited access to 100+ premier courses, daily live interactive batches, 500+ CBT test series, digital formula vaults, and personal mentorship.
          </p>

          {/* Current Membership Status Badge */}
          <div className="pt-2">
            {isAlreadySubscribed ? (
              <div className="inline-flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-4 py-2 rounded-2xl text-xs font-bold shadow-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>You have an Active VIP Premium Pass! (Expires: {currentUser.subscriptionEndDate || 'Dec 31, 2026'})</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-700 text-slate-300 px-4 py-2 rounded-2xl text-xs">
                <Star className="w-4 h-4 text-amber-400" />
                <span>Current Plan: <strong className="text-white">Free Guest Tier</strong> (Demo previews only)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Pricing Cards */}
      <div className="space-y-4">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-slate-900">
            Choose Your Learning Pass
          </h2>
          <p className="text-xs text-slate-500">
            Transparent pricing with no hidden charges. Cancel or upgrade anytime with instant activation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {subscriptionPlans.map((plan) => {
            const isAnnual = plan.interval === 'annual';
            const savingsPct = plan.originalPrice > plan.price ? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100) : 0;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 border transition-all duration-200 flex flex-col justify-between relative ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white border-amber-400 shadow-2xl ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'bg-white text-slate-900 border-slate-200 shadow-md hover:border-indigo-300'
                }`}
              >
                {plan.badgeText && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                    {plan.badgeText}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${
                      plan.isPopular
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'bg-indigo-50 text-indigo-950 border border-indigo-100'
                    }`}>
                      {plan.interval} PASS
                    </span>
                    <span className="text-xs font-bold text-emerald-600 font-mono">
                      Save {savingsPct}%
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg font-serif">{plan.name}</h3>
                    <p className={`text-xs mt-1 ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                      Full access to all current and upcoming batches for {plan.durationDays} days.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-700/20">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black font-mono">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className={`text-sm line-through font-mono ${plan.isPopular ? 'text-slate-400' : 'text-slate-400'}`}>
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-0.5 ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                      Includes all GST & digital taxes
                    </span>
                  </div>

                  {/* Feature Deliverables List */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-700/20 text-xs">
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${plan.isPopular ? 'text-amber-300' : 'text-slate-600'}`}>
                      Included VIP Privileges:
                    </span>
                    <div className="space-y-2">
                      {plan.features?.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-amber-400' : 'text-emerald-600'}`} />
                          <span className={`text-[11px] leading-relaxed ${plan.isPopular ? 'text-slate-200' : 'text-slate-700'}`}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-6">
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-md ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-indigo-950 hover:bg-indigo-900 text-white'
                    }`}
                  >
                    <Crown className="w-4 h-4" />
                    <span>{isAlreadySubscribed ? 'Extend VIP Pass' : 'Unlock VIP Access Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Feature Comparison
          </span>
          <h3 className="text-xl font-bold font-serif text-slate-900 mt-2">Free Guest vs. DC Maxwell Premium Pass</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Platform Feature</th>
                <th className="py-3 px-4 text-center">Free Guest Tier</th>
                <th className="py-3 px-4 text-center bg-amber-50/50 rounded-t-xl text-amber-950 font-black">
                  DC Maxwell Premium Pass
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px]">
              {[
                { name: '4K Recorded Courses & Masterclasses', free: 'Demo Preview Only (1-2 Lessons)', vip: 'Unlimited Full Syllabus Access' },
                { name: 'Daily Live Interactive Batches & Chat', free: 'Open Webinars Only', vip: 'All Live Batches with Live Hand-Raise' },
                { name: 'NTA Standard CBT Test Series & Mock Exams', free: '1 Free Sample Test', vip: '500+ Full Tests with AIR Rank Card' },
                { name: 'Study Material & Formula Books Vault', free: 'Sample Notes Only', vip: 'Complete 8-Type Materials Vault + PDFs' },
                { name: '24x7 Priority Faculty Doubt Desk', free: 'Community Forum Only', vip: 'Direct Faculty 1-on-1 Resolution' },
                { name: 'Course Completion Digital Certificates', free: 'Not Included', vip: 'Official Verified QR Certificates' },
                { name: 'Hardware-Bound DRM Video Streaming', free: 'Standard Quality', vip: '4K HDR Anti-Piracy Streaming' },
                { name: 'Ad-Free Distraction-Free Experience', free: 'Promotional Banners', vip: '100% Pure Learning Space' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.name}</td>
                  <td className="py-3 px-4 text-center text-slate-500">{row.free}</td>
                  <td className="py-3 px-4 text-center bg-amber-50/30 font-bold text-amber-950">
                    <span className="inline-flex items-center gap-1 text-emerald-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> {row.vip}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold font-serif text-slate-900">Subscription Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs text-slate-900 bg-slate-50/50 hover:bg-slate-100/80 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="p-4 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
