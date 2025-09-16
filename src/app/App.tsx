import './App.css';
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { LogIn } from '@/pages/auth/logIn'
import { SignUp } from '@/pages/auth/signUp'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route index element={<LogIn />} />
      <Route path="/sign-in" element={<LogIn />} />
      <Route path="/sign-up" element={<SignUp />}></Route>
    </Routes>
  );
};

export default App;
