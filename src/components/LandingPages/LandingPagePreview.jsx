import { X } from 'lucide-react';

const LandingPagePreview = ({ landingPage, onClose }) => {
  if (!landingPage) return null;

  // Helper function to darken colors for gradient
  const shadeColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  };

  const bgColor = landingPage.backgroundColor || '#1f2937';
  const bgDark = shadeColor(bgColor, -20);
  const textColor = landingPage.textColor || '#ffffff';

  // Generate floating particles
  const particles = Array.from({ length: 10 }, (_, i) => {
    const size = Math.random() * 60 + 20;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 6;
    return { id: i, size, left, top, delay };
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
      <div className="min-h-screen px-4 py-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[60] bg-white text-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Preview Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-medium">Landing Page Preview</span>
            <span className="text-sm text-gray-400">{landingPage.name}</span>
          </div>

          {/* Landing Page Content */}
          <div 
            className="relative min-h-[600px] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${bgColor} 0%, ${bgDark} 100%)`,
              color: textColor
            }}
          >
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.1); opacity: 0.8; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes scaleIn {
                from { transform: scale(0); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
              @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              .landing-container {
                animation: fadeIn 0.6s ease-out;
              }
              .landing-particle {
                animation: float 6s infinite ease-in-out;
              }
              .landing-image-container {
                animation: scaleIn 0.5s ease-out 0.2s both;
              }
              .landing-image-ring {
                animation: pulse 2s infinite;
              }
              .landing-title {
                animation: slideUp 0.5s ease-out 0.3s both;
              }
              .landing-subtitle {
                animation: slideUp 0.5s ease-out 0.4s both;
              }
              .landing-description {
                animation: slideUp 0.5s ease-out 0.5s both;
              }
              .landing-button {
                animation: slideUp 0.5s ease-out 0.6s both;
              }
              .landing-section:nth-child(1) { animation: slideUp 0.5s ease-out 0.7s both; }
              .landing-section:nth-child(2) { animation: slideUp 0.5s ease-out 0.8s both; }
              .landing-section:nth-child(3) { animation: slideUp 0.5s ease-out 0.9s both; }
              .landing-section:nth-child(4) { animation: slideUp 0.5s ease-out 1s both; }
              .landing-section:nth-child(5) { animation: slideUp 0.5s ease-out 1.1s both; }
            `}</style>

            {/* Floating particles */}
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="landing-particle absolute rounded-full pointer-events-none"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  background: 'rgba(255, 255, 255, 0.1)',
                  animationDelay: `${particle.delay}s`,
                }}
              />
            ))}

            {/* Content */}
            <div className="landing-container relative z-10 min-h-[600px] p-8 flex flex-col items-center text-center">
              <div className="w-full max-w-[700px]">
                {/* Image */}
                <div className="landing-image-container w-[140px] h-[140px] mx-auto mb-8 relative">
                  <div 
                    className="landing-image-ring absolute inset-[-8px] rounded-full"
                    style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  />
                  {landingPage.image ? (
                    <img
                      src={landingPage.image}
                      alt={landingPage.title}
                      className="w-full h-full rounded-full object-cover border-4 relative z-10 shadow-2xl"
                      style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-5xl border-4 relative z-10"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      display: landingPage.image ? 'none' : 'flex'
                    }}
                  >
                    🎨
                  </div>
                </div>

                {/* Title */}
                <h1 className="landing-title text-4xl md:text-5xl font-extrabold mb-2" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
                  {landingPage.title}
                </h1>

                {/* Subtitle */}
                {landingPage.subtitle && (
                  <p className="landing-subtitle text-xl md:text-2xl font-medium mb-6 opacity-95">
                    {landingPage.subtitle}
                  </p>
                )}

                {/* Description */}
                {landingPage.description && (
                  <p className="landing-description text-base md:text-lg mb-8 opacity-90 leading-relaxed whitespace-pre-wrap">
                    {landingPage.description}
                  </p>
                )}

                {/* CTA Button */}
                {landingPage.buttonText && (
                  <a
                    href={landingPage.buttonLink}
                    className="landing-button inline-block px-12 py-4 rounded-full font-bold text-lg shadow-2xl transition-all hover:scale-105 hover:shadow-3xl relative overflow-hidden"
                    style={{
                      backgroundColor: landingPage.buttonColor || '#ffffff',
                      color: landingPage.buttonTextColor || '#000000',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10">{landingPage.buttonText}</span>
                  </a>
                )}

                {/* Sections */}
                {landingPage.sections && landingPage.sections.length > 0 && (
                  <div className="w-full mt-12 flex flex-col gap-6">
                    {landingPage.sections.map((section, idx) => (
                      <div
                        key={idx}
                        className="landing-section p-6 rounded-3xl text-left whitespace-pre-wrap shadow-xl transition-transform hover:translate-x-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {section.content}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPagePreview;
