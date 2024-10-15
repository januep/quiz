import React from 'react';
import { Button } from 'antd';
import './WelcomePage.css';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">A-team & FLP Quiz</h1>
        <p className="welcome-subtitle">Zgarnij cukierka i naklejkę!</p>
        <Button type="default" size="large" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
