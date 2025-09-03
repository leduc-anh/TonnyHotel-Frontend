import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../redux/reducers/useReducer'; // nhớ đúng file reducer
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // lưu token & user vào localStorage
      localStorage.setItem('user', JSON.stringify(res.data));

      // cập nhật redux
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
    <div className='flex justify-center items-center min-h-[70vh]'>
      <form
        onSubmit={handleSubmit}
        className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-96 transition-colors'
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white'>
          Login
        </h2>

        <input
          type='email'
          placeholder='Email'
          className='w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition'
        >
          {loading ? 'Đang đăng nhập...' : 'Login'}
        </button>

        <p className='text-sm text-center text-gray-500 dark:text-gray-300 mt-4'>
          Chưa có tài khoản?{' '}
          <a href='/register' className='text-blue-500 hover:underline'>
            Đăng ký
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
