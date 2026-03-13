import { BookA, History, Keyboard, ShieldAlert } from 'lucide-react';
import TankriKeyboard from '../components/TankriKeyboard';
import './Tankri.css';

export default function Tankri() {
  return (
    <div className="tankri-page">
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

        <div className="tankri-content-grid">
          <div className="tankri-info fade-in-up fade-in-up-delay-1">
            <section>
              <h2><History size={24} /> A Rich History</h2>
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

            <section>
              <h2><ShieldAlert size={24} /> Decline and Preservation</h2>
              <p>
                Following independence, Devanagari was adopted as the official writing system for Himachal Pradesh 
                in 1948. This marked the beginning of a rapid decline for Tankri. Today, many historical documents 
                and temple inscriptions in Mandi remain undeciphered because the script has fallen out of common use.
              </p>
              <p>
                Recently, there has been a resurgence in preservation efforts. In 2012, Tankri was added to the 
                Unicode Standard (U+11680–U+116CF). Local organizations and educational institutions in Mandi 
                are now conducting workshops to teach the script to younger generations, ensuring our "heart language" 
                retains its historical written form.
              </p>
            </section>
          </div>

          <div className="tankri-interactive fade-in-up fade-in-up-delay-2">
            <div className="interactive-header">
              <h3><Keyboard size={22} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Interactive Keyboard</h3>
              <p>
                Try typing in Tankri using the Unicode keyboard below. You can compose messages and copy them to your clipboard.
              </p>
            </div>
            
            <TankriKeyboard />
          </div>
        </div>
      </div>
    </div>
  );
}
