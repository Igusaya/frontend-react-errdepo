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

const apiParamFactry = (obj: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) => {
  return obj.email
    ? { ...obj }
    : {
        username: obj.username,
        password1: obj.password1,
        password2: obj.password2
      };
};

export const signUpFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig
  };
  console.log('SignUpFactory config:', config);
  const instance = axios.create(config);

  const signUp = async (
    userName: string,
    email: string,
    password1: string,
    password2: string
  ) => {
    const response = await instance.post(
      'api/v1/rest-auth/registration/',
      apiParamFactry({
        username: userName,
        email: email,
        password1: password1,
        password2: password2
      })
    );
    if (response.status !== 201) {
      throw new Error('Server Error');
    }
    const key = response.data.key;
    localStorage.setItem('todolistsbackendkey', key);
    return key;
  };
  return signUp;
};
