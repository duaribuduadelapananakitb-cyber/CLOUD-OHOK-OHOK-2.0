import { useState, useEffect } from 'react';
import { Cloud, ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../App';
import { StoredSummary, ConditionSummary } from './SummaryPage';

interface SummaryDetailPageProps {
  navigateTo: (page: Page) => void;
  condition: string | null;
}

const conditionMeta: Record<string, { icon: string; color: string; bg: string }> = {
  'Healthy':     { icon: '✅', color: '#22c55e', bg: '#F0FDF4' },
  'Asthma':      { icon: '🫁', color: '#547792', bg: '#F0F4F8' },
  'Bronchitis':  { icon: '🤒', color: '#C68A1A', bg: '#FFFBEB' },
  'Pneumonia':   { icon: '🦠', color: '#ef4444', bg: '#FEF2F2' },
  'COVID-19':    { icon: '🦠', color: '#ef4444', bg: '#FEF2F2' },
  'Lung Cancer': { icon: '⚠️', color: '#991b1b', bg: '#FFF1F1' },
};

const getMeta = (condition: string) =>
  conditionMeta[condition] ?? { icon: '🫁', color: '#547792', bg: '#F0F4F8' };

const fmtDateFull = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function SummaryDetailPage({ navigateTo, condition }: SummaryDetailPageProps) {
  const [item, setItem] = useState<ConditionSummary | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('analysisSummary');
    if (!raw || !condition) return;
    try {
      const stored: StoredSummary = JSON.parse(raw);
      const found = stored.summary.find((s) => s.condition === condition) ?? null;
      setItem(found);
      setGeneratedAt(stored.generatedAt);
    } catch {
      setItem(null);
    }
  }, [condition]);

  if (!item || !condition) {
    return (
      <div className="w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col items-center justify-center gap-4 px-8">
        <p className="text-base text-center" style={{ color: '#1A3263' }}>
          No detail data found.
        </p>
        <button
          onClick={() => navigateTo('summary')}
          className="px-6 py-3 rounded-2xl text-white text-sm"
          style={{ backgroundColor: '#1A3263' }}
        >
          Back to Summary
        </button>
      </div>
    );
  }

  const meta = getMeta(item.condition);

  return (
    <div className="w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 pb-4 flex-shrink-0">
        <button
          onClick={() => navigateTo('summary')}
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

      {/* Hero section */}
      <div className="mx-6 mb-4 rounded-3xl p-5 flex-shrink-0" style={{ backgroundColor: meta.bg, border: `1.5px solid ${meta.color}25` }}>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: meta.color + '20', border: `1.5px solid ${meta.color}30` }}
          >
            {meta.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold" style={{ color: '#1A3263' }}>
              {item.condition}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#547792' }}>
              {item.count} recording{item.count !== 1 ? 's' : ''} detected
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
              {item.share}% of all recordings
            </p>
          </div>
        </div>

        {/* Stat pills */}
        <div className="flex gap-2.5 mt-4">
          <div
            className="flex-1 rounded-xl px-3 py-2 text-center"
            style={{ backgroundColor: 'white' }}
          >
            <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Avg Confidence</p>
            <p className="text-base font-bold" style={{ color: meta.color }}>
              {item.avgConfidence}%
            </p>
          </div>
          <div
            className="flex-1 rounded-xl px-3 py-2 text-center"
            style={{ backgroundColor: 'white' }}
          >
            <p className="text-xs mb-0.5" style={{ color: '#94A3B8' }}>Occurrences</p>
            <p className="text-base font-bold" style={{ color: '#1A3263' }}>
              {item.count}×
            </p>
          </div>
        </div>
      </div>

      {/* Analysis date */}
      {generatedAt && (
        <div className="mx-6 mb-4 flex items-center gap-2 flex-shrink-0">
          <TrendingUp size={13} style={{ color: '#94A3B8' }} />
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            Analyzed on{' '}
            {new Date(generatedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      )}

      {/* Divider label */}
      <div className="flex items-center gap-2 mx-6 mb-3 flex-shrink-0">
        <div className="h-px flex-1" style={{ backgroundColor: '#F0EDE8' }} />
        <span className="text-xs" style={{ color: '#94A3B8' }}>
          {item.count} Recording{item.count !== 1 ? 's' : ''}
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: '#F0EDE8' }} />
      </div>

      {/* Recordings list */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-3">
        {item.records.map((rec, i) => {
          const confidenceBarWidth = rec.percentage;
          return (
            <motion.div
              key={rec.id}
              className="rounded-3xl p-4"
              style={{ backgroundColor: '#F8F6F3', border: '1.5px solid #EDE9E3' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              {/* Row: number + date + badge */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: meta.color + '20', color: meta.color }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Calendar size={12} style={{ color: '#94A3B8' }} />
                    <p className="text-xs font-medium" style={{ color: '#1A3263' }}>
                      {fmtDateFull(rec.date)}
                    </p>
                  </div>
                  <p className="text-xs ml-4" style={{ color: '#94A3B8' }}>
                    {fmtTime(rec.date)}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 px-2.5 py-1 rounded-xl text-xs font-bold"
                  style={{
                    backgroundColor: meta.color + '18',
                    color: meta.color,
                    border: `1.5px solid ${meta.color}30`,
                  }}
                >
                  {rec.percentage}%
                </div>
              </div>

              {/* Confidence bar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs" style={{ color: '#94A3B8' }}>Confidence</p>
                </div>
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#E8E2DB' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: meta.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${confidenceBarWidth}%` }}
                    transition={{ duration: 0.55, delay: i * 0.06 + 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Disclaimer */}
        <div className="rounded-xl p-3 text-center" style={{ backgroundColor: '#FEF3C7' }}>
          <p className="text-xs" style={{ color: '#92400e' }}>
            ⚠️ Not a medical diagnosis. Consult healthcare professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
