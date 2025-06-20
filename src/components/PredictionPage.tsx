import React, { useState } from 'react';
import { ArrowLeft, MapPin, Home, Bed, Bath, Car, Calculator } from 'lucide-react';

interface PredictionPageProps {
  language: 'th' | 'en';
  onBack: () => void;
}

const content = {
  th: {
    title: 'ทำนายราคาอสังหาริมทรัพย์',
    subtitle: 'กรอกข้อมูลทรัพย์สินเพื่อประเมินราคา',
    propertyType: 'ประเภททรัพย์สิน',
    location: 'ที่ตั้ง',
    area: 'พื้นที่ (ตร.ม.)',
    bedrooms: 'ห้องนอน',
    bathrooms: 'ห้องน้ำ',
    parking: 'ที่จอดรถ',
    age: 'อายุอาคาร (ปี)',
    floor: 'ชั้น',
    predictButton: 'ทำนายราคา',
    back: 'กลับ',
    result: 'ผลการทำนาย',
    estimatedPrice: 'ราคาประเมิน',
    priceRange: 'ช่วงราคา',
    confidence: 'ความเชื่อมั่น',
    factors: 'ปัจจัยที่มีผลต่อราคา',
    locationFactor: 'ที่ตั้ง',
    sizeFactor: 'ขนาด',
    ageFactor: 'อายุอาคาร',
    amenitiesFactor: 'สิ่งอำนวยความสะดวก',
    propertyTypes: {
      condo: 'คอนโดมิเนียม',
      house: 'บ้านเดี่ยว',
      townhouse: 'ทาวน์เฮาส์',
      apartment: 'อพาร์ทเมนท์'
    },
    provinces: {
      bangkok: 'กรุงเทพมหานคร',
      nonthaburi: 'นนทบุรี',
      pathum_thani: 'ปทุมธานี',
      samut_prakan: 'สมุทรปราการ',
      chiang_mai: 'เชียงใหม่',
      phuket: 'ภูเก็ต'
    }
  },
  en: {
    title: 'Property Price Prediction',
    subtitle: 'Enter property details to get price estimation',
    propertyType: 'Property Type',
    location: 'Location',
    area: 'Area (sqm)',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    parking: 'Parking Spaces',
    age: 'Building Age (years)',
    floor: 'Floor',
    predictButton: 'Predict Price',
    back: 'Back',
    result: 'Prediction Result',
    estimatedPrice: 'Estimated Price',
    priceRange: 'Price Range',
    confidence: 'Confidence',
    factors: 'Price Factors',
    locationFactor: 'Location',
    sizeFactor: 'Size',
    ageFactor: 'Building Age',
    amenitiesFactor: 'Amenities',
    propertyTypes: {
      condo: 'Condominium',
      house: 'House',
      townhouse: 'Townhouse',
      apartment: 'Apartment'
    },
    provinces: {
      bangkok: 'Bangkok',
      nonthaburi: 'Nonthaburi',
      pathum_thani: 'Pathum Thani',
      samut_prakan: 'Samut Prakan',
      chiang_mai: 'Chiang Mai',
      phuket: 'Phuket'
    }
  }
};

const PredictionPage: React.FC<PredictionPageProps> = ({ language, onBack }) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    age: '',
    floor: ''
  });
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentContent = content[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI prediction
    setTimeout(() => {
      const basePrice = Math.random() * 10000000 + 2000000; // 2M - 12M THB
      const confidence = Math.random() * 20 + 80; // 80-100%
      
      setPrediction({
        estimatedPrice: basePrice,
        priceRange: {
          min: basePrice * 0.9,
          max: basePrice * 1.1
        },
        confidence: confidence,
        factors: {
          location: Math.random() * 40 + 20,
          size: Math.random() * 30 + 15,
          age: Math.random() * 20 + 10,
          amenities: Math.random() * 15 + 5
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(Math.round(price));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <form onSubmit={handlePredict} className="space-y-6">
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
                    <option value="condo">{currentContent.propertyTypes.condo}</option>
                    <option value="house">{currentContent.propertyTypes.house}</option>
                    <option value="townhouse">{currentContent.propertyTypes.townhouse}</option>
                    <option value="apartment">{currentContent.propertyTypes.apartment}</option>
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
                    <option value="bangkok">{currentContent.provinces.bangkok}</option>
                    <option value="nonthaburi">{currentContent.provinces.nonthaburi}</option>
                    <option value="pathum_thani">{currentContent.provinces.pathum_thani}</option>
                    <option value="samut_prakan">{currentContent.provinces.samut_prakan}</option>
                    <option value="chiang_mai">{currentContent.provinces.chiang_mai}</option>
                    <option value="phuket">{currentContent.provinces.phuket}</option>
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {currentContent.area}
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="e.g., 50"
                    required
                  />
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Bed className="w-4 h-4 inline mr-2" />
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Bath className="w-4 h-4 inline mr-2" />
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
                </div>

                {/* Parking & Age */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Car className="w-4 h-4 inline mr-2" />
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
                </div>

                {/* Floor */}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>
                    {isLoading ? 'Analyzing...' : currentContent.predictButton}
                  </span>
                </button>
              </form>
            </div>

            {/* Results */}
            <div>
              {prediction ? (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {currentContent.result}
                  </h3>

                  {/* Price */}
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        {currentContent.estimatedPrice}
                      </p>
                      <p className="text-3xl font-bold text-black mb-4">
                        ฿{formatPrice(prediction.estimatedPrice)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {currentContent.priceRange}: ฿{formatPrice(prediction.priceRange.min)} - ฿{formatPrice(prediction.priceRange.max)}
                      </p>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="bg-white rounded-lg p-6 mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {currentContent.confidence}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-600 mt-1">
                      {Math.round(prediction.confidence)}%
                    </p>
                  </div>

                  {/* Factors */}
                  <div className="bg-white rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {currentContent.factors}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{currentContent.locationFactor}</span>
                        <span className="text-sm font-medium">{Math.round(prediction.factors.location)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{currentContent.sizeFactor}</span>
                        <span className="text-sm font-medium">{Math.round(prediction.factors.size)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{currentContent.ageFactor}</span>
                        <span className="text-sm font-medium">{Math.round(prediction.factors.age)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{currentContent.amenitiesFactor}</span>
                        <span className="text-sm font-medium">{Math.round(prediction.factors.amenities)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6 text-center">
                  <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'th' 
                      ? 'กรอกข้อมูลและกดทำนายราคาเพื่อดูผลลัพธ์'
                      : 'Fill in the form and click predict to see results'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;