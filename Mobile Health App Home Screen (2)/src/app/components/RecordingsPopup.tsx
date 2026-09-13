import { motion } from 'motion/react';
import { X, Mic, BarChart2 } from 'lucide-react';
import { AnalysisRecord } from '../App';

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

interface RecordingsPopupProps {
  recordings: AnalysisRecord[];
  onClose: () => void;
  onAnalyzeAll: () => void;
}

export default function RecordingsPopup({ recordings, onClose, onAnalyzeAll }: RecordingsPopupProps) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end" style={{ borderRadius: 'inherit' }}>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(15, 23, 42, 0.55)', backdropFilter: 'blur(2px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <motion.div
        className="relative bg-white flex flex-col"
        style={{ borderRadius: '28px 28px 0 0', maxHeight: '74%' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-0.5 flex-shrink-0">
          <div className="w-9 h-1 rounded-full" style={{ backgroundColor: '#D4CFC9' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-3 flex-shrink-0">
          <div>
            <h3 className="text-lg" style={{ color: '#1A3263' }}>Your Recordings</h3>
            <p className="text-xs mt-0.5" style={{ color: '#547792' }}>
              {recordings.length} recording{recordings.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#F0EDE8' }}
          >
            <X size={15} style={{ color: '#547792' }} />
          </button>
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 mx-5" style={{ height: '1px', backgroundColor: '#F0EDE8' }} />

        {/* List — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-3 min-h-0">
          {recordings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Mic size={40} style={{ color: '#D4CFC9' }} />
              <p className="text-sm" style={{ color: '#94A3B8' }}>No recordings yet</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recordings.map((rec, i) => {
                const meta = getMeta(rec.condition);
                return (
                  <motion.div
                    key={rec.id}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-2xl"
                    style={{ backgroundColor: '#F8F6F3' }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <span className="text-xl flex-shrink-0">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: '#1A3263' }}>
                        {rec.condition}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                        {new Date(rec.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 px-2.5 py-1 rounded-xl text-xs font-semibold"
                      style={{
                        backgroundColor: meta.color + '18',
                        color: meta.color,
                        border: `1.5px solid ${meta.color}30`,
                      }}
                    >
                      {rec.percentage}%
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div
          className="flex-shrink-0 px-5 pt-3 pb-6"
          style={{ borderTop: '1px solid #F0EDE8' }}
        >
          <button
            onClick={onAnalyzeAll}
            disabled={recordings.length === 0}
            className="w-full py-4 rounded-2xl text-white shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:pointer-events-none"
            style={{ backgroundColor: '#1A3263' }}
          >
            <BarChart2 size={19} />
            <span>Analyze All Recordings</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
