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
            Chat with your <br />
            <span className="text-vintage-gray-700">documents in seconds</span>
          </h1>

          <p className="mt-6 text-lg text-vintage-gray-600 max-w-2xl mx-auto">
            Upload any PDF and start chatting. Get instant answers, summaries,
            and insights without reading hundreds of pages.
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
              <div key={index} className="card-feature">
                <div className="flex items-start space-x-4">
                  <div className="w-9 h-9 bg-vintage-gray-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-vintage-gray-600" />
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