import React from 'react';
import { Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions }) => {
  const handleRestart = () => {
    window.location.reload(); // Simple way to restart the quiz
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
      <Title level={3}>Quiz Completed!</Title>
      <Text>
        You scored {score} out of {totalQuestions}.
      </Text>
      <Button
        type="primary"
        block
        style={{ marginTop: '20px' }}
        onClick={handleRestart}
      >
        Restart Quiz
      </Button>
    </Card>
  );
};

export default Result;
