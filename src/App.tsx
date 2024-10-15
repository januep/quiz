import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider } from 'antd';
import './App.css';
import QuestionCard from './QuestionCard';
import Result from './Result';

const { Header, Content } = Layout;

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    // Fetch questions from the JSON file
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa8c16', // Orange color
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header
          style={{
            backgroundColor: '#282c34',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src="/Logo.png" alt="Logo" style={{ height: '40px' }} />
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {questions.length > 0 ? (
            !quizFinished ? (
              <QuestionCard
                question={questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
                onNext={handleNext}
              />
            ) : (
              <Result score={score} totalQuestions={questions.length} />
            )
          ) : (
            <p>Loading questions...</p>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
