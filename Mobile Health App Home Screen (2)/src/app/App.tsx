import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import OnboardingPages from './components/OnboardingPages';
import UserProfilingPage from './components/UserProfilingPage';
import QRScanPage from './components/QRScanPage';
import HomePage from './components/HomePage';
import CheckSymptomsPage from './components/CheckSymptomsPage';
import ResultPage from './components/ResultPage';
import HistoryPage from './components/HistoryPage';
import NearbyHospitalsPage from './components/NearbyHospitalsPage';
import ArticlesPage from './components/ArticlesPage';
import SummaryPage from './components/SummaryPage';
import SummaryDetailPage from './components/SummaryDetailPage';

export type Page =
  | 'splash'
  | 'onboarding'
  | 'user-profiling'
  | 'qr-scan'
  | 'home'
  | 'check-symptoms'
  | 'result'
  | 'history'
  | 'hospitals'
  | 'articles'
  | 'summary'
  | 'summary-detail';

export interface AnalysisRecord {
  id: string;
  date: string;
  condition: string;
  percentage: number;
}

export interface UserProfile {
  nama: string;
  email: string;
  gender: 'male' | 'female';
  tanggalLahir: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([]);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisRecord | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasCompletedSetup = localStorage.getItem('hasCompletedSetup');
      if (hasCompletedSetup) {
        setCurrentPage('home');
      } else {
        setCurrentPage('onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Load analysis history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('analysisHistory');
    if (saved) {
      const history = JSON.parse(saved);
      setAnalysisHistory(history);
      if (history.length > 0) {
        setLatestAnalysis(history[0]);
      }
    }
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const completeOnboarding = () => {
    setCurrentPage('user-profiling');
  };

  const completeUserProfiling = (profile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentPage('qr-scan');
  };

  const completeQRScan = () => {
    localStorage.setItem('hasCompletedSetup', 'true');
    setCurrentPage('home');
  };

  const addAnalysisRecord = (record: AnalysisRecord) => {
    const newHistory = [record, ...analysisHistory];
    setAnalysisHistory(newHistory);
    setLatestAnalysis(record);
    localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#E8E2DB' }}>
      {currentPage === 'splash' && <SplashScreen />}
      {currentPage === 'onboarding' && <OnboardingPages onComplete={completeOnboarding} />}
      {currentPage === 'user-profiling' && <UserProfilingPage onComplete={completeUserProfiling} />}
      {currentPage === 'qr-scan' && <QRScanPage onComplete={completeQRScan} />}
      {currentPage === 'home' && <HomePage navigateTo={navigateTo} latestAnalysis={latestAnalysis} analysisHistory={analysisHistory} />}
      {currentPage === 'check-symptoms' && <CheckSymptomsPage navigateTo={navigateTo} addAnalysisRecord={addAnalysisRecord} />}
      {currentPage === 'result' && <ResultPage navigateTo={navigateTo} />}
      {currentPage === 'history' && <HistoryPage navigateTo={navigateTo} analysisHistory={analysisHistory} />}
      {currentPage === 'hospitals' && <NearbyHospitalsPage navigateTo={navigateTo} />}
      {currentPage === 'articles' && <ArticlesPage navigateTo={navigateTo} />}
      {currentPage === 'summary' && (
        <SummaryPage
          navigateTo={navigateTo}
          onConditionSelect={(c) => setSelectedCondition(c)}
        />
      )}
      {currentPage === 'summary-detail' && (
        <SummaryDetailPage navigateTo={navigateTo} condition={selectedCondition} />
      )}
    </div>
  );
}