import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configura o worker do MSW para interceptar requisições
export const worker = setupWorker(...handlers); 