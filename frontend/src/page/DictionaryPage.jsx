
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DictionaryView from '../features/dictionary/components/DictionaryView';

const DictionaryPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        <main>
          <DictionaryView />
        </main>

        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}</style>

      </div>
      <Footer />
    </>
  );
};

export default DictionaryPage;