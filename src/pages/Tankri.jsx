import { useState } from 'react';
import { BookA, History, Keyboard, ShieldAlert, Gamepad2, ChevronDown, ChevronUp } from 'lucide-react';
import TankriKeyboard from '../components/TankriKeyboard';
import TankriGame from '../components/TankriGame';
import SEOHead from '../components/SEOHead';
import './Tankri.css';

export default function Tankri() {
  const [activeTab, setActiveTab] = useState('keyboard');
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="tankri-page">
      <SEOHead
        title="Tankri Script — Type & Learn"
        description="Explore the ancient Tankri (Takri) script from Mandi. Use our interactive keyboard to type in Tankri, and learn through fun games and quizzes."
        path="/tankri"
      />
      <div className="container">
        <div className="tankri-hero fade-in-up">
          <div className="tankri-badge">
            <BookA size={16} /> Heritage Script
          </div>
          <h1><span>𑚔𑚭𑚊𑚤𑚯</span> The Tankri Script</h1>
          <p className="tankri-lead">
            Explore the ancient Tankri (or Takri) script, a vital piece of Mandi's cultural heritage. 
            Once the primary script for the Mandeali language, it is now an endangered writing system 
            that we are working to preserve and celebrate.
          </p>
        </div>

        {/* Collapsible History Section */}
        <div className="tankri-history-section fade-in-up fade-in-up-delay-1">
          <button
            className="history-toggle"
            onClick={() => setShowHistory(!showHistory)}
          >
            <div className="history-toggle-left">
              <BookA size={20} />
              <span>About the Tankri Script — History & Preservation</span>
            </div>
            {showHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showHistory && (
            <div className="tankri-history-content">
              <div className="tankri-info-grid">
                <section className="info-card">
                  <h2><History size={22} /> A Rich History</h2>
                  <p>
                    Tankri evolved from the ancient Sharada script between the 10th and 11th centuries CE. 
                    By the 16th century, it had developed into a distinct writing system used across Western 
                    Pahari languages, including our own Mandeali.
                  </p>
                  <p>
                    In Mandi, a specific styling of Tankri known as <strong>Mandiyali Tankri</strong> was widely used.
                    It was the script of everyday life—found in royal decrees, temple inscriptions, trade records, 
                    and the ledgers of local businessmen.
                  </p>
                </section>

                <section className="info-card">
                  <h2><ShieldAlert size={22} /> Decline & Preservation</h2>
                  <p>
                    Following independence, Devanagari was adopted as the official writing system for Himachal Pradesh 
                    in 1948. This marked the beginning of a rapid decline for Tankri. Today, many historical documents 
                    and temple inscriptions in Mandi remain undeciphered because the script has fallen out of common use.
                  </p>
                  <p>
                    Recently, there has been a resurgence in preservation efforts. In 2012, Tankri was added to the 
                    Unicode Standard (U+11680–U+116CF). Local organizations and educational institutions in Mandi 
                    are now conducting workshops to teach the script to younger generations.
                  </p>
                </section>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Section — full width */}
        <div className="tankri-interactive fade-in-up fade-in-up-delay-2">
          {/* Tab Navigation */}
          <div className="tankri-tabs">
            <button
              className={`tankri-tab ${activeTab === 'keyboard' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('keyboard')}
            >
              <Keyboard size={18} />
              <span>Keyboard</span>
            </button>
            <button
              className={`tankri-tab ${activeTab === 'learn' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('learn')}
            >
              <Gamepad2 size={18} />
              <span>Learn Tankri</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'keyboard' && (
              <div className="tab-panel fade-in-up">
                <div className="interactive-header">
                  <h3>Interactive Keyboard</h3>
                  <p>
                    Type in Tankri using your physical keyboard or the on-screen keys. You can compose messages and copy them to your clipboard.
                  </p>
                </div>
                <TankriKeyboard />
              </div>
            )}

            {activeTab === 'learn' && (
              <div className="tab-panel fade-in-up">
                <div className="interactive-header">
                  <h3>Learn Tankri</h3>
                  <p>
                    Practice and master the Tankri script through interactive games. Choose a game mode and start learning!
                  </p>
                </div>
                <TankriGame />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
