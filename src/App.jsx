import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayOut from './components/DefaultLayout';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import LoginLayout from './components/LoginLayout';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayOut />}>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
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
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'white',
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
