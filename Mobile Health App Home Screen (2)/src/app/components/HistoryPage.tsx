import { ArrowLeft, Calendar } from 'lucide-react';
import { Page, AnalysisRecord } from '../App';
import { useState } from 'react';

interface HistoryPageProps {
  navigateTo: (page: Page) => void;
  analysisHistory: AnalysisRecord[];
}

type TimePeriod = 'all' | '7days' | '30days';

export default function HistoryPage({ navigateTo, analysisHistory }: HistoryPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('all');

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Healthy':
        return '#22c55e';
      case 'Asthma':
        return '#547792';
      case 'Bronchitis':
        return '#FAB95B';
      case 'Pneumonia':
      case 'COVID-19':
        return '#ef4444';
      case 'Lung Cancer':
        return '#991b1b';
      default:
        return '#547792';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Healthy':
        return '✅';
      case 'Asthma':
        return '🫁';
      case 'Bronchitis':
        return '🤒';
      case 'Pneumonia':
        return '🦠';
      case 'COVID-19':
        return '🦠';
      case 'Lung Cancer':
        return '⚠️';
      default:
        return '🫁';
    }
  };

  // Filter records based on selected time period
  const getFilteredRecords = () => {
    if (selectedPeriod === 'all') {
      return analysisHistory;
    }

    const now = new Date();
    const daysAgo = selectedPeriod === '7days' ? 7 : 30;
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    return analysisHistory.filter(record => new Date(record.date) >= cutoffDate);
  };

  const filteredRecords = getFilteredRecords();

  // Group records by day
  const groupRecordsByDay = () => {
    const grouped: { [key: string]: AnalysisRecord[] } = {};
    
    filteredRecords.forEach(record => {
      const date = new Date(record.date);
      const dateKey = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(record);
    });
    
    return grouped;
  };

  const groupedRecords = groupRecordsByDay();
  const dateKeys = Object.keys(groupedRecords).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

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
            Symptom History
          </h1>
          <p className="text-sm" style={{ color: '#547792' }}>
            Track your respiratory health over time
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Time Period Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('all')}
              className="flex-1 py-2.5 rounded-xl text-sm transition-all"
              style={{
                backgroundColor: selectedPeriod === 'all' ? '#1A3263' : '#E8E2DB',
                color: selectedPeriod === 'all' ? 'white' : '#547792'
              }}
            >
              All Time
            </button>
            <button
              onClick={() => setSelectedPeriod('7days')}
              className="flex-1 py-2.5 rounded-xl text-sm transition-all"
              style={{
                backgroundColor: selectedPeriod === '7days' ? '#1A3263' : '#E8E2DB',
                color: selectedPeriod === '7days' ? 'white' : '#547792'
              }}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setSelectedPeriod('30days')}
              className="flex-1 py-2.5 rounded-xl text-sm transition-all"
              style={{
                backgroundColor: selectedPeriod === '30days' ? '#1A3263' : '#E8E2DB',
                color: selectedPeriod === '30days' ? 'white' : '#547792'
              }}
            >
              Last 30 Days
            </button>
          </div>

          {/* Analysis Records */}
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm px-1" style={{ color: '#547792' }}>
                All Records ({filteredRecords.length})
              </h3>

              {dateKeys.map(dateKey => (
                <div key={dateKey} className="space-y-4">
                  <h4 className="text-sm px-1" style={{ color: '#547792' }}>
                    {dateKey}
                  </h4>
                  {groupedRecords[dateKey].map((record) => (
                    <div
                      key={record.id}
                      className="rounded-3xl p-5 shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #1A3263 0%, #547792 100%)' }}
                    >
                      <div className="space-y-4">
                        {/* Condition Header */}
                        <div className="text-center">
                          <div className="text-5xl mb-2">{getConditionIcon(record.condition)}</div>
                          <h3 className="text-2xl text-white mb-1">{record.condition}</h3>
                          <div className="inline-block px-4 py-2 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                            <p className="text-xs text-white/70">Confidence</p>
                            <p className="text-xl text-white">{record.percentage}%</p>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center justify-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                          <Calendar size={14} style={{ color: 'rgba(255,255,255,0.7)' }} />
                          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {new Date(record.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="text-5xl mb-3">📋</div>
              <h3 className="text-base mb-2" style={{ color: '#1A3263' }}>
                No History Yet
              </h3>
              <p className="text-sm" style={{ color: '#547792' }}>
                Start checking your symptoms to build your health history
              </p>
            </div>
          )}

          {/* Insights Section */}
          {filteredRecords.length > 0 && (
            <div className="rounded-2xl p-5 shadow-md" style={{ backgroundColor: '#F0F9FF' }}>
              <h3 className="text-base mb-3" style={{ color: '#1A3263' }}>💡 Health Insights</h3>
              <div className="space-y-2">
                <p className="text-sm" style={{ color: '#547792' }}>
                  • You've completed {filteredRecords.length} {filteredRecords.length === 1 ? 'analysis' : 'analyses'}
                </p>
                <p className="text-sm" style={{ color: '#547792' }}>
                  • Regular monitoring helps track respiratory health changes
                </p>
                <p className="text-sm" style={{ color: '#547792' }}>
                  • Consult a healthcare professional if symptoms persist
                </p>
              </div>
            </div>
          )}

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