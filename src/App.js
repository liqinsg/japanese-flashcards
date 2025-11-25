import React, { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import './App.css';

const AnkiFlashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakJapanese = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      
      setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const flashcards = [
    {
      front: "おはようございます",
      back: "Good morning",
      context: "Used until about 10:00 a.m.",
      emoji: "🌅"
    },
    {
      front: "こんにちは",
      back: "Hello",
      context: "Informal greeting from 10:00 a.m. until sundown",
      emoji: "☀️"
    },
    {
      front: "こんばんは",
      back: "Good evening",
      context: "Evening greeting",
      emoji: "🌆"
    },
    {
      front: "おやすみなさい",
      back: "Good night",
      context: "Before bed or parting late at night",
      emoji: "🌙"
    },
    {
      front: "さようなら",
      back: "Good-bye",
      context: "Formal farewell",
      emoji: "👋"
    },
    {
      front: "では / じゃ また",
      back: "Well then... / See you",
      context: "Informal parting",
      emoji: "😊"
    },
    {
      front: "おさきに しつれいします",
      back: "Excuse me for leaving first",
      context: "Leaving office/meeting before others",
      emoji: "🚪"
    },
    {
      front: "いってらっしゃい",
      back: "So long / Go and come back",
      context: "To household members leaving",
      emoji: "🏠"
    },
    {
      front: "いってきます",
      back: "I'm going and coming back",
      context: "When leaving home",
      emoji: "🚶"
    },
    {
      front: "ただいま",
      back: "I'm back / I'm home",
      context: "Upon returning home",
      emoji: "🔑"
    },
    {
      front: "おかえりなさい",
      back: "Welcome home",
      context: "Response to ただいま",
      emoji: "🤗"
    },
    {
      front: "いただきます",
      back: "Thank you for this meal",
      context: "Before eating",
      emoji: "🍽️"
    },
    {
      front: "ごちそうさまでした",
      back: "Thank you for the meal",
      context: "After eating",
      emoji: "😋"
    },
    {
      front: "おめでとうございます",
      back: "Congratulations",
      context: "Celebrating achievements",
      emoji: "🎉"
    },
    {
      front: "どうも ありがとうございます",
      back: "Thank you very much",
      context: "Expressing gratitude",
      emoji: "🙏"
    },
    {
      front: "どういたしまして",
      back: "You're welcome",
      context: "Response to thanks",
      emoji: "😊"
    },
    {
      front: "すみません",
      back: "Excuse me / I'm sorry",
      context: "Apologizing or getting attention",
      emoji: "🙇"
    },
    {
      front: "ちょっと まってください",
      back: "Wait just a moment, please",
      context: "Asking someone to wait",
      emoji: "✋"
    },
    {
      front: "もう いちど おねがいします",
      back: "Once more, please",
      context: "Requesting repetition",
      emoji: "🔄"
    },
    {
      front: "どうぞ おさきに",
      back: "Please, go ahead",
      context: "Letting someone go first",
      emoji: "👉"
    },
    {
      front: "きをつけて",
      back: "Take care / Be careful",
      context: "Wishing someone safety",
      emoji: "⚠️"
    },
    {
      front: "おだいじに",
      back: "Take care of yourself",
      context: "To someone ill or injured",
      emoji: "🏥"
    },
    {
      front: "ありがとう",
      back: "Thank you",
      context: "Casual, informal thanks",
      emoji: "😊"
    },
    {
      front: "ごめんなさい",
      back: "I'm sorry",
      context: "Sincere apology",
      emoji: "🙏"
    },
    {
      front: "わかりました",
      back: "I understand",
      context: "Acknowledgment",
      emoji: "✅"
    }
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const current = flashcards[currentCard];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Japanese Flashcards
        </h1>
        <p className="text-center text-gray-600 mb-8">Anki Style</p>

        {/* Flashcard Container */}
        <div className="perspective-1000">
          <div
            className={`relative w-full h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of Card */}
            <div
              className={`absolute w-full h-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center backface-hidden ${
                isFlipped ? 'invisible' : 'visible'
              }`}
            >
              <div className="text-6xl font-bold text-gray-900 text-center leading-tight mb-6">
                {current.front}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakJapanese(current.front);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  isSpeaking 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                disabled={isSpeaking}
              >
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span>{isSpeaking ? 'Playing...' : 'Play Audio'}</span>
              </button>
              <div className="mt-8 text-gray-400 text-sm">
                Click card to reveal
              </div>
            </div>

            {/* Back of Card */}
            <div
              className={`absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center ${
                isFlipped ? 'visible' : 'invisible'
              }`}
              style={{ transform: 'rotateY(180deg) scaleX(-1)' }}
            >
              <div className="text-8xl mb-4">{current.emoji}</div>
              <div className="text-4xl font-bold text-white text-center mb-4">
                {current.back}
              </div>
              <div className="text-lg text-indigo-100 text-center italic mb-6">
                {current.context}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakJapanese(current.front);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  isSpeaking 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-indigo-400 text-white hover:bg-indigo-300'
                }`}
                disabled={isSpeaking}
              >
                <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <span>{isSpeaking ? 'Playing...' : 'Play Audio'}</span>
              </button>
              <div className="mt-4 text-indigo-200 text-sm">
                Click to flip back
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prevCard}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={handleFlip}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Flip Card
          </button>

          <button
            onClick={nextCard}
            className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6 text-center">
          <div className="text-lg text-gray-700 font-semibold">
            Card {currentCard + 1} / {flashcards.length}
          </div>
          <div className="mt-4 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Cards</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {flashcards.map((card, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentCard(index);
                  setIsFlipped(false);
                }}
                className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                  index === currentCard
                    ? 'bg-indigo-600 shadow-lg scale-110'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                title={`Card ${index + 1}`}
              >
                {card.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
          <h3 className="font-bold text-indigo-900 mb-2">How to Use:</h3>
          <ul className="text-indigo-800 space-y-1 text-sm">
            <li>• Click the "Play Audio" button to hear the Japanese pronunciation</li>
            <li>• Click the card or "Flip Card" button to reveal the answer</li>
            <li>• Use arrow buttons or keyboard arrows to navigate</li>
            <li>• Click emoji thumbnails to jump to specific cards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnkiFlashcards;