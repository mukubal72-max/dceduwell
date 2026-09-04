import React from 'react';
import { useApp } from '../../context/AppContext';
import { InvoiceItem } from '../../types';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Building2,
  FileText,
  CreditCard,
  QrCode
} from 'lucide-react';

interface InvoiceModalProps {
  invoice?: InvoiceItem | null;
  onClose?: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice: propInvoice, onClose }) => {
  const { selectedInvoice, setSelectedInvoice } = useApp();
  const invoice = propInvoice || selectedInvoice;

  if (!invoice) return null;

  const handleClose = () => {
    if (onClose) onClose();
    else setSelectedInvoice(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 my-auto print:m-0 print:border-0 print:shadow-none print:max-w-none print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold font-serif tracking-wide">Tax Invoice: {invoice.invoiceNumber}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
              invoice.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
              invoice.status === 'Refunded' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
              'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {invoice.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Sheet */}
        <div className="p-6 sm:p-10 space-y-6 text-slate-800 bg-white font-sans text-xs print:p-8">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-slate-900 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm">
                  V
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase font-serif">
                    {invoice.academyDetails.name}
                  </h1>
                  <p className="text-[10px] text-slate-500 font-mono">
                    GSTIN: {invoice.academyDetails.gstin} | CIN: {invoice.academyDetails.cin}
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 max-w-sm leading-relaxed">
                {invoice.academyDetails.address}
              </p>
              <p className="text-[11px] text-slate-500">
                Email: {invoice.academyDetails.supportEmail} | Toll-Free: {invoice.academyDetails.supportPhone}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 sm:min-w-[200px]">
              <div className="inline-block bg-slate-900 text-white px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider font-mono">
                ORIGINAL TAX INVOICE
              </div>
              <p className="text-xs font-bold text-slate-900 font-mono">Invoice #: {invoice.invoiceNumber}</p>
              <p className="text-[11px] text-slate-600">Order ID: <span className="font-mono font-semibold">{invoice.orderId}</span></p>
              <p className="text-[11px] text-slate-600">Date of Issue: {invoice.issueDate}</p>
              <p className="text-[11px] text-slate-600">Place of Supply: Delhi / NCR (07)</p>
            </div>
          </div>

          {/* Billed To & Payment Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Billed To (Student / Parent):</span>
              <p className="font-bold text-slate-900 text-xs">{invoice.studentName}</p>
              <p className="text-[11px] text-slate-600">{invoice.studentEmail}</p>
              <p className="text-[11px] text-slate-600">{invoice.studentPhone}</p>
              <p className="text-[11px] text-slate-500 leading-snug">{invoice.studentAddress}</p>
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment Details:</span>
              <p className="text-xs font-bold text-slate-900 flex items-center sm:justify-end gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                <span>Mode: {invoice.paymentMethod}</span>
              </p>
              <p className="text-[11px] text-slate-600 font-mono">Txn ID: {invoice.transactionId}</p>
              <div className="flex items-center sm:justify-end gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500">Status:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[10px] border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3" /> {invoice.status}
                </span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">HSN / SAC</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      <div>{item.description}</div>
                      <span className="text-[10px] text-slate-500 font-normal">Education & Coaching Digital Delivery Service</span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">{item.hsnCode}</td>
                    <td className="py-2.5 px-3 text-center font-semibold">{item.quantity}</td>
                    <td className="py-2.5 px-3 text-right font-mono">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">₹{item.amount.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculations & GST Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
            <div className="space-y-2 max-w-sm text-[11px] text-slate-500">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <p className="font-bold text-slate-700">Terms & Conditions:</p>
                <p>1. This is a computer-generated official tax invoice and requires no physical signature.</p>
                <p>2. Course access & LMS privileges are unlocked instantly for the declared validity period.</p>
                <p>3. Standard 7-day money-back guarantee applies as per academic board refund guidelines.</p>
              </div>
            </div>

            <div className="w-full sm:w-72 space-y-1.5 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono font-semibold">₹{invoice.subtotal.toLocaleString('en-IN')}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">- ₹{invoice.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span className="font-mono">₹{invoice.cgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span className="font-mono">₹{invoice.sgst.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t-2 border-slate-900 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
                <span>Total Amount:</span>
                <span className="text-base font-black text-indigo-950 font-mono">₹{invoice.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer & Signatory */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-lg p-1 flex flex-col items-center justify-center bg-slate-50 text-[9px] text-slate-500 font-mono text-center">
                <QrCode className="w-8 h-8 text-slate-700 mb-0.5" />
                <span>SCAN TO VERIFY</span>
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <p className="font-bold text-slate-700">Digital Tax Compliance Seal</p>
                <p>HSN Code 999293 (Coaching & Educational IT Services)</p>
                <p className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 100% Tax Compliant System Generated
                </p>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="w-36 h-10 border-b border-slate-400 flex items-end justify-center pb-1">
                <span className="font-serif italic font-bold text-indigo-950 text-xs">Rajiv Malhotra</span>
              </div>
              <p className="text-[10px] font-bold text-slate-800">{invoice.authorizedSignatory}</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-wider">For DC Maxwell Education Academy Ltd.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
