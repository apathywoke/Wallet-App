import './App.css';
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { HomeTest } from '@/pages/home/ui/HomeTest';
import { Login } from '@/pages/auth/login';
import { Register } from '@/pages/auth/register';
import { Dashboard } from '@/pages/dashboard';
import { NotFound } from '@/pages/not-found';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/app/providers/ToastProvider.tsx';
import { UserInitializer } from '@/app/providers/UserInitializer';
import { I18nProvider } from '@/shared/lib/i18n';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ToastProvider>
          <UserInitializer>
            <Routes>
              <Route index element={<HomeTest />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserInitializer>
        </ToastProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
};

export default App;