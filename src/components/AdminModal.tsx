import React, { useState, useRef, useEffect } from 'react';
import { X, Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctCode: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctCode
}) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setCode(['', '', '', '']);
      setError(false);
      setSuccess(false);
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only keep last digit
    setCode(newCode);
    setError(false);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check code when all digits entered
    if (newCode.every(d => d !== '')) {
      const enteredCode = newCode.join('');
      if (enteredCode === correctCode) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 500);
      } else {
        setError(true);
        setCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pastedData.length === 4) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs.current[3]?.focus();

      // Check code
      if (pastedData === correctCode) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 500);
      } else {
        setError(true);
        setTimeout(() => {
          setCode(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 300);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 modal-content">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-colors ${
          success ? 'bg-green-100' : error ? 'bg-red-100' : 'bg-smb-blue/10'
        }`}>
          {success ? (
            <Eye className="w-8 h-8 text-green-600" />
          ) : error ? (
            <EyeOff className="w-8 h-8 text-red-600" />
          ) : (
            <Lock className="w-8 h-8 text-smb-blue" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {success ? 'Access Granted!' : 'Admin Access'}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          {success
            ? 'Real costs are now visible'
            : error
            ? 'Incorrect code. Please try again.'
            : 'Enter your 4-digit admin code to view real API costs'
          }
        </p>

        {/* Code Input */}
        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={`w-14 h-14 text-2xl font-bold text-center rounded-xl border-2 transition-all focus:outline-none ${
                success
                  ? 'border-green-500 bg-green-50 text-green-600'
                  : error
                  ? 'border-red-500 bg-red-50 text-red-600 animate-shake'
                  : 'border-gray-200 focus:border-smb-blue focus:bg-blue-50'
              }`}
              disabled={success}
            />
          ))}
        </div>

        {/* Help Text */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield className="w-4 h-4" />
          <span>This unlocks real cost data for internal use only</span>
        </div>
      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminModal;
