import { ArrowLeft, AlertCircle, Info, MapPin, Home } from 'lucide-react';
import { Page } from '../App';

interface ResultPageProps {
  navigateTo: (page: Page) => void;
}

interface Condition {
  name: string;
  percentage: number;
  color: string;
}

export default function ResultPage({ navigateTo }: ResultPageProps) {
  const conditions: Condition[] = [
    { name: 'Bronchitis', percentage: 65, color: '#FAB95B' },
    { name: 'Healthy', percentage: 15, color: '#22c55e' },
    { name: 'Asthma', percentage: 8, color: '#547792' },
    { name: 'Pneumonia', percentage: 7, color: '#ef4444' },
    { name: 'COVID-19', percentage: 3, color: '#ef4444' },
    { name: 'Lung Cancer', percentage: 2, color: '#991b1b' }
  ];

  const mainCondition = conditions[0];
  const riskLevel = mainCondition.percentage >= 60 ? 'medium' : mainCondition.percentage >= 30 ? 'low' : 'low';
  const riskColor = riskLevel === 'medium' ? '#FAB95B' : riskLevel === 'low' ? '#22c55e' : '#ef4444';
  const riskText = riskLevel === 'medium' ? 'Medium Risk' : riskLevel === 'low' ? 'Low Risk' : 'High Risk';

  return (
    <div className="w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4">
          <button
            onClick={() => navigateTo('check-symptoms')}
            className="mb-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#E8E2DB' }}
          >
            <ArrowLeft size={20} style={{ color: '#1A3263' }} />
          </button>
          <h1 className="text-2xl mb-1" style={{ color: '#1A3263' }}>
            Analysis Result
          </h1>
          <p className="text-sm" style={{ color: '#547792' }}>
            Based on your cough recording
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Main Result Card */}
          <div className="rounded-3xl p-6 shadow-xl" style={{ background: 'linear-gradient(135deg, #1A3263 0%, #547792 100%)' }}>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: riskColor }}>
                <AlertCircle size={14} color="white" />
                <span className="text-white">{riskText}</span>
              </div>

              <div>
                <p className="text-sm text-white/70 mb-1">Most Likely</p>
                <h2 className="text-3xl text-white mb-2">{mainCondition.name}</h2>
                <div className="inline-block px-4 py-2 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <p className="text-sm text-white/80">Confidence</p>
                  <p className="text-2xl text-white">{mainCondition.percentage}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Probability Breakdown */}
          <div className="rounded-2xl p-5 shadow-md" style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}>
            <h3 className="text-base mb-4" style={{ color: '#1A3263' }}>Probability Breakdown</h3>

            <div className="space-y-3.5">
              {conditions.map((condition, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#1A3263' }}>{condition.name}</span>
                    <span style={{ color: '#547792' }}>{condition.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E8E2DB' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${condition.percentage}%`,
                        backgroundColor: condition.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="rounded-2xl p-5 shadow-md" style={{ backgroundColor: '#F0F9FF' }}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#547792' }}>
                <Info size={18} color="white" />
              </div>
              <h3 className="text-base pt-1" style={{ color: '#1A3263' }}>What you should do</h3>
            </div>

            <ul className="space-y-2 ml-11">
              <li className="text-sm flex items-start gap-2" style={{ color: '#1A3263' }}>
                <span className="text-base" style={{ color: '#547792' }}>•</span>
                <span>Rest and monitor your symptoms</span>
              </li>
              <li className="text-sm flex items-start gap-2" style={{ color: '#1A3263' }}>
                <span className="text-base" style={{ color: '#547792' }}>•</span>
                <span>Consult a doctor if symptoms persist</span>
              </li>
              <li className="text-sm flex items-start gap-2" style={{ color: '#1A3263' }}>
                <span className="text-base" style={{ color: '#547792' }}>•</span>
                <span>Seek medical attention if condition worsens</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigateTo('hospitals')}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              style={{ backgroundColor: '#1A3263', color: 'white' }}
            >
              <MapPin size={18} />
              <span>Find Nearby Hospital</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-98"
              style={{ backgroundColor: '#FAB95B', color: '#1A3263' }}
            >
              <Home size={18} />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#FEF3C7' }}>
            <p className="text-xs" style={{ color: '#92400e' }}>
              ⚠️ This is not a medical diagnosis. Please consult a healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}