import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayOut from './components/DefaultLayout';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import LoginLayout from './components/LoginLayout';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Rooms from './Pages/Rooms';
import Services from './Pages/Services';
import RoomDetail from './Pages/RoomDetail';
import MyBooking from './Pages/MyBooking';
import PrivateRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './Pages/admin/AdminDashboard.jsx';
import AdminRooms from './Pages/admin/AdminRooms.jsx';
import AdminBookings from './Pages/admin/AdminBookings.jsx';
import AdminLayout from './Pages/admin/AdminLayout.jsx';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* User routes */}
          <Route element={<AppLayOut />}>
            <Route
              path='/'
              element={
                <PrivateRoute role='user'>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <PrivateRoute role='user'>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path='/rooms'
              element={
                <PrivateRoute role='user'>
                  <Rooms />
                </PrivateRoute>
              }
            />
            <Route
              path='/services'
              element={
                <PrivateRoute role='user'>
                  <Services />
                </PrivateRoute>
              }
            />
            <Route
              path='/rooms/:id'
              element={
                <PrivateRoute role='user'>
                  <RoomDetail />
                </PrivateRoute>
              }
            />
            <Route
              path='/my-booking'
              element={
                <PrivateRoute role='user'>
                  <MyBooking />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Admin routes */}
          <Route
            path='/admin'
            element={
              <PrivateRoute role='admin'>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='rooms' element={<AdminRooms />} />
            <Route path='bookings' element={<AdminBookings />} />
          </Route>

          {/* Auth routes */}
          <Route element={<LoginLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '18px 0' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
