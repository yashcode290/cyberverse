// Service abstraction layer prepared for Node.js / Express REST API backend

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const api = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cyberverse_token') || ''}`
        }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return { success: true, data };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network request failed';
      return { success: false, error: message };
    }
  },

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('cyberverse_token') || ''}`
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return { success: true, data };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network request failed';
      return { success: false, error: message };
    }
  }
};
