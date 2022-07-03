const defaults = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const http = async (url, method, path, options = {}) => {
  try {
    const init = {
      ...options,
      method: method.toUpperCase(),
      headers: {
        ...defaults.headers,
        ...options.headers,
      }
    };
    const response = await fetch(`${url}/${path}`, init);

    return await response.json();
  } catch ({ message }) {
    return {
      statusCode: 500,
      message
    };
  }
};

export const get = async (url, path, options) => http(url, 'GET', path, options);

export const post = async (url, path, body, options = {}) => {
  options = {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...options
  };

  return http(url, 'POST', path, options);
};

export const patch = async (url, path, body, options = {}) => {
  options = {
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...options
  };

  return http(url, 'PATCH', path, options);
};

export const del = async (url, path, options) => http(url, 'DELETE', path, options);
