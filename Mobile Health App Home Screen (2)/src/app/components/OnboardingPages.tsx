import { useState } from 'react';
import { Cloud, ChevronRight } from 'lucide-react';

interface OnboardingPagesProps {
  onComplete: () => void;
}

export default function OnboardingPages({ onComplete }: OnboardingPagesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: '🫁',
      title: 'Welcome to CLOUD',
      description: 'AI-powered respiratory health monitoring. Detect lung conditions early using cough audio analysis.'
    },
    {
      icon: '🎙️',
      title: 'Simple Audio Recording',
      description: 'Record your cough for 5-10 seconds. Our AI instantly analyzes sound patterns for potential conditions.'
    },
    {
      icon: '📊',
      title: 'Daily Health Tracking',
      description: 'Track respiratory habits, air quality exposure, and receive personalized health insights every day.'
    },
    {
      icon: '🏥',
      title: 'Smart Recommendations',
      description: 'Get AI-driven health advice and locate nearby hospitals whenever you need medical attention.'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
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
        <button onClick={handleSkip} className="text-sm" style={{ color: '#547792' }}>
          Skip
        </button>
      </div>

      {/* Slide Content - takes up remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-12">
        <div className="text-9xl mb-8">{slides[currentSlide].icon}</div>
        <h2 className="text-2xl mb-4" style={{ color: '#1A3263' }}>
          {slides[currentSlide].title}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: '#547792' }}>
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Bottom section - Progress + Button */}
      <div className="p-6 pt-0 space-y-4">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className="h-2 rounded-full transition-all"
              style={{
                width: currentSlide === index ? '32px' : '8px',
                backgroundColor: currentSlide === index ? '#1A3263' : '#E8E2DB'
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl text-white shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
          style={{ backgroundColor: '#1A3263' }}
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
