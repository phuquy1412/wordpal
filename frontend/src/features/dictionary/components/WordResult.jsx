import { Volume2, Star, BookmarkPlus, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const WordResult = ({ wordData, onToggleFavorite, onAddToFlashcard }) => {
  const [isFavorite, setIsFavorite] = useState(wordData?.isFavorite || false);
  const [copied, setCopied] = useState(false);

  if (!wordData) return null;

  const playAudio = () => {
    if (wordData.audio) {
      const audio = new Audio(wordData.audio);
      audio.play();
    } else {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(wordData.word);
  };

  const handleCopyWord = () => {
    navigator.clipboard.writeText(wordData.word);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: wordData.word,
          text: `${wordData.word}: ${wordData.phonetic}\n${wordData.definitions[0]?.meanings[0]?.definition}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      };
      
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fadeIn">
      {/* Word Header */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200">
        <div className="flex-1">
          <h2 className="text-5xl font-bold text-gray-800 mb-3">{wordData.word}</h2>
          <div className="flex items-center space-x-4 mb-2">
            {wordData.phonetic && (
              <span className="text-xl text-blue-600 font-medium">{wordData.phonetic}</span>
            )}
            <button
              onClick={playAudio}
              className="p-2.5 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors group"
            >
              <Volume2 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-3 rounded-xl transition-all ${
              isFavorite
                ? 'bg-yellow-100 hover:bg-yellow-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <Star
              className={`w-5 h-5 ${
                isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-600'
              }`}
            />
          </button>

          <button
            onClick={onAddToFlashcard}
            className="p-3 bg-purple-100 rounded-xl hover:bg-purple-200 transition-colors group"
          >
            <BookmarkPlus className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={handleCopyWord}
            className="p-3 bg-green-100 rounded-xl hover:bg-green-200 transition-colors group"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <button
            onClick={handleShare}
            className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors group"
          >
            <Share2 className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Origin */}
      {wordData.origin && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm font-semibold text-blue-800 mb-1">Nguồn gốc</p>
          <p className="text-sm text-blue-700">{wordData.origin}</p>
        </div>
      )}

      {/* Definitions */}
      <div className="space-y-6">
        {wordData.definitions?.map((def, idx) => (
          <div key={idx} className="space-y-4">
            {/* Part of Speech */}
            <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold">
              {def.type}
            </div>

            {/* Meanings */}
            {def.meanings?.map((meaning, midx) => (
              <div key={midx} className="pl-4 border-l-4 border-blue-300">
                <div className="mb-3">
                  <p className="text-lg text-gray-800 font-medium mb-2">
                    {midx + 1}. {meaning.definition}
                  </p>
                  {meaning.translation && (
                    <p className="text-gray-600 text-sm italic ml-4">
                      → {meaning.translation}
                    </p>
                  )}
                </div>

                {/* Example */}
                {meaning.example && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-gray-700 italic mb-1">
                      <span className="font-semibold text-blue-700">Example:</span> "{meaning.example}"
                    </p>
                    {meaning.exampleTranslation && (
                      <p className="text-gray-600 text-sm ml-4">
                        → "{meaning.exampleTranslation}"
                      </p>
                    )}
                  </div>
                )}

                {/* Synonyms & Antonyms */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {meaning.synonyms?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-gray-500">Synonyms:</span>
                      {meaning.synonyms.slice(0, 3).map((syn, sidx) => (
                        <span
                          key={sidx}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  )}

                  {meaning.antonyms?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs font-semibold text-gray-500">Antonyms:</span>
                      {meaning.antonyms.slice(0, 3).map((ant, aidx) => (
                        <span
                          key={aidx}
                          className="px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-medium"
                        >
                          {ant}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Overall Synonyms & Antonyms */}
      {(wordData.synonyms?.length > 0 || wordData.antonyms?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-200">
          {wordData.synonyms?.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Từ đồng nghĩa</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {wordData.synonyms.map((syn, idx) => (
                  <button
                    key={idx}
                    onClick={() => window.location.href = `/dictionary?word=${syn}`}
                    className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors border border-green-200"
                  >
                    {syn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {wordData.antonyms?.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Từ trái nghĩa</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {wordData.antonyms.map((ant, idx) => (
                  <button
                    key={idx}
                    onClick={() => window.location.href = `/dictionary?word=${ant}`}
                    className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
                  >
                    {ant}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WordResult;