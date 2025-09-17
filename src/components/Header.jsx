import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

function Header() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark',
  );
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle
  const navigate = useNavigate();
  const { user: reduxUser } = useSelector((state) => state.user);
  // Lấy user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header
      className='fixed top-0 left-0 w-full z-50 flex justify-between items-center 
                 px-6 md:px-8 py-4 transition-colors duration-500 ease-in-out 
                 dark:bg-black/10 bg-white/90  dark:text-white/80 text-black/80'
    >
      <Link
        to='/'
        className='flex items-center text-2xl font-extrabold tracking-wide'
      >
        <img
          src='/logo.png'
          alt='TonnyHotel Logo'
          className='inline h-10 w-10 object-contain mr-2'
        />
        <span
          className='bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 bg-clip-text text-transparent'
          style={{ fontFamily: 'Times New Roman, serif' }}
        >
          TonnyHotel
        </span>
      </Link>

      {/* Desktop Menu */}
      <nav className='hidden md:flex items-center gap-6 text-lg font-medium'>
        <Link to='/rooms' className='hover:scale-110 transition-transform'>
          Phòng
        </Link>
        <Link to='/services' className='hover:scale-110 transition-transform'>
          Dịch vụ
        </Link>
        <Link to='/contact' className='hover:scale-110 transition-transform'>
          Liên hệ
        </Link>

        {user ? (
          <>
            <Link
              to='/my-booking'
              className='hover:scale-110 transition-transform'
            >
              Phòng đã đặt
            </Link>
            <Link
              to='/profile'
              className='flex items-center gap-2 hover:scale-105 transition-transform'
            >
              <div className='w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black'>
                {reduxUser?.username
                  ? reduxUser.username.charAt(0).toUpperCase()
                  : 'U'}
              </div>
              <span className='font-medium'>
                {reduxUser?.username || 'Khách'}
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className='hover:scale-110 transition-transform'
            >
              <LogOut size={18} className='inline mr-1' />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='hover:scale-110 transition-transform'>
              Đăng nhập
            </Link>
            <Link
              to='/register'
              className='hover:scale-110 transition-transform'
            >
              Đăng ký
            </Link>
          </>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className='ml-2 p-2 rounded-full hover:bg-white/20'
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      <button
        className='md:hidden p-2 rounded hover:bg-white/20'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div
          className='absolute top-0 right-0 h-screen w-64 bg-black/95 backdrop-blur-md 
                      shadow-xl flex flex-col p-6 gap-6 text-lg md:hidden transition-all text-black/80 dark:text-white/80'
        >
          <div className='flex items-center gap-3 border-b border-white/20 pb-4'>
            <Link
              to='/profile'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3'
            >
              <div className='w-9 h-9 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-black'>
                {reduxUser?.username
                  ? reduxUser.username.charAt(0).toUpperCase()
                  : 'U'}
              </div>
              <span className='font-medium'>
                {reduxUser?.username || 'Khách'}
              </span>
            </Link>
          </div>

          {/* Menu */}
          <Link
            to='/rooms'
            onClick={() => setIsOpen(false)}
            className='hover:scale-105 transition-transform'
          >
            Phòng
          </Link>
          <Link
            to='/services'
            onClick={() => setIsOpen(false)}
            className='hover:scale-105 transition-transform'
          >
            Dịch vụ
          </Link>
          <Link
            to='/contact'
            onClick={() => setIsOpen(false)}
            className='hover:scale-105 transition-transform'
          >
            Liên hệ
          </Link>

          {user ? (
            <>
              <Link
                to='/bookings'
                onClick={() => setIsOpen(false)}
                className='hover:scale-105 transition-transform'
              >
                Phòng đã đặt
              </Link>
              <button
                onClick={handleLogout}
                className='flex items-center gap-2 hover:scale-105 transition-transform'
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                onClick={() => setIsOpen(false)}
                className='hover:scale-105 transition-transform'
              >
                Đăng nhập
              </Link>
              <Link
                to='/register'
                onClick={() => setIsOpen(false)}
                className='hover:scale-105 transition-transform'
              >
                Đăng ký
              </Link>
            </>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className='mt-auto p-2 rounded-full hover:bg-white/20 w-fit'
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
