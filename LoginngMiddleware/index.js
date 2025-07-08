const API = 'http://20.244.56.144/evaluation-service/logs';

export async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
    return await res.json();
  } catch (e) {
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