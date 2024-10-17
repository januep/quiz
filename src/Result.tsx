import React from 'react';
import { Button, Result as AntResult, Typography } from 'antd';
import { FrownOutlined, TrophyOutlined } from '@ant-design/icons';

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
                icon={
                    isSuccess ? (
                        <TrophyOutlined style={{ fontSize: '64px', color: '#faad14' }} />
                    ) : (
                        <FrownOutlined style={{ fontSize: '64px', color: '#111' }} /> // Sad icon for failure
                    )
                }
                title={isSuccess ? 'Congratulations!' : 'Better Luck Next Time!'}
                subTitle={
                    isSuccess
                        ? `You scored ${score} points out of ${totalQuestions}! Claim your reward!`
                        : `You scored ${score} out of ${totalQuestions}. Try again to improve your score!`
                }
                extra={[
                    <Button type="default" ghost key="restart" onClick={handleRestart}>
                        Restart
                    </Button>,
                ]}
            />
            <Text type="secondary">©GSK | Jan Mańczak</Text>
        </div>
    );
};

export default Result;