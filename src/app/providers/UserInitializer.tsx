import type { FC, ReactNode } from 'react';
import { useInitializeUser } from '@/entities/user/model/useInitializeUser';
import { useTokenValidation } from '@/entities/user/model/useTokenValidation';

interface UserInitializerProps {
  children: ReactNode;
}

export const UserInitializer: FC<UserInitializerProps> = ({ children }) => {
  useInitializeUser();
  useTokenValidation();
  
  return <>{children}</>;
};
