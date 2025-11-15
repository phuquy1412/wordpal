import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CreateFlashcardForm from '../features/flashcards/components/CreateFlashcardForm';

const CreateFlashcardPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Cards</h1>
        <CreateFlashcardForm />
      </main>
      <Footer />
    </div>
  );
};

export default CreateFlashcardPage;
