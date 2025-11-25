import React, { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Volume2, Shuffle } from 'lucide-react';
import './App.css';
import flashcardsData from './flashcardsData';

const AnkiFlashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cardOrder, setCardOrder] = useState([]);

  // Use the imported flashcards data
  const flashcards = flashcardsData;

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

  const shuffleCards = () => {
    // Create array of indices
    const indices = Array.from({ length: flashcards.length }, (_, i) => i);
    
    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    setCardOrder(indices);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const resetOrder = () => {
    setCardOrder([]);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  // Get the actual flashcard based on order
  const getFlashcard = (index) => {
    if (cardOrder.length > 0) {
      return flashcards[cardOrder[index]];
    }
    return flashcards[index];
  };

  const current = getFlashcard(currentCard);

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

        {/* Shuffle Button */}
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={shuffleCards}
            className="bg-green-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle Cards
          </button>
          
          {cardOrder.length > 0 && (
            <button
              onClick={resetOrder}
              className="bg-gray-600 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
            >
              Reset Order
            </button>
          )}
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            All Cards {cardOrder.length > 0 && <span className="text-sm text-green-600">(Shuffled)</span>}
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {(cardOrder.length > 0 ? cardOrder : flashcards.map((_, i) => i)).map((cardIndex, displayIndex) => {
              const card = flashcards[cardIndex];
              return (
                <button
                  key={displayIndex}
                  onClick={() => {
                    setCurrentCard(displayIndex);
                    setIsFlipped(false);
                  }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                    displayIndex === currentCard
                      ? 'bg-indigo-600 shadow-lg scale-110'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  title={`Card ${displayIndex + 1}`}
                >
                  {card.emoji}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
          <h3 className="font-bold text-indigo-900 mb-2">How to Use:</h3>
          <ul className="text-indigo-800 space-y-1 text-sm">
            <li>• Click "Shuffle Cards" to practice in random order</li>
            <li>• Click the "Play Audio" button to hear the Japanese pronunciation</li>
            <li>• Click the card or "Flip Card" button to reveal the answer</li>
            <li>• Use arrow buttons to navigate through cards</li>
            <li>• Click emoji thumbnails to jump to specific cards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnkiFlashcards;