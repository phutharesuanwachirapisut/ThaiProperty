import React, { useState } from 'react';
import { ArrowLeft, Crown, MapPin, Home, Calculator, TrendingUp, Award, Star } from 'lucide-react';

interface PropertyValuationPageProps {
  language: 'th' | 'en';
  onBack: () => void;
}

const content = {
  th: {
    title: 'ประเมินมูลค่าทรัพย์สิน',
    subtitle: 'ประเมินมูลค่าทรัพย์สินแบบครอบคลุมด้วย AI ขั้นสูง',
    propertyDetails: 'รายละเอียดทรัพย์สิน',
    propertyType: 'ประเภททรัพย์สิน',
    location: 'ที่ตั้ง',
    area: 'พื้นที่ (ตร.ม.)',
    bedrooms: 'ห้องนอน',
    bathrooms: 'ห้องน้ำ',
    parking: 'ที่จอดรถ',
    age: 'อายุอาคาร (ปี)',
    floor: 'ชั้น',
    condition: 'สภาพทรัพย์สิน',
    amenities: 'สิ่งอำนวยความสะดวก',
    valuateButton: 'ประเมินมูลค่า',
    back: 'กลับ',
    valuationResult: 'ผลการประเมินมูลค่า',
    marketValue: 'มูลค่าตลาด',
    rentValue: 'มูลค่าเช่า',
    investmentScore: 'คะแนนการลงทุน',
    liquidityScore: 'คะแนนสภาพคล่อง',
    appreciation: 'การเพิ่มมูลค่า',
    riskLevel: 'ระดับความเสี่ยง',
    recommendation: 'คำแนะนำ',
    conditions: {
      excellent: 'ดีเยี่ยม',
      good: 'ดี',
      fair: 'พอใช้',
      poor: 'ต้องปรับปรุง'
    },
    amenitiesList: {
      pool: 'สระว่ายน้ำ',
      gym: 'ฟิตเนส',
      security: 'รปภ. 24 ชม.',
      parking: 'ที่จอดรถ',
      garden: 'สวน',
      playground: 'สนามเด็กเล่น'
    },
    riskLevels: {
      low: 'ต่ำ',
      medium: 'ปานกลาง',
      high: 'สูง'
    }
  },
  en: {
    title: 'Property Valuation',
    subtitle: 'Comprehensive property valuation with advanced AI',
    propertyDetails: 'Property Details',
    propertyType: 'Property Type',
    location: 'Location',
    area: 'Areaaa (sqm)',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    parking: 'Parking Spaces',
    age: 'Building Age (years)',
    floor: 'Floor',
    condition: 'Property Condition',
    amenities: 'Amenities',
    valuateButton: 'Get Valuation',
    back: 'Back',
    valuationResult: 'Valuation Result',
    marketValue: 'Market Value',
    rentValue: 'Rental Value',
    investmentScore: 'Investment Score',
    liquidityScore: 'Liquidity Score',
    appreciation: 'Appreciation Potential',
    riskLevel: 'Risk Level',
    recommendation: 'Recommendation',
    conditions: {
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Needs Improvement'
    },
    amenitiesList: {
      pool: 'Swimming Pool',
      gym: 'Fitness Center',
      security: '24/7 Security',
      parking: 'Parking',
      garden: 'Garden',
      playground: 'Playground'
    },
    riskLevels: {
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    }
  }
};

const PropertyValuationPage: React.FC<PropertyValuationPageProps> = ({ language, onBack }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    age: '',
    floor: '',
    condition: '',
    amenities: [] as string[]
  });
  const [valuation, setValuation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentContent = content[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleValuate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate comprehensive valuation
    setTimeout(() => {
      const baseValue = Math.random() * 15000000 + 3000000; // 3M - 18M THB
      const rentValue = baseValue * 0.004; // 0.4% of market value per month
      
      setValuation({
        marketValue: baseValue,
        rentValue: rentValue,
        investmentScore: Math.random() * 30 + 70, // 70-100
        liquidityScore: Math.random() * 40 + 60, // 60-100
        appreciation: Math.random() * 15 + 5, // 5-20% annually
        riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        recommendation: Math.random() > 0.3 ? 'buy' : 'hold'
      });
      setIsLoading(false);
    }, 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(Math.round(price));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {currentContent.propertyDetails}
              </h2>
              
              <form onSubmit={handleValuate} className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="w-4 h-4 inline mr-2" />
                    {currentContent.propertyType}
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                    <MapPin className="w-4 h-4 inline mr-2" />
                    {currentContent.location}
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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

                {/* Area & Bedrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.area}
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.bedrooms}
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="2"
                      required
                    />
                  </div>
                </div>

                {/* Bathrooms & Parking */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.bathrooms}
                    </label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.parking}
                    </label>
                    <input
                      type="number"
                      value={formData.parking}
                      onChange={(e) => handleInputChange('parking', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Age & Floor */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.age}
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentContent.floor}
                    </label>
                    <input
                      type="number"
                      value={formData.floor}
                      onChange={(e) => handleInputChange('floor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="10"
                    />
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.condition}
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">{currentContent.conditions.excellent}</option>
                    <option value="good">{currentContent.conditions.good}</option>
                    <option value="fair">{currentContent.conditions.fair}</option>
                    <option value="poor">{currentContent.conditions.poor}</option>
                  </select>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {currentContent.amenities}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(currentContent.amenitiesList).map(([key, label]) => (
                      <label key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(key)}
                          onChange={(e) => handleAmenityChange(key, e.target.checked)}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>
                    {isLoading ? 'Analyzing...' : currentContent.valuateButton}
                  </span>
                </button>
              </form>
            </div>

            {/* Results */}
            <div>
              {valuation ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {currentContent.valuationResult}
                  </h2>

                  {/* Market Value */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        {currentContent.marketValue}
                      </p>
                      <p className="text-3xl font-bold text-blue-800 mb-2">
                        ฿{formatPrice(valuation.marketValue)}
                      </p>
                      <p className="text-sm text-blue-600">
                        {currentContent.rentValue}: ฿{formatPrice(valuation.rentValue)}/month
                      </p>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {currentContent.investmentScore}
                        </span>
                        <Award className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(valuation.investmentScore).split(' ')[0]} mb-2`}>
                        {Math.round(valuation.investmentScore)}/100
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getScoreColor(valuation.investmentScore).includes('green') ? 'bg-green-500' : getScoreColor(valuation.investmentScore).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${valuation.investmentScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {currentContent.liquidityScore}
                        </span>
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className={`text-2xl font-bold ${getScoreColor(valuation.liquidityScore).split(' ')[0]} mb-2`}>
                        {Math.round(valuation.liquidityScore)}/100
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getScoreColor(valuation.liquidityScore).includes('green') ? 'bg-green-500' : getScoreColor(valuation.liquidityScore).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${valuation.liquidityScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="space-y-4">
                    <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                      <span className="font-medium text-gray-700">{currentContent.appreciation}</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-bold text-green-600">
                          +{valuation.appreciation.toFixed(1)}% annually
                        </span>
                      </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4 flex items-center justify-between">
                      <span className="font-medium text-gray-700">{currentContent.riskLevel}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(valuation.riskLevel)}`}>
                        {currentContent.riskLevels[valuation.riskLevel as keyof typeof currentContent.riskLevels]}
                      </span>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium text-gray-700">{currentContent.recommendation}</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {valuation.recommendation === 'buy' 
                          ? (language === 'th' 
                              ? 'ทรัพย์สินนี้มีศักยภาพในการลงทุนที่ดี แนะนำให้พิจารณาซื้อ'
                              : 'This property shows good investment potential. Consider buying.')
                          : (language === 'th'
                              ? 'ควรรอดูสถานการณ์ตลาดก่อนตัดสินใจ'
                              : 'Consider waiting for better market conditions.')
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center h-full flex items-center justify-center">
                  <div>
                    <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === 'th' 
                        ? 'กรอกข้อมูลและกดประเมินมูลค่าเพื่อดูผลลัพธ์'
                        : 'Fill in the form and click valuate to see results'
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

export default PropertyValuationPage;