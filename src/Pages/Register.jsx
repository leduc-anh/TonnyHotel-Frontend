import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.fullname || !form.email || !form.password) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/auth/register', form);
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      toast.error(err.response?.data?.message || 'Đăng ký thất bại, thử lại!');
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
          Create Account
        </h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Username
          </label>
          <input
            type='text'
            name='username'
            placeholder='Nhập username'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Full name
          </label>
          <input
            type='text'
            name='fullname'
            placeholder='Họ và tên'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Email
          </label>
          <input
            type='email'
            name='email'
            placeholder='example@mail.com'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='••••••••'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            onChange={handleChange}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Phone
          </label>
          <input
            type='text'
            name='phone'
            placeholder='Số điện thoại'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            onChange={handleChange}
          />
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1'>
            Address
          </label>
          <input
            type='text'
            name='address'
            placeholder='Địa chỉ'
            className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600'
            onChange={handleChange}
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 text-black py-3 rounded-lg hover:opacity-90 shadow-lg hover:shadow-xl transition disabled:opacity-60'
        >
          {loading ? 'Đang đăng ký...' : 'Register'}
        </button>

        <div className='flex items-center my-6'>
          <hr className='flex-grow border-gray-300 dark:border-gray-600' />
          <span className='mx-2 text-gray-400 text-sm'>OR</span>
          <hr className='flex-grow border-gray-300 dark:border-gray-600' />
        </div>

        <p className='text-sm text-center text-gray-600 dark:text-gray-300'>
          Đã có tài khoản?{' '}
          <a
            href='/login'
            className='text-blue-500 hover:text-purple-500 font-semibold transition'
          >
            Đăng nhập ngay
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
