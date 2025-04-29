import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Untuk menghubungkan dengan halaman register

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika login ke backend di sini
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <input
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        
        <input
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        
        <button type="submit" style={styles.button}>
          Masuk
        </button>

        {/* Link ke halaman Register */}
        <div style={styles.linkContainer}>
          <p>Belum punya akun? <Link to="/register" style={styles.link}>Daftar di sini</Link></p>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#0b7a35',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0b7a35',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#0b7a35',
    color: 'white',
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  linkContainer: {
    textAlign: 'center',
  },
  link: {
    color: '#0b7a35',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;
