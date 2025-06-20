import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Calendar, BarChart3, Target, Brain, Zap, AlertCircle } from 'lucide-react';

interface PriceForecastingPageProps {
  language: 'th' | 'en';
  onBack: () => void;
}

interface ForecastData {
  currentPrice: number;
  predictions: {
    period: string;
    price: number;
    change: number;
    confidence: number;
  }[];
  factors: {
    name: string;
    impact: number;
    trend: 'positive' | 'negative' | 'neutral';
  }[];
  marketConditions: {
    sentiment: 'bullish' | 'bearish' | 'neutral';
    volatility: number;
    liquidity: number;
  };
}

const content = {
  th: {
    title: 'พยากรณ์ราคาอสังหาริมทรัพย์',
    subtitle: 'ใช้ AI ขั้นสูงในการพยากรณ์แนวโน้มราคาในอนาคต',
    propertyDetails: 'รายละเอียดทรัพย์สิน',
    forecastPeriod: 'ช่วงเวลาพยากรณ์',
    propertyType: 'ประเภททรัพย์สิน',
    location: 'ที่ตั้ง',
    area: 'พื้นที่ (ตร.ม.)',
    currentPrice: 'ราคาปัจจุบัน',
    generateForecast: 'สร้างการพยากรณ์',
    back: 'กลับ',
    forecastResults: 'ผลการพยากรณ์',
    pricePredictions: 'การทำนายราคา',
    marketFactors: 'ปัจจัยตลาด',
    marketConditions: 'สภาวะตลาด',
    confidence: 'ความเชื่อมั่น',
    priceChange: 'การเปลี่ยนแปลงราคา',
    marketSentiment: 'ความรู้สึกตลาด',
    volatility: 'ความผันผวน',
    liquidity: 'สภาพคล่อง',
    aiInsights: 'ข้อมูลเชิงลึกจาก AI',
    periods: {
      '3m': '3 เดือน',
      '6m': '6 เดือน',
      '1y': '1 ปี',
      '2y': '2 ปี',
      '5y': '5 ปี'
    },
    sentiments: {
      bullish: 'แนวโน้มขาขึ้น',
      bearish: 'แนวโน้มขาลง',
      neutral: 'ปานกลาง'
    },
    factorNames: {
      location: 'ทำเลที่ตั้ง',
      infrastructure: 'โครงสร้างพื้นฐาน',
      economy: 'เศรษฐกิจ',
      interest_rates: 'อัตราดอกเบี้ย',
      supply_demand: 'อุปสงค์-อุปทาน',
      government_policy: 'นโยบายรัฐบาล'
    }
  },
  en: {
    title: 'Property Price Forecasting',
    subtitle: 'Advanced AI-powered price trend forecasting for future periods',
    propertyDetails: 'Property Details',
    forecastPeriod: 'Forecast Period',
    propertyType: 'Property Type',
    location: 'Location',
    area: 'Area (sqm)',
    currentPrice: 'Current Price',
    generateForecast: 'Generate Forecast',
    back: 'Back',
    forecastResults: 'Forecast Results',
    pricePredictions: 'Price Predictions',
    marketFactors: 'Market Factors',
    marketConditions: 'Market Conditions',
    confidence: 'Confidence',
    priceChange: 'Price Change',
    marketSentiment: 'Market Sentiment',
    volatility: 'Volatility',
    liquidity: 'Liquidity',
    aiInsights: 'AI Insights',
    periods: {
      '3m': '3 Months',
      '6m': '6 Months',
      '1y': '1 Year',
      '2y': '2 Years',
      '5y': '5 Years'
    },
    sentiments: {
      bullish: 'Bullish',
      bearish: 'Bearish',
      neutral: 'Neutral'
    },
    factorNames: {
      location: 'Location',
      infrastructure: 'Infrastructure',
      economy: 'Economy',
      interest_rates: 'Interest Rates',
      supply_demand: 'Supply & Demand',
      government_policy: 'Government Policy'
    }
  }
};

const PriceForecastingPage: React.FC<PriceForecastingPageProps> = ({ language, onBack }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    area: '',
    currentPrice: '',
    forecastPeriod: ''
  });
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentContent = content[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI forecasting model
    setTimeout(() => {
      const basePrice = parseFloat(formData.currentPrice);
      const periods = ['3m', '6m', '1y', '2y', '5y'];
      
      const predictions = periods.map((period, index) => {
        const monthsAhead = period === '3m' ? 3 : period === '6m' ? 6 : period === '1y' ? 12 : period === '2y' ? 24 : 60;
        const volatility = Math.random() * 0.3 + 0.1; // 10-40% volatility
        const trend = Math.random() > 0.3 ? 1 : -1; // 70% chance of positive trend
        const change = (Math.random() * 0.15 + 0.02) * trend * (monthsAhead / 12); // 2-17% annual change
        
        return {
          period: currentContent.periods[period as keyof typeof currentContent.periods],
          price: basePrice * (1 + change),
          change: change * 100,
          confidence: Math.max(95 - (index * 8) - (volatility * 20), 60)
        };
      });

      const factors = [
        { name: currentContent.factorNames.location, impact: Math.random() * 40 + 20, trend: 'positive' as const },
        { name: currentContent.factorNames.infrastructure, impact: Math.random() * 30 + 10, trend: 'positive' as const },
        { name: currentContent.factorNames.economy, impact: Math.random() * 25 + 5, trend: Math.random() > 0.5 ? 'positive' as const : 'negative' as const },
        { name: currentContent.factorNames.interest_rates, impact: Math.random() * 20 + 5, trend: 'negative' as const },
        { name: currentContent.factorNames.supply_demand, impact: Math.random() * 35 + 15, trend: Math.random() > 0.6 ? 'positive' as const : 'negative' as const },
        { name: currentContent.factorNames.government_policy, impact: Math.random() * 15 + 5, trend: 'neutral' as const }
      ];

      const sentiments = ['bullish', 'bearish', 'neutral'] as const;
      
      setForecast({
        currentPrice: basePrice,
        predictions,
        factors,
        marketConditions: {
          sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
          volatility: Math.random() * 40 + 20, // 20-60%
          liquidity: Math.random() * 30 + 60 // 60-90%
        }
      });
      
      setIsLoading(false);
    }, 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(Math.round(price));
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-600 bg-green-100';
      case 'bearish': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{currentContent.back}</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentContent.title}
            </h1>
            <p className="text-gray-600">
              {currentContent.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                {currentContent.propertyDetails}
              </h2>
              
              <form onSubmit={generateForecast} className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.propertyType}
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select property type</option>
                    <option value="condo">Condominium</option>
                    <option value="house">House</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.location}
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select location</option>
                    <option value="bangkok">Bangkok</option>
                    <option value="nonthaburi">Nonthaburi</option>
                    <option value="pathum_thani">Pathum Thani</option>
                    <option value="samut_prakan">Samut Prakan</option>
                    <option value="chiang_mai">Chiang Mai</option>
                    <option value="phuket">Phuket</option>
                  </select>
                </div>

                {/* Area & Current Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.area}
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.currentPrice} (THB)
                    </label>
                    <input
                      type="number"
                      value={formData.currentPrice}
                      onChange={(e) => handleInputChange('currentPrice', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="5000000"
                      required
                    />
                  </div>
                </div>

                {/* Forecast Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {currentContent.forecastPeriod}
                  </label>
                  <select
                    value={formData.forecastPeriod}
                    onChange={(e) => handleInputChange('forecastPeriod', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select forecast period</option>
                    <option value="short">Short-term (3-6 months)</option>
                    <option value="medium">Medium-term (1-2 years)</option>
                    <option value="long">Long-term (5 years)</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>
                    {isLoading ? 'Generating Forecast...' : currentContent.generateForecast}
                  </span>
                </button>
              </form>
            </div>

            {/* Results */}
            <div>
              {forecast ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    {currentContent.forecastResults}
                  </h2>

                  {/* Price Predictions */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {currentContent.pricePredictions}
                    </h3>
                    <div className="space-y-3">
                      {forecast.predictions.map((prediction, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{prediction.period}</p>
                            <p className="text-2xl font-bold text-blue-600">
                              ฿{formatPrice(prediction.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${getChangeColor(prediction.change)}`}>
                              {prediction.change >= 0 ? '+' : ''}{prediction.change.toFixed(1)}%
                            </p>
                            <p className="text-sm text-gray-600">
                              {currentContent.confidence}: {prediction.confidence.toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Conditions */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {currentContent.marketConditions}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">{currentContent.marketSentiment}</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(forecast.marketConditions.sentiment)}`}>
                          {currentContent.sentiments[forecast.marketConditions.sentiment]}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">{currentContent.volatility}</p>
                        <p className="text-lg font-bold text-orange-600">
                          {forecast.marketConditions.volatility.toFixed(0)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">{currentContent.liquidity}</p>
                        <p className="text-lg font-bold text-green-600">
                          {forecast.marketConditions.liquidity.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Market Factors */}
                  <div className="bg-white border rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {currentContent.marketFactors}
                    </h3>
                    <div className="space-y-3">
                      {forecast.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getTrendIcon(factor.trend)}
                            <span className="font-medium text-gray-900">{factor.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-gray-700">
                              {factor.impact.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-bold text-gray-900">
                        {currentContent.aiInsights}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-white/70 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          {language === 'th' 
                            ? 'โมเดล AI คาดการณ์ว่าราคาจะมีแนวโน้มเพิ่มขึ้นในระยะยาว โดยได้รับอิทธิพลจากการพัฒนาโครงสร้างพื้นฐานและการเติบโตทางเศรษฐกิจ'
                            : 'AI model predicts long-term price appreciation driven by infrastructure development and economic growth.'
                          }
                        </p>
                      </div>
                      <div className="flex items-start space-x-3 p-3 bg-white/70 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          {language === 'th'
                            ? 'ควรติดตามการเปลี่ยนแปลงของอัตราดอกเบี้ยและนโยบายรัฐบาลที่อาจส่งผลต่อตลาดอสังหาริมทรัพย์'
                            : 'Monitor interest rate changes and government policies that may impact the real estate market.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center h-full flex items-center justify-center">
                  <div>
                    <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === 'th' 
                        ? 'กรอกข้อมูลและกดสร้างการพยากรณ์เพื่อดูผลลัพธ์'
                        : 'Fill in the form and generate forecast to see AI predictions'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceForecastingPage;