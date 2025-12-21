import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../auth/common/LoadingSpinner';

// Component con để hiển thị một câu hỏi và các lựa chọn
const Question = ({ question, onAnswer, answered, selectedKey }) => {
    return (
        <div className="mb-8">
            <p className="text-center text-gray-500 mb-2 text-sm italic">{`(Gợi ý: ${question.question.split('(Gợi ý: ')[1]}`}</p>
            <p className="text-2xl font-semibold text-center text-gray-800 mb-6">
                {question.question.split(' (Gợi ý:')[0]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option) => {
                    const isCorrect = answered && option.key === question.answer;
                    const isWrong = answered && option.key === selectedKey && option.key !== question.answer;
                    
                    let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

                    if (answered) {
                        if (isCorrect) {
                            buttonClass += " bg-green-100 border-green-500 text-green-800 font-bold";
                        } else if (isWrong) {
                            buttonClass += " bg-red-100 border-red-500 text-red-800";
                        } else {
                            buttonClass += " bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed";
                        }
                    } else {
                        buttonClass += " bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-500 focus:ring-blue-500";
                    }

                    return (
                        <button
                            key={option.key}
                            onClick={() => onAnswer(option.key)}
                            disabled={answered}
                            className={buttonClass}
                        >
                            <span className="font-bold mr-3">{option.key}.</span>
                            {option.text}
                        </button>
                    );
                })}
            </div>
            {answered && (
                 <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-center">
                    {question.explanation}
                </div>
            )}
        </div>
    );
};

// Component chính cho giao diện quiz
const QuizView = ({ quizData, loading, onQuizComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <LoadingSpinner />
                <p className="mt-4 text-lg text-gray-600">AI đang tạo bộ câu hỏi, vui lòng chờ...</p>
            </div>
        );
    }

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return <div className="text-center text-red-500 p-8">Không thể tải hoặc tạo câu hỏi. Vui lòng thử lại.</div>;
    }

    const { questions, title } = quizData;
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleAnswer = (answerKey) => {
        if (answered) return;

        setSelectedKey(answerKey);
        setAnswered(true);
        if (answerKey === currentQuestion.answer) {
            setCorrectAnswersCount(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setAnswered(false);
        setSelectedKey(null);

        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            // Quiz is finished
            onQuizComplete({
                score: Math.round((correctAnswersCount / questions.length) * 100),
                correctAnswers: correctAnswersCount,
                totalQuestions: questions.length
            });
        }
    };
    
    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">{title}</h1>
            <p className="text-center text-gray-500 mb-6">Câu {currentQuestionIndex + 1} / {questions.length}</p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>

            <Question 
                question={currentQuestion}
                onAnswer={handleAnswer}
                answered={answered}
                selectedKey={selectedKey}
            />

            {answered && (
                <div className="text-center mt-8">
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
                    </button>
                </div>
            )}
        </div>
    );
};

QuizView.propTypes = {
    quizData: PropTypes.shape({
        title: PropTypes.string,
        questions: PropTypes.arrayOf(PropTypes.shape({
            question: PropTypes.string,
            options: PropTypes.arrayOf(PropTypes.shape({
                key: PropTypes.string,
                text: PropTypes.string,
            })),
            answer: PropTypes.string,
            explanation: PropTypes.string,
        }))
    }),
    loading: PropTypes.bool.isRequired,
    onQuizComplete: PropTypes.func.isRequired,
};

export default QuizView;
