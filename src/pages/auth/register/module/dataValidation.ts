import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(7),
  confirmPassword: z.string().min(7),
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords much match",
      path: ["confirmPassword"],
    });
  }
});

export type RegisterFormFillRequiring = z.infer<typeof registerSchema>;