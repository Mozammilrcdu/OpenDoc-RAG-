import React, { useRef, useState } from 'react';
import {
  FileText,
  Upload,
  MessageCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Menu,
  X,
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToChat }) => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setMobileMenuOpen(false);
  };

  const features = [
    {
      icon: FileText,
      title: 'PDF Processing',
      description: 'Advanced text extraction from any PDF document',
    },
    {
      icon: MessageCircle,
      title: 'AI Chat',
      description: 'Natural conversation about your document content',
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get insights and answers in seconds',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your documents stay private and secure',
    },
    {
      icon: Clock,
      title: 'Fast',
      description: 'Lightning-fast processing and responses',
    },
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Simple drag-and-drop interface',
    },
  ];

  return (
    <div className="min-h-screen bg-vintage-white overflow-hidden">
         {/* Enhanced Aesthetic Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Diagonal Lines - More and varied */}
                <div className="absolute top-16 left-8 w-20 h-px bg-vintage-gray-300 rotate-45 opacity-50 animate-fade-in"></div>
                <div className="absolute top-24 right-16 w-28 h-px bg-vintage-gray-300 -rotate-45 opacity-40 animate-fade-in animation-delay-200"></div>
                <div className="absolute top-40 left-1/4 w-16 h-px bg-vintage-gray-300 rotate-12 opacity-35 animate-fade-in animation-delay-300"></div>
                <div className="absolute bottom-32 left-16 w-24 h-px bg-vintage-gray-300 rotate-12 opacity-45 animate-fade-in animation-delay-500"></div>
                <div className="absolute bottom-48 right-12 w-32 h-px bg-vintage-gray-300 -rotate-12 opacity-40 animate-fade-in animation-delay-700"></div>
                <div className="absolute top-1/2 right-1/4 w-18 h-px bg-vintage-gray-300 rotate-75 opacity-30 animate-fade-in animation-delay-1000"></div>
                <div className="absolute top-3/4 left-1/3 w-22 h-px bg-vintage-gray-300 -rotate-30 opacity-35 animate-fade-in animation-delay-500"></div>

                {/* Horizontal Flowing Lines */}
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-vintage-gray-300 to-transparent opacity-20 animate-fade-in animation-delay-300"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-vintage-gray-300 to-transparent opacity-15 animate-fade-in animation-delay-700"></div>

                {/* Dotted Lines - Enhanced patterns */}
                <div className="absolute top-1/4 left-1/4 flex space-x-1 animate-fade-in animation-delay-500">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-25"
                            style={{ animationDelay: `${i * 0.08}s` }}></div>
                    ))}
                </div>
                <div className="absolute top-2/3 right-1/4 flex space-x-1 animate-fade-in animation-delay-700">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-20"
                            style={{ animationDelay: `${i * 0.12}s` }}></div>
                    ))}
                </div>
                <div className="absolute top-1/2 left-8 flex space-x-1 rotate-90 animate-fade-in animation-delay-300">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-30"></div>
                    ))}
                </div>

                {/* Vertical Dotted Lines */}
                <div className="absolute top-1/3 left-1/2 flex flex-col space-y-1 animate-fade-in animation-delay-500">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-15"></div>
                    ))}
                </div>
                <div className="absolute top-1/4 right-1/3 flex flex-col space-y-1 animate-fade-in animation-delay-700">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-25"></div>
                    ))}
                </div>

                {/* Corner and Scattered Decorative Elements */}
                <div className="absolute top-20 right-20 w-8 h-8 border border-vintage-gray-300 rounded-full opacity-25 animate-vintage-pulse"></div>
                <div className="absolute bottom-24 left-20 w-6 h-6 border border-vintage-gray-300 rotate-45 opacity-20 animate-vintage-pulse animation-delay-300"></div>
                <div className="absolute top-1/2 left-16 w-4 h-4 bg-vintage-gray-300 rotate-45 opacity-15 animate-vintage-pulse animation-delay-500"></div>
                <div className="absolute bottom-1/3 right-24 w-10 h-10 border-2 border-vintage-gray-300 opacity-20 animate-vintage-pulse animation-delay-700"></div>

                {/* Flowing Curves (using CSS transforms) */}
                <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-vintage-gray-300 to-transparent opacity-20 transform rotate-12 animate-fade-in animation-delay-1000"></div>
                <div className="absolute bottom-0 right-1/3 w-1 h-24 bg-gradient-to-t from-transparent via-vintage-gray-300 to-transparent opacity-15 transform -rotate-12 animate-fade-in animation-delay-1000"></div>
            </div>
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-3 border-b border-vintage-gray-200 bg-vintage-white/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-vintage-black rounded-md flex items-center justify-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-vintage-white" />
            </div>
            <span className="text-lg sm:text-xl font-display font-semibold tracking-vintage">
              OpenDoc
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-4">
            <button onClick={scrollToFeatures} className="nav-link text-sm">
              Features
            </button>
            <button onClick={scrollToFeatures} className="nav-link text-sm">
              About
            </button>
            <button
              onClick={onNavigateToChat}
              className="btn-primary text-sm px-4 py-1.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="sm:hidden p-2 rounded-lg border border-vintage-gray-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-3 border-t border-vintage-gray-200 bg-vintage-white">
            <div className="flex flex-col space-y-3 px-4 py-4">
              <button
                onClick={scrollToFeatures}
                className="text-left nav-link text-sm"
              >
                Features
              </button>
              <button
                onClick={scrollToFeatures}
                className="text-left nav-link text-sm"
              >
                About
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateToChat();
                }}
                className="btn-primary text-sm w-full py-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-vintage">
            Chat with your<br /><span>documents </span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-vintage-gray-700">in seconds</span>
          </h1>

          {/* Enhanced decorative elements around hero */}
            <div className="relative py-4 sm:py-6">
                <div className="decorative-line w-16 sm:w-20 md:w-24 mx-auto animate-fade-in animation-delay-300"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-40"></div>
                        <div className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-60"></div>
                        <div className="w-1 h-1 bg-vintage-gray-400 rounded-full opacity-40"></div>
                    </div>
                </div>
            </div>


          <p className="text-base sm:text-lg md:text-xl text-vintage-gray-600 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200 px-4 sm:px-0">
            Upload any PDF and start chatting. Get instant answers, summaries, and insights without reading through hundreds of pages.
        </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToChat}
              className="btn-primary px-6 py-3 flex items-center space-x-2"
            >
              <span>Start Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToFeatures}
              className="btn-outline px-6 py-3"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Divider - Responsive */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-4">
                    <div className="decorative-line flex-1"></div>
                    <div className="decorative-dots"></div>
                    <div className="decorative-line flex-1"></div>
                </div>
            </div>
        </div>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-vintage">
              Everything You Need
            </h2>
            <p className="mt-3 text-vintage-gray-600 max-w-2xl mx-auto">
              Powerful AI meets elegant design. Process documents faster than
              ever before.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card-feature group">
              <div className="flex items-start space-x-4">
                <div className="w-9 h-9 bg-vintage-gray-100 rounded-lg flex items-center justify-center
                                transition-colors duration-300 group-hover:bg-vintage-black">
                  <feature.icon
                    className="w-4 h-4 text-vintage-gray-600
                               transition-colors duration-300 group-hover:text-vintage-white"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-vintage-black">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-vintage-gray-600 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-vintage-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold tracking-vintage">
            Stop Reading. Start Asking.
          </h2>
          <p className="mt-4 text-vintage-gray-600">
            Upload a PDF and let AI do the reading for you.
          </p>

          <div className="mt-6">
            <button
              onClick={onNavigateToChat}
              className="btn-primary px-8 py-3 inline-flex items-center space-x-2"
            >
              <span>Start Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-vintage-gray-200 bg-vintage-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-vintage-black rounded flex items-center justify-center">
                <FileText className="w-3 h-3 text-vintage-white" />
              </div>
              <span className="font-display font-medium text-vintage-black">
                OpenDoc
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-vintage-gray-600 text-center">
              <span>AI-Powered PDF Analysis</span>
              <span className="hidden sm:inline">•</span>
              <span>Built by Mozammil</span>
              <span className="hidden sm:inline">•</span>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;