import { z } from 'zod';

// Schema para login
export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email ou CPF é obrigatório')
    .refine(
      (value) => {
        // Valida se é email ou CPF
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return emailRegex.test(value) || cpfRegex.test(value);
      },
      'Digite um email válido ou CPF no formato 000.000.000-00'
    ),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
});

// Schema para registro
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .refine(
      (value) => /^[a-zA-ZÀ-ÿ\s]+$/.test(value),
      'Nome deve conter apenas letras e espaços'
    ),
  email: z
    .string()
    .email('Digite um email válido')
    .max(100, 'Email deve ter no máximo 100 caracteres'),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato 000.000.000-00')
    .refine(
      (value) => {
        // Remove pontos e traços para validação
        const cleanCpf = value.replace(/[.-]/g, '');
        return cleanCpf.length === 11 && !/^(\d)\1{10}$/.test(cleanCpf);
      },
      'CPF inválido'
    ),
  password: z
    .string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    ),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  }
);

// Schema para 2FA
export const twoFASchema = z.object({
  code: z
    .string()
    .length(6, 'Código deve ter exatamente 6 dígitos')
    .regex(/^\d{6}$/, 'Código deve conter apenas números'),
});

// Tipos inferidos dos schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TwoFAFormData = z.infer<typeof twoFASchema>; 