import React from 'react';
import FlashCardItem from '../features/flashcards/components/FlashCardItem';

const TestFlashCardItemPage = () => {
  const sampleCard = {
    id: 1,
    term: 'Component',
    definition: 'A reusable piece of UI in React.',
    example: 'This FlashCardItem is a React component.',
    isFavorite: false,
  };

  const handleEdit = (card) => {
    alert(`Editing card: ${card.term}`);
  };

  const handleDelete = (cardId) => {
    alert(`Deleting card with id: ${cardId}`);
  };

  const handleToggleFavorite = (cardId) => {
    alert(`Toggling favorite for card with id: ${cardId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">Testing FlashCardItem</h1>
      <div className="w-full max-w-md">
        <FlashCardItem
          card={sampleCard}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
      <div className="w-full max-w-md mt-8">
         <h2 className="text-xl font-bold mb-4">Card without actions</h2>
         <FlashCardItem
          card={{...sampleCard, id: 2, term: "No Actions Card"}}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default TestFlashCardItemPage;
