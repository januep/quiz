import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Progress } from 'antd';
import { green, red } from '@ant-design/colors';
import './App.css';

const { Text } = Typography;

interface QuestionCardProps {
  question: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setShowAnswer(false);
  }, [question]);

  const handleOptionClick = (index: number) => {
    if (showAnswer) return;
    setSelectedOption(index);
    setShowAnswer(true);
    onAnswer(index === question.correctIndex);
  };

  const getButtonType = (index: number) => {
    if (!showAnswer) return 'default';
    if (index === question.correctIndex) return 'primary';
    if (index === selectedOption) return 'dashed';
    return 'default';
  };

  const getButtonStyle = (index: number) => {
    if (!showAnswer) return {};
    if (index === question.correctIndex) {
      return { borderColor: green[6], color: green[6] }; // Green
    }
    if (index === selectedOption) {
      return { borderColor: red[5], color: red[5] }; // Red
    }
    return {};
  };

  const progressPercent = ((questionNumber - 1) / totalQuestions) * 100;
  const progressColorArray = new Array(totalQuestions).fill(green[6]);
  progressColorArray[questionNumber - 1] = red[5]; // For current question

  return (
    <Card
      style={{
        maxWidth: '1080px',
        width: '100%',
        textAlign: 'center',
      }}
      bordered={true}
    >
      {/* Wider Progress Bar */}
      <div style={{ width: '80%', margin: '0 auto', marginBottom: 12 }}>
        <Progress
          percent={progressPercent}
          steps={totalQuestions}
          strokeColor={progressColorArray}
          showInfo={false}
        />
      </div>

      <Text strong>{question.question}</Text>

      {/* Answer Options */}
      <div className="answer-grid">
        {question.options.map((option, index) => (
          <Button
            key={index}
            type={getButtonType(index)}
            className="answer-button"
            onClick={() => handleOptionClick(index)}
            style={{
              ...getButtonStyle(index),
              minHeight: '60px',
              fontSize: '16px',
              padding: '8px',
              whiteSpace: 'normal',
            }}
            disabled={showAnswer}
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      {showAnswer && (
        <Button
          type="primary"
          block
          style={{ marginTop: '20px' }}
          onClick={onNext}
        >
          {questionNumber < totalQuestions ? 'Next' : 'See Results'}
        </Button>
      )}
    </Card>
  );
};

export default QuestionCard;
