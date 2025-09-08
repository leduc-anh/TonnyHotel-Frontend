import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const LoginLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [currentImage, setCurrentImage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = [
    '/picture1.jpg',
    '/picture2.jpg',
    '/picture3.jpg',
    '/picture4.jpg',
    '/picture5.jpg',
  ];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative min-h-screen flex flex-col transition-colors overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`bg-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className='absolute inset-0 bg-black/50 dark:bg-black/60'></div>
      </div>

      <div className='relative z-10 flex flex-col min-h-screen'>
        <header className='bg-white/70 dark:bg-gray-800/70 backdrop-blur shadow-md transition-colors fixed top-0 left-0 w-full z-50'>
          <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
            <Link to='/' className='flex items-center gap-3'>
              <img
                src='/logo.png'
                alt='TonnyHotel Logo'
                className='h-10 w-10 object-contain'
              />
              <h1
                className='text-2xl font-bold bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 bg-clip-text text-transparent'
                style={{ fontFamily: 'Times New Roman, serif' }}
              >
                TonnyHotel
              </h1>
            </Link>
            <div className='hidden md:flex items-center gap-6'>
              <nav className='space-x-4'>
                <Link
                  to='/login'
                  className='text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                >
                  Register
                </Link>
              </nav>
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition'
              >
                {theme === 'light' ? (
                  <Moon className='w-5 h-5 text-gray-800' />
                ) : (
                  <Sun className='w-5 h-5 text-yellow-400' />
                )}
              </button>
            </div>

            <button
              className='md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition'
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {isOpen && (
            <div className='md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-md px-6 py-4 flex flex-col gap-4'>
              <Link
                to='/login'
                onClick={() => setIsOpen(false)}
                className='text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
              >
                Login
              </Link>
              <Link
                to='/register'
                onClick={() => setIsOpen(false)}
                className='text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
              >
                Register
              </Link>
              <button
                onClick={() => {
                  setTheme(theme === 'light' ? 'dark' : 'light');
                  setIsOpen(false);
                }}
                className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition w-fit'
              >
                {theme === 'light' ? (
                  <Moon className='w-5 h-5 text-gray-800' />
                ) : (
                  <Sun className='w-5 h-5 text-yellow-400' />
                )}
              </button>
            </div>
          )}
        </header>

        {/* Main */}
        <main className='flex-grow container mx-auto px-6 py-24 flex gap-6'>
          {/* Left section: hide on mobile */}
          <div className='hidden md:flex flex-1 relative rounded-2xl overflow-hidden shadow-lg flex-col items-center justify-center p-8'>
            <img
              src='/logo.png'
              alt='Hotel Logo'
              className='w-20 h-20 object-contain mb-6'
            />
            <h2
              className='text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 bg-clip-text text-transparent text-center'
              style={{ fontFamily: 'Times New Roman, serif' }}
            >
              Welcome to TonnyHotel
            </h2>
            <p className='text-lg text-white max-w-lg leading-relaxed text-center'>
              Trải nghiệm kỳ nghỉ sang trọng với dịch vụ 5 sao, phòng nghỉ tiện
              nghi và không gian đẳng cấp. Đặt phòng ngay hôm nay để tận hưởng
              những khoảnh khắc tuyệt vời.
            </p>
          </div>

          <div className='w-full md:w-1/3 rounded-2xl shadow-xl md:p-8 flex items-center justify-center'>
            <div className='w-full max-w-md'>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginLayout;
