import axios from 'axios';
import { Profile } from './model';

import {
  signUpMessageToJp,
  signUpParamFactry
} from 'service/backend-django-rest-todolists/util';

/* Interface
 ***********************************************/
interface ApiConfig {
  baseURL: string;
  timeout: number;
}

/* Interface
 ***********************************************/
const DEFAULT_API_CONFIG: ApiConfig = {
  baseURL: process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL
    : '',
  timeout: process.env.REACT_APP_BACKEND_TIMEOUT
    ? parseInt(process.env.REACT_APP_BACKEND_TIMEOUT)
    : 0
};

/**
 * Post {baseURL}/api/v1/rest-auth/login/
 * @param optionConfig
 ***********************************************/
export const signInFactory = (optionConfig?: ApiConfig) => {
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig
  };
  const instance = axios.create(config);

  const signIn = async (userName: string, password: string) => {
    try {
      const response = await instance.post('api/v1/rest-auth/login/', {
        username: userName,
        password: password
      });
      const key = response.data.key;
      localStorage.setItem('todolistsbackendkey', key);
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error('資格情報が誤ってます');
      }
      throw new Error(
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: ' +
          error.response.status
      );
    }
  };
  return signIn;
};

/**
 * Post {baseURL}/api/v1/rest-auth/registration/
 * @param optionConfig
 ***********************************************/
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
    try {
      const response = await instance.post(
        'api/v1/rest-auth/registration/',
        signUpParamFactry({
          username: userName,
          email: email,
          password1: password1,
          password2: password2
        })
      );
      const key = response.data.key;
      localStorage.setItem('todolistsbackendkey', key);
    } catch (error) {
      if (error.response.status === 400) {
        let msg = '';
        for (let k of Object.keys(error.response.data)) {
          for (let v of error.response.data[k]) {
            msg += signUpMessageToJp(v);
          }
        }
        // TODO: 出来たらオブジェクト型で投げて各項目のエラー出力場所に出力したい
        throw new Error(msg);
      }
      throw new Error(
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: ' +
          error.response.status
      );
    }
  };
  return signUp;
};

/**
 * Post {baseURL}/api/v1/rest-auth/logout/
 * @param optionConfig
 ***********************************************/
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

/**
 * Get {baseURL}/profile/
 * @param optionConfig
 ***********************************************/
export const getProfileFactory = (optionConfig?: ApiConfig) => {
  const token = localStorage.getItem('todolistsbackendkey');
  const config = {
    ...DEFAULT_API_CONFIG,
    ...optionConfig,
    headers: {
      Authorization: 'Token ' + token
    }
  };
  const instance = axios.create(config);

  const getProfile = async () => {
    try {
      const response = await instance.get('profile/', {});
      const profile: Profile = response.data[0];
      return { profile };
    } catch (error) {
      throw new Error(
        'ただいま混み合っております。時間をおいて再度お試しください。 API status: ' +
          error.response.status
      );
    }
  };
  return getProfile;
};
