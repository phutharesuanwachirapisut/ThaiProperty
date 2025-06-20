import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowLeft, Crown, Loader2 } from 'lucide-react';

interface SubscriptionSuccessPageProps {
  language: 'th' | 'en';
  onBack: () => void;
}

const content = {
  th: {
    title: 'การสมัครสมาชิกสำเร็จ!',
    subtitle: 'ขอบคุณที่เลือกใช้ ThaiPropertyAI',
    message: 'การสมัครสมาชิกของคุณได้รับการยืนยันแล้ว คุณสามารถเข้าใช้งานฟีเจอร์พรีเมียมทั้งหมดได้แล้ว',
    backToApp: 'กลับสู่แอปพลิเคชัน',
    processing: 'กำลังประมวลผลการสมัครสมาชิก...',
    features: 'คุณสมบัติที่ปลดล็อกแล้ว',
    featureList: [
      'การทำนายราคาด้วย AI ขั้นสูง',
      'การวิเคราะห์แนวโน้มตลาด',
      'การเปรียบเทียบอสังหาริมทรัพย์',
      'การพยากรณ์ราคาในอนาคต',
      'การประเมินมูลค่าทรัพย์สิน'
    ]
  },
  en: {
    title: 'Subscription Successful!',
    subtitle: 'Thank you for choosing ThaiPropertyAI',
    message: 'Your subscription has been confirmed. You now have access to all premium features.',
    backToApp: 'Back to Application',
    processing: 'Processing your subscription...',
    features: 'Unlocked Features',
    featureList: [
      'Advanced AI Price Prediction',
      'Market Trends Analysis',
      'Property Comparison',
      'Future Price Forecasting',
      'Property Valuation'
    ]
  }
};

const SubscriptionSuccessPage: React.FC<SubscriptionSuccessPageProps> = ({ language, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(true);
  const currentContent = content[language];

  useEffect(() => {
    // Simulate processing time for subscription activation
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {currentContent.processing}
          </h1>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {currentContent.subtitle}
          </p>
          <p className="text-gray-700 leading-relaxed">
            {currentContent.message}
          </p>
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">
              {currentContent.features}
            </h2>
          </div>
          <ul className="space-y-3">
            {currentContent.featureList.map((feature, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{currentContent.backToApp}</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;