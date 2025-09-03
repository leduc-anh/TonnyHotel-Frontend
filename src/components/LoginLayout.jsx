import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react'; // icon đẹp, cài: pnpm add lucide-react

const LoginLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors'>
      {/* Header */}
      <header className='bg-white dark:bg-gray-800 shadow-md transition-colors'>
        <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
            TonnyHotel
          </h1>
          <div className='flex items-center gap-4'>
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

            {/* Nút toggle theme */}
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
        </div>
      </header>

      {/* Nội dung chính */}
      <main className='flex-grow container mx-auto px-6 py-8 flex items-center justify-center'>
        <div className='w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-colors'>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 text-center text-gray-500 dark:text-gray-400 transition-colors'>
        © 2025 TonnyHotel. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginLayout;
