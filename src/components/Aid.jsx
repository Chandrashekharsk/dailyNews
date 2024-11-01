// Aid.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './styles/aid.css';

const Aid = ({ setShowAid, closeAid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsJoined(true);
      toast.success("🎉 Congratulations!",
        {position:"bottom-right"}
      );
      setShowAid(false);
    }, 3000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        backgroundColor: '#ffffff',
        padding: '25px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        transition: 'transform 0.3s, opacity 0.3s',
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <button
        onClick={closeAid}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
      >
        ✕
      </button>

      <img
        src="https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D"
        alt="aid"
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
      />
      <h2 style={{ color: 'blueviolet', marginBottom: '10px' }}>Try It For Free</h2>
      <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
        Our live concert is coming up soon! Join to be part of this memorable moment!
      </p>



      <button
        style={{
          backgroundColor: isJoined ? '#5cb85c' : '#6F00FF',
          borderRadius: '8px',
          color: 'white',
          padding: '12px 28px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          cursor: isJoined ? 'default' : 'pointer',
          marginTop: '15px',
          transition: 'background-color 0.3s, transform 0.2s',
          boxShadow: '0 6px 15px rgba(111, 0, 255, 0.3)',
        }}
        onClick={isJoined ? null : handleJoin}
        disabled={isJoined}
      >
        {isLoading
          ? (
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #6F00FF",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                animation: "spin 1s linear infinite"
              }}
            ></div>
          ) : (
            "Join"
          )}

      </button>
      <style>
        {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
      </style>

      {isJoined && <div className="sparkles-animation" />}
    </div>
  );
};

export default Aid;
