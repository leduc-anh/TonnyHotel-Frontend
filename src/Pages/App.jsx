import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppLayOut from '../components/DefaultLayout';
import { Toaster } from 'react-hot-toast';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  })


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AppLayOut />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center"
          gutter={12}
          containerStyle={{ margin: "18px 0" }}
          toastOptions={{
            success: {
              duration: 3000,
            }, error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
            }
          }}
        />
      </QueryClientProvider>
    </>
  )
}

export default App
