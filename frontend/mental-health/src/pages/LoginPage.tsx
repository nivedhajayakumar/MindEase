import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Welcome to MindEase</h1>
        
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
        />

        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, backgroundColor: '#4CAF50' }}>
            Login as Parent
          </button>
          <button style={{ ...styles.button, backgroundColor: '#2196F3' }}>
            Login as Child
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center',     // Centers vertically
    backgroundImage:
      'url(https://images.unsplash.com/photo-1549194384-4a55c02b4d15)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
  },
  formContainer: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    textAlign: 'center',
    width: '320px',
  },
  heading: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '12px',
    borderRadius: '5px',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default LoginPage;
