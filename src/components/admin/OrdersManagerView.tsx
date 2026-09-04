import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderItem, OrderPaymentStatus } from '../../types';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  AlertCircle,
  FileText,
  CreditCard,
  QrCode,
  DollarSign,
  TrendingUp,
  Download,
  Eye,
  ChevronRight,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const OrdersManagerView: React.FC = () => {
  const {
    orders,
    invoices,
    setSelectedInvoice,
    updateOrderStatus,
    issueOrderRefund
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrderForDrawer, setSelectedOrderForDrawer] = useState<OrderItem | null>(null);

  // Status breakdown calculations
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const paidCount = orders.filter((o) => o.paymentStatus === 'Paid').length;
  const pendingCount = orders.filter((o) => o.paymentStatus === 'Pending').length;
  const refundedCount = orders.filter((o) => o.paymentStatus === 'Refunded').length;
  const avgOrderValue = paidCount > 0 ? Math.round(totalRevenue / paidCount) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.paymentStatus !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.studentName.toLowerCase().includes(q) ||
        o.studentEmail.toLowerCase().includes(q) ||
        o.transactionId.toLowerCase().includes(q) ||
        (o.couponCode && o.couponCode.toLowerCase().includes(q)) ||
        o.items.some((i) => i.title.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenInvoice = (invNum?: string) => {
    if (invNum && invoices[invNum]) {
      setSelectedInvoice(invoices[invNum]);
    }
  };

  const getStatusBadge = (status: OrderPaymentStatus) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" /> Pending
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-purple-300">
            <RotateCcw className="w-3 h-3 text-purple-600" /> Refunded
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-300">
            <XCircle className="w-3 h-3 text-slate-500" /> Cancelled
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-rose-300">
            <AlertCircle className="w-3 h-3 text-rose-600" /> Failed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-700" />
            <span>Order & Payment Transaction Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Monitor real-time course sales, gateway settlements, tax invoices, and student refund requests.
          </p>
        </div>
      </div>

      {/* Revenue & Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Gross Settled Revenue</span>
            <h3 className="text-xl font-black text-slate-900 font-mono">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> 18% GST Compliant
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Completed Orders</span>
            <h3 className="text-xl font-black text-slate-900">{paidCount} Paid</h3>
            <span className="text-[10px] text-slate-400">Total {orders.length} transactions recorded</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Average Order Value (AOV)</span>
            <h3 className="text-xl font-black text-slate-900 font-mono">₹{avgOrderValue.toLocaleString('en-IN')}</h3>
            <span className="text-[10px] text-indigo-600 font-semibold">Across all packages</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending / Refunds</span>
            <h3 className="text-xl font-black text-slate-900">{pendingCount} Pending • {refundedCount} Ref</h3>
            <span className="text-[10px] text-purple-600 font-bold">100% Policy Compliant</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Paid', 'Pending', 'Failed', 'Cancelled', 'Refunded'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID, Student, Txn..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-600 text-xs"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Student Details</th>
                <th className="py-3 px-4">Purchased Product(s)</th>
                <th className="py-3 px-4">Amount & Coupon</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4">Txn ID / Mode</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{order.orderNumber}</span>
                      <span className="text-[11px] text-slate-400">{order.orderDate}</span>
                    </td>

                    {/* Student Details */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{order.studentName}</span>
                      <span className="text-[11px] text-slate-500 block">{order.studentEmail}</span>
                      <span className="text-[10px] text-slate-400">{order.studentPhone}</span>
                    </td>

                    {/* Products */}
                    <td className="py-3.5 px-4 max-w-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <span className="font-semibold text-slate-800 line-clamp-1">{item.title}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {item.type.replace('_', ' ')}
                          </span>
                        </div>
                      ))}
                    </td>

                    {/* Amount & Coupon */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm text-slate-900 font-mono block">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                      {order.couponCode ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Coupon: {order.couponCode}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">No coupon</span>
                      )}
                    </td>

                    {/* Payment Status with Action Changer */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1.5">
                        {getStatusBadge(order.paymentStatus)}
                        
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="block text-[10px] font-semibold bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        >
                          <option value="Paid">Mark Paid</option>
                          <option value="Pending">Mark Pending</option>
                          <option value="Cancelled">Mark Cancelled</option>
                          <option value="Refunded">Mark Refunded</option>
                          <option value="Failed">Mark Failed</option>
                        </select>
                      </div>
                    </td>

                    {/* Txn ID / Mode */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-[11px] text-slate-700 block truncate max-w-[130px]" title={order.transactionId}>
                        {order.transactionId}
                      </span>
                      <span className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {order.invoiceNumber && (
                        <button
                          onClick={() => handleOpenInvoice(order.invoiceNumber)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-bold rounded-lg text-[11px] transition cursor-pointer border border-slate-200"
                          title="View Tax Invoice"
                        >
                          <FileText className="w-3.5 h-3.5 inline mr-1" />
                          <span>Invoice</span>
                        </button>
                      )}

                      {order.paymentStatus === 'Paid' && (
                        <button
                          onClick={() => issueOrderRefund(order.id)}
                          className="px-2 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-[11px] transition cursor-pointer border border-rose-200"
                          title="Issue 100% Refund"
                        >
                          <RotateCcw className="w-3 h-3 inline mr-0.5" />
                          <span>Refund</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
