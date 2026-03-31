import { useState, useRef, useEffect, useCallback } from 'react';
import { Delete, Copy, CheckCheck, ChevronDown, ChevronUp } from 'lucide-react';
import './TankriKeyboard.css';

// Unicode reference:
// Independent Vowels: U+11680 (𑚀) to U+11689 (𑚉)
// Consonants: U+1168A (𑚊) to U+116AA (𑚪)
// Various Signs: Anusvara U+116AB (𑚫), Visarga U+116AC (𑚬), Virama U+116B6 (𑚶), Nukta U+116B7 (𑚷)
// Dependent Vowels: U+116AD (𑚭) to U+116B5 (𑚵)
// Digits: U+116C0 (𑛀) to U+116C9 (𑛉)

const TANKRI_CHARS = {
  vowels: [
    { char: '𑚀', label: 'a' },
    { char: '𑚁', label: 'ā' },
    { char: '𑚂', label: 'i' },
    { char: '𑚃', label: 'ī' },
    { char: '𑚄', label: 'u' },
    { char: '𑚅', label: 'ū' },
    { char: '𑚤𑚮', label: 'ṛ' },
    { char: '𑚤𑚯', label: 'ṝ' },
    { char: '𑚥𑚮', label: 'ḷ' },
    { char: '𑚥𑚯', label: 'ḹ' },
    { char: '𑚆', label: 'e' },
    { char: '𑚇', label: 'ai' },
    { char: '𑚈', label: 'o' },
    { char: '𑚉', label: 'au' },
  ],
  combiningSigns: [
    { char: '𑚭', label: 'ā' },    { char: '𑚮', label: 'i' },      { char: '𑚯', label: 'ī' },
    { char: '𑚰', label: 'u' },    { char: '𑚱', label: 'ū' },      { char: '𑚶𑚤𑚮', label: 'ṛ' },
    { char: '𑚶𑚤𑚯', label: 'ṝ' },    { char: '𑚶𑚥𑚮', label: 'ḷ' },      { char: '𑚶𑚥𑚯', label: 'ḹ' },
    { char: '𑚲', label: 'e' },    { char: '𑚳', label: 'ai' },     { char: '𑚴', label: 'o' },
    { char: '𑚵', label: 'au' },    { char: '𑚫', label: 'ṃ/m̐' },  { char: '𑚬', label: 'ḥ' },
    { char: '𑚶', label: 'virama' }
  ],
  consonants: [
    { char: '𑚊', label: 'ka' }, { char: '𑚸', label: 'kha' }, { char: '𑚌', label: 'ga' }, { char: '𑚍', label: 'gha' }, { char: '𑚎', label: 'ṅa' },
    { char: '𑚏', label: 'ca' }, { char: '𑚐', label: 'cha' }, { char: '𑚑', label: 'ja' }, { char: '𑚒', label: 'jha' }, { char: '𑚓', label: 'ña' },
    { char: '𑚔', label: 'ṭa' }, { char: '𑚕', label: 'ṭha' }, { char: '𑚖', label: 'ḍa' }, { char: '𑚗', label: 'ḍha' }, { char: '𑚘', label: 'ṇa' },
    { char: '𑚙', label: 'ta' }, { char: '𑚚', label: 'tha' }, { char: '𑚛', label: 'da' }, { char: '𑚜', label: 'dha' }, { char: '𑚝', label: 'na' },
    { char: '𑚞', label: 'pa' }, { char: '𑚟', label: 'pha' }, { char: '𑚠', label: 'ba' }, { char: '𑚡', label: 'bha' }, { char: '𑚢', label: 'ma' },
    { char: '𑚣', label: 'ya' }, { char: '𑚤', label: 'ra' }, { char: '𑚥', label: 'la' }, { char: '𑚦', label: 'va' }, { char: '𑚧', label: 'śa' },
    { char: '𑚋', label: 'ṣa' }, { char: '𑚨', label: 'sa' }, { char: '𑚩', label: 'ha' },
  ],
  southIndicConsonants: [
    { char: '𑚥𑚷', label: 'l̤a' }, { char: '𑚥𑚷', label: 'ḻa' }, { char: '𑚤𑚷', label: 'ṟa' }, { char: '𑚝𑚷', label: 'ṉa' }
  ],
  northIndicConsonants: [
    { char: '𑚊𑚷', label: 'qa' }, { char: '𑚋𑚷', label: 'k͟ha' }, { char: '𑚌𑚷', label: 'ġa' }, { char: '𑚑𑚷', label: 'za' },
    { char: '𑚪', label: 'r̤a' }, { char: '𑚗𑚷', label: 'r̤ha' }, { char: '𑚟𑚷', label: 'fa' }, { char: '𑚣𑚷', label: 'ẏa' }
  ],
  sinhalaConsonants: [
    { char: '𑚫𑚌', label: 'n̆ga' }, { char: '𑚫𑚑', label: 'n̆ja' }, { char: '𑚫𑚖', label: 'n̆ḍa' }, { char: '𑚫𑚛', label: 'n̆da' }, { char: '𑚫𑚠', label: 'm̆ba' }
  ],
  digits: [
    { char: '𑛀', label: '0' }, { char: '𑛁', label: '1' }, { char: '𑛂', label: '2' }, { char: '𑛃', label: '3' }, { char: '𑛄', label: '4' }, 
    { char: '𑛅', label: '5' }, { char: '𑛆', label: '6' }, { char: '𑛇', label: '7' }, { char: '𑛈', label: '8' }, { char: '𑛉', label: '9' }
  ],
  others: [
    { char: 'ऽ', label: '\'' }, { char: '𑚈𑚫', label: 'oṃ' }, { char: '𑚬', label: 'ḵ' }, { char: '।', label: '.' }, { char: '॥', label: '..' }
  ]
};

// Phonetic map: physical key -> Tankri character
// Normal keys map to basic consonants/vowels
// Shift + key maps to aspirated or alternate forms
const PHYSICAL_KEY_MAP = {
  // Vowels (lowercase)
  'a': '𑚀',   // a
  'A': '𑚁',   // ā (Shift+a)
  'i': '𑚂',   // i
  'I': '𑚃',   // ī (Shift+i)
  'u': '𑚄',   // u
  'U': '𑚅',   // ū (Shift+u)
  'e': '𑚆',   // e
  'E': '𑚇',   // ai (Shift+e)
  'o': '𑚈',   // o
  'O': '𑚉',   // au (Shift+o)

  // Consonants (lowercase = basic, uppercase = aspirated)
  'k': '𑚊',   // ka
  'K': '𑚸',   // kha (Shift+k)
  'g': '𑚌',   // ga
  'G': '𑚍',   // gha (Shift+g)

  'c': '𑚏',   // ca
  'C': '𑚐',   // cha (Shift+c)
  'j': '𑚑',   // ja
  'J': '𑚒',   // jha (Shift+j)

  't': '𑚙',   // ta
  'T': '𑚔',   // ṭa (Shift+t = retroflex)
  'd': '𑚛',   // da
  'D': '𑚖',   // ḍa (Shift+d = retroflex)

  'p': '𑚞',   // pa
  'P': '𑚟',   // pha (Shift+p)
  'b': '𑚠',   // ba
  'B': '𑚡',   // bha (Shift+b)

  'n': '𑚝',   // na
  'N': '𑚘',   // ṇa (Shift+n = retroflex)
  'm': '𑚢',   // ma
  'M': '𑚫',   // anusvara (Shift+m)

  'y': '𑚣',   // ya
  'r': '𑚤',   // ra
  'l': '𑚥',   // la
  'v': '𑚦',   // va
  'w': '𑚦',   // va (alias)

  's': '𑚨',   // sa
  'S': '𑚧',   // śa (Shift+s)
  'h': '𑚩',   // ha
  'H': '𑚬',   // visarga (Shift+h)

  'f': '𑚟',   // pha (common IME alias)
  'x': '𑚋',   // ṣa
  'q': '𑚎',   // ṅa

  // Digits: use number keys for Tankri digits
  '0': '𑛀', '1': '𑛁', '2': '𑛂', '3': '𑛃', '4': '𑛄',
  '5': '𑛅', '6': '𑛆', '7': '𑛇', '8': '𑛈', '9': '𑛉',

  // Special
  '.': '।',    // danda for period
  '>': '॥',    // double danda for Shift+period
  'z': '𑚶',   // virama (halant)
};

// Reverse map: Tankri char -> physical key(s), for highlight feedback
const REVERSE_KEY_MAP = {};
Object.entries(PHYSICAL_KEY_MAP).forEach(([key, char]) => {
  if (!REVERSE_KEY_MAP[char]) REVERSE_KEY_MAP[char] = [];
  REVERSE_KEY_MAP[char].push(key);
});

// Key map reference data grouped for display
const KEY_MAP_GROUPS = [
  {
    title: 'Vowels',
    keys: [
      { key: 'a', shift: 'A', normal: '𑚀 (a)', shifted: '𑚁 (ā)' },
      { key: 'i', shift: 'I', normal: '𑚂 (i)', shifted: '𑚃 (ī)' },
      { key: 'u', shift: 'U', normal: '𑚄 (u)', shifted: '𑚅 (ū)' },
      { key: 'e', shift: 'E', normal: '𑚆 (e)', shifted: '𑚇 (ai)' },
      { key: 'o', shift: 'O', normal: '𑚈 (o)', shifted: '𑚉 (au)' },
    ]
  },
  {
    title: 'Consonants',
    keys: [
      { key: 'k', shift: 'K', normal: '𑚊 (ka)', shifted: '𑚸 (kha)' },
      { key: 'g', shift: 'G', normal: '𑚌 (ga)', shifted: '𑚍 (gha)' },
      { key: 'c', shift: 'C', normal: '𑚏 (ca)', shifted: '𑚐 (cha)' },
      { key: 'j', shift: 'J', normal: '𑚑 (ja)', shifted: '𑚒 (jha)' },
      { key: 't', shift: 'T', normal: '𑚙 (ta)', shifted: '𑚔 (ṭa)' },
      { key: 'd', shift: 'D', normal: '𑚛 (da)', shifted: '𑚖 (ḍa)' },
      { key: 'p', shift: 'P', normal: '𑚞 (pa)', shifted: '𑚟 (pha)' },
      { key: 'b', shift: 'B', normal: '𑚠 (ba)', shifted: '𑚡 (bha)' },
      { key: 'n', shift: 'N', normal: '𑚝 (na)', shifted: '𑚘 (ṇa)' },
      { key: 'm', shift: 'M', normal: '𑚢 (ma)', shifted: '𑚫 (ṃ)' },
      { key: 'y', normal: '𑚣 (ya)' },
      { key: 'r', normal: '𑚤 (ra)' },
      { key: 'l', normal: '𑚥 (la)' },
      { key: 'v/w', normal: '𑚦 (va)' },
      { key: 's', shift: 'S', normal: '𑚨 (sa)', shifted: '𑚧 (śa)' },
      { key: 'h', shift: 'H', normal: '𑚩 (ha)', shifted: '𑚬 (ḥ)' },
      { key: 'x', normal: '𑚋 (ṣa)' },
      { key: 'q', normal: '𑚎 (ṅa)' },
    ]
  },
  {
    title: 'Special',
    keys: [
      { key: 'z', normal: '𑚶 (virama/halant)' },
      { key: '.', shift: '>', normal: '। (danda)', shifted: '॥ (double danda)' },
      { key: '0–9', normal: '𑛀–𑛉 (Tankri digits)' },
    ]
  }
];

export default function TankriKeyboard() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [physicalMode, setPhysicalMode] = useState(true);
  const [showKeyMap, setShowKeyMap] = useState(false);
  const [activeKey, setActiveKey] = useState(null); // for visual highlight
  const textareaRef = useRef(null);
  const highlightTimeoutRef = useRef(null);

  const insertChar = useCallback((char) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newText = text.substring(0, start) + char + text.substring(end);
    setText(newText);
    
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + char.length;
      textarea.focus();
    }, 0);
  }, [text]);

  // Highlight the matching on-screen key briefly
  const highlightKey = useCallback((tankriChar) => {
    setActiveKey(tankriChar);
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    highlightTimeoutRef.current = setTimeout(() => setActiveKey(null), 200);
  }, []);

  // Physical keyboard handler
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !physicalMode) return;

    const handleKeyDown = (e) => {
      // Allow standard navigation/control keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (['Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;

      // Backspace — handle explicitly to stay in sync with React state
      if (e.key === 'Backspace') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;

        if (start === end && start > 0) {
          // Delete the character before cursor (handle multi-codepoint chars)
          const before = Array.from(currentText.substring(0, start));
          before.pop();
          const newText = before.join('') + currentText.substring(end);
          setText(newText);
          const newPos = before.join('').length;
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = newPos;
          }, 0);
        } else if (start !== end) {
          // Delete selected text
          const newText = currentText.substring(0, start) + currentText.substring(end);
          setText(newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start;
          }, 0);
        }
        return;
      }

      // Delete key
      if (e.key === 'Delete') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;

        if (start === end && start < currentText.length) {
          const after = Array.from(currentText.substring(start));
          after.shift();
          const newText = currentText.substring(0, start) + after.join('');
          setText(newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start;
          }, 0);
        } else if (start !== end) {
          const newText = currentText.substring(0, start) + currentText.substring(end);
          setText(newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start;
          }, 0);
        }
        return;
      }

      // Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;
        const newText = currentText.substring(0, start) + '\n' + currentText.substring(end);
        setText(newText);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
        return;
      }

      // Space
      if (e.key === ' ') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;
        const newText = currentText.substring(0, start) + ' ' + currentText.substring(end);
        setText(newText);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
        return;
      }

      // Find mapped character
      const mappedChar = PHYSICAL_KEY_MAP[e.key];
      if (mappedChar) {
        e.preventDefault();

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = textarea.value;

        const newText = currentText.substring(0, start) + mappedChar + currentText.substring(end);
        setText(newText);

        // Highlight on-screen key
        highlightKey(mappedChar);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + mappedChar.length;
        }, 0);
      } else {
        // Prevent unmapped keys from typing (unless handled above)
        if (e.key.length === 1) {
          e.preventDefault();
        }
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);
    return () => textarea.removeEventListener('keydown', handleKeyDown);
  }, [physicalMode, highlightKey]);

  const handleBackspace = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end && start > 0) {
      const chars = Array.from(text);
      if (text.length > 0) {
         setText(text.slice(0, -1));
      }
    } else if (start !== end) {
      setText(text.substring(0, start) + text.substring(end));
    }
    textarea.focus();
  };

  const handleClear = () => {
    setText('');
    textareaRef.current?.focus();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Check if a key should be highlighted
  const isKeyActive = (tankriChar) => activeKey === tankriChar;

  return (
    <div className="tankri-keyboard-container">
      {/* Mode toggle */}
      <div className="keyboard-mode-bar">
        <label className="keyboard-mode-toggle">
          <input
            type="checkbox"
            checked={physicalMode}
            onChange={(e) => setPhysicalMode(e.target.checked)}
          />
          <span className="toggle-slider"></span>
          <span className="toggle-label">Physical Keyboard Mode</span>
        </label>
        {physicalMode && (
          <span className="mode-hint">
            Type on your keyboard to input Tankri characters
          </span>
        )}
      </div>

      <textarea
        ref={textareaRef}
        className="tankri-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={physicalMode ? "Focus here and type on your keyboard..." : "Type here using the keyboard below..."}
        dir="ltr"
      />

      <div className="keyboard-layout">
        <div className="keyboard-section">
          <div className="keyboard-section-title">Vowels & Others</div>
          <div className="keyboard-grid">
            {TANKRI_CHARS.vowels.map((k, idx) => (
              <button
                key={`iv-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-char">{k.char}</span>
                <span className="key-label">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <div className="keyboard-section-title">Consonants</div>
          <div className="keyboard-grid">
            {TANKRI_CHARS.consonants.map((k, idx) => (
              <button
                key={`c-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-char">{k.char}</span>
                <span className="key-label">{k.label}</span>
                {REVERSE_KEY_MAP[k.char] && (
                  <span className="key-shortcut">{REVERSE_KEY_MAP[k.char][0]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <div className="keyboard-section-title">South-Indic Consonants</div>
          <div className="keyboard-grid">
            {TANKRI_CHARS.southIndicConsonants.map((k, idx) => (
              <button
                key={`sic-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-char">{k.char}</span>
                <span className="key-label">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <div className="keyboard-section-title">North-Indic Consonants with Nukta</div>
          <div className="keyboard-grid">
            {TANKRI_CHARS.northIndicConsonants.map((k, idx) => (
              <button
                key={`nic-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-char">{k.char}</span>
                <span className="key-label">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <div className="keyboard-section-title">Sinhala Pre-nasalized Consonants</div>
          <div className="keyboard-grid">
            {TANKRI_CHARS.sinhalaConsonants.map((k, idx) => (
              <button
                key={`spc-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-char" style={{ fontSize: '1.2rem' }}>{k.char}</span>
                <span className="key-label">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <div className="keyboard-section-title">Combining Signs (Matras & Marks)</div>
          <div className="keyboard-grid dependent-vowels">
            {TANKRI_CHARS.combiningSigns.map((k, idx) => (
              <button
                key={`cs-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-dependent">◌{k.char}</span>
                <span className="key-label">{k.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="keyboard-section">
          <div className="keyboard-section-title">Numerals & Others</div>
          <div className="keyboard-grid">
            {TANKRI_CHARS.digits.concat(TANKRI_CHARS.others).map((k, idx) => (
              <button
                key={`num-oth-${k.label}-${idx}`}
                className={`keyboard-key${isKeyActive(k.char) ? ' key-active' : ''}`}
                onClick={() => insertChar(k.char)}
              >
                <span className="key-char">{k.char}</span>
                <span className="key-label">{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="keyboard-controls">
          <button className="btn btn-secondary key-control" onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-outline key-control key-space" onClick={() => insertChar(' ')}>
            Space
          </button>
          <button className="btn btn-primary key-control" onClick={handleBackspace} aria-label="Backspace">
            <Delete size={20} />
          </button>
          <button 
            className="btn btn-primary key-control" 
            onClick={copyToClipboard}
            style={{ background: copied ? 'var(--green-600)' : '' }}
          >
            {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      {/* Key Map Reference */}
      <div className="keymap-reference">
        <button
          className="keymap-toggle"
          onClick={() => setShowKeyMap(!showKeyMap)}
        >
          {showKeyMap ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span>Keyboard Shortcuts Reference</span>
        </button>
        {showKeyMap && (
          <div className="keymap-content">
            {KEY_MAP_GROUPS.map((group) => (
              <div key={group.title} className="keymap-group">
                <h4>{group.title}</h4>
                <div className="keymap-table">
                  {group.keys.map((item, idx) => (
                    <div key={idx} className="keymap-row">
                      <span className="keymap-key">{item.key}</span>
                      <span className="keymap-arrow">→</span>
                      <span className="keymap-value">{item.normal}</span>
                      {item.shifted && (
                        <>
                          <span className="keymap-divider">|</span>
                          <span className="keymap-key">⇧{item.shift}</span>
                          <span className="keymap-arrow">→</span>
                          <span className="keymap-value">{item.shifted}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Export for use by the game component
export { TANKRI_CHARS };
