import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, MapPin, Calendar } from 'lucide-react';

interface MarketTrendsFormProps {
  language: 'th' | 'en';
  onBack: () => void;
}

const content = {
  th: {
    title: 'แนวโน้มตลาดอสังหาริมทรัพย์',
    subtitle: 'วิเคราะห์แนวโน้มและสถิติตลาดอสังหาริมทรัพย์',
    selectLocation: 'เลือกพื้นที่',
    selectPropertyType: 'เลือกประเภททรัพย์สิน',
    selectTimeframe: 'เลือกช่วงเวลา',
    viewTrends: 'ดูแนวโน้ม',
    back: 'กลับ',
    marketOverview: 'ภาพรวมตลาด',
    priceIndex: 'ดัชนีราคา',
    averagePrice: 'ราคาเฉลี่ย',
    totalTransactions: 'จำนวนการซื้อขาย',
    priceChange: 'การเปลี่ยนแปลงราคา',
    monthlyTrends: 'แนวโน้มรายเดือน',
    topAreas: 'พื้นที่ยอดนิยม',
    insights: 'ข้อมูลเชิงลึก',
    locations: {
      bangkok: 'กรุงเทพมหานคร',
      nonthaburi: 'นนทบุรี',
      pathum_thani: 'ปทุมธานี',
      samut_prakan: 'สมุทรปราการ',
      chiang_mai: 'เชียงใหม่',
      phuket: 'ภูเก็ต'
    },
    propertyTypes: {
      all: 'ทั้งหมด',
      condo: 'คอนโดมิเนียม',
      house: 'บ้านเดี่ยว',
      townhouse: 'ทาวน์เฮาส์'
    },
    timeframes: {
      '3m': '3 เดือนที่ผ่านมา',
      '6m': '6 เดือนที่ผ่านมา',
      '1y': '1 ปีที่ผ่านมา',
      '2y': '2 ปีที่ผ่านมา'
    }
  },
  en: {
    title: 'Real Estate Market Trends',
    subtitle: 'Analyze market trends and real estate statistics',
    selectLocation: 'Select Location',
    selectPropertyType: 'Select Property Type',
    selectTimeframe: 'Select Timeframe',
    viewTrends: 'View Trends',
    back: 'Back',
    marketOverview: 'Market Overview',
    priceIndex: 'Price Index',
    averagePrice: 'Average Price',
    totalTransactions: 'Total Transactions',
    priceChange: 'Price Change',
    monthlyTrends: 'Monthly Trends',
    topAreas: 'Top Areas',
    insights: 'Market Insights',
    locations: {
      bangkok: 'Bangkok',
      nonthaburi: 'Nonthaburi',
      pathum_thani: 'Pathum Thani',
      samut_prakan: 'Samut Prakan',
      chiang_mai: 'Chiang Mai',
      phuket: 'Phuket'
    },
    propertyTypes: {
      all: 'All Types',
      condo: 'Condominium',
      house: 'House',
      townhouse: 'Townhouse'
    },
    timeframes: {
      '3m': 'Last 3 Months',
      '6m': 'Last 6 Months',
      '1y': 'Last 1 Year',
      '2y': 'Last 2 Years'
    }
  }
};

const MarketTrendsForm: React.FC<MarketTrendsFormProps> = ({ language, onBack }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentContent = content[language];

  const handleViewTrends = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  // Mock data for demonstration
  const mockData = {
    priceIndex: 125.4,
    averagePrice: 4500000,
    totalTransactions: 1247,
    priceChange: 8.5,
    monthlyData: [
      { month: 'Jan', price: 4200000, transactions: 98 },
      { month: 'Feb', price: 4250000, transactions: 105 },
      { month: 'Mar', price: 4300000, transactions: 112 },
      { month: 'Apr', price: 4350000, transactions: 118 },
      { month: 'May', price: 4400000, transactions: 125 },
      { month: 'Jun', price: 4500000, transactions: 132 }
    ],
    topAreas: [
      { name: 'Sukhumvit', avgPrice: 6800000, change: 12.3 },
      { name: 'Silom', avgPrice: 5900000, change: 9.8 },
      { name: 'Sathorn', avgPrice: 7200000, change: 15.2 },
      { name: 'Thonglor', avgPrice: 8500000, change: 18.7 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentContent.title}
            </h1>
            <p className="text-gray-600">
              {currentContent.subtitle}
            </p>
          </div>

          {!showResults ? (
            /* Form */
            <form onSubmit={handleViewTrends} className="max-w-2xl mx-auto space-y-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {currentContent.selectLocation}
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                >
                  <option value="">{currentContent.selectLocation}</option>
                  <option value="bangkok">{currentContent.locations.bangkok}</option>
                  <option value="nonthaburi">{currentContent.locations.nonthaburi}</option>
                  <option value="pathum_thani">{currentContent.locations.pathum_thani}</option>
                  <option value="samut_prakan">{currentContent.locations.samut_prakan}</option>
                  <option value="chiang_mai">{currentContent.locations.chiang_mai}</option>
                  <option value="phuket">{currentContent.locations.phuket}</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BarChart3 className="w-4 h-4 inline mr-2" />
                  {currentContent.selectPropertyType}
                </label>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                >
                  <option value="">{currentContent.selectPropertyType}</option>
                  <option value="all">{currentContent.propertyTypes.all}</option>
                  <option value="condo">{currentContent.propertyTypes.condo}</option>
                  <option value="house">{currentContent.propertyTypes.house}</option>
                  <option value="townhouse">{currentContent.propertyTypes.townhouse}</option>
                </select>
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  {currentContent.selectTimeframe}
                </label>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                >
                  <option value="">{currentContent.selectTimeframe}</option>
                  <option value="3m">{currentContent.timeframes['3m']}</option>
                  <option value="6m">{currentContent.timeframes['6m']}</option>
                  <option value="1y">{currentContent.timeframes['1y']}</option>
                  <option value="2y">{currentContent.timeframes['2y']}</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>
                  {isLoading ? 'Loading...' : currentContent.viewTrends}
                </span>
              </button>
            </form>
          ) : (
            /* Results */
            <div className="space-y-8">
              {/* Market Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentContent.marketOverview}
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-blue-600 font-medium mb-2">{currentContent.priceIndex}</p>
                    <p className="text-2xl font-bold text-blue-800">{mockData.priceIndex}</p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-green-600 font-medium mb-2">{currentContent.averagePrice}</p>
                    <p className="text-2xl font-bold text-green-800">฿{formatPrice(mockData.averagePrice)}</p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-purple-600 font-medium mb-2">{currentContent.totalTransactions}</p>
                    <p className="text-2xl font-bold text-purple-800">{formatPrice(mockData.totalTransactions)}</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm text-orange-600 font-medium mb-2">{currentContent.priceChange}</p>
                    <p className="text-2xl font-bold text-orange-800">+{mockData.priceChange}%</p>
                  </div>
                </div>
              </div>

              {/* Monthly Trends Chart */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {currentContent.monthlyTrends}
                </h3>
                <div className="space-y-4">
                  {mockData.monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-gray-700">{data.month}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">฿{formatPrice(data.price)}</p>
                          <p className="text-sm text-gray-600">{data.transactions} transactions</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-green-600 font-medium">
                          +{((data.price / mockData.monthlyData[0].price - 1) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Areas */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {currentContent.topAreas}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockData.topAreas.map((area, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{area.name}</p>
                        <p className="text-sm text-gray-600">฿{formatPrice(area.avgPrice)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-medium">+{area.change}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back to Form Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowResults(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {language === 'th' ? 'ค้นหาใหม่' : 'New Search'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsForm;