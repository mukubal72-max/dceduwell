import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Trash2,
  Tag,
  CheckCircle2,
  CreditCard,
  QrCode,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  BookOpen,
  PackageCheck,
  Clock,
  Download,
  Check,
  FileText,
  Play,
  Building,
  Smartphone,
  Wallet,
  Lock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartCheckoutModal: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    completeCheckout,
    setView,
    currentUser,
    setSelectedInvoice,
    coupons,
    validateCoupon
  } = useApp();

  const [couponCode, setCouponCode] = useState('WELCOME50');
  const [appliedCouponResult, setAppliedCouponResult] = useState<{
    code: string;
    discountAmount: number;
    discountPct?: number;
    description?: string;
  } | null>(null);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  
  // Payment methods: upi, card, netbanking, wallets, emi
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallets' | 'emi'>('upi');
  
  // Sub-options
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [upiIdInput, setUpiIdInput] = useState('student@oksbi');
  
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8842',
    name: currentUser.name || 'Scholar Student',
    expiry: '08/29',
    cvv: '•••'
  });

  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm Wallet');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedOrderMeta, setCompletedOrderMeta] = useState<any>(null);

  // Calculate base price
  const subtotal = cart.reduce((acc, item) => {
    const price = item.comboUpgrade
      ? (item.course?.price || 0) + 1499
      : (item.product?.price ?? item.course?.price ?? 0);
    return acc + price;
  }, 0);

  // Re-validate coupon if cart changes
  const discountAmount = appliedCouponResult?.discountAmount || 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstTax = Math.round(taxableAmount * 0.18); // 18% GST
  const grandTotal = taxableAmount + gstTax;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) {
      setCouponMessage({ text: 'Please enter a coupon code.', isError: true });
      return;
    }
    setCouponCode(code);
    const result = validateCoupon(code, subtotal, cart, currentUser.email);
    
    if (result.isValid) {
      setAppliedCouponResult({
        code: result.appliedCoupon?.code || code,
        discountAmount: result.discountAmount,
        discountPct: result.discountPercentage,
        description: result.appliedCoupon?.description
      });
      const desc = result.appliedCoupon?.discountType === 'percentage' 
        ? `${result.appliedCoupon.discountValue}% Off applied!` 
        : `Flat ₹${result.appliedCoupon?.discountValue.toLocaleString('en-IN')} Off applied!`;
      setCouponMessage({ text: `🎉 ${code}: ${desc} Saved ₹${result.discountAmount.toLocaleString('en-IN')}`, isError: false });
    } else {
      setAppliedCouponResult(null);
      setCouponMessage({ text: result.errorMessage || 'Invalid coupon code.', isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponResult(null);
    setCouponCode('');
    setCouponMessage(null);
  };

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const paymentMethodName = 
        selectedPaymentMethod === 'upi' ? `UPI (${selectedUpiApp.toUpperCase()})` :
        selectedPaymentMethod === 'card' ? 'Credit / Debit Card' :
        selectedPaymentMethod === 'netbanking' ? `Net Banking (${selectedBank})` :
        selectedPaymentMethod === 'wallets' ? `Digital Wallet (${selectedWallet})` :
        '0% Interest Education EMI';

      const result = completeCheckout({
        method: paymentMethodName,
        couponCode: appliedCouponResult?.code,
        discountAmount: appliedCouponResult?.discountAmount,
        discountPct: appliedCouponResult?.discountPct
      });

      setIsProcessing(false);
      setIsSuccess(true);
      setCompletedOrderMeta(result);

      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    }, 1200);
  };

  const handleViewGeneratedInvoice = () => {
    if (completedOrderMeta?.invoice) {
      setSelectedInvoice(completedOrderMeta.invoice);
    }
  };

  const handleGoToMyCourses = () => {
    setIsCartOpen(false);
    setIsSuccess(false);
    setView('student_portal');
  };

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <PackageCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-serif">DC Maxwell Course Cart & Payment Gateway</h3>
              <p className="text-[11px] text-slate-400">256-Bit SSL Encrypted • Instant Automatic LMS Enrollment</p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Confirmation & Instant Activation Screen */
          <div className="p-6 sm:p-8 text-center space-y-5 my-auto overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                Payment Authorized & Settled
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                Automatic Enrollment Complete! 🎉
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Welcome to DC Maxwell Academy, <span className="font-bold text-slate-900">{currentUser.name}</span>! All lectures, test series, DPPs, and notes have been unlocked under your student profile.
              </p>
            </div>

            {/* Invoice & Order Summary Box */}
            {completedOrderMeta && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between text-slate-500 border-b border-slate-200 pb-2">
                  <span>Order ID:</span>
                  <span className="font-bold text-slate-900">{completedOrderMeta.order.id}</span>
                </div>
                <div className="flex justify-between text-slate-500 border-b border-slate-200 pb-2">
                  <span>Transaction ID:</span>
                  <span className="font-bold text-slate-900">{completedOrderMeta.order.transactionId}</span>
                </div>
                <div className="flex justify-between text-slate-500 border-b border-slate-200 pb-2">
                  <span>Tax Invoice:</span>
                  <span className="font-bold text-indigo-950">{completedOrderMeta.invoice.invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{completedOrderMeta.order.totalAmount.toLocaleString('en-IN')} (Incl. 18% GST)</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                onClick={handleViewGeneratedInvoice}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>View & Print Tax Invoice</span>
              </button>
              <button
                onClick={handleGoToMyCourses}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Go to My Learning Hub</span>
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="p-12 text-center space-y-4 my-auto">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-800">Your Cart is Currently Empty</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Browse our course store to add recorded courses, test series, study materials, or combo packages.
            </p>
            <button
              onClick={() => { setIsCartOpen(false); setView('website'); }}
              className="px-5 py-2.5 bg-indigo-950 text-white rounded-xl text-xs font-semibold hover:bg-indigo-900 cursor-pointer shadow-sm"
            >
              Browse Course Store
            </button>
          </div>
        ) : (
          <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1 text-xs">
            {/* Cart Items List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cart Items ({cart.length})
                </h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Automatic Enrollment
                </span>
              </div>

              {cart.map((item, idx) => {
                const title = item.product?.title || item.course?.title || 'Educational Product';
                const category = item.product?.category || item.course?.category || 'Exam Prep';
                const thumbnail = item.product?.thumbnail || item.course?.thumbnail || '';
                const price = item.comboUpgrade
                  ? (item.course?.price || 0) + 1499
                  : (item.product?.price ?? item.course?.price ?? 0);
                const originalPrice = item.product?.originalPrice ?? item.course?.originalPrice ?? price * 2;
                const itemId = item.product?.id || item.course?.id || `cart-${idx}`;

                return (
                  <div
                    key={itemId}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {thumbnail && (
                        <img
                          src={thumbnail}
                          alt={title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                      )}
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">
                          {category}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">{title}</h5>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1.5">
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                            <Clock className="w-3 h-3" /> {item.product?.validity || item.course?.validity || '1 Year Validity'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                      <div className="text-right">
                        <div className="text-sm font-black text-slate-900 font-mono">
                          ₹{price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coupon Code Section */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-600" /> Have an Admission Scholarship / Coupon Code?
                </span>
                {appliedCouponResult && (
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-[10px] text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
                  >
                    Remove Coupon
                  </button>
                )}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleApplyCoupon(); }} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Code (e.g. WELCOME50, CAFOUNDATION)"
                    className="w-full bg-white text-xs pl-9 pr-3 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
                >
                  Apply Code
                </button>
              </form>

              {/* Recommended Coupons Chips from dynamic state */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] text-slate-500 font-bold">Suggested:</span>
                {coupons.filter(c => c.isActive).slice(0, 5).map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleApplyCoupon(c.code)}
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold cursor-pointer transition border ${
                      appliedCouponResult?.code === c.code 
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                        : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                    title={c.description}
                  >
                    {c.code} ({c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`})
                  </button>
                ))}
              </div>

              {couponMessage && (
                <div className={`p-2 rounded-lg text-[11px] font-medium flex items-center gap-1.5 ${
                  couponMessage.isError 
                    ? 'bg-rose-100/80 text-rose-800 border border-rose-200' 
                    : 'bg-emerald-100/80 text-emerald-900 border border-emerald-200'
                }`}>
                  {couponMessage.isError ? (
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                  <span>{couponMessage.text}</span>
                </div>
              )}
            </div>

            {/* Payment Gateway Options (Item 38) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>Select Payment Gateway Mode</span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> PCI-DSS Compliant
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: <QrCode className="w-4 h-4 text-indigo-600" /> },
                  { id: 'card', label: 'Cards', icon: <CreditCard className="w-4 h-4 text-indigo-600" /> },
                  { id: 'netbanking', label: 'Net Banking', icon: <Building className="w-4 h-4 text-emerald-600" /> },
                  { id: 'wallets', label: 'Wallets', icon: <Wallet className="w-4 h-4 text-purple-600" /> },
                  { id: 'emi', label: '0% EMI', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedPaymentMethod(m.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition cursor-pointer ${
                      selectedPaymentMethod === m.id
                        ? 'border-indigo-600 bg-indigo-50/90 text-indigo-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {m.icon}
                    <span className="text-[11px]">{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Sub-Panel: UPI */}
              {selectedPaymentMethod === 'upi' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2">
                    {['gpay', 'phonepe', 'paytm', 'qr'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedUpiApp(app as any)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition cursor-pointer ${
                          selectedUpiApp === app
                            ? 'bg-indigo-950 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {app === 'qr' ? 'Scan Dynamic QR' : app}
                      </button>
                    ))}
                  </div>

                  {selectedUpiApp === 'qr' ? (
                    <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-slate-200">
                      <div className="w-20 h-20 bg-slate-900 text-white rounded-lg flex flex-col items-center justify-center p-1 text-center shrink-0">
                        <QrCode className="w-12 h-12 text-amber-400" />
                        <span className="text-[8px] font-mono">SCAN TO PAY</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900">Scan & Pay with Any UPI App</p>
                        <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM, Cred</p>
                        <p className="text-[10px] text-emerald-700 font-semibold font-mono">Auto-detecting payment receipt...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Enter UPI ID / VPA:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={upiIdInput}
                          onChange={(e) => setUpiIdInput(e.target.value)}
                          className="flex-1 bg-white text-xs px-3 py-2 rounded-lg border border-slate-300 font-mono"
                          placeholder="e.g. mobile@upi or name@oksbi"
                        />
                        <span className="px-3 py-2 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sub-Panel: Cards */}
              {selectedPaymentMethod === 'card' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-slate-300 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">CVV</label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-slate-300 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Panel: Net Banking */}
              {selectedPaymentMethod === 'netbanking' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in duration-150">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-slate-300"
                  >
                    <option>HDFC Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </div>
              )}

              {/* Sub-Panel: Wallets */}
              {selectedPaymentMethod === 'wallets' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 animate-in fade-in duration-150">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Select Digital Wallet</label>
                  <select
                    value={selectedWallet}
                    onChange={(e) => setSelectedWallet(e.target.value)}
                    className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-slate-300"
                  >
                    <option>Paytm Wallet</option>
                    <option>Amazon Pay</option>
                    <option>PhonePe Wallet</option>
                    <option>Mobikwik</option>
                  </select>
                </div>
              )}

              {/* Sub-Panel: EMI */}
              {selectedPaymentMethod === 'emi' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 animate-in fade-in duration-150">
                  <p className="font-bold text-slate-900">0% Interest Student Education EMI Plan</p>
                  <p className="text-[11px] text-slate-600">
                    Pay ₹{Math.round(grandTotal / 3).toLocaleString('en-IN')}/month in 3 easy interest-free installments via Credit Card or ZestMoney.
                  </p>
                </div>
              )}
            </div>

            {/* Price Summary Breakdown */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal:</span>
                <span className="font-mono font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCouponResult && appliedCouponResult.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCouponResult.code}):</span>
                  <span className="font-mono">- ₹{appliedCouponResult.discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Taxable Amount:</span>
                <span className="font-mono font-semibold">₹{taxableAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18% Educational Services):</span>
                <span className="font-mono font-semibold">₹{gstTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t-2 border-slate-300 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
                <span>Total Amount Payable:</span>
                <span className="text-base sm:text-lg text-indigo-950 font-black font-mono">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="pay-and-enroll-btn"
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-700/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Authorizing Payment Gateway & Unlocking LMS Access...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Unlock Full Access</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Secure Transaction
              </span>
              <span>•</span>
              <span>Instant Tax Invoice Generated</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
