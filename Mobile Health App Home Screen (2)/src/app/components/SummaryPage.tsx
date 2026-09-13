import { useState, useEffect } from 'react';
import { Cloud, ArrowLeft, BarChart2, RefreshCw, Mic, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Page, AnalysisRecord } from '../App';

export interface ConditionSummary {
  condition: string;
  count: number;
  avgConfidence: number;
  share: number;
  records: AnalysisRecord[];
}

export interface StoredSummary {
  summary: ConditionSummary[];
  total: number;
  generatedAt: string;
}

interface SummaryPageProps {
  navigateTo: (page: Page) => void;
  onConditionSelect: (condition: string) => void;
}

const conditionMeta: Record<string, { icon: string; color: string }> = {
  'Healthy':     { icon: '✅', color: '#22c55e' },
  'Asthma':      { icon: '🫁', color: '#547792' },
  'Bronchitis':  { icon: '🤒', color: '#FAB95B' },
  'Pneumonia':   { icon: '🦠', color: '#ef4444' },
  'COVID-19':    { icon: '🦠', color: '#ef4444' },
  'Lung Cancer': { icon: '⚠️', color: '#991b1b' },
};

const getMeta = (condition: string) =>
  conditionMeta[condition] ?? { icon: '🫁', color: '#547792' };

const rankBadge = (i: number) => {
  if (i === 0) return '🥇';
  if (i === 1) return '🥈';
  if (i === 2) return '🥉';
  return null;
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function SummaryPage({ navigateTo, onConditionSelect }: SummaryPageProps) {
  const [data, setData] = useState<StoredSummary | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('analysisSummary');
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        setData(null);
      }
    }
  }, []);

  const maxCount = data ? Math.max(...data.summary.map((s) => s.count)) : 1;

  const handleCardClick = (condition: string) => {
    onConditionSelect(condition);
    navigateTo('summary-detail');
  };

  return (
    <div className="w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#F0EDE8' }}
          >
            <ArrowLeft size={18} style={{ color: '#1A3263' }} />
          </button>
          <div className="flex items-center gap-1.5">
            <Cloud size={22} style={{ color: '#1A3263' }} />
            <span className="text-base" style={{ color: '#1A3263' }}>CLOUD</span>
          </div>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl"
          style={{ backgroundColor: '#F0EDE8', color: '#547792' }}
        >
          <RefreshCw size={12} />
          Re-analyze
        </button>
      </div>

      {/* Title block */}
      <div className="px-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-1.5">
          <BarChart2 size={22} style={{ color: '#1A3263' }} />
          <h2 className="text-xl" style={{ color: '#1A3263' }}>Analysis Summary</h2>
        </div>
        {data ? (
          <div className="space-y-0.5">
            <p className="text-xs" style={{ color: '#547792' }}>
              Based on{' '}
              <span className="font-semibold" style={{ color: '#1A3263' }}>
                {data.total} recording{data.total !== 1 ? 's' : ''}
              </span>
            </p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              Analyzed on{' '}
              {new Date(data.generatedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ) : (
          <p className="text-xs" style={{ color: '#547792' }}>No summary generated yet</p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        {!data || data.summary.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ backgroundColor: '#F0EDE8' }}
            >
              <Mic size={36} style={{ color: '#D4CFC9' }} />
            </div>
            <div className="text-center">
              <p className="text-base mb-1" style={{ color: '#1A3263' }}>No Summary Yet</p>
              <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                Go to Home and tap{' '}
                <span className="font-medium" style={{ color: '#547792' }}>
                  Analyze All Recordings
                </span>{' '}
                in the popup to generate a summary.
              </p>
            </div>
            <button
              onClick={() => navigateTo('home')}
              className="mt-2 px-6 py-3 rounded-2xl text-white text-sm shadow-md transition-transform active:scale-[0.98]"
              style={{ backgroundColor: '#1A3263' }}
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Divider label */}
            <div className="flex items-center gap-2">
              <div className="h-px flex-1" style={{ backgroundColor: '#F0EDE8' }} />
              <span className="text-xs" style={{ color: '#94A3B8' }}>Most → Least Detected</span>
              <div className="h-px flex-1" style={{ backgroundColor: '#F0EDE8' }} />
            </div>

            {data.summary.map((item, i) => {
              const meta = getMeta(item.condition);
              const barWidth = Math.round((item.count / maxCount) * 100);
              const badge = rankBadge(i);

              return (
                <motion.button
                  key={item.condition}
                  onClick={() => handleCardClick(item.condition)}
                  className="w-full text-left rounded-3xl p-4 transition-transform active:scale-[0.98]"
                  style={{ backgroundColor: '#F8F6F3', border: '1.5px solid #EDE9E3' }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {/* Top row */}
                  <div className="flex items-center gap-2.5 mb-3">
                    {badge ? (
                      <span className="text-lg flex-shrink-0">{badge}</span>
                    ) : (
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: '#E8E2DB', color: '#547792' }}
                      >
                        {i + 1}
                      </span>
                    )}
                    <span className="text-lg flex-shrink-0">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: '#1A3263' }}>
                        {item.condition}
                      </p>
                      <p className="text-xs" style={{ color: '#94A3B8' }}>
                        {item.share}% of all recordings
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div
                        className="px-2.5 py-1 rounded-xl text-xs font-bold"
                        style={{
                          backgroundColor: meta.color + '18',
                          color: meta.color,
                          border: `1.5px solid ${meta.color}30`,
                        }}
                      >
                        {item.count}×
                      </div>
                      <ChevronRight size={15} style={{ color: '#94A3B8' }} />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div
                    className="w-full h-2 rounded-full mb-2.5 overflow-hidden"
                    style={{ backgroundColor: '#E8E2DB' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: meta.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.6, delay: i * 0.07 + 0.15, ease: 'easeOut' }}
                    />
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs" style={{ color: '#94A3B8' }}>
                      {item.count} out of {data.total} recordings
                    </p>
                    <p className="text-xs" style={{ color: '#547792' }}>
                      ~{item.avgConfidence}% avg confidence
                    </p>
                  </div>

                  {/* Recording dates */}
                  {item.records && item.records.length > 0 && (
                    <div
                      className="pt-3 space-y-1.5"
                      style={{ borderTop: '1px solid #EDE9E3' }}
                    >
                      <p className="text-xs font-medium mb-1.5" style={{ color: '#547792' }}>
                        Recording Dates
                      </p>
                      {item.records.slice(0, 3).map((rec) => (
                        <div key={rec.id} className="flex items-center justify-between">
                          <p className="text-xs" style={{ color: '#94A3B8' }}>
                            {fmtDate(rec.date)}
                          </p>
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-lg"
                            style={{
                              backgroundColor: meta.color + '15',
                              color: meta.color,
                            }}
                          >
                            {rec.percentage}%
                          </span>
                        </div>
                      ))}
                      {item.records.length > 3 && (
                        <p className="text-xs pt-0.5" style={{ color: '#94A3B8' }}>
                          +{item.records.length - 3} more — tap to view all
                        </p>
                      )}
                    </div>
                  )}

                  {/* Tap hint */}
                  <div className="flex items-center justify-end gap-1 mt-2.5">
                    <p className="text-xs" style={{ color: '#94A3B8' }}>Tap to see full detail</p>
                  </div>
                </motion.button>
              );
            })}

            {/* Disclaimer */}
            <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#FEF3C7' }}>
              <p className="text-xs" style={{ color: '#92400e' }}>
                ⚠️ Not a medical diagnosis. Consult healthcare professionals.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
