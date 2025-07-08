const API = 'http://20.244.56.144/evaluation-service/logs';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlc2hhYWJoYXNpbjRAZ21haWwuY29tIiwiZXhwIjoxNzUxOTUxODkxLCJpYXQiOjE3NTE5NTA5OTEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwNjkwYjk4Mi01ZjQ2LTRmZGUtOGM3Zi0xNzIzNzk3YTc2ZmUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJlc2hhYSBiaGFzaW4iLCJzdWIiOiI0NjVmNzM3ZC1hNzVhLTQ0NDgtYWFjNy1mNzFkOGJmMzM1OTYifSwiZW1haWwiOiJlc2hhYWJoYXNpbjRAZ21haWwuY29tIiwibmFtZSI6ImVzaGFhIGJoYXNpbiIsInJvbGxObyI6IjA4OTc2ODAyNzIyIiwiYWNjZXNzQ29kZSI6IlZQcHNtVCIsImNsaWVudElEIjoiNDY1ZjczN2QtYTc1YS00NDQ4LWFhYzctZjcxZDhiZjMzNTk2IiwiY2xpZW50U2VjcmV0IjoiU2FKWnRmRE5RYXZoSG5jZSJ9.a2EAN5oToAqHYPC7Rh4tqDuGV7jaqLTc2qofZRF8VVA';

export async function Log(stack, level, pkg, message) {
  try {
    console.log('Sending log:', { stack, level, package: pkg, message });
    const res = await fetch(API, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
    const result = await res.json();
    console.log('Log response:', result);
    return result;
  } catch (e) {
    console.error('Log error:', e);
    console.log(`[${stack}][${level}][${pkg}] ${message}`);
  }
}

export const FrontendLogger = {
  component: {
    debug: (msg) => Log('frontend', 'debug', 'component', msg),
    info: (msg) => Log('frontend', 'info', 'component', msg),
    warn: (msg) => Log('frontend', 'warn', 'component', msg),
    error: (msg) => Log('frontend', 'error', 'component', msg)
  },
  api: {
    debug: (msg) => Log('frontend', 'debug', 'api', msg),
    info: (msg) => Log('frontend', 'info', 'api', msg),
    warn: (msg) => Log('frontend', 'warn', 'api', msg),
    error: (msg) => Log('frontend', 'error', 'api', msg)
  },
  utils: {
    debug: (msg) => Log('frontend', 'debug', 'utils', msg),
    info: (msg) => Log('frontend', 'info', 'utils', msg),
    warn: (msg) => Log('frontend', 'warn', 'utils', msg),
    error: (msg) => Log('frontend', 'error', 'utils', msg)
  },
  page: {
    debug: (msg) => Log('frontend', 'debug', 'page', msg),
    info: (msg) => Log('frontend', 'info', 'page', msg),
    warn: (msg) => Log('frontend', 'warn', 'page', msg),
    error: (msg) => Log('frontend', 'error', 'page', msg)
  }
};

export default Log;