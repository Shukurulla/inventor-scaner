import axios from "axios";

// Base URL
const BASE_URL = "https://invenmaster.pythonanywhere.com";

// Token refresh function
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${BASE_URL}/user/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;

    if (access) {
      localStorage.setItem("access_token", access);
      return access;
    } else {
      throw new Error("No access token in response");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Clear tokens and redirect to login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
    throw error;
  }
};

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        // Update the authorization header with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default apiClient;

// Export helper functions
export { refreshToken };

// API endpoints using the configured client
export const authAPI = {
  login: (credentials) => apiClient.post("/user/login/", credentials),
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
  },
  refreshToken: () => refreshToken(),
};

export const inventoryAPI = {
  searchByInn: (inn) =>
    apiClient.get(
      `/inventory/equipment/search-by-inn-prefix/?exact_inn=${inn}`
    ),
  // Add other inventory endpoints as needed
};

// Utility function to check if user is logged in
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return !!(accessToken && refreshToken);
};

// Utility function to get current user info (if needed)
export const getCurrentUser = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) return null;

  try {
    // Decode JWT token to get user info (basic decoding)
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
