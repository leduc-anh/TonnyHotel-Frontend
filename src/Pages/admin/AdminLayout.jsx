import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-white shadow-md'>
        <div className='p-6 text-xl font-bold border-b'>Admin Panel</div>
        <nav className='p-4 space-y-2'>
          <Link
            to='/admin/dashboard'
            className='block px-4 py-2 rounded hover:bg-gray-200'
          >
            Dashboard
          </Link>
          <Link
            to='/admin/rooms'
            className='block px-4 py-2 rounded hover:bg-gray-200'
          >
            Quản lý Phòng
          </Link>
          <Link
            to='/admin/bookings'
            className='block px-4 py-2 rounded hover:bg-gray-200'
          >
            Quản lý Booking
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
