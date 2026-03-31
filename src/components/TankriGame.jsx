import { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, Flame, RotateCcw, Zap, Clock, Brain, ArrowRight, Shuffle } from 'lucide-react';
import { TANKRI_CHARS } from './TankriKeyboard';
import './TankriGame.css';

// Build a flat list of learnable characters (vowels + consonants + digits)
const buildCharPool = (category) => {
  switch (category) {
    case 'vowels':
      return TANKRI_CHARS.vowels.filter((v, i, arr) =>
        arr.findIndex(x => x.char === v.char) === i
      );
    case 'consonants':
      return TANKRI_CHARS.consonants;
    case 'digits':
      return TANKRI_CHARS.digits;
    case 'all':
    default:
      return [
        ...TANKRI_CHARS.vowels.filter((v, i, arr) =>
          arr.findIndex(x => x.char === v.char) === i
        ),
        ...TANKRI_CHARS.consonants,
        ...TANKRI_CHARS.digits,
      ];
  }
};

// Shuffle array
const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Pick random items from array, excluding one
const pickRandom = (arr, count, exclude) => {
  const filtered = arr.filter(item => item.char !== exclude.char);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count);
};

// =============================================
// CHARACTER QUIZ: Show Tankri char -> pick transliteration
// =============================================
function CharacterQuiz({ pool }) {
  const [currentChar, setCurrentChar] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState(null); // { index, correct }
  const [selectedIdx, setSelectedIdx] = useState(null);

  const generateQuestion = useCallback(() => {
    const correct = pool[Math.floor(Math.random() * pool.length)];
    const wrongs = pickRandom(pool, 3, correct);
    const allOptions = shuffleArray([correct, ...wrongs]);
    setCurrentChar(correct);
    setOptions(allOptions);
    setFeedback(null);
    setSelectedIdx(null);
  }, [pool]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (option, idx) => {
    if (feedback !== null) return;
    setSelectedIdx(idx);
    const correct = option.char === currentChar.char;
    setFeedback({ index: idx, correct });
    setTotal(t => t + 1);

    if (correct) {
      setScore(s => s + 1);
      setStreak(s => {
        const newStreak = s + 1;
        setBestStreak(b => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      generateQuestion();
    }, correct ? 800 : 1500);
  };

  const reset = () => {
    setScore(0);
    setTotal(0);
    setStreak(0);
    setBestStreak(0);
    generateQuestion();
  };

  if (!currentChar) return null;

  const correctIdx = options.findIndex(o => o.char === currentChar.char);

  return (
    <div className="game-container">
      <div className="game-stats">
        <div className="stat">
          <Trophy size={16} />
          <span>{score}/{total}</span>
        </div>
        <div className="stat stat-streak">
          <Flame size={16} />
          <span>{streak} streak</span>
        </div>
        <div className="stat">
          <Zap size={16} />
          <span>Best: {bestStreak}</span>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {total > 0 && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(score / total) * 100}%` }}
          />
        </div>
      )}

      <div className="quiz-prompt">
        <div className="quiz-char-display">{currentChar.char}</div>
        <p className="quiz-instruction">What is the transliteration of this character?</p>
      </div>

      <div className="quiz-options">
        {options.map((option, idx) => {
          let cls = 'quiz-option';
          if (feedback !== null) {
            if (idx === correctIdx) cls += ' option-correct';
            else if (idx === selectedIdx && !feedback.correct) cls += ' option-wrong';
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => handleAnswer(option, idx)}
              disabled={feedback !== null}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className={`quiz-feedback ${feedback.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          {feedback.correct
            ? '✨ Correct!'
            : `✗ The answer is "${currentChar.label}"`
          }
        </div>
      )}
    </div>
  );
}

// =============================================
// REVERSE QUIZ: Show transliteration -> pick Tankri char
// =============================================
function ReverseQuiz({ pool }) {
  const [currentChar, setCurrentChar] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const generateQuestion = useCallback(() => {
    const correct = pool[Math.floor(Math.random() * pool.length)];
    const wrongs = pickRandom(pool, 3, correct);
    const allOptions = shuffleArray([correct, ...wrongs]);
    setCurrentChar(correct);
    setOptions(allOptions);
    setFeedback(null);
    setSelectedIdx(null);
  }, [pool]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (option, idx) => {
    if (feedback !== null) return;
    setSelectedIdx(idx);
    const correct = option.char === currentChar.char;
    setFeedback({ index: idx, correct });
    setTotal(t => t + 1);

    if (correct) {
      setScore(s => s + 1);
      setStreak(s => {
        const newStreak = s + 1;
        setBestStreak(b => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      generateQuestion();
    }, correct ? 800 : 1500);
  };

  const reset = () => {
    setScore(0);
    setTotal(0);
    setStreak(0);
    setBestStreak(0);
    generateQuestion();
  };

  if (!currentChar) return null;

  const correctIdx = options.findIndex(o => o.char === currentChar.char);

  return (
    <div className="game-container">
      <div className="game-stats">
        <div className="stat">
          <Trophy size={16} />
          <span>{score}/{total}</span>
        </div>
        <div className="stat stat-streak">
          <Flame size={16} />
          <span>{streak} streak</span>
        </div>
        <div className="stat">
          <Zap size={16} />
          <span>Best: {bestStreak}</span>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={reset}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {total > 0 && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(score / total) * 100}%` }}
          />
        </div>
      )}

      <div className="quiz-prompt">
        <div className="quiz-label-display">{currentChar.label}</div>
        <p className="quiz-instruction">Which Tankri character matches this transliteration?</p>
      </div>

      <div className="quiz-options quiz-options-tankri">
        {options.map((option, idx) => {
          let cls = 'quiz-option quiz-option-char';
          if (feedback !== null) {
            if (idx === correctIdx) cls += ' option-correct';
            else if (idx === selectedIdx && !feedback.correct) cls += ' option-wrong';
          }
          return (
            <button
              key={idx}
              className={cls}
              onClick={() => handleAnswer(option, idx)}
              disabled={feedback !== null}
            >
              {option.char}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className={`quiz-feedback ${feedback.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
          {feedback.correct
            ? '✨ Correct!'
            : `✗ The answer is "${currentChar.char}"`
          }
        </div>
      )}
    </div>
  );
}

// =============================================
// MEMORY MATCH: Flip cards to match pairs
// =============================================
function MemoryMatch({ pool }) {
  const GRID_SIZE = 12; // 6 pairs = 12 cards
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const timerRef = useRef(null);

  const initGame = useCallback(() => {
    const selected = shuffleArray(pool).slice(0, GRID_SIZE / 2);
    const cardPairs = selected.flatMap((item, idx) => [
      { id: `char-${idx}`, pairId: idx, display: item.char, type: 'char' },
      { id: `label-${idx}`, pairId: idx, display: item.label, type: 'label' },
    ]);
    setCards(shuffleArray(cardPairs));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setStartTime(null);
    setElapsed(0);
    setGameComplete(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [pool]);

  useEffect(() => {
    initGame();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [initGame]);

  // Timer
  useEffect(() => {
    if (startTime && !gameComplete) {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [startTime, gameComplete]);

  const handleFlip = (index) => {
    if (flipped.length >= 2) return;
    if (flipped.includes(index)) return;
    if (matched.has(cards[index].pairId)) return;

    if (!startTime) setStartTime(Date.now());

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].pairId === cards[second].pairId) {
        // Match found
        const newMatched = new Set(matched);
        newMatched.add(cards[first].pairId);
        setMatched(newMatched);
        setFlipped([]);

        if (newMatched.size === GRID_SIZE / 2) {
          setGameComplete(true);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      } else {
        // No match — flip back
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-container">
      <div className="game-stats">
        <div className="stat">
          <Shuffle size={16} />
          <span>{moves} moves</span>
        </div>
        <div className="stat">
          <Clock size={16} />
          <span>{formatTime(elapsed)}</span>
        </div>
        <div className="stat">
          <Trophy size={16} />
          <span>{matched.size}/{GRID_SIZE / 2} pairs</span>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={initGame}>
          <RotateCcw size={14} /> New Game
        </button>
      </div>

      {gameComplete && (
        <div className="game-complete">
          <div className="complete-icon">🎉</div>
          <h3>Congratulations!</h3>
          <p>You matched all pairs in <strong>{moves} moves</strong> and <strong>{formatTime(elapsed)}</strong>!</p>
          <button className="btn btn-primary" onClick={initGame}>
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      )}

      <div className="memory-grid">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.has(card.pairId);
          const isMatched = matched.has(card.pairId);
          return (
            <button
              key={card.id}
              className={`memory-card ${isFlipped ? 'card-flipped' : ''} ${isMatched ? 'card-matched' : ''}`}
              onClick={() => handleFlip(idx)}
              disabled={isFlipped || gameComplete}
            >
              <div className="card-inner">
                <div className="card-front">
                  <Brain size={20} />
                </div>
                <div className="card-back">
                  <span className={card.type === 'char' ? 'card-tankri' : 'card-transliteration'}>
                    {card.display}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =============================================
// MAIN GAME COMPONENT
// =============================================
const GAME_MODES = [
  { id: 'char-quiz', name: 'Character Quiz', icon: <ArrowRight size={16} />, description: 'See a Tankri character, pick the transliteration' },
  { id: 'reverse-quiz', name: 'Reverse Quiz', icon: <Shuffle size={16} />, description: 'See a transliteration, pick the Tankri character' },
  { id: 'memory', name: 'Memory Match', icon: <Brain size={16} />, description: 'Match Tankri characters with their transliterations' },
];

const CATEGORIES = [
  { id: 'all', name: 'All Characters' },
  { id: 'vowels', name: 'Vowels Only' },
  { id: 'consonants', name: 'Consonants Only' },
  { id: 'digits', name: 'Digits Only' },
];

export default function TankriGame() {
  const [gameMode, setGameMode] = useState('char-quiz');
  const [category, setCategory] = useState('all');

  const pool = buildCharPool(category);

  return (
    <div className="tankri-game">
      {/* Game Mode Selector */}
      <div className="game-mode-selector">
        {GAME_MODES.map((mode) => (
          <button
            key={mode.id}
            className={`game-mode-btn ${gameMode === mode.id ? 'mode-active' : ''}`}
            onClick={() => setGameMode(mode.id)}
          >
            {mode.icon}
            <span className="mode-name">{mode.name}</span>
          </button>
        ))}
      </div>

      <p className="game-description">
        {GAME_MODES.find(m => m.id === gameMode)?.description}
      </p>

      {/* Category Filter */}
      <div className="category-filter">
        <span className="filter-label">Practice:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${category === cat.id ? 'category-active' : ''}`}
            onClick={() => setCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Game Area */}
      <div className="game-area">
        {gameMode === 'char-quiz' && <CharacterQuiz key={`cq-${category}`} pool={pool} />}
        {gameMode === 'reverse-quiz' && <ReverseQuiz key={`rq-${category}`} pool={pool} />}
        {gameMode === 'memory' && <MemoryMatch key={`mm-${category}`} pool={pool} />}
      </div>
    </div>
  );
}
