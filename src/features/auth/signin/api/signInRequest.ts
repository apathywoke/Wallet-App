import { apiInstance } from '@/shared/api/base'

export const signInRequest = (data: { email: string; password:string }) =>
apiInstance.post("/auth/login", data);