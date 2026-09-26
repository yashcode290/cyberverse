import React, { useState } from 'react';
import { dbService } from '../../services/dbService';
import { Shield, Lock, Mail, User, UserCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export function LoginPage({ onNavigate, onAuthSuccess, successMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const res = dbService.loginUser({ email, password });
    if (res.success) {
      if (onAuthSuccess) onAuthSuccess(res.user);
      onNavigate(res.user.role === 'Admin' ? '/admin' : '/dashboard');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '1rem' }}>
      <div className="cyber-card" style={{ padding: '2.5rem', background: '#0e1526' }}>
        {/* Logo / Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            onClick={() => onNavigate('/')}
            style={{ background: 'rgba(0, 243, 255, 0.1)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', cursor: 'pointer' }}
            title="Click logo to go Home"
          >
            <Shield size={30} color="#00f3ff" />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '0.25rem' }}>Log In to CyberVerse</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Enter your registered account credentials</p>
        </div>

        {/* Success Notification Alert (e.g. redirected from Signup) */}
        {successMessage && (
          <div style={{ background: 'rgba(0, 255, 102, 0.1)', border: '1px solid rgba(0, 255, 102, 0.3)', padding: '0.85rem 1rem', borderRadius: '8px', color: '#00ff66', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> {successMessage}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div style={{ background: 'rgba(255, 51, 102, 0.12)', border: '1px solid #ff3366', padding: '0.75rem 1rem', borderRadius: '8px', color: '#ff3366', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.35rem' }}>
              Email Address:
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                placeholder="user@cyberverse.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.25)', color: '#ffffff', fontSize: '0.9rem', padding: '0.65rem 0.75rem 0.65rem 2.25rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.35rem' }}>
              Password:
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 243, 255, 0.25)', color: '#ffffff', fontSize: '0.9rem', padding: '0.65rem 0.75rem 0.65rem 2.25rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-cyber-primary" style={{ padding: '0.75rem', justifyContent: 'center', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Log In <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          Don't have an account?{' '}
          <button onClick={() => onNavigate('/signup')} style={{ background: 'none', border: 'none', color: '#00f3ff', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
            Register Student / Admin Account
          </button>
        </div>
      </div>
    </div>
  );
}

export function SignupPage({ onNavigate, onSignupSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    // Register user without auto-login
    const res = dbService.registerUser({ name, email, password, role });
    if (res.success) {
      dbService.logoutUser(); // Ensure user must explicitly log in
      if (onSignupSuccess) {
        onSignupSuccess('Account created successfully! Please log in with your credentials.');
      }
      onNavigate('/login');
    } else {
      setError(res.error);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '2.5rem auto', padding: '1rem' }}>
      <div className="cyber-card" style={{ padding: '2.5rem', background: '#0e1526' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            onClick={() => onNavigate('/')}
            style={{ background: 'rgba(0, 255, 102, 0.1)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', cursor: 'pointer' }}
            title="Click logo to go Home"
          >
            <UserCheck size={30} color="#00ff66" />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#ffffff', marginBottom: '0.25rem' }}>Register Free Account</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Create a Student or Administrator account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 51, 102, 0.12)', border: '1px solid #ff3366', padding: '0.75rem 1rem', borderRadius: '8px', color: '#ff3366', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.35rem' }}>
              Full Name:
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.25)', color: '#ffffff', fontSize: '0.9rem', padding: '0.65rem 0.75rem 0.65rem 2.25rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.35rem' }}>
              Email Address:
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                placeholder="name@cyberverse.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.25)', color: '#ffffff', fontSize: '0.9rem', padding: '0.65rem 0.75rem 0.65rem 2.25rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.35rem' }}>
              Password:
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.25)', color: '#ffffff', fontSize: '0.9rem', padding: '0.65rem 0.75rem 0.65rem 2.25rem', borderRadius: '8px', width: '100%', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600, marginBottom: '0.35rem' }}>
              Account Role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ background: '#050811', border: '1px solid rgba(0, 255, 102, 0.25)', color: '#00ff66', fontWeight: 700, fontSize: '0.88rem', padding: '0.65rem 0.75rem', borderRadius: '8px', width: '100%', outline: 'none' }}
            >
              <option value="Student">Student Explorer</option>
              <option value="Admin">Platform Administrator</option>
            </select>
          </div>

          <button type="submit" className="btn-cyber-green" style={{ padding: '0.75rem', justifyContent: 'center', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            Register Account <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          Already registered?{' '}
          <button onClick={() => onNavigate('/login')} style={{ background: 'none', border: 'none', color: '#00ff66', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
