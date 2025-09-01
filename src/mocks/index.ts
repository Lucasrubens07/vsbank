async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./browser');
  
  // Inicia o worker do MSW
  return worker.start({
    onUnhandledRequest: 'bypass', // Ignora requisições não tratadas
  });
}

export default enableMocking; 