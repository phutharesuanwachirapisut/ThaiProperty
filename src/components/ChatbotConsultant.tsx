import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, MessageCircle, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface ChatbotConsultantProps {
  language: 'th' | 'en';
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const content = {
  th: {
    title: 'ที่ปรึกษาอสังหาริมทรัพย์ AI',
    subtitle: 'สอบถามเกี่ยวกับตลาดอสังหาริมทรัพย์และรับคำแนะนำจากผู้เชี่ยวชาญ AI',
    placeholder: 'พิมพ์คำถามของคุณเกี่ยวกับอสังหาริมทรัพย์...',
    back: 'กลับ',
    typing: 'กำลังพิมพ์...',
    welcomeMessage: 'สวัสดีครับ! ผมเป็นที่ปรึกษาอสังหาริมทรัพย์ AI ของ ThaiPropertyAI ผมพร้อมช่วยตอบคำถามเกี่ยวกับตลาดอสังหาริมทรัพย์ไทย การลงทุน และให้คำแนะนำที่เหมาะสมกับคุณ มีอะไรให้ช่วยไหมครับ?',
    suggestions: [
      'ราคาคอนโดในกรุงเทพฯ มีแนวโน้มอย่างไร?',
      'ควรลงทุนอสังหาริมทรัพย์ที่ไหนดี?',
      'ปัจจัยอะไรที่ส่งผลต่อราคาบ้าน?',
      'วิธีประเมินมูลค่าทรัพย์สิน?'
    ]
  },
  en: {
    title: 'AI Property Consultant',
    subtitle: 'Ask questions about the property market and get expert advice from our AI consultant',
    placeholder: 'Type your property-related question...',
    back: 'Back',
    typing: 'Typing...',
    welcomeMessage: 'Hello! I\'m your AI Property Consultant from ThaiPropertyAI. I\'m here to help answer questions about the Thai property market, investments, and provide personalized recommendations. How can I assist you today?',
    suggestions: [
      'What are the condo price trends in Bangkok?',
      'Where should I invest in real estate?',
      'What factors affect property prices?',
      'How to evaluate property value?'
    ]
  }
};

const ChatbotConsultant: React.FC<ChatbotConsultantProps> = ({ language, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentContent = content[language];

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: currentContent.welcomeMessage,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('ราคา') || lowerMessage.includes('price')) {
      return language === 'th' 
        ? 'ราคาอสังหาริมทรัพย์ขึ้นอยู่กับหลายปัจจัย เช่น ทำเล สิ่งอำนวยความสะดวก และสภาพตลาด ในกรุงเทพฯ ราคาคอนโดเฉลี่ยอยู่ที่ 100,000-200,000 บาทต่อตารางเมตร ขึ้นอยู่กับย่าน คุณสนใจพื้นที่ไหนเป็นพิเศษไหมครับ?'
        : 'Property prices depend on various factors such as location, amenities, and market conditions. In Bangkok, average condo prices range from 100,000-200,000 THB per square meter depending on the district. Are you interested in any specific area?';
    }
    
    if (lowerMessage.includes('ลงทุน') || lowerMessage.includes('invest')) {
      return language === 'th'
        ? 'การลงทุนอสังหาริมทรัพย์ควรพิจารณา: 1) ทำเลที่มีศักยภาพเติบโต 2) การเข้าถึงระบบขนส่งสาธารณะ 3) สิ่งอำนวยความสะดวกในย่าน 4) แผนพัฒนาเมืองในอนาคต พื้นที่ที่น่าสนใจ เช่น สุขุมวิท อโศก สาทร และย่านใหม่ๆ ที่มีรถไฟฟ้าผ่าน'
        : 'Real estate investment should consider: 1) Areas with growth potential 2) Public transportation access 3) Local amenities 4) Future urban development plans. Interesting areas include Sukhumvit, Asoke, Sathorn, and new districts with BTS/MRT access.';
    }
    
    if (lowerMessage.includes('ปัจจัย') || lowerMessage.includes('factor')) {
      return language === 'th'
        ? 'ปัจจัยหลักที่ส่งผลต่อราคาอสังหาริมทรัพย์: 1) ทำเล (Location) 2) การเข้าถึงระบบขนส่ง 3) สิ่งอำนวยความสะดวก 4) อุปสงค์และอุปทาน 5) นโยบายรัฐบาล 6) อัตราดอกเบี้ย 7) สภาพเศรษฐกิจโดยรวม'
        : 'Key factors affecting property prices: 1) Location 2) Transportation access 3) Amenities 4) Supply and demand 5) Government policies 6) Interest rates 7) Overall economic conditions';
    }
    
    if (lowerMessage.includes('ประเมิน') || lowerMessage.includes('evaluate') || lowerMessage.includes('valuation')) {
      return language === 'th'
        ? 'การประเมินมูลค่าทรัพย์สินสามารถทำได้หลายวิธี: 1) เปรียบเทียบราคาตลาด (Market Comparison) 2) วิธีต้นทุน (Cost Approach) 3) วิธีรายได้ (Income Approach) แนะนำให้ใช้เครื่องมือ AI ของเราในหน้า "ทำนายราคา" เพื่อผลลัพธ์ที่แม่นยำยิ่งขึ้น'
        : 'Property valuation can be done through: 1) Market Comparison Approach 2) Cost Approach 3) Income Approach. I recommend using our AI tools in the "Price Prediction" section for more accurate results.';
    }
    
    // Default response
    return language === 'th'
      ? 'ขอบคุณสำหรับคำถามครับ ผมแนะนำให้ใช้เครื่องมือต่างๆ ของ ThaiPropertyAI เช่น การทำนายราคา การวิเคราะห์แนวโน้มตลาด หรือการเปรียบเทียบอสังหาริมทรัพย์ เพื่อข้อมูลที่ละเอียดและแม่นยำยิ่งขึ้น มีคำถามอื่นไหมครับ?'
      : 'Thank you for your question. I recommend using ThaiPropertyAI\'s various tools such as Price Prediction, Market Trends Analysis, or Property Comparison for more detailed and accurate information. Do you have any other questions?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{currentContent.back}</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{currentContent.title}</h1>
                <p className="text-sm text-gray-600">Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentContent.title}</h2>
                <p className="text-blue-100">{currentContent.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100% - 200px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gray-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <p className="text-sm text-gray-500">{currentContent.typing}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (only show when no messages except welcome) */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-600">
                  {language === 'th' ? 'คำถามที่แนะนำ' : 'Suggested Questions'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentContent.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentContent.placeholder}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotConsultant;