import axios from 'axios';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : '',
  timeout: process.env.REACT_APP_BACKEND_TIMEOUT
    ? parseInt(process.env.REACT_APP_BACKEND_TIMEOUT)
    : 0
};

export const signOutFactory = (optionConfig?: ApiConfig) => {
  const token = localStorage.getItem('todolistsbackendkey');
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
    headers: {
      Authorization: 'Token ' + token
    }
  };
  const instance = axios.create(config);

  const signIn = async () => {
    try {
      await instance.post('api/v1/rest-auth/logout/', {});
      localStorage.removeItem('todolistsbackendkey');
    } catch (error) {
      throw new Error(
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: ' +
          error.response.status
      );
    }
  };
  return signIn;
};
