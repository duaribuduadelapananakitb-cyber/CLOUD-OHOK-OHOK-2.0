import { useState, useEffect } from 'react';
import { Activity, Hospital, Cloud, BookOpen, ChevronRight, BarChart2 } from 'lucide-react';
import { Page, AnalysisRecord } from '../App';
import RecordingsPopup from './RecordingsPopup';

interface HomePageProps {
  navigateTo: (page: Page) => void;
  latestAnalysis: AnalysisRecord | null;
  analysisHistory: AnalysisRecord[];
}

export default function HomePage({ navigateTo, latestAnalysis, analysisHistory }: HomePageProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (analysisHistory.length === 0) return;
    const t = setTimeout(() => setShowPopup(true), 800);
    return () => clearTimeout(t);
  }, [analysisHistory.length]);

  const handleAnalyzeAll = () => {
    const conditionMap: Record<string, { count: number; totalPct: number; records: AnalysisRecord[] }> = {};
    analysisHistory.forEach((rec) => {
      if (!conditionMap[rec.condition]) {
        conditionMap[rec.condition] = { count: 0, totalPct: 0, records: [] };
      }
      conditionMap[rec.condition].count++;
      conditionMap[rec.condition].totalPct += rec.percentage;
      conditionMap[rec.condition].records.push(rec);
    });

    const total = analysisHistory.length;
    const summary = Object.entries(conditionMap)
      .map(([condition, data]) => ({
        condition,
        count: data.count,
        avgConfidence: Math.round(data.totalPct / data.count),
        share: Math.round((data.count / total) * 100),
        records: [...data.records].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      }))
      .sort((a, b) => b.count - a.count);

    localStorage.setItem(
      'analysisSummary',
      JSON.stringify({ summary, total, generatedAt: new Date().toISOString() })
    );
    setShowPopup(false);
    navigateTo('summary');
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Healthy':    return '#22c55e';
      case 'Asthma':     return '#547792';
      case 'Bronchitis': return '#FAB95B';
      case 'Pneumonia':
      case 'COVID-19':   return '#ef4444';
      case 'Lung Cancer': return '#991b1b';
      default:           return '#547792';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Healthy':    return '✅';
      case 'Asthma':     return '🫁';
      case 'Bronchitis': return '🤒';
      case 'Pneumonia':  return '🦠';
      case 'COVID-19':   return '🦠';
      case 'Lung Cancer': return '⚠️';
      default:           return '🫁';
    }
  };

  const articles = [
    { id: 1, title: 'Understanding COPD',   description: 'Learn about chronic obstructive pulmonary disease', image: '🫁' },
    { id: 2, title: 'Air Quality Tips',     description: 'How to protect your lungs from pollution',         image: '🌿' },
    { id: 3, title: 'Quit Smoking Guide',   description: 'Steps to improve your respiratory health',         image: '🚭' },
  ];

  return (
    <div className="relative w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Cloud size={32} style={{ color: '#1A3263' }} />
              <div>
                <h1 className="text-2xl" style={{ color: '#1A3263' }}>CLOUD</h1>
                <p className="text-xs" style={{ color: '#547792' }}>Cough Lung Observation & Diagnosis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Latest Analysis Card */}
          {latestAnalysis ? (
            <div className="rounded-3xl p-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #1A3263 0%, #547792 100%)' }}>
              <div className="text-center space-y-3">
                <p className="text-sm text-white/70">Latest Analysis</p>
                <div className="text-6xl">{getConditionIcon(latestAnalysis.condition)}</div>
                <h2 className="text-3xl text-white">{latestAnalysis.condition}</h2>
                <div className="inline-block px-5 py-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <p className="text-sm text-white/80">Confidence</p>
                  <p className="text-3xl text-white">{latestAnalysis.percentage}%</p>
                </div>
                <p className="text-xs text-white/60 pt-2">
                  {new Date(latestAnalysis.date).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl p-8 shadow-lg" style={{ background: 'linear-gradient(135deg, #1A3263 0%, #547792 100%)' }}>
              <div className="text-center space-y-4">
                <div className="text-6xl">🫁</div>
                <h2 className="text-2xl text-white">No Analysis Yet</h2>
                <p className="text-sm text-white/80">
                  Start by checking your symptoms to get your first respiratory health analysis
                </p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-sm px-1" style={{ color: '#1A3263' }}>Quick Actions</h3>

            {/* Primary row: Check Symptoms + Summary */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigateTo('check-symptoms')}
                className="py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center gap-1.5"
                style={{ backgroundColor: '#FAB95B', color: '#1A3263' }}
              >
                <Activity size={22} />
                <span className="text-sm font-medium leading-tight text-center">Check Symptoms</span>
              </button>
              <button
                onClick={() => navigateTo('summary')}
                className="py-4 rounded-2xl shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center gap-1.5"
                style={{ backgroundColor: '#1A3263', color: 'white' }}
              >
                <BarChart2 size={22} />
                <span className="text-sm font-medium leading-tight text-center">Analysis Summary</span>
              </button>
            </div>

            {/* Secondary row */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => navigateTo('articles')}
                className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl shadow-sm transition-transform active:scale-95"
                style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}
              >
                <BookOpen size={20} style={{ color: '#547792' }} />
                <span className="text-xs" style={{ color: '#1A3263' }}>Articles</span>
              </button>
              <button
                onClick={() => navigateTo('history')}
                className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl shadow-sm transition-transform active:scale-95"
                style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}
              >
                <Activity size={20} style={{ color: '#547792' }} />
                <span className="text-xs" style={{ color: '#1A3263' }}>History</span>
              </button>
              <button
                onClick={() => navigateTo('hospitals')}
                className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl shadow-sm transition-transform active:scale-95"
                style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}
              >
                <Hospital size={20} style={{ color: '#547792' }} />
                <span className="text-xs" style={{ color: '#1A3263' }}>Hospital</span>
              </button>
            </div>
          </div>

          {/* Health Insights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm" style={{ color: '#1A3263' }}>Health Insights</h3>
              <ChevronRight size={18} style={{ color: '#547792' }} />
            </div>
            <div className="overflow-x-auto -mx-6 px-6">
              <div className="flex gap-3 pb-2">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex-shrink-0 w-64 rounded-2xl p-4 shadow-md"
                    style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}
                  >
                    <div className="text-4xl mb-3">{article.image}</div>
                    <h4 className="text-sm mb-1" style={{ color: '#1A3263' }}>{article.title}</h4>
                    <p className="text-xs" style={{ color: '#547792' }}>{article.description}</p>
                    <button className="mt-3 text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#E0F2FE', color: '#1A3263' }}>
                      Read more
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#FEF3C7' }}>
            <p className="text-xs" style={{ color: '#92400e' }}>⚠️ Not a medical diagnosis. Consult healthcare professionals.</p>
          </div>
        </div>
      </div>

      {/* Recordings popup */}
      {showPopup && (
        <RecordingsPopup
          recordings={analysisHistory}
          onClose={() => setShowPopup(false)}
          onAnalyzeAll={handleAnalyzeAll}
        />
      )}
    </div>
  );
}
