import React from 'react';
import { Button, Result as AntResult, Typography } from 'antd';

const { Text, Link } = Typography;

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions }) => {
  const handleRestart = () => {
    window.location.reload(); // Simple way to restart the quiz
  };

  const isSuccess = score >= totalQuestions - 1; // Success if score is totalQuestions or one less

  return (
    <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
      <AntResult
        status={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Gratulacje!' : 'Better Luck Next Time!'}
        subTitle={
          isSuccess
            ? `Udało Ci się zdobyć ${score} punktów z ${totalQuestions}! Zapraszamy po odbiór nagrody!`
            : `You scored ${score} out of ${totalQuestions}. Try again to improve your score!`
        }
        extra={[
          <Button type="default" key="restart" onClick={handleRestart}>
            Restartuj
          </Button>,
        ]}
      />
      <Text type="secondary">©GSK | Jan Mańczak</Text>
    </div>
  );
};

export default Result;