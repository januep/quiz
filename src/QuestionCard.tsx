import React, { useState } from 'react';
import { Card, Typography, Button, Space } from 'antd';

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
      <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
        {question.options.map((option, index) => (
          <Button
            key={index}
            type={getButtonType(index)}
            block
            onClick={() => handleOptionClick(index)}
            style={getButtonStyle(index)}
            disabled={showAnswer}
          >
            {option}
          </Button>
        ))}
      </Space>

      {/* Next Button */}
      {showAnswer && (
        <Button
          type="primary"
          block
          style={{ marginTop: '20px' }}
          onClick={onNext}
        >
          Next
        </Button>
      )}
    </Card>
  );
};

export default QuestionCard;
