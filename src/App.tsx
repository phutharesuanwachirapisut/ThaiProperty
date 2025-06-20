import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Menu,
  X,
  TrendingUp,
  BarChart3,
  Crown,
  Map,
  Brain,
} from 'lucide-react';
import PredictionPage from './components/PredictionPage';
import ComparisonPage from './components/ComparisonPage';
import MarketTrendsForm from './components/MarketTrendsForm';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PropertyValuationPage from './components/PropertyValuationPage';
import PriceForecastingPage from './components/PriceForecastingPage';

//comment
//dd

interface Content {
  nav: {
    brandName: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaButton: string;
    learnMore: string;
  };
  navigationButtons: Array<{
    id: string;
    text: string;
    icon: React.ComponentType<any>;
  }>;
  features: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
}

const content: Record<'th' | 'en', Content> = {
  th: {
    nav: {
      brandName: 'ThaiPropertyAI',
    },
    hero: {
      headline: 'ทำนายราคาอสังหาริมทรัพย์ไทย',
      subheadline:
        'ประเมินราคาด้วย AI ขั้นสูง สำหรับตลาดอสังหาริมทรัพย์ไทย ตัดสินใจลงทุนอย่างมั่นใจด้วยการวิเคราะห์ตลาดที่ครอบคลุม',
      ctaButton: 'เริ่มประเมินราคา',
      learnMore: 'เรียนรู้เพิ่มเติม',
    },
    navigationButtons: [
      { id: 'prediction', text: 'เริ่มทำนายราคา', icon: TrendingUp },
      { id: 'forecasting', text: 'พยากรณ์ราคา AI', icon: Brain },
      { id: 'trends', text: 'ดูแนวโน้มตลาด', icon: BarChart3 },
      { id: 'compare', text: 'เปรียบเทียบ', icon: Globe },
      { id: 'valuation', text: 'ประเมินมูลค่าทรัพย์สิน', icon: Crown },
      { id: 'map', text: 'แผนที่', icon: Map },
    ],
    features: {
      title: 'ทำไมต้องเลือก ThaiPropertyAI',
      items: [
        {
          title: 'AI ขั้นสูง',
          description:
            'ใช้เทคโนโลยี Machine Learning ที่ทันสมัยในการวิเคราะห์ตลาด',
        },
        {
          title: 'ข้อมูลครอบคลุม',
          description: 'วิเคราะห์จากข้อมูลอสังหาริมทรัพย์ทั่วประเทศไทย',
        },
        {
          title: 'ผลลัพธ์แม่นยำ',
          description: 'ความแม่นยำสูงจากการเรียนรู้ข้อมูลตลาดจริง',
        },
        {
          title: 'พยากรณ์อนาคต',
          description: 'ทำนายแนวโน้มราคาในอนาคตด้วยโมเดล AI ที่ซับซ้อน',
        },
      ],
    },
  },
  en: {
    nav: {
      brandName: 'ThaiPropertyAI',
    },
    hero: {
      headline: 'Predict Thai Property Prices',
      subheadline:
        'Accurately evaluate Thai property prices with advanced AI for better investment decisions.',
      ctaButton: 'Start Price Prediction',
      learnMore: 'Learn More',
    },
    navigationButtons: [
      { id: 'prediction', text: 'Start Prediction', icon: TrendingUp },
      { id: 'forecasting', text: 'AI Price Forecasting', icon: Brain },
      { id: 'trends', text: 'View Market Trends', icon: BarChart3 },
      { id: 'compare', text: 'Compare', icon: Globe },
      { id: 'valuation', text: 'Property Valuation', icon: Crown },
      { id: 'map', text: 'Map', icon: Map },
    ],
    features: {
      title: 'Why Choose ThaiPropertyAI',
      items: [
        {
          title: 'Advanced AI',
          description:
            'Utilizing cutting-edge machine learning technology for market analysis',
        },
        {
          title: 'Comprehensive Data',
          description: 'Analysis based on property data from across Thailand',
        },
        {
          title: 'Accurate Results',
          description: 'High precision through real market data learning',
        },
        {
          title: 'Future Forecasting',
          description: 'Predict future price trends with sophisticated AI models',
        },
      ],
    },
  },
};

function App() {
  const [language, setLanguage] = useState<'th' | 'en'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    | 'home'
    | 'prediction'
    | 'comparison'
    | 'trends'
    | 'login'
    | 'register'
    | 'valuation'
    | 'forecasting'
  >('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const currentContent = content[language];

  const toggleLanguage = (lang: 'th' | 'en') => {
    setLanguage(lang);
    setMobileMenuOpen(false);
  };

  const handleNavigationClick = (buttonId: string) => {
    if (buttonId === 'prediction') {
      setCurrentPage('prediction');
    } else if (buttonId === 'compare') {
      setCurrentPage('comparison');
    } else if (buttonId === 'trends') {
      setCurrentPage('trends');
    } else if (buttonId === 'valuation') {
      setCurrentPage('valuation');
    } else if (buttonId === 'forecasting') {
      setCurrentPage('forecasting');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'prediction') {
    if (!isAuthenticated) {
      return (
        <LoginPage
          language={language}
          onBack={handleBackToHome}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
    }
    return <PredictionPage language={language} onBack={handleBackToHome} />;
  }

  if (currentPage === 'comparison') {
    if (!isAuthenticated) {
      return (
        <LoginPage
          language={language}
          onBack={handleBackToHome}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
    }
    return <ComparisonPage language={language} onBack={handleBackToHome} />;
  }

  if (currentPage === 'trends') {
    if (!isAuthenticated) {
      return (
        <LoginPage
          language={language}
          onBack={handleBackToHome}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
    }
    return <MarketTrendsForm language={language} onBack={handleBackToHome} />;
  }

  if (currentPage === 'valuation') {
    if (!isAuthenticated) {
      return (
        <LoginPage
          language={language}
          onBack={handleBackToHome}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
    }
    return (
      <PropertyValuationPage language={language} onBack={handleBackToHome} />
    );
  }

  if (currentPage === 'forecasting') {
    if (!isAuthenticated) {
      return (
        <LoginPage
          language={language}
          onBack={handleBackToHome}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      );
    }
    return (
      <PriceForecastingPage language={language} onBack={handleBackToHome} />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage
        language={language}
        onBack={handleBackToHome}
        onLoginSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  if (currentPage === 'register') {
    return <RegisterPage language={language} onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-xl text-gray-900">
                  {currentContent.nav.brandName}
                </div>
              </div>

              {/* Desktop Buttons (Language + Auth) */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Language */}
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => toggleLanguage('th')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    language === 'th'
                      ? 'bg-black text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  TH
                </button>

                {/* Login/Register */}
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition"
                >
                  Register
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:text-gray-500 hover:bg-gray-50 transition-all duration-200"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 animate-in slide-in-from-top duration-200">
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      language === 'en'
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => toggleLanguage('th')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      language === 'th'
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    ไทย
                  </button>
                </div>

                {/* Login/Register Buttons - Mobile */}
                <div className="mt-4 flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                {currentContent.hero.headline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              {currentContent.hero.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => handleNavigationClick('prediction')}
                className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:bg-gray-800"
              >
                {currentContent.hero.ctaButton}
              </button>
              <button className="w-full sm:w-auto border-2 border-gray-500 text-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-200">
                {currentContent.hero.learnMore}
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto mb-16">
              {currentContent.navigationButtons.map((button) => {
                const IconComponent = button.icon;
                return (
                  <button
                    key={button.id}
                    onClick={() => handleNavigationClick(button.id)}
                    className="group bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-400 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center space-y-2 md:space-y-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center mb-2 md:mb-3">
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <span className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-gray-700 transition-colors duration-300 text-center leading-tight">
                        {button.text}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              {currentContent.features.title}
            </h2>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {currentContent.features.items.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-white/20"
                >
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 mx-auto">
                    {index === 3 ? (
                      <Brain className="w-6 h-6 text-white" />
                    ) : (
                      <Globe className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-black" />
              </div>
              <div className="font-bold text-lg">
                {currentContent.nav.brandName}
              </div>
            </div>
            <p className="text-gray-400">
              {language === 'th'
                ? '© 2024 ThaiPropertyAI. สงวนลิขสิทธิ์.'
                : '© 2024 ThaiPropertyAI. All rights reserved.'}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;