import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import api from '../../api/api';

const Verify2FA = () => {
  const [email, setEmail] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleVerify2FA = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/verify-2fa', { email, twoFactorCode });
      setAuth({ user: response.data.user, token: response.data.token });
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Verify 2FA</h2>
      <form onSubmit={handleVerify2FA}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="2FA Code"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Verify2FA;
