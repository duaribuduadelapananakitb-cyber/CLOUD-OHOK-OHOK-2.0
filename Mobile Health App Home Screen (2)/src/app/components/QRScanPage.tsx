import { useState, useEffect } from 'react';
import { Cloud, ChevronRight, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QRScanPageProps {
  onComplete: () => void;
}

type ScanState = 'scanning' | 'found' | 'not-found';

export default function QRScanPage({ onComplete }: QRScanPageProps) {
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const runScan = () => {
    setScanState('scanning');
    const timer = setTimeout(() => {
      const existing = localStorage.getItem('deviceId');
      if (existing) {
        setDeviceId(existing);
        setScanState('found');
      } else {
        setScanState('not-found');
      }
    }, 3000);
    return timer;
  };

  useEffect(() => {
    const timer = runScan();
    return () => clearTimeout(timer);
  }, []);

  const handleRescan = () => {
    runScan();
  };

  const handleRegister = () => {
    const newId =
      'DEV-' +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      '-' +
      Math.random().toString(36).substring(2, 6).toUpperCase();
    localStorage.setItem('deviceId', newId);
    setDeviceId(newId);
    onComplete();
  };

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
            style={{ backgroundColor: '#547792' }}
          >
            ✓
          </div>
          <div className="w-5 h-px" style={{ backgroundColor: '#1A3263' }} />
          <div
            className="w-6 h-6 rounded-full text-white text-[11px] flex items-center justify-center font-semibold"
            style={{ backgroundColor: '#1A3263' }}
          >
            2
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pb-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl" style={{ color: '#1A3263' }}>Scan Device QR</h2>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#547792' }}>
            Point the camera at your device QR code to verify the Device ID
          </p>
        </div>

        {/* Scanner viewport */}
        <div className="relative w-64 h-64 mb-6">
          {/* Camera bg */}
          <div
            className="w-full h-full rounded-3xl overflow-hidden"
            style={{ backgroundColor: '#0F172A' }}
          >
            {/* Subtle grid */}
            <div
              className="w-full h-full opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          {/* Corner brackets */}
          <div
            className="absolute top-3.5 left-3.5 w-9 h-9"
            style={{
              borderTop: '3px solid #FAB95B',
              borderLeft: '3px solid #FAB95B',
              borderRadius: '6px 0 0 0',
            }}
          />
          <div
            className="absolute top-3.5 right-3.5 w-9 h-9"
            style={{
              borderTop: '3px solid #FAB95B',
              borderRight: '3px solid #FAB95B',
              borderRadius: '0 6px 0 0',
            }}
          />
          <div
            className="absolute bottom-3.5 left-3.5 w-9 h-9"
            style={{
              borderBottom: '3px solid #FAB95B',
              borderLeft: '3px solid #FAB95B',
              borderRadius: '0 0 0 6px',
            }}
          />
          <div
            className="absolute bottom-3.5 right-3.5 w-9 h-9"
            style={{
              borderBottom: '3px solid #FAB95B',
              borderRight: '3px solid #FAB95B',
              borderRadius: '0 0 6px 0',
            }}
          />

          {/* Scanning line */}
          {scanState === 'scanning' && (
            <motion.div
              className="absolute left-5 right-5 h-0.5 rounded-full"
              style={{
                backgroundColor: '#FAB95B',
                boxShadow: '0 0 10px 2px rgba(250, 185, 91, 0.7)',
                top: 20,
              }}
              animate={{ top: [20, 220, 20] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* QR pattern mock (visible only while scanning) */}
          {scanState === 'scanning' && (
            <div className="absolute inset-10 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    backgroundColor: [0, 1, 4, 5, 2, 8, 11, 14, 15].includes(i)
                      ? 'white'
                      : 'transparent',
                  }}
                />
              ))}
            </div>
          )}

          {/* Result overlay */}
          <AnimatePresence>
            {scanState === 'found' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-3xl"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.25)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <CheckCircle size={72} style={{ color: '#22c55e' }} />
              </motion.div>
            )}
            {scanState === 'not-found' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-3xl"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <XCircle size={72} style={{ color: '#ef4444' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status block */}
        <AnimatePresence mode="wait">
          {scanState === 'scanning' && (
            <motion.div
              key="scanning"
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#FAB95B' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <p className="text-sm" style={{ color: '#547792' }}>Scanning QR code...</p>
              </div>
              <p className="text-xs" style={{ color: '#94A3B8' }}>Hold your device steady</p>
            </motion.div>
          )}

          {scanState === 'found' && (
            <motion.div
              key="found"
              className="text-center w-full space-y-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p className="text-lg" style={{ color: '#16a34a' }}>Device Found!</p>
              <div
                className="px-4 py-3 rounded-2xl mx-2"
                style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #86efac' }}
              >
                <p className="text-xs mb-0.5" style={{ color: '#547792' }}>Device ID</p>
                <p className="text-sm font-mono tracking-wide" style={{ color: '#1A3263' }}>
                  {deviceId}
                </p>
              </div>
              <p className="text-xs" style={{ color: '#547792' }}>
                Your device is already registered
              </p>
            </motion.div>
          )}

          {scanState === 'not-found' && (
            <motion.div
              key="not-found"
              className="text-center w-full space-y-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <p className="text-lg" style={{ color: '#dc2626' }}>No Device Registered</p>
              <p className="text-xs leading-relaxed px-2" style={{ color: '#547792' }}>
                The QR code does not contain a valid Device ID. You can register a new device or skip for now.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />

        {/* Bottom CTA */}
        <div className="w-full space-y-3">
          {scanState === 'found' && (
            <button
              onClick={onComplete}
              className="w-full py-4 rounded-2xl text-white shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: '#1A3263' }}
            >
              <span>Continue to Home</span>
              <ChevronRight size={20} />
            </button>
          )}

          {scanState === 'not-found' && (
            <>
              <button
                onClick={handleRegister}
                className="w-full py-4 rounded-2xl text-white shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1A3263' }}
              >
                <span>Register New Device</span>
                <ChevronRight size={20} />
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleRescan}
                  className="flex-1 py-3 rounded-2xl text-sm transition-transform active:scale-[0.98] flex items-center justify-center gap-1.5"
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #E8E2DB',
                    color: '#547792',
                  }}
                >
                  <RefreshCw size={15} />
                  <span>Scan Again</span>
                </button>
                <button
                  onClick={onComplete}
                  className="flex-1 py-3 rounded-2xl text-sm transition-transform active:scale-[0.98]"
                  style={{
                    backgroundColor: 'white',
                    border: '2px solid #E8E2DB',
                    color: '#547792',
                  }}
                >
                  Skip
                </button>
              </div>
            </>
          )}

          {scanState === 'scanning' && (
            <div
              className="w-full py-4 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#F8F6F3' }}
            >
              <p className="text-sm" style={{ color: '#94A3B8' }}>Waiting for scan result...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
