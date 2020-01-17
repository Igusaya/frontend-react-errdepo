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

export const signInFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig
  };
  const instance = axios.create(config);

  const signIn = async (userName: string, password: string) => {
    const response = await instance.post('api/v1/rest-auth/login/', {
      username: userName,
      password: password
    });
    if (response.status !== 200) {
      throw new Error('Server Error');
    }
    const key = response.data.key;
    localStorage.setItem('todolistsbackendkey', key);
  };
  return signIn;
};
