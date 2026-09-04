import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coupon, DiscountType } from '../../types';
import {
  Tag,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Percent,
  Calendar,
  Users,
  BookOpen,
  DollarSign,
  AlertCircle,
  Copy,
  Check,
  Search,
  Sparkles,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export const CouponsManagerView: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponStatus, courses, allUsers } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Form Fields
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState<DiscountType>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(50);
  const [minOrderAmount, setMinOrderAmount] = useState<number>(0);
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<number>(5000);
  const [expiryDate, setExpiryDate] = useState<string>('2026-12-31');
  const [usageLimit, setUsageLimit] = useState<number>(500);
  const [applicableCourseIds, setApplicableCourseIds] = useState<string[]>([]);
  const [applicableUserEmails, setApplicableUserEmails] = useState<string[]>([]);
  const [userEmailInput, setUserEmailInput] = useState<string>('');

  const resetForm = () => {
    setEditingCouponId(null);
    setCode('');
    setDescription('');
    setDiscountType('percentage');
    setDiscountValue(50);
    setMinOrderAmount(0);
    setMaxDiscountAmount(5000);
    setExpiryDate('2026-12-31');
    setUsageLimit(500);
    setApplicableCourseIds([]);
    setApplicableUserEmails([]);
    setUserEmailInput('');
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (coupon: Coupon) => {
    setEditingCouponId(coupon.id);
    setCode(coupon.code);
    setDescription(coupon.description);
    setDiscountType(coupon.discountType);
    setDiscountValue(coupon.discountValue);
    setMinOrderAmount(coupon.minOrderAmount || 0);
    setMaxDiscountAmount(coupon.maxDiscountAmount || 0);
    setExpiryDate(coupon.expiryDate);
    setUsageLimit(coupon.usageLimit || 0);
    setApplicableCourseIds(coupon.applicableCourseIds || []);
    setApplicableUserEmails(coupon.applicableUserEmails || []);
    setUserEmailInput((coupon.applicableUserEmails || []).join(', '));
    setIsModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const emailsArray = userEmailInput
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);

    const couponData: Omit<Coupon, 'id'> = {
      code: code.trim().toUpperCase(),
      description: description.trim() || `${discountValue}${discountType === 'percentage' ? '%' : '₹'} Discount Coupon`,
      discountType,
      discountValue: Number(discountValue),
      minOrderAmount: Number(minOrderAmount) || undefined,
      maxDiscountAmount: discountType === 'percentage' && maxDiscountAmount ? Number(maxDiscountAmount) : undefined,
      expiryDate,
      usageLimit: Number(usageLimit) || undefined,
      usedCount: editingCouponId ? (coupons.find(c => c.id === editingCouponId)?.usedCount || 0) : 0,
      applicableCourseIds: applicableCourseIds.length > 0 ? applicableCourseIds : undefined,
      applicableUserEmails: emailsArray.length > 0 ? emailsArray : undefined,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    if (editingCouponId) {
      updateCoupon(editingCouponId, couponData);
    } else {
      addCoupon(couponData);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleCopyCode = (couponCode: string) => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(couponCode);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredCoupons = coupons.filter(c => {
    const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || c.discountType === filterType;
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' ? c.isActive : !c.isActive);
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalUsed = coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
  const activeCount = coupons.filter(c => c.isActive).length;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl border border-amber-900/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-400/20">
            <Tag className="w-3.5 h-3.5 text-amber-400" /> Admin Promotional & Scholarship Engine
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif mt-2">Discount Coupon & Voucher Management</h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Create and govern percentage/fixed discount promo codes with strict limits: Minimum order amount, maximum discount caps, expiration dates, redemption limits, course-specific scoping, and VIP user-specific scoping.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Coupon
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Total Coupons</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{coupons.length}</div>
          <p className="text-[11px] text-slate-500">Configured in system</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Active & Redeemable</span>
          <div className="text-2xl font-black text-emerald-600 font-mono">{activeCount}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">{Math.round((activeCount / Math.max(1, coupons.length)) * 100)}% of total codes live</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Total Redemptions</span>
          <div className="text-2xl font-black text-indigo-600 font-mono">{totalUsed}</div>
          <p className="text-[11px] text-indigo-600 font-semibold">Student checkouts completed</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
          <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Top Performing Code</span>
          <div className="text-lg font-black text-amber-600 font-mono truncate">
            {coupons.sort((a, b) => b.usedCount - a.usedCount)[0]?.code || 'WELCOME50'}
          </div>
          <p className="text-[11px] text-slate-500">Highest student conversion</p>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold text-amber-950">Quick One-Click Templates:</span>
            <p className="text-[11px] text-amber-800">Launch standard institutional scholarship campaigns instantly.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              addCoupon({
                code: `FESTIVE${Math.floor(20 + Math.random() * 80)}`,
                description: 'Seasonal Mega Scholarship Discount',
                discountType: 'percentage',
                discountValue: 40,
                minOrderAmount: 1999,
                maxDiscountAmount: 3000,
                expiryDate: '2026-12-31',
                usageLimit: 300,
                usedCount: 0,
                isActive: true,
                createdAt: new Date().toISOString()
              });
            }}
            className="px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-bold cursor-pointer transition shadow-2xs"
          >
            + Add 40% Festive Code
          </button>
          <button
            onClick={() => {
              addCoupon({
                code: `RANKER${Math.floor(1000 + Math.random() * 9000)}`,
                description: 'Flat ₹1,500 Cash Discount on CA/JEE Test Series',
                discountType: 'fixed',
                discountValue: 1500,
                minOrderAmount: 4999,
                expiryDate: '2026-12-31',
                usageLimit: 200,
                usedCount: 0,
                isActive: true,
                createdAt: new Date().toISOString()
              });
            }}
            className="px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[11px] font-bold cursor-pointer transition shadow-2xs"
          >
            + Add ₹1,500 Fixed Voucher
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code or description..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
          >
            <option value="all">All Discount Types</option>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount (₹)</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Coupons Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Discount Rate</th>
                <th className="py-3.5 px-4">Order Limits & Caps</th>
                <th className="py-3.5 px-4">Scope & Eligibility</th>
                <th className="py-3.5 px-4">Redemption Status</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No matching coupons found. Create your first coupon to get started.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((coupon) => {
                  const isExpired = new Date(coupon.expiryDate).getTime() < new Date().setHours(0,0,0,0);
                  const isLimitReached = coupon.usageLimit ? coupon.usedCount >= coupon.usageLimit : false;
                  
                  return (
                    <tr key={coupon.id} className="hover:bg-slate-50/80 transition">
                      {/* Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-amber-50 text-amber-950 px-2.5 py-1 rounded-lg border border-amber-200">
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(coupon.code)}
                            className="text-slate-400 hover:text-amber-600 transition cursor-pointer p-1"
                            title="Copy code"
                          >
                            {copiedCode === coupon.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-xs line-clamp-1">{coupon.description}</p>
                      </td>

                      {/* Discount Value */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {coupon.discountType === 'percentage' ? (
                            <span className="text-indigo-600 font-extrabold">{coupon.discountValue}% OFF</span>
                          ) : (
                            <span className="text-emerald-700 font-extrabold">Flat ₹{coupon.discountValue.toLocaleString('en-IN')} OFF</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{coupon.discountType}</span>
                      </td>

                      {/* Limits */}
                      <td className="py-3.5 px-4 text-[11px] space-y-0.5">
                        <div className="text-slate-700">
                          Min: <span className="font-bold font-mono">₹{coupon.minOrderAmount || 0}</span>
                        </div>
                        {coupon.maxDiscountAmount && coupon.discountType === 'percentage' ? (
                          <div className="text-slate-500">
                            Cap: <span className="font-semibold font-mono">₹{coupon.maxDiscountAmount}</span>
                          </div>
                        ) : (
                          <div className="text-slate-400">No max cap</div>
                        )}
                      </td>

                      {/* Scope */}
                      <td className="py-3.5 px-4 text-[11px]">
                        {coupon.applicableCourseIds && coupon.applicableCourseIds.length > 0 ? (
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                            <BookOpen className="w-3 h-3" /> {coupon.applicableCourseIds.length} Course(s)
                          </span>
                        ) : coupon.applicableUserEmails && coupon.applicableUserEmails.length > 0 ? (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 px-2 py-0.5 rounded text-[10px] font-bold border border-purple-200">
                            <Users className="w-3 h-3" /> {coupon.applicableUserEmails.length} User(s)
                          </span>
                        ) : (
                          <span className="text-slate-500 font-medium">All Courses & Users</span>
                        )}
                      </td>

                      {/* Usage */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="font-bold text-slate-900 font-mono">{coupon.usedCount}</span>
                          <span className="text-slate-400 font-mono">/ {coupon.usageLimit || '∞'}</span>
                        </div>
                        {coupon.usageLimit && (
                          <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full ${isLimitReached ? 'bg-rose-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Expiry */}
                      <td className="py-3.5 px-4">
                        <div className={`text-[11px] font-medium ${isExpired ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                          {coupon.expiryDate}
                        </div>
                        {isExpired && (
                          <span className="text-[9px] text-rose-600 font-bold uppercase bg-rose-50 px-1.5 py-0.2 rounded">
                            Expired
                          </span>
                        )}
                      </td>

                      {/* Toggle Status */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleCouponStatus(coupon.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition flex items-center gap-1 border ${
                            coupon.isActive && !isExpired && !isLimitReached
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {coupon.isActive && !isExpired && !isLimitReached ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-slate-400" /> Disabled
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEditModal(coupon)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                            title="Edit Coupon"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete coupon code ${coupon.code}?`)) {
                                deleteCoupon(coupon.id);
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-serif">
                    {editingCouponId ? 'Edit Coupon Settings' : 'Create New Promotional Coupon'}
                  </h3>
                  <p className="text-[10px] text-slate-500">Configure discount value, usage caps, and targeting filters</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4">
              {/* Code and Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. WELCOME50, CAFOUNDATION"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-mono uppercase text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type *</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as DiscountType)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 bg-white text-xs font-semibold"
                  >
                    <option value="percentage">Percentage Discount (%)</option>
                    <option value="fixed">Fixed Amount Discount (₹)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Coupon Description / Promotion Tag</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Flat 50% Scholarship for early bird enrollments"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Discount Value, Min Order, Max Discount */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {discountType === 'percentage' ? 'Discount % *' : 'Discount Amount (₹) *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={discountType === 'percentage' ? 100 : 100000}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                    placeholder="0 for no min"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {discountType === 'percentage' ? 'Max Cap (₹)' : 'N/A (Fixed)'}
                  </label>
                  <input
                    type="number"
                    disabled={discountType === 'fixed'}
                    min={0}
                    value={maxDiscountAmount}
                    onChange={(e) => setMaxDiscountAmount(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono disabled:bg-slate-100 disabled:text-slate-400"
                    placeholder="Max discount cap"
                  />
                </div>
              </div>

              {/* Expiry Date and Usage Limit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Usage Limit</label>
                  <input
                    type="number"
                    min={1}
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 font-mono text-xs"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>

              {/* Course-Specific Restriction */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Course Specific Restriction (Leave empty for All Courses):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[11px]">
                  {courses.map(course => (
                    <label key={course.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={applicableCourseIds.includes(course.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setApplicableCourseIds([...applicableCourseIds, course.id]);
                          } else {
                            setApplicableCourseIds(applicableCourseIds.filter(id => id !== course.id));
                          }
                        }}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="truncate">{course.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* User-Specific Restriction */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  User Specific Restriction (Comma-separated emails, or leave empty):
                </label>
                <input
                  type="text"
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  placeholder="e.g. topper@dcmaxwell.com, scholar@test.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 text-xs font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">If specified, only students matching these email addresses will be permitted to apply this coupon.</p>
              </div>

              {/* Footer Actions */}
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
                  {editingCouponId ? 'Save Changes' : 'Publish Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
