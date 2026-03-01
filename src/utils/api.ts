const BASE_URL = '/api/v1';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const handleResponse = async (response: Response) => {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    // We don't redirect to /login because this is a SPA with custom view state.
    // The UI should handle this by checking for token or catching the error.
    throw new Error('Unauthorized');
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || 'An error occurred');
  }

  return data;
};

const getHeaders = (customHeaders?: Record<string, string>) => {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  get: async <T = any>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers: getHeaders(options?.headers),
    });
    return handleResponse(response);
  },

  post: async <T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: getHeaders(options?.headers),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse(response);
  },

  put: async <T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers: getHeaders(options?.headers),
      body: body ? JSON.stringify(body) : undefined,
    });
    return handleResponse(response);
  },

  delete: async <T = any>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
      headers: getHeaders(options?.headers),
    });
    return handleResponse(response);
  },
};
