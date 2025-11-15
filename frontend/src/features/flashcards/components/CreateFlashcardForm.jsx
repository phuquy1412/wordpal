import React, { useState } from 'react';

const CreateFlashcardForm = () => {
  const [cards, setCards] = useState([{ term: '', definition: '' }]);

  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] = value;
    setCards(newCards);
  };

  const addCard = () => {
    setCards([...cards, { term: '', definition: '' }]);
  };

  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setCards(newCards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the submission to your backend API
    console.log('Submitting cards:', cards);
    alert('Deck submitted! Check the console for the data.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        {cards.map((card, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg relative">
            <div className="flex flex-col">
              <label htmlFor={`term-${index}`} className="mb-2 font-semibold text-gray-700">Term</label>
              <input
                type="text"
                id={`term-${index}`}
                value={card.term}
                onChange={(e) => handleCardChange(index, 'term', e.target.value)}
                placeholder="Enter term"
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`definition-${index}`} className="mb-2 font-semibold text-gray-700">Definition</label>
              <input
                type="text"
                id={`definition-${index}`}
                value={card.definition}
                onChange={(e) => handleCardChange(index, 'definition', e.target.value)}
                placeholder="Enter definition"
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {cards.length > 1 && (
              <button
                type="button"
                onClick={() => removeCard(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={addCard}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            + Add Card
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Create Deck
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFlashcardForm;
