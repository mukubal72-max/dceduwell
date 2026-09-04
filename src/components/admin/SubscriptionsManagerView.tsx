import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubscriptionPlan, SubscriptionInterval } from '../../types';
import {
  Crown,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  Star,
  Zap,
  TrendingUp,
  CreditCard,
  DollarSign,
  Calendar,
  Check,
  Award,
  Video,
  FileCheck,
  FolderDown,
  HelpCircle
} from 'lucide-react';

export const SubscriptionsManagerView: React.FC = () => {
  const { subscriptionPlans, setSubscriptionPlans, allUsers, orders } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  // Form
  const [name, setName] = useState('DC Maxwell Premium Annual Pass');
  const [interval, setInterval] = useState<SubscriptionInterval>('annual');
  const [price, setPrice] = useState<number>(24999);
  const [originalPrice, setOriginalPrice] = useState<number>(44999);
  const [durationDays, setDurationDays] = useState<number>(365);
  const [isPopular, setIsPopular] = useState(true);
  const [badgeText, setBadgeText] = useState('Best Value • Save 45%');
  const [featuresInput, setFeaturesInput] = useState(
    'All Recorded 4K Video Courses\nUnlimited CBT Test Series with AIR Rank Card\nComplete Digital Study Materials & Formula PDF Vault\nDaily Live Interactive Classes & Doubt Desk\n1-on-1 Faculty Mentorship & Strategy Sessions\nExclusive Exam Crash Courses & Revision Batches'
  );

  const resetForm = () => {
    setEditingPlanId(null);
    setName('');
    setInterval('monthly');
    setPrice(2999);
    setOriginalPrice(4999);
    setDurationDays(30);
    setIsPopular(false);
    setBadgeText('');
    setFeaturesInput(
      'All Recorded 4K Video Courses\nUnlimited CBT Test Series\nDigital Study Materials Vault\nSelected Live Interactive Classes\n24x7 Faculty Doubt Support'
    );
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (plan: SubscriptionPlan) => {
    setEditingPlanId(plan.id);
    setName(plan.name);
    setInterval(plan.interval);
    setPrice(plan.price);
    setOriginalPrice(plan.originalPrice);
    setDurationDays(plan.durationDays);
    setIsPopular(plan.isPopular || false);
    setBadgeText(plan.badgeText || '');
    setFeaturesInput((plan.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const featuresList = featuresInput
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    if (editingPlanId) {
      setSubscriptionPlans(prev => prev.map(p => {
        if (p.id === editingPlanId) {
          return {
            ...p,
            name: name.trim(),
            interval,
            price: Number(price),
            originalPrice: Number(originalPrice),
            durationDays: Number(durationDays),
            isPopular,
            badgeText: badgeText.trim() || undefined,
            features: featuresList
          };
        }
        return p;
      }));
    } else {
      const newPlan: SubscriptionPlan = {
        id: `plan-${Date.now()}`,
        name: name.trim(),
        interval,
        price: Number(price),
        originalPrice: Number(originalPrice),
        durationDays: Number(durationDays),
        features: featuresList,
        isPopular,
        badgeText: badgeText.trim() || undefined,
        isActive: true,
        enrolledSubscribersCount: 0
      };
      setSubscriptionPlans(prev => [...prev, newPlan]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('Are you sure you want to remove this subscription plan?')) {
      setSubscriptionPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  // Calculate active subscribers
  const totalSubscribers = subscriptionPlans.reduce((sum, p) => sum + (p.enrolledSubscribersCount || 0), 0);
  const monthlyRecurringRev = subscriptionPlans.reduce((acc, p) => {
    const subs = p.enrolledSubscribersCount || 0;
    const monthlyEquivalent = p.interval === 'annual' ? p.price / 12 : p.interval === 'quarterly' ? p.price / 3 : p.price;
    return acc + Math.round(subs * monthlyEquivalent);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl border border-amber-900/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-400/20">
            <Crown className="w-3.5 h-3.5 text-amber-400" /> Future-Ready SaaS Architecture
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif mt-2">DC Maxwell Premium Subscription Engine</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Govern institutional recurring memberships (Monthly, Quarterly, and Annual). Subscribed students get all-inclusive VIP access across recorded courses, live classes, CBT test series, and study materials.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Subscription Plan
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Active VIP Subscribers</span>
          <div className="text-2xl font-black text-amber-600 font-mono">{totalSubscribers.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+24.5% new subscribers this month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Monthly Recurring Revenue (MRR)</span>
          <div className="text-2xl font-black text-slate-900 font-mono">₹{monthlyRecurringRev.toLocaleString('en-IN')}</div>
          <p className="text-[11px] text-slate-500">Calculated on run-rate</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Active Plans</span>
          <div className="text-2xl font-black text-indigo-600 font-mono">{subscriptionPlans.length}</div>
          <p className="text-[11px] text-slate-500">Monthly, Quarterly, Annual</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Average Retention</span>
          <div className="text-2xl font-black text-emerald-700 font-mono">92.4%</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Low subscriber churn</p>
        </div>
      </div>

      {/* Subscription Plans Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {subscriptionPlans.map((plan) => {
          const discountPct = plan.originalPrice > plan.price ? Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100) : 0;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 border shadow-xs space-y-4 flex flex-col justify-between transition relative ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white border-amber-400 shadow-xl'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              {plan.badgeText && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-md">
                  {plan.badgeText}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    plan.isPopular ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-indigo-50 text-indigo-900 border border-indigo-100'
                  }`}>
                    {plan.interval.toUpperCase()} PASS
                  </span>
                  <span className="text-xs font-semibold font-mono text-emerald-500">
                    Save {discountPct}%
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg font-serif">{plan.name}</h3>
                  <p className={`text-xs mt-1 ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                    Valid for {plan.durationDays} days of unlimited premium access across all portals.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-700/30 flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono">₹{plan.price.toLocaleString('en-IN')}</span>
                  <span className={`text-xs line-through font-mono ${plan.isPopular ? 'text-slate-400' : 'text-slate-400'}`}>
                    ₹{plan.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[11px] font-normal ${plan.isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                    /{plan.interval}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-slate-700/30 text-xs">
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${plan.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                    Included Subscriber Privileges:
                  </span>
                  <div className="space-y-1.5">
                    {plan.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={`text-[11px] ${plan.isPopular ? 'text-slate-200' : 'text-slate-700'}`}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className={`pt-3 border-t flex items-center justify-between text-xs ${plan.isPopular ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={`text-[11px] font-semibold ${plan.isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                  {plan.enrolledSubscribersCount || 0} Active Subscribers
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(plan)}
                    className={`p-2 rounded-xl transition cursor-pointer ${
                      plan.isPopular ? 'hover:bg-slate-800 text-slate-300 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                    title="Edit Plan"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className={`p-2 rounded-xl transition cursor-pointer ${
                      plan.isPopular ? 'hover:bg-rose-950/50 text-rose-400' : 'hover:bg-rose-50 text-rose-600'
                    }`}
                    title="Delete Plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif">
                    {editingPlanId ? 'Edit Subscription Tier' : 'Create Subscription Plan'}
                  </h3>
                  <p className="text-[10px] text-slate-500">Configure recurring interval, pricing, and all-inclusive privileges</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Plan Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. DC Maxwell Premium Annual Pass"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Billing Interval *</label>
                  <select
                    value={interval}
                    onChange={(e) => {
                      const val = e.target.value as SubscriptionInterval;
                      setInterval(val);
                      if (val === 'monthly') { setDurationDays(30); setPrice(2999); setOriginalPrice(4999); }
                      else if (val === 'quarterly') { setDurationDays(90); setPrice(7999); setOriginalPrice(12999); }
                      else { setDurationDays(365); setPrice(24999); setOriginalPrice(44999); }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 bg-white text-xs"
                  >
                    <option value="monthly">Monthly (30 Days)</option>
                    <option value="quarterly">Quarterly (90 Days)</option>
                    <option value="annual">Annual (365 Days)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration in Days *</label>
                  <input
                    type="number"
                    required
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200">
                <div>
                  <label className="block font-bold text-amber-950 mb-1">Plan Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-amber-300 bg-white font-mono font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-amber-950 mb-1">MRP Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-amber-300 bg-white font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                      className="rounded text-amber-600"
                    />
                    <span>Highlight as 'Most Popular'</span>
                  </label>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Top Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    placeholder="e.g. Best Value • Save 45%"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Included Benefits & Privileges (One per line):
                </label>
                <textarea
                  rows={4}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="All Recorded 4K Video Courses..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition"
                >
                  {editingPlanId ? 'Save Changes' : 'Publish Subscription Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
