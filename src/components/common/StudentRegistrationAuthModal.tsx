import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  Mail,
  Lock,
  User,
  Calendar,
  MapPin,
  School,
  BookOpen,
  Languages,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  RotateCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentRegistrationAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    registerStudent,
    loginStudent
  } = useApp();

  // Mode: 'register' or 'login'
  const [activeTab, setActiveTab] = useState<'register' | 'login'>(authModalMode);
  
  // Login Sub-method: 'otp' | 'password'
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('otp');

  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState('2007-06-15');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>('Male');
  const [city, setCity] = useState('');
  const [schoolCollege, setSchoolCollege] = useState('');
  const [studentClass, setStudentClass] = useState('Class 12th');
  const [targetExam, setTargetExam] = useState('CA Foundation');
  const [preferredLanguage, setPreferredLanguage] = useState('English & Hinglish');

  // Registration Stage: 'details' -> 'otp'
  const [regStage, setRegStage] = useState<'details' | 'otp'>('details');

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginOtpStage, setLoginOtpStage] = useState(false);

  // OTP State
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(authModalMode);
    setRegStage('details');
    setLoginOtpStage(false);
    setStatusMessage(null);
  }, [authModalMode, isAuthModalOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if ((regStage === 'otp' || loginOtpStage) && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [regStage, loginOtpStage, otpTimer]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setRegStage('details');
    setLoginOtpStage(false);
    setStatusMessage(null);
  };

  // Google 1-Click Login / Register
  const handleGoogleAuth = () => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    loginStudent('google.student@dcmaxwell.edu', 'google');
  };

  // Move from Details to OTP
  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim() || !email.trim() || !password.trim()) {
      setStatusMessage('Please fill in all required account credentials.');
      return;
    }
    setStatusMessage(null);
    setRegStage('otp');
    setOtpTimer(30);
    setOtpDigits(['', '', '', '', '', '']);
  };

  // Auto-fill Demo OTP
  const handleAutoFillDemoOtp = () => {
    setOtpDigits(['1', '2', '3', '4', '5', '6']);
  };

  // Resend OTP simulation
  const handleResendOtp = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setOtpTimer(30);
      setStatusMessage('A new 6-digit OTP has been dispatched to your mobile and email.');
    }, 600);
  };

  // Final OTP submission for registration
  const handleVerifyRegisterOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) {
      setStatusMessage('Please enter the complete 6-digit OTP.');
      return;
    }

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 }
    });

    registerStudent({
      name: fullName.trim(),
      phone: mobileNumber.startsWith('+91') ? mobileNumber : `+91 ${mobileNumber.trim()}`,
      email: email.trim(),
      password,
      dob,
      gender,
      city: city.trim() || 'Delhi NCR',
      schoolCollege: schoolCollege.trim() || 'St. Xavier High School',
      studentClass,
      targetExam,
      preferredLanguage
    });
  };

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setStatusMessage('Please enter your Registered Mobile Number or Email Address.');
      return;
    }

    if (loginMethod === 'otp' && !loginOtpStage) {
      setLoginOtpStage(true);
      setOtpTimer(30);
      setOtpDigits(['', '', '', '', '', '']);
      setStatusMessage(null);
      return;
    }

    if (loginMethod === 'otp' && loginOtpStage) {
      const enteredOtp = otpDigits.join('');
      if (enteredOtp.length < 6) {
        setStatusMessage('Please enter the complete 6-digit OTP code.');
        return;
      }
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      loginStudent(loginIdentifier.trim(), 'otp');
      return;
    }

    // Password login
    if (loginMethod === 'password') {
      if (!loginPassword) {
        setStatusMessage('Please enter your account password.');
        return;
      }
      loginStudent(loginIdentifier.trim(), 'password');
    }
  };

  // OTP digit changer
  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'Empty', score: 0, color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { label: 'Weak', score: 1, color: 'bg-rose-500' };
    if (score <= 4) return { label: 'Good', score: 2, color: 'bg-amber-500' };
    return { label: 'Strong', score: 3, color: 'bg-emerald-500' };
  };

  const pwdStrength = getPasswordStrength(password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 transition-all">
        
        {/* Header Bar with Gradient Accent */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" /> Student Access & Enrollment
            </span>
          </div>

          <h2 className="text-xl font-bold font-serif mt-2">
            {activeTab === 'register' ? 'Student Registration & Profile Setup' : 'Student Portal Login'}
          </h2>
          <p className="text-xs text-indigo-200/90 mt-1">
            {activeTab === 'register'
              ? 'Join 50,000+ ambitious learners. Get ₹500 joining bonus and full access to live classes, tests & study materials.'
              : 'Sign in using your Registered Mobile (OTP), Email & Password, or 1-Click Google Login.'}
          </p>

          {/* Toggle between Register and Login Tabs */}
          <div className="flex items-center gap-2 mt-5 bg-white/10 p-1 rounded-xl w-fit">
            <button
              onClick={() => {
                setActiveTab('register');
                setRegStage('details');
                setStatusMessage(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              New Student Registration
            </button>
            <button
              onClick={() => {
                setActiveTab('login');
                setLoginOtpStage(false);
                setStatusMessage(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              Student Login
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-slate-800 text-xs max-h-[75vh] overflow-y-auto">
          
          {/* Status Message Notification */}
          {statusMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Google 1-Click Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold rounded-xl transition flex items-center justify-center gap-3 shadow-xs cursor-pointer hover:border-slate-400"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>{activeTab === 'register' ? 'Instant Sign Up with Google' : 'Continue with Google Account'}</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or continue with details
              </span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: REGISTRATION FLOW */}
          {/* ========================================================================= */}
          {activeTab === 'register' && (
            <div>
              {regStage === 'details' ? (
                <form onSubmit={handleProceedToOtp} className="space-y-4">
                  
                  {/* Basic Credentials Section */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-indigo-600" /> Account & Login Credentials
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="e.g. Aryan Malhotra"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Mobile Number (For OTP Verification) *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. aryan.m@gmail.com"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Create Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 alphanumeric chars"
                            className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {password && (
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                            <span>Strength: <strong className="text-slate-700">{pwdStrength.label}</strong></span>
                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden flex">
                              <div
                                className={`h-full ${pwdStrength.color}`}
                                style={{ width: `${(pwdStrength.score / 3) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Student Demographic & Educational Profile */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-indigo-600" /> Student Profile & Academic Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Date of Birth *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            required
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Gender *
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          City *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Kota, Delhi, Mumbai"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          School / College *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={schoolCollege}
                            onChange={(e) => setSchoolCollege(e.target.value)}
                            placeholder="e.g. Delhi Public School / St. Xavier"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          />
                          <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Current Class / Level *
                        </label>
                        <select
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                          <option value="Class 9th">Class 9th Foundation</option>
                          <option value="Class 10th">Class 10th Board</option>
                          <option value="Class 11th">Class 11th</option>
                          <option value="Class 12th">Class 12th Board</option>
                          <option value="12th Pass / Dropper">12th Pass / Dropper Cohort</option>
                          <option value="College / Graduate">College / Graduate</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Target Examination *
                        </label>
                        <div className="relative">
                          <select
                            value={targetExam}
                            onChange={(e) => setTargetExam(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          >
                            <option value="CA Foundation">CA Foundation (ICAI 2026)</option>
                            <option value="JEE (Main & Adv)">JEE (Main & Advanced 2026)</option>
                            <option value="NEET (Medical)">NEET UG (Medical 2026)</option>
                            <option value="UPSC & Civil Services">UPSC & Civil Services (IAS/IPS)</option>
                            <option value="Class 11-12 Boards">Class 11-12 Board Booster</option>
                            <option value="Foundation (9-10th)">Foundation (Class 9-10 & Olympiads)</option>
                            <option value="Tech & Data Science">Tech & Full Stack Masterclass</option>
                          </select>
                          <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Preferred Language *
                        </label>
                        <div className="relative">
                          <select
                            value={preferredLanguage}
                            onChange={(e) => setPreferredLanguage(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                          >
                            <option value="English & Hinglish">Hinglish & English (Bilingual - Most Popular)</option>
                            <option value="English">Pure English Medium</option>
                            <option value="Hindi">Hindi Medium</option>
                          </select>
                          <Languages className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                    >
                      Already registered? Sign In
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to OTP Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                /* OTP Verification Screen */
                <form onSubmit={handleVerifyRegisterOtp} className="space-y-5 text-center max-w-md mx-auto py-2">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">Verify Mobile & Email OTP</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      We have sent a 6-digit security OTP code to:
                    </p>
                    <p className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                      {mobileNumber} &bull; {email}
                    </p>
                  </div>

                  {/* 6 Digit OTP inputs */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            const prevInput = document.getElementById(`otp-input-${index - 1}`);
                            prevInput?.focus();
                          }
                        }}
                        className="w-11 h-12 text-center text-lg font-bold font-mono rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none bg-white shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Quick Auto-fill button for test reviewer */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutoFillDemoOtp}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      Auto-fill Demo OTP (123456)
                    </button>
                  </div>

                  {/* Timer & Resend */}
                  <div className="text-xs text-slate-500 flex items-center justify-center gap-2">
                    {otpTimer > 0 ? (
                      <span>Resend OTP in <strong>0:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong></span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                        Resend OTP Code
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setRegStage('details')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Details
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify OTP & Create Student Account</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LOGIN FLOW */}
          {/* ========================================================================= */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              {/* Login Method Selector */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('otp');
                    setLoginOtpStage(false);
                    setStatusMessage(null);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                    loginMethod === 'otp' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Login via Mobile + OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('password');
                    setLoginOtpStage(false);
                    setStatusMessage(null);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs transition cursor-pointer ${
                    loginMethod === 'password' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Login via Email + Password
                </button>
              </div>

              {!loginOtpStage ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {loginMethod === 'otp' ? 'Mobile Number *' : 'Registered Email or Mobile *'}
                    </label>
                    <div className="relative">
                      <input
                        type={loginMethod === 'otp' ? 'tel' : 'text'}
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder={loginMethod === 'otp' ? '+91 98765 43210' : 'aarav.sharma@dcmaxwell.edu'}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                      {loginMethod === 'otp' ? (
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      ) : (
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      )}
                    </div>
                  </div>

                  {loginMethod === 'password' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-semibold text-slate-700">Account Password *</label>
                        <button
                          type="button"
                          onClick={() => setStatusMessage('Password reset link has been dispatched to your email.')}
                          className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('register');
                        setRegStage('details');
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                    >
                      Don't have an account? Register Now
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      {loginMethod === 'otp' ? (
                        <>
                          <span>Send Login OTP</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Sign In to Student Portal</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Login OTP Screen */
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-center max-w-md mx-auto py-2">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Enter Login OTP</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      OTP dispatched to <strong className="text-slate-800">{loginIdentifier}</strong>
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        id={`login-otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleDigitChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && index > 0) {
                            const prevInput = document.getElementById(`login-otp-input-${index - 1}`);
                            prevInput?.focus();
                          }
                        }}
                        className="w-10 h-12 text-center text-lg font-bold font-mono rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none bg-white shadow-xs"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutoFillDemoOtp}
                      className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600" />
                      Auto-fill Demo OTP (123456)
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setLoginOtpStage(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      Change Number
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Sign In</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
