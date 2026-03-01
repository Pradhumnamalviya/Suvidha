import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, ArrowRight, Loader2, ShieldCheck, X, Delete } from 'lucide-react';
import { api } from '../utils/api';

interface MobileLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isDarkMode?: boolean;
}

export const MobileLogin: React.FC<MobileLoginProps> = ({ isOpen, onClose, onSuccess, isDarkMode = false }) => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);

  const isMobileValid = mobile.length === 10 && /^\d+$/.test(mobile);
  const isOtpValid = otp.length === 6 && /^\d+$/.test(otp);

  const handleSendOtp = async () => {
    if (!isMobileValid) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await api.post('/auth/send-otp', { phoneNumber: mobile });
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!isOtpValid) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/verify-otp', { phoneNumber: mobile, otp });
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        onSuccess();
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setStep('mobile');
    setMobile('');
    setOtp('');
    setError('');
    onClose();
  };

  const handleKeypadInput = (val: string) => {
    if (step === 'mobile') {
      if (mobile.length < 10) {
        setMobile(prev => prev + val);
        if (error) setError('');
      }
    } else {
      if (otp.length < 6) {
        setOtp(prev => prev + val);
        if (error) setError('');
      }
    }
  };

  const handleKeypadDelete = () => {
    if (step === 'mobile') {
      setMobile(prev => prev.slice(0, -1));
    } else {
      setOtp(prev => prev.slice(0, -1));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative ${isDarkMode ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-100'}`}
      >
        <div className="p-10 flex flex-col items-center text-center">
          <div className={`inline-flex p-5 rounded-3xl mb-6 ${isDarkMode ? 'bg-gov-blue/20 text-gov-blue' : 'bg-gov-blue/10 text-gov-blue'}`}>
            {step === 'mobile' ? <Smartphone size={48} /> : <ShieldCheck size={48} />}
          </div>
          
          <h2 className={`text-3xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {step === 'mobile' ? 'Login or Register' : 'Verify Identity'}
          </h2>
          <p className={`text-lg font-medium mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {step === 'mobile' 
              ? 'Enter your 10-digit mobile number to continue securely' 
              : `Enter the 6-digit OTP sent to +91 ${mobile}`
            }
          </p>

          <div className="w-full space-y-6">
            {step === 'mobile' ? (
              <div>
                <div className={`flex items-center border-2 rounded-2xl overflow-hidden transition-colors ${
                  error ? 'border-red-500' : 
                  isMobileValid ? 'border-emerald-500' : 
                  isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
                }`}>
                  <div className={`px-5 py-5 font-bold text-xl border-r-2 ${
                    isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
                  }`}>
                    +91
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setMobile(val);
                      if (error) setError('');
                    }}
                    onFocus={() => setShowKeypad(true)}
                    placeholder="Enter mobile number"
                    className={`w-full px-5 py-5 text-2xl font-black tracking-widest outline-none bg-transparent ${
                      isDarkMode ? 'text-white placeholder:text-slate-600' : 'text-slate-800 placeholder:text-slate-300'
                    }`}
                    autoFocus
                  />
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="tel"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setOtp(val);
                    if (error) setError('');
                  }}
                  onFocus={() => setShowKeypad(true)}
                  placeholder="• • • • • •"
                  className={`w-full px-5 py-5 text-4xl text-center font-black tracking-[0.5em] outline-none border-2 rounded-2xl transition-colors ${
                    error ? 'border-red-500' : 
                    isOtpValid ? 'border-emerald-500' : 
                    isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-600' : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-300'
                  }`}
                  autoFocus
                />
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm font-bold mt-2">{error}</p>
            )}

            <AnimatePresence>
              {showKeypad && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex justify-end mb-2">
                    <button 
                      onClick={() => setShowKeypad(false)}
                      className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${
                        isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <X size={16} /> Hide Keyboard
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        onClick={() => handleKeypadInput(num.toString())}
                        className={`py-4 rounded-xl text-2xl font-black transition-colors ${
                          isDarkMode 
                            ? 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600' 
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      onClick={handleKeypadDelete}
                      className={`py-4 rounded-xl flex items-center justify-center transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-800 text-red-400 hover:bg-slate-700 active:bg-slate-600' 
                          : 'bg-slate-100 text-red-500 hover:bg-slate-200 active:bg-slate-300'
                      }`}
                    >
                      <Delete size={28} />
                    </button>
                    <button
                      onClick={() => handleKeypadInput('0')}
                      className={`py-4 rounded-xl text-2xl font-black transition-colors ${
                        isDarkMode 
                          ? 'bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-600' 
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300'
                      }`}
                    >
                      0
                    </button>
                    <button
                      onClick={step === 'mobile' ? handleSendOtp : handleVerifyOtp}
                      disabled={(step === 'mobile' ? !isMobileValid : !isOtpValid) || isLoading}
                      className={`py-4 rounded-xl flex items-center justify-center transition-colors ${
                        (step === 'mobile' ? !isMobileValid : !isOtpValid) || isLoading
                          ? isDarkMode 
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                          : 'bg-gov-blue text-white hover:bg-blue-700 active:bg-blue-800'
                      }`}
                    >
                      {isLoading ? <Loader2 className="animate-spin" size={28} /> : <ArrowRight size={28} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showKeypad && (
              <div className="flex flex-col gap-4 mt-6">
                <motion.button
                  whileTap={(step === 'mobile' ? isMobileValid : isOtpValid) && !isLoading ? { scale: 0.98 } : {}}
                  onClick={step === 'mobile' ? handleSendOtp : handleVerifyOtp}
                  disabled={(step === 'mobile' ? !isMobileValid : !isOtpValid) || isLoading}
                  className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-lg ${
                    (step === 'mobile' ? !isMobileValid : !isOtpValid) || isLoading
                      ? isDarkMode 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gov-blue text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={28} />
                      {step === 'mobile' ? 'Sending...' : 'Verifying...'}
                    </>
                  ) : (
                    <>
                      {step === 'mobile' ? 'Send OTP' : 'Verify & Continue'}
                      <ArrowRight size={28} />
                    </>
                  )}
                </motion.button>
              </div>
            )}

            <div className="flex flex-col gap-4 mt-4">
              <button 
                onClick={handleCancel}
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-colors ${
                  isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                Cancel Action
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
