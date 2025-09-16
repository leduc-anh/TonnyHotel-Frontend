import { cn } from '../lib/utils';

import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayOut() {
  return (
    <>
      <Header />
      <div className={cn('flex flex-col min-h-screen')}>
        <main className={cn('flex-1 dark:bg-gray-800 dark:text-white')}>
          <Outlet />
        </main>
        <footer
          className={cn(
            'dark:bg-gray-800 dark:text-white p-4 text-center bg-gray-100 text-gray-700',
          )}
        >
          © 2025 TonnyHotel. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default AppLayOut;
