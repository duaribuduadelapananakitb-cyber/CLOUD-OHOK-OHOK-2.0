import { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Page } from '../App';

interface ArticlesPageProps {
  navigateTo: (page: Page) => void;
}

interface Disease {
  name: string;
  icon: string;
  description: string;
  symptoms: string[];
  color: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  image: string;
}

export default function ArticlesPage({ navigateTo }: ArticlesPageProps) {
  const [activeTab, setActiveTab] = useState<'articles' | 'news'>('articles');

  const diseases: Disease[] = [
    {
      name: 'Asthma',
      icon: '🫁',
      description: 'A condition in which airways narrow and swell, producing extra mucus, making breathing difficult.',
      symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing attacks'],
      color: '#547792'
    },
    {
      name: 'Bronchitis',
      icon: '🤒',
      description: 'Inflammation of the bronchial tubes that carry air to and from the lungs.',
      symptoms: ['Persistent cough', 'Mucus production', 'Fatigue', 'Chest discomfort'],
      color: '#FAB95B'
    },
    {
      name: 'Pneumonia',
      icon: '🦠',
      description: 'An infection that inflames air sacs in one or both lungs, which may fill with fluid.',
      symptoms: ['Fever', 'Chills', 'Cough with phlegm', 'Difficulty breathing'],
      color: '#ef4444'
    },
    {
      name: 'COVID-19',
      icon: '🦠',
      description: 'Respiratory illness caused by the coronavirus, affecting the lungs and airways.',
      symptoms: ['Dry cough', 'Fever', 'Loss of taste/smell', 'Shortness of breath'],
      color: '#ef4444'
    },
    {
      name: 'Lung Cancer',
      icon: '⚠️',
      description: 'Cancer that begins in the lungs, often associated with smoking and air pollution.',
      symptoms: ['Persistent cough', 'Coughing up blood', 'Chest pain', 'Weight loss'],
      color: '#991b1b'
    },
    {
      name: 'Healthy',
      icon: '✅',
      description: 'Normal respiratory function with no detected conditions.',
      symptoms: ['Clear breathing', 'No persistent cough', 'Normal oxygen levels', 'Active lifestyle'],
      color: '#22c55e'
    }
  ];

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'New AI Algorithm Detects Lung Diseases Earlier',
      date: 'April 25, 2026',
      description: 'Researchers developed an AI system that can detect respiratory conditions up to 6 months earlier than traditional methods.',
      category: 'Research',
      image: '🔬'
    },
    {
      id: 2,
      title: 'Air Quality Index Reaches Unhealthy Levels',
      date: 'April 24, 2026',
      description: 'Major cities report high pollution levels. Health officials recommend limiting outdoor activities.',
      category: 'Health Alert',
      image: '🌫️'
    },
    {
      id: 3,
      title: 'COVID-19 Variant Update: What You Need to Know',
      date: 'April 23, 2026',
      description: 'Health authorities provide updates on the latest COVID-19 variant and vaccination recommendations.',
      category: 'Update',
      image: '🦠'
    },
    {
      id: 4,
      title: 'Study: Exercise Reduces Asthma Symptoms',
      date: 'April 22, 2026',
      description: 'New study shows regular physical activity can significantly reduce asthma symptoms in adults.',
      category: 'Research',
      image: '🏃'
    },
    {
      id: 5,
      title: 'World No Tobacco Day Campaign Launched',
      date: 'April 20, 2026',
      description: 'Global health organizations launch new campaign to help smokers quit and prevent youth smoking.',
      category: 'Campaign',
      image: '🚭'
    }
  ];

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
            Articles and News
          </h1>
          <p className="text-sm" style={{ color: '#547792' }}>
            Learn about respiratory conditions and lung health
          </p>
        </div>

        {/* Tabs */}
        <div className="px-6 mb-4">
          <div className="flex gap-2 p-1 rounded-xl" style={{ backgroundColor: '#E8E2DB' }}>
            <button
              onClick={() => setActiveTab('articles')}
              className="flex-1 py-2.5 rounded-lg text-sm transition-all"
              style={{
                backgroundColor: activeTab === 'articles' ? '#1A3263' : 'transparent',
                color: activeTab === 'articles' ? 'white' : '#547792'
              }}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className="flex-1 py-2.5 rounded-lg text-sm transition-all"
              style={{
                backgroundColor: activeTab === 'news' ? '#1A3263' : 'transparent',
                color: activeTab === 'news' ? 'white' : '#547792'
              }}
            >
              News
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
          {activeTab === 'articles' && (
            <>
              {/* Info Card */}
              <div className="rounded-2xl p-4" style={{ backgroundColor: '#F0F9FF' }}>
                <div className="flex items-start gap-3">
                  <Info size={20} style={{ color: '#547792' }} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: '#1A3263' }}>
                    Our AI analyzes cough audio patterns to detect potential respiratory conditions. This is not a medical diagnosis - always consult healthcare professionals.
                  </p>
                </div>
              </div>

              {/* Disease Cards */}
              {diseases.map((disease, index) => (
            <div
              key={index}
              className="rounded-2xl p-5 shadow-md"
              style={{ backgroundColor: 'white', border: `2px solid ${disease.color}` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{disease.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg mb-1" style={{ color: '#1A3263' }}>{disease.name}</h3>
                  <p className="text-sm mb-3" style={{ color: '#547792' }}>{disease.description}</p>
                </div>
              </div>

              <div className="pl-11">
                <p className="text-xs mb-2" style={{ color: '#1A3263' }}>Common Symptoms:</p>
                <ul className="space-y-1">
                  {disease.symptoms.map((symptom, idx) => (
                    <li key={idx} className="text-xs flex items-start gap-2" style={{ color: '#547792' }}>
                      <span style={{ color: disease.color }}>•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
                </div>
              ))}

              {/* Educational Articles Section */}
              <div className="pt-2">
                <h3 className="text-base mb-3 px-1" style={{ color: '#1A3263' }}>Educational Articles</h3>

                <div className="space-y-3">
                  <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}>
                    <h4 className="text-sm mb-1" style={{ color: '#1A3263' }}>Understanding Lung Health</h4>
                    <p className="text-xs mb-2" style={{ color: '#547792' }}>Learn how to maintain healthy lungs and prevent respiratory diseases.</p>
                    <button className="text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#E0F2FE', color: '#1A3263' }}>
                      Read more
                    </button>
                  </div>

                  <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}>
                    <h4 className="text-sm mb-1" style={{ color: '#1A3263' }}>Air Quality & Your Lungs</h4>
                    <p className="text-xs mb-2" style={{ color: '#547792' }}>How pollution affects respiratory health and what you can do.</p>
                    <button className="text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#E0F2FE', color: '#1A3263' }}>
                      Read more
                    </button>
                  </div>

                  <div className="rounded-2xl p-4 shadow-sm" style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}>
                    <h4 className="text-sm mb-1" style={{ color: '#1A3263' }}>Quitting Smoking Guide</h4>
                    <p className="text-xs mb-2" style={{ color: '#547792' }}>Evidence-based strategies to quit smoking and improve lung function.</p>
                    <button className="text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#E0F2FE', color: '#1A3263' }}>
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'news' && (
            <div className="space-y-3">
              <h3 className="text-base mb-2 px-1" style={{ color: '#1A3263' }}>Latest Health News</h3>

              {newsItems.map((news) => (
                <div
                  key={news.id}
                  className="rounded-2xl p-4 shadow-md"
                  style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}
                >
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">{news.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#E0F2FE', color: '#1A3263' }}>
                          {news.category}
                        </span>
                        <span className="text-xs" style={{ color: '#94a3b8' }}>{news.date}</span>
                      </div>
                      <h4 className="text-sm mb-2" style={{ color: '#1A3263' }}>{news.title}</h4>
                      <p className="text-xs mb-3" style={{ color: '#547792' }}>{news.description}</p>
                      <button className="text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#1A3263', color: 'white' }}>
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
