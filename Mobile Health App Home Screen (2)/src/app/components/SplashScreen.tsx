import { Cloud } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div
      className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #1A3263 0%, #547792 100%)' }}
    >
      <div className="text-center space-y-8 animate-pulse">
        <div className="flex justify-center">
          <Cloud size={120} color="white" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-6xl text-white mb-4 tracking-wide">CLOUD</h1>
          <p className="text-lg text-white/95 leading-relaxed">
            Cough Lung Observation<br />& Diagnosis
          </p>
        </div>
      </div>
    </div>
  );
}
