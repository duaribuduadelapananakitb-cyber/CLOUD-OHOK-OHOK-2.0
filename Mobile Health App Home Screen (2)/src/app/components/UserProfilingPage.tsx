import { useState } from 'react';
import { Cloud, User, ChevronRight, Check } from 'lucide-react';
import { UserProfile } from '../App';

interface UserProfilingPageProps {
  onComplete: (profile: UserProfile) => void;
}

export default function UserProfilingPage({ onComplete }: UserProfilingPageProps) {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    gender: '' as 'male' | 'female' | '',
    tanggalLahir: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.nama.trim()) newErrors.nama = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.gender) newErrors.gender = 'Please select a gender';
    if (!form.tanggalLahir) newErrors.tanggalLahir = 'Date of birth is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onComplete({
      nama: form.nama,
      email: form.email,
      gender: form.gender as 'male' | 'female',
      tanggalLahir: form.tanggalLahir,
    });
  };

  const inputStyle = (hasError: boolean) => ({
    backgroundColor: '#F8F6F3',
    border: hasError ? '2px solid #ef4444' : '2px solid #E8E2DB',
    color: '#1A3263',
  });

  return (
    <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center gap-2">
          <Cloud size={24} style={{ color: '#1A3263' }} />
          <span className="text-lg" style={{ color: '#1A3263' }}>CLOUD</span>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-6 h-6 rounded-full text-white text-[11px] flex items-center justify-center font-semibold"
            style={{ backgroundColor: '#1A3263' }}
          >
            1
          </div>
          <div className="w-5 h-px" style={{ backgroundColor: '#CBD5E1' }} />
          <div
            className="w-6 h-6 rounded-full text-[11px] flex items-center justify-center font-semibold"
            style={{ backgroundColor: '#E8E2DB', color: '#94A3B8' }}
          >
            2
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {/* Avatar + title */}
        <div className="flex flex-col items-center mb-7 mt-2">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-inner"
            style={{ background: 'linear-gradient(135deg, #E8E2DB 0%, #D4CFC9 100%)' }}
          >
            <User size={36} style={{ color: '#547792' }} />
          </div>
          <h2 className="text-2xl" style={{ color: '#1A3263' }}>Complete Your Profile</h2>
          <p className="text-sm mt-1 text-center leading-relaxed" style={{ color: '#547792' }}>
            Enter your details to get started
          </p>
        </div>

        <div className="space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm mb-1.5" style={{ color: '#1A3263' }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.nama}
              onChange={(e) => {
                setForm({ ...form, nama: e.target.value });
                if (errors.nama) setErrors({ ...errors, nama: '' });
              }}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={inputStyle(!!errors.nama)}
            />
            {errors.nama && (
              <p className="text-xs mt-1 ml-1" style={{ color: '#ef4444' }}>
                {errors.nama}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1.5" style={{ color: '#1A3263' }}>
              Email
            </label>
            <input
              type="email"
              placeholder="name@email.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={inputStyle(!!errors.email)}
            />
            {errors.email && (
              <p className="text-xs mt-1 ml-1" style={{ color: '#ef4444' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm mb-2" style={{ color: '#1A3263' }}>
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              {([
                { value: 'male', label: 'Male', emoji: '♂' },
                { value: 'female', label: 'Female', emoji: '♀' },
              ] as const).map((opt) => {
                const selected = form.gender === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setForm({ ...form, gender: opt.value });
                      if (errors.gender) setErrors({ ...errors, gender: '' });
                    }}
                    className="py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-between"
                    style={{
                      backgroundColor: selected ? '#1A3263' : '#F8F6F3',
                      color: selected ? 'white' : '#547792',
                      border: errors.gender
                        ? '2px solid #ef4444'
                        : selected
                        ? '2px solid #1A3263'
                        : '2px solid #E8E2DB',
                    }}
                  >
                    <span>
                      <span className="mr-1.5">{opt.emoji}</span>
                      {opt.label}
                    </span>
                    {selected && (
                      <Check size={14} className="ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.gender && (
              <p className="text-xs mt-1 ml-1" style={{ color: '#ef4444' }}>
                {errors.gender}
              </p>
            )}
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block text-sm mb-1.5" style={{ color: '#1A3263' }}>
              Date of Birth
            </label>
            <input
              type="date"
              value={form.tanggalLahir}
              onChange={(e) => {
                setForm({ ...form, tanggalLahir: e.target.value });
                if (errors.tanggalLahir) setErrors({ ...errors, tanggalLahir: '' });
              }}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{
                ...inputStyle(!!errors.tanggalLahir),
                color: form.tanggalLahir ? '#1A3263' : '#94A3B8',
              }}
            />
            {errors.tanggalLahir && (
              <p className="text-xs mt-1 ml-1" style={{ color: '#ef4444' }}>
                {errors.tanggalLahir}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pt-2">
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl text-white shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ backgroundColor: '#1A3263' }}
        >
          <span>Continue</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
