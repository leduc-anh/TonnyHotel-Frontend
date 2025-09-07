import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../redux/reducers/userSlice/';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      dispatch(loginSuccess(res.data));
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(
        err.response?.data?.message || 'Đăng nhập thất bại, thử lại!',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[70vh] animate-slideUp opacity-0'>
      <form
        onSubmit={handleSubmit}
        className='bg-none dark:bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 transition-colors border border-gray-200 dark:border-gray-700'
      >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 bg-clip-text text-transparent'>
          Welcome Back
        </h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Email
          </label>
          <div className='relative'>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className='absolute left-3 top-3 text-gray-400'>📧</span>
          </div>
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Password
          </label>
          <div className='relative'>
            <input
              type='password'
              placeholder='password'
              className='w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='absolute left-3 top-3 text-gray-400'>🔒</span>
          </div>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600  text-black py-3 rounded-lg hover:opacity-90 shadow-lg hover:shadow-xl transition disabled:opacity-60'
        >
          {loading ? 'Đang đăng nhập...' : 'Login'}
        </button>
        <div className='flex items-center my-6'>
          <hr className='flex-grow border-gray-300 dark:border-gray-600' />
          <span className='mx-2 text-gray-400 text-sm'>OR</span>
          <hr className='flex-grow border-gray-300 dark:border-gray-600' />
        </div>
        <p className='text-sm text-center text-gray-600 dark:text-gray-300'>
          Chưa có tài khoản?{' '}
          <Link
            to='/register'
            className='text-blue-500 hover:text-purple-500 font-semibold transition'
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
