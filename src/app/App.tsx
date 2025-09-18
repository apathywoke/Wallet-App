import './App.css';
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { Login } from '@/pages/auth/login'
import { Register } from '@/pages/auth/register'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // создаем клиент React Query

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route index element={<Login />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Register />}></Route>
    </Routes>
    </QueryClientProvider>
  );
};

export default App;
