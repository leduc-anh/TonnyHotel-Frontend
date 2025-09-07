import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../redux/reducers/userSlice';
import InputField from '../components/InputField';
import DisplayField from '../components/DisplayField';
import { User, Mail, Phone, MapPin } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (token) dispatch(fetchUser());
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (token) {
      dispatch(updateUser(form));
      setEditMode(false);
    } else alert('Bạn cần đăng nhập trước.');
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div
      className='min-h-screen flex items-center justify-center'
      style={{
        backgroundImage: "url('/background2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay mờ để chữ nổi bật */}
      <div className='absolute inset-0 bg-black/50'></div>

      <div className='relative max-w-xl w-full mx-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100'>
          Hồ sơ cá nhân
        </h1>

        {editMode ? (
          <div className='space-y-4'>
            <InputField
              icon={<User size={18} />}
              name='username'
              value={form.username}
              onChange={handleChange}
              placeholder='Tên'
            />
            <InputField
              icon={<Mail size={18} />}
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Email'
            />
            <InputField
              icon={<Phone size={18} />}
              name='phone'
              value={form.phone}
              onChange={handleChange}
              placeholder='Số điện thoại'
            />
            <InputField
              icon={<MapPin size={18} />}
              name='address'
              value={form.address}
              onChange={handleChange}
              placeholder='Địa chỉ'
            />

            <div className='flex gap-4 mt-4'>
              <button
                onClick={handleSave}
                className='flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
              >
                Lưu
              </button>
              <button
                onClick={() => setEditMode(false)}
                className='flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition'
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className='space-y-3'>
            <DisplayField
              icon={<User size={18} />}
              label='Tên'
              value={user?.username}
            />
            <DisplayField
              icon={<Mail size={18} />}
              label='Email'
              value={user?.email}
            />
            <DisplayField
              icon={<Phone size={18} />}
              label='Số điện thoại'
              value={user?.phone}
            />
            <DisplayField
              icon={<MapPin size={18} />}
              label='Địa chỉ'
              value={user?.address}
            />

            <button
              onClick={() => setEditMode(true)}
              className='mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
            >
              Chỉnh sửa
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
