// WelcomePage.tsx
import React from 'react';
import { Button, Layout } from 'antd';
import './WelcomePage.css';

interface WelcomePageProps {
    onStart: () => void;
}

const { Header } = Layout;

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
    return (
        <div className="welcome-container">
            {/* Header with Logo */}
            <Header
                style={{
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2,
                    borderBottomLeftRadius: '20px', // Rounds the bottom-left corner
                    borderBottomRightRadius: '20px', // Rounds the bottom-right corner
                }}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/GSK_logo_2022.svg/1200px-GSK_logo_2022.svg.png"
                    alt="Logo"
                    style={{
                        height: '30px',
                        // filter: 'drop-shadow(3px 5px 7px rgba(0, 0, 0, 0.8))', // Shadow effect
                    }}
                />
            </Header>



            <div className="welcome-content">
                <h1 className="welcome-title">
                    <span>FLP & A-team</span>
                    <span>QUIZ</span>
                </h1>
                <p className="welcome-subtitle">Take a quick test of your knowledge!</p>
                <Button type="default" ghost size="large" onClick={onStart}>
                    Start
                </Button>
            </div>

            {/* Wave Effect */}
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
        </div>
    );
};

export default WelcomePage;
