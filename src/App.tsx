import React, { useState, useEffect } from 'react';
import { Layout, ConfigProvider, Progress } from 'antd';
import './App.css';
import WelcomePage from './WelcomePage';
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
    // {
    //   question: "Na jaki maksymalny okres zatrudniani są stażyści? (miesiące)",
    //   options: ["12", "18", "6", "24"],
    //   correctIndex: 1,
    // },
    {
      question: "Co oznacza skrót FLP?",
      options: ["Former Lame People", "Fantastic Leaders Poland", "First Leaders Performance", "Future Leaders Programme"],
      correctIndex: 3,
    },
    {
      question: "Ile spotkań A-team odbyło się do tej pory?",
      options: ["10", "600", "150", "320"],
      correctIndex: 1,
    },
    // {
    //   question: "Ile lat trwa FLP?",
    //   options: ["2 lata", "1,5 roku", "3 lata", "rok"],
    //   correctIndex: 0,
    // },
    // {
    //   question: "Jaki procent osób po FLP zostaje w GSK po jego zakończeniu?",
    //   options: ["76%", "33%", "54%", "100%"],
    //   correctIndex: 3,
    // },
    {
      question: "Jaka była poprawna odpowiedź na pierwsze pytanie?",
      options: ["Future Leaders Programme", "6", "12", "600"],
      correctIndex: 2,
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isAnswerShown, setIsAnswerShown] = useState(false); // New state

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(15);
    setIsAnswerShown(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setIsAnswerShown(true); // Stop timer and show answer
  };

  const goToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(15); // Reset timer
      setIsAnswerShown(false); // Reset answer visibility
    } else {
      setQuizFinished(true);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizFinished && !isAnswerShown) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        handleAnswer(false); // Time's up, mark as incorrect
      }
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizFinished, isAnswerShown]);

  const { width, height } = useWindowSize();
  const shouldShowConfetti = quizFinished && score >= questions.length - 1;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fa8c16',
        },
      }}
    >
      {shouldShowConfetti && <Confetti width={width} height={height} />}
      {!quizStarted ? (
        <WelcomePage onStart={handleStartQuiz} />
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          {/* Użyj nagłówka tylko podczas quizu */}
          {!quizFinished && (
            <Header
              style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/GSK_logo_2022.svg/1200px-GSK_logo_2022.svg.png"
                alt="Logo"
                style={{ height: '30px' }}
              />
            </Header>
          )}

          {/* Pasek postępu */}
          {!quizFinished && quizStarted && (
            <div style={{ padding: '0 15px', marginTop: '10px' }}>
              <Progress
                percent={(timeLeft / 15) * 100}
                showInfo={false}
                strokeColor="#fa8c16"
                status="active"
              />
            </div>
          )}

          <Content
            style={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh', // Rozciąga zawartość na pełen ekran
              background: quizFinished
                ? 'linear-gradient(315deg, #ff9a76 3%, #ff6f42 38%, #ff3e1d 68%, #ffbd80 98%)'
                : 'none',
              animation: quizFinished ? 'gradient 15s ease infinite' : 'none',
            }}
          >
            {questions.length > 0 ? (
              !quizFinished ? (
                <QuestionCard
                  question={questions[currentQuestionIndex]}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  onAnswer={handleAnswer}
                  onNext={goToNextQuestion}
                  isAnswerShown={isAnswerShown} // Pass to QuestionCard
                />
              ) : (
                <Result score={score} totalQuestions={questions.length} />
              )
            ) : (
              <p>Loading questions...</p>
            )}
          </Content>
        </Layout>
      )}
    </ConfigProvider>
  );
};

export default App;