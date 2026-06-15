import { PUBLIC_API_BASE } from '$env/static/public';

export function createPayloadClient({ baseUrl, token }: { baseUrl?: string; token?: string }) {
  const apiBase = baseUrl || PUBLIC_API_BASE || 'http://localhost:4000';

  return {
    request: async (args: any) => {
      const url = args.url || `${apiBase}${args.path}`;
      const options: RequestInit = {
        method: args.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...args.headers,
        },
        body: args.body ? JSON.stringify(args.body) : undefined,
        credentials: 'include',
      };

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
  };
}
