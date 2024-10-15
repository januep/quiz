import React, { useState, useEffect } from 'react';
import { Card, Typography, Button } from 'antd';
import './App.css'; // Ensure this is imported to include the CSS

const { Title, Text } = Typography;

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
      return { borderColor: '#52c41a', color: '#52c41a' }; // Green
    }
    if (index === selectedOption) {
      return { borderColor: '#ff4d4f', color: '#ff4d4f' }; // Red
    }
    return {};
  };

  return (
    <Card
      style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
      }}
      bordered={false}
    >
      <Title level={4}>
        Question {questionNumber}/{totalQuestions}
      </Title>
      <Text strong>{question.question}</Text>

      {/* Answer Options */}
      <div className="answer-grid">
        {question.options.map((option, index) => (
          <Button
            key={index}
            type={getButtonType(index)}
            className="answer-button"
            onClick={() => handleOptionClick(index)}
            style={getButtonStyle(index)}
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
