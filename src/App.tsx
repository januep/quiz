import React, { useState } from 'react';
import { Layout, ConfigProvider } from 'antd';
import './App.css';
import QuestionCard from './QuestionCard';
import Result from './Result';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const { Header, Content } = Layout;

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "Ile lat temu został założony A-Team?",
      options: ["6", "8", "12", "15"],
      correctIndex: 2,
    },
    {
      question: "Na jaki maksymalny okres zatrudniani są stażyści? (miesiące)",
      options: ["12", "18", "6", "24"],
      correctIndex: 1,
    },
    {
      question: "Co oznacza skrót FLP?",
      options: ["Former Lame People", "Fantastic Leaders Poland", "First Leaders Performance", "Future Leaders Programme"],
      correctIndex: 3,
    },
    {
      question: "Ile lat trwa FLP?",
      options: ["2 lata", "1,5 roku", "3 lata", "rok"],
      correctIndex: 0,
    },
    {
      question: "Jaki procent osób po FLP zostaje w GSK po jego zakończeniu?",
      options: ["76%", "33%", "76%", "100%"],
      correctIndex: 3,
    },
    {
      question: "Ile spotkań A-team odbyło się do tej pory?",
      options: ["10", "600", "150", "320"],
      correctIndex: 1,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

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

  const { width, height } = useWindowSize(); // Dynamically get screen size
  const shouldShowConfetti = quizFinished && score >= questions.length - 1; // Success criteria

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa8c16',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', position: 'relative' }}>
        {/* Confetti Component */}
        {shouldShowConfetti && <Confetti width={width} height={height} />}

        {/* Header */}
        <Header
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/GSK_logo_2022.svg/1200px-GSK_logo_2022.svg.png"
            alt="Logo"
            style={{ height: '30px' }}
          />
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: '10px',
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
