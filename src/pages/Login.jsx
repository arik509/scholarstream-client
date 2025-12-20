import { Link, useNavigate, useLocation } from 'react-router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginUser(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login with Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-secondary/10 to-primary/10 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Login to access your account</p>
          </div>

          {error && (
            <div className="alert alert-error mb-6">
              <span className="text-sm">Invalid Credentials!</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:border-primary focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full focus:border-primary focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-primary">
                  Forgot password?
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Login'}
            </button>
          </form>

          <div className="divider my-6">OR</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full border-2 hover:bg-gray-50"
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
