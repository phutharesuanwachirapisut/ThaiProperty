import React, { useState } from 'react';
import { ArrowLeft, Plus, X, MapPin, Home, TrendingUp, TrendingDown } from 'lucide-react';

interface ComparisonPageProps {
  language: 'th' | 'en';
  onBack: () => void;
}

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  pricePerSqm: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

const content = {
  th: {
    title: 'เปรียบเทียบอสังหาริมทรัพย์',
    subtitle: 'เปรียบเทียบราคาและคุณสมบัติของทรัพย์สินหลายแห่ง',
    addProperty: 'เพิ่มทรัพย์สิน',
    propertyName: 'ชื่อทรัพย์สิน',
    propertyType: 'ประเภท',
    location: 'ที่ตั้ง',
    price: 'ราคา',
    area: 'พื้นที่',
    bedrooms: 'ห้องนอน',
    bathrooms: 'ห้องน้ำ',
    pricePerSqm: 'ราคาต่อตร.ม.',
    trend: 'แนวโน้ม',
    compare: 'เปรียบเทียบ',
    back: 'กลับ',
    remove: 'ลบ',
    noProperties: 'ยังไม่มีทรัพย์สินในการเปรียบเทียบ',
    addFirst: 'เพิ่มทรัพย์สินแรกเพื่อเริ่มเปรียบเทียบ',
    comparison: 'ผลการเปรียบเทียบ',
    cheapest: 'ราคาถูกที่สุด',
    mostExpensive: 'ราคาแพงที่สุด',
    bestValue: 'คุ้มค่าที่สุด',
    largest: 'ใหญ่ที่สุด'
  },
  en: {
    title: 'Property Comparison',
    subtitle: 'Compare prices and features of multiple properties',
    addProperty: 'Add Property',
    propertyName: 'Property Name',
    propertyType: 'Type',
    location: 'Location',
    price: 'Price',
    area: 'Area',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    pricePerSqm: 'Price per sqm',
    trend: 'Trend',
    compare: 'Compare',
    back: 'Back',
    remove: 'Remove',
    noProperties: 'No properties to compare yet',
    addFirst: 'Add your first property to start comparing',
    comparison: 'Comparison Results',
    cheapest: 'Cheapest',
    mostExpensive: 'Most Expensive',
    bestValue: 'Best Value',
    largest: 'Largest'
  }
};

const ComparisonPage: React.FC<ComparisonPageProps> = ({ language, onBack }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    type: '',
    location: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: ''
  });

  const currentContent = content[language];

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newProperty.price);
    const area = parseFloat(newProperty.area);
    
    const property: Property = {
      id: Date.now().toString(),
      name: newProperty.name,
      type: newProperty.type,
      location: newProperty.location,
      price: price,
      area: area,
      bedrooms: parseInt(newProperty.bedrooms),
      bathrooms: parseInt(newProperty.bathrooms),
      pricePerSqm: price / area,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trendPercent: Math.random() * 10 + 1
    };

    setProperties([...properties, property]);
    setNewProperty({
      name: '',
      type: '',
      location: '',
      price: '',
      area: '',
      bedrooms: '',
      bathrooms: ''
    });
    setShowAddForm(false);
  };

  const removeProperty = (id: string) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH').format(price);
  };

  const getComparisons = () => {
    if (properties.length === 0) return null;

    const cheapest = properties.reduce((min, p) => p.price < min.price ? p : min);
    const mostExpensive = properties.reduce((max, p) => p.price > max.price ? p : max);
    const bestValue = properties.reduce((best, p) => p.pricePerSqm < best.pricePerSqm ? p : best);
    const largest = properties.reduce((big, p) => p.area > big.area ? p : big);

    return { cheapest, mostExpensive, bestValue, largest };
  };

  const comparisons = getComparisons();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{currentContent.back}</span>
          </button>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{currentContent.addProperty}</span>
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

          {/* Add Property Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{currentContent.addProperty}</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddProperty} className="space-y-4">
                  <input
                    type="text"
                    placeholder={currentContent.propertyName}
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                  
                  <select
                    value={newProperty.type}
                    onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  >
                    <option value="">{currentContent.propertyType}</option>
                    <option value="condo">Condominium</option>
                    <option value="house">House</option>
                    <option value="townhouse">Townhouse</option>
                  </select>

                  <input
                    type="text"
                    placeholder={currentContent.location}
                    value={newProperty.location}
                    onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder={`${currentContent.price} (THB)`}
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                    <input
                      type="number"
                      placeholder={`${currentContent.area} (sqm)`}
                      value={newProperty.area}
                      onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder={currentContent.bedrooms}
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                    <input
                      type="number"
                      placeholder={currentContent.bathrooms}
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {currentContent.addProperty}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Properties List */}
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {currentContent.noProperties}
              </h3>
              <p className="text-gray-500 mb-6">
                {currentContent.addFirst}
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {currentContent.addProperty}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Comparison Results */}
              {comparisons && (
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {currentContent.comparison}
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-green-100 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-600 font-medium">{currentContent.cheapest}</p>
                      <p className="font-bold text-green-800">{comparisons.cheapest.name}</p>
                      <p className="text-sm text-green-600">฿{formatPrice(comparisons.cheapest.price)}</p>
                    </div>
                    <div className="bg-red-100 rounded-lg p-4 text-center">
                      <p className="text-sm text-red-600 font-medium">{currentContent.mostExpensive}</p>
                      <p className="font-bold text-red-800">{comparisons.mostExpensive.name}</p>
                      <p className="text-sm text-red-600">฿{formatPrice(comparisons.mostExpensive.price)}</p>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-4 text-center">
                      <p className="text-sm text-blue-600 font-medium">{currentContent.bestValue}</p>
                      <p className="font-bold text-blue-800">{comparisons.bestValue.name}</p>
                      <p className="text-sm text-blue-600">฿{formatPrice(comparisons.bestValue.pricePerSqm)}/sqm</p>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-4 text-center">
                      <p className="text-sm text-purple-600 font-medium">{currentContent.largest}</p>
                      <p className="font-bold text-purple-800">{comparisons.largest.name}</p>
                      <p className="text-sm text-purple-600">{comparisons.largest.area} sqm</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Properties Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.propertyName}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.propertyType}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.location}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.price}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.area}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.pricePerSqm}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">{currentContent.trend}</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr key={property.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-semibold text-gray-900">{property.name}</p>
                            <p className="text-sm text-gray-600">{property.bedrooms}BR • {property.bathrooms}BA</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 capitalize">{property.type}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-1 text-gray-700">
                            <MapPin className="w-4 h-4" />
                            <span>{property.location}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-900">฿{formatPrice(property.price)}</td>
                        <td className="py-4 px-4 text-gray-700">{property.area} sqm</td>
                        <td className="py-4 px-4 text-gray-700">฿{formatPrice(property.pricePerSqm)}</td>
                        <td className="py-4 px-4">
                          <div className={`flex items-center space-x-1 ${property.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {property.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span className="text-sm font-medium">{property.trendPercent.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => removeProperty(property.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;