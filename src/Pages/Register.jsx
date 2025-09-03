import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-lg shadow-md w-96'
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>

        <input
          type='text'
          name='username'
          placeholder='Username'
          className='w-full p-2 mb-3 border rounded'
          onChange={handleChange}
        />

        <input
          type='text'
          name='fullname'
          placeholder='Full name'
          className='w-full p-2 mb-3 border rounded'
          onChange={handleChange}
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          className='w-full p-2 mb-3 border rounded'
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='w-full p-2 mb-3 border rounded'
          onChange={handleChange}
        />

        <input
          type='text'
          name='phone'
          placeholder='Phone'
          className='w-full p-2 mb-3 border rounded'
          onChange={handleChange}
        />

        <input
          type='text'
          name='address'
          placeholder='Address'
          className='w-full p-2 mb-3 border rounded'
          onChange={handleChange}
        />

        <button
          type='submit'
          className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
