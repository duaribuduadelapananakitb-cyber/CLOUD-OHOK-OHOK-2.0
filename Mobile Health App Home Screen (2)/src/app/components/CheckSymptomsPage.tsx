import { useState } from 'react';
import { ArrowLeft, Mic, Square, Info, Brain, Loader2, Check } from 'lucide-react';
import { Page, AnalysisRecord } from '../App';

interface CheckSymptomsPageProps {
  navigateTo: (page: Page) => void;
  addAnalysisRecord: (record: AnalysisRecord) => void;
}

type ButtonState = 'default' | 'loading' | 'success';

export default function CheckSymptomsPage({ navigateTo, addAnalysisRecord }: CheckSymptomsPageProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [buttonState, setButtonState] = useState<ButtonState>('default');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 10) {
            clearInterval(interval);
            setIsRecording(false);
            setHasRecording(true);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setRecordingTime(0);
      setHasRecording(true);
    }
  };

  const handleAnalyze = () => {
    if (!hasRecording) {
      setErrorMessage('Please record your cough first');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setErrorMessage('');
    setButtonState('loading');

    setTimeout(() => {
      setButtonState('success');

      // Add analysis record to history
      const record: AnalysisRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        condition: 'Bronchitis',
        percentage: 65
      };
      addAnalysisRecord(record);

      setTimeout(() => {
        navigateTo('result');
      }, 1000);
    }, 2500);
  };

  const isDisabled = !hasRecording || buttonState === 'loading';

  return (
    <div className="w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4">
          <button
            onClick={() => navigateTo('home')}
            className="mb-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#E8E2DB' }}
          >
            <ArrowLeft size={20} style={{ color: '#1A3263' }} />
          </button>
          <h1 className="text-2xl mb-1" style={{ color: '#1A3263' }}>
            Check Symptoms
          </h1>
          <p className="text-sm" style={{ color: '#547792' }}>
            Analyze your cough using AI
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Main Recording Card */}
          <div className="rounded-3xl p-8 shadow-lg" style={{ backgroundColor: '#F8F9FA' }}>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleRecordToggle}
                className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 relative"
                style={{ backgroundColor: isRecording ? '#ef4444' : (hasRecording ? '#22c55e' : '#FAB95B') }}
              >
                {isRecording ? (
                  <>
                    <Square size={40} style={{ color: 'white' }} fill="white" />
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#ef4444', opacity: 0.3 }} />
                    <div className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: '#ef4444', opacity: 0.2 }} />
                  </>
                ) : (
                  <Mic size={40} style={{ color: hasRecording ? 'white' : '#1A3263' }} />
                )}
              </button>

              {isRecording ? (
                <div className="text-center space-y-2">
                  <p className="text-lg" style={{ color: '#1A3263' }}>Recording...</p>
                  <p className="text-2xl tabular-nums" style={{ color: '#ef4444' }}>
                    00:{recordingTime.toString().padStart(2, '0')}
                  </p>
                  <div className="flex items-center justify-center gap-1 h-12">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full animate-pulse"
                        style={{
                          backgroundColor: '#ef4444',
                          height: `${Math.random() * 40 + 20}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <p className="text-lg" style={{ color: '#1A3263' }}>
                    {hasRecording ? 'Cough recorded ✓' : 'Tap to record your cough'}
                  </p>
                  <p className="text-sm" style={{ color: '#547792' }}>
                    {hasRecording ? 'Click analyze to continue' : 'Record for 5–10 seconds'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: '#E0F2FE' }}>
            <div className="flex items-start gap-3">
              <Info size={20} style={{ color: '#547792' }} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs mb-1" style={{ color: '#1A3263' }}>
                  This tool analyzes cough patterns using AI classification
                </p>
                <p className="text-xs" style={{ color: '#547792' }}>
                  ⚠️ Not a medical diagnosis
                </p>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="rounded-xl p-3 text-center animate-pulse" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
              <p className="text-sm">⚠️ {errorMessage}</p>
            </div>
          )}
        </div>

        {/* Analyze Button - Fixed at Bottom */}
        <div className="p-6 pt-0">
          <button
            onClick={handleAnalyze}
            disabled={isDisabled}
            className="w-full py-4 rounded-2xl text-white transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: buttonState === 'success' ? '#22c55e' : (isDisabled && buttonState !== 'loading' ? '#94a3b8' : '#1A3263'),
              opacity: isDisabled && buttonState !== 'loading' ? 0.6 : 1,
              boxShadow: buttonState === 'loading'
                ? '0 0 20px rgba(26, 50, 99, 0.4)'
                : buttonState === 'success'
                ? '0 0 20px rgba(34, 197, 94, 0.4)'
                : '0 4px 12px rgba(0, 0, 0, 0.1)',
              cursor: isDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            {buttonState === 'loading' && (
              <div className="absolute inset-0 animate-pulse" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            )}

            <div className="flex items-center justify-center gap-2 relative z-10">
              {buttonState === 'default' && (
                <>
                  <Brain size={20} />
                  <span className="font-medium">Analyze Now</span>
                </>
              )}
              {buttonState === 'loading' && (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span className="font-medium">Analyzing...</span>
                </>
              )}
              {buttonState === 'success' && (
                <>
                  <Check size={20} />
                  <span className="font-medium">Analysis Complete ✓</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
