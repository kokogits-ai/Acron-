
import React, { useState } from 'react';
import { ShieldCheck, Landmark, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (account: string, password?: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(accountNumber, password);
    if (!success) {
      setError('Invalid credentials. Please verify your account number and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-xl mb-4 text-white">
            <Landmark size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Acron Bank</h1>
          <p className="text-gray-500 mt-2 text-center">Private Banking Online Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="e.g. FI74-XXXX-XXXX-XXXX"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setError('');
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-lg"
          >
            Access My Account
            <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400 leading-relaxed uppercase tracking-wider font-semibold">
            Member of Finnish Financial Supervisory Authority
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
