
import React from 'react';
import { UserProfile } from '../types';
import { User, Mail, MapPin, Globe, Fingerprint, Calendar, Phone, BadgeCheck } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg shadow-blue-200">
          {user.firstName[0]}
        </div>
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <h2 className="text-3xl font-bold text-gray-900">{user.firstName} {user.surname}</h2>
            <BadgeCheck size={24} className="text-blue-500" />
          </div>
          <p className="text-gray-500 font-medium mb-4">Acron Private Banking Wealth Management since 2018</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Private Client</span>
             <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">SSN Verified</span>
             <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Tax Resident: US-NJ</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
            <User size={24} className="text-blue-500" />
            Account Details
          </h3>
          <div className="space-y-4">
             <ProfileItem icon={Fingerprint} label="Account ID" value={user.accountNumber} mono />
             <ProfileItem icon={Calendar} label="Age" value={`${user.age} Years`} />
             <ProfileItem icon={Globe} label="Citizenship" value={user.country} />
             <ProfileItem icon={MapPin} label="Region" value="New Jersey, USA" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
            <Mail size={24} className="text-blue-500" />
            Contact & Preferences
          </h3>
          <div className="space-y-4">
             <ProfileItem icon={Mail} label="Email Address" value={user.email} />
             <ProfileItem icon={Phone} label="Verified Phone" value="+1 (201) XXX-XXXX" />
             <ProfileItem icon={Globe} label="Preferred Language" value="English (US)" />
             <div className="pt-4 border-t border-gray-50">
               <button className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
                 Edit communication settings
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon: Icon, label, value, mono }: { icon: any, label: string, value: string, mono?: boolean }) => (
  <div className="flex gap-4">
    <div className="bg-slate-50 p-2.5 rounded-xl text-slate-500 h-fit">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
      <p className={`text-gray-900 font-semibold ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  </div>
);

export default ProfileView;
