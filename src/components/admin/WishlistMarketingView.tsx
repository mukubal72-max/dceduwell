import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WishlistLead, RemarketingCampaign } from '../../types';
import {
  Heart,
  Send,
  TrendingUp,
  Users,
  DollarSign,
  Gift,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Mail,
  Smartphone,
  Tag,
  ArrowUpRight,
  RefreshCw,
  Plus,
  X,
  Target
} from 'lucide-react';

export const WishlistMarketingView: React.FC = () => {
  const {
    wishlistLeads,
    setWishlistLeads,
    remarketingCampaigns,
    sendRemarketingCampaign,
    courses,
    coupons
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active_in_wishlist' | 'remarketed' | 'converted' | 'dropped'>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  // Campaign Form State
  const [selectedTargetCourseId, setSelectedTargetCourseId] = useState<string>(courses[0]?.id || 'crs-jee-pinnacle');
  const [campaignTitle, setCampaignTitle] = useState('🔥 48-Hour Wishlist Flash Sale');
  const [discountPct, setDiscountPct] = useState(25);
  const [couponCode, setCouponCode] = useState('WISHLIST25');
  const [customMsg, setCustomMsg] = useState('Hi {student_name}, we noticed you saved our premier course to your wishlist! Complete your enrollment today with an exclusive 25% scholarship discount voucher.');
  const [selectedChannels, setSelectedChannels] = useState<Array<'push' | 'whatsapp' | 'email' | 'sms'>>(['push', 'whatsapp', 'email']);

  // KPIs
  const totalLeads = wishlistLeads.length;
  const activeWishlistLeads = wishlistLeads.filter(l => l.status === 'active_in_wishlist');
  const totalPipelineValue = activeWishlistLeads.reduce((sum, l) => sum + l.coursePrice, 0);
  const totalConvertedLeads = wishlistLeads.filter(l => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? ((totalConvertedLeads / totalLeads) * 100).toFixed(1) : '0';
  const totalRevenueGenerated = remarketingCampaigns.reduce((sum, c) => sum + (c.revenueGenerated || 0), 0);

  // Filtered Leads
  const filteredLeads = wishlistLeads.filter(lead => {
    const matchQuery = lead.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchCourse = selectedCourseFilter === 'all' || lead.courseId === selectedCourseFilter;

    return matchQuery && matchStatus && matchCourse;
  });

  const targetCourseObj = courses.find(c => c.id === selectedTargetCourseId);
  const eligibleRecipientsCount = wishlistLeads.filter(l => l.courseId === selectedTargetCourseId && l.status === 'active_in_wishlist').length || 12;

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCourseObj) return;

    sendRemarketingCampaign({
      title: campaignTitle,
      targetCourseId: targetCourseObj.id,
      targetCourseTitle: targetCourseObj.title,
      discountPercentage: discountPct,
      couponCode: couponCode.toUpperCase(),
      channels: selectedChannels,
      recipientsCount: eligibleRecipientsCount,
      customMessage: customMsg
    });

    setIsCampaignModalOpen(false);
  };

  const handleSingleLeadQuickRemarket = (lead: WishlistLead) => {
    sendRemarketingCampaign({
      title: `Personalized Offer for ${lead.studentName}`,
      targetCourseId: lead.courseId,
      targetCourseTitle: lead.courseTitle,
      discountPercentage: 20,
      couponCode: 'SPECIAL20',
      channels: ['whatsapp', 'push'],
      recipientsCount: 1,
      customMessage: `Dear ${lead.studentName}, your saved course "${lead.courseTitle}" is now unlocked with a special 20% scholarship discount!`
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <Heart className="w-5 h-5 fill-rose-500" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Wishlist CRM & Automated Remarketing
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capture high-intent student leads who saved courses and convert them with automated push, WhatsApp, and discount campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="launch-remarketing-campaign-btn"
            onClick={() => setIsCampaignModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Launch Remarketing Blast</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Wishlisted Student Leads</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalLeads}</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {activeWishlistLeads.length} active leads pending checkout
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>High-Intent Pipeline Value</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            ₹{totalPipelineValue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Avg cart value ₹{(totalPipelineValue / (activeWishlistLeads.length || 1)).toFixed(0)}
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Remarketing Campaigns</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {remarketingCampaigns.length}
          </div>
          <p className="text-[11px] text-indigo-600 font-medium mt-1">
            Omnichannel Broadcasts executed
          </p>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Recovered Revenue</span>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            ₹{totalRevenueGenerated.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            {conversionRate}% Conversion recovery rate
          </p>
        </div>
      </div>

      {/* Campaigns History Strip */}
      {remarketingCampaigns.length > 0 && (
        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Executed Remarketing Campaigns & Conversion Analytics</span>
            </h3>
            <span className="text-xs text-slate-500">{remarketingCampaigns.length} Campaigns</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remarketingCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xs transition"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">{camp.title}</span>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                    {camp.discountPercentage}% OFF
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-3 line-clamp-1">
                  Targeting: <strong className="text-slate-700">{camp.targetCourseTitle}</strong>
                </p>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Sent</span>
                    <span className="font-bold text-slate-800">{camp.recipientsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Clicks</span>
                    <span className="font-bold text-indigo-600">{camp.clicksCount || 0}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Converted</span>
                    <span className="font-bold text-emerald-600">{camp.conversionsCount || 0}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Coupon: <strong className="font-mono text-slate-800">{camp.couponCode}</strong></span>
                  <span className="font-bold text-slate-900">
                    +₹{(camp.revenueGenerated || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Table Filters & Search */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="wishlist-leads-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search leads by student name, email, or course..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-indigo-500"
            >
              <option value="all">All Lead Statuses</option>
              <option value="active_in_wishlist">Active in Wishlist</option>
              <option value="remarketed">Remarketed</option>
              <option value="converted">Converted (Purchased)</option>
              <option value="dropped">Dropped</option>
            </select>

            {/* Course Filter */}
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-indigo-500 max-w-[180px] truncate"
            >
              <option value="all">All Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student Info</th>
                <th className="py-3 px-4">Wishlisted Course</th>
                <th className="py-3 px-4">Course Price</th>
                <th className="py-3 px-4">Saved On</th>
                <th className="py-3 px-4">Remarketing History</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-700">No Wishlist Leads Found</p>
                    <p className="text-xs text-slate-400">Try adjusting your filters or search keywords.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{lead.studentName}</div>
                      <div className="text-[11px] text-slate-500">{lead.studentEmail}</div>
                      <div className="text-[11px] text-slate-400">{lead.studentPhone}</div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800 max-w-[200px]">
                      <div className="truncate font-semibold">{lead.courseTitle}</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      ₹{lead.coursePrice.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-xs">
                      {lead.addedDate}
                    </td>

                    <td className="py-3.5 px-4">
                      {lead.remarketingCount > 0 ? (
                        <div>
                          <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {lead.remarketingCount}x Remarketed
                          </span>
                          {lead.lastPromoSent && (
                            <div className="text-[10px] text-slate-400 mt-1">
                              Last: {lead.lastPromoSent}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">Not contacted yet</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {lead.status === 'active_in_wishlist' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Active in Wishlist
                        </span>
                      )}
                      {lead.status === 'remarketed' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Remarketed
                        </span>
                      )}
                      {lead.status === 'converted' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Converted (Enrolled)
                        </span>
                      )}
                      {lead.status === 'dropped' && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Dropped
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {lead.status === 'active_in_wishlist' ? (
                        <button
                          id={`quick-remarket-lead-${lead.id}`}
                          onClick={() => handleSingleLeadQuickRemarket(lead)}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer"
                          title="Send targeted 20% discount offer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>1-Click Offer</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Followed up</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Remarketing Campaign Modal */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Launch Wishlist Remarketing Campaign</h3>
                  <p className="text-[11px] text-slate-500">Broadcast scholarship incentives to high-intent students</p>
                </div>
              </div>
              <button
                onClick={() => setIsCampaignModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLaunchCampaign} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Course / Batch
                </label>
                <select
                  value={selectedTargetCourseId}
                  onChange={(e) => setSelectedTargetCourseId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-indigo-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} (₹{c.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-indigo-600 mt-1 font-medium">
                  🎯 {eligibleRecipientsCount} wishlist leads currently eligible for this course
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Scholarship Discount %
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={80}
                    value={discountPct}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setDiscountPct(val);
                      setCouponCode(`WISHLIST${val}`);
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-indigo-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Channels
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { id: 'push', label: 'Push Notification', icon: <Smartphone className="w-3.5 h-3.5" /> },
                    { id: 'whatsapp', label: 'WhatsApp Blast', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                    { id: 'email', label: 'Email Newsletter', icon: <Mail className="w-3.5 h-3.5" /> },
                    { id: 'sms', label: 'SMS Gateway', icon: <Smartphone className="w-3.5 h-3.5" /> }
                  ].map((ch) => {
                    const isSelected = selectedChannels.includes(ch.id as any);
                    return (
                      <button
                        type="button"
                        key={ch.id}
                        onClick={() => {
                          setSelectedChannels(prev =>
                            isSelected ? prev.filter(c => c !== ch.id) : [...prev, ch.id as any]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {ch.icon}
                        <span>{ch.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Remarketing Message Copy
                </label>
                <textarea
                  rows={3}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="confirm-launch-campaign-btn"
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast to {eligibleRecipientsCount} Students</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
