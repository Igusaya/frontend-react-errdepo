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
    try {
      const response = await instance.post(
        'api/v1/rest-auth/registration/',
        apiParamFactry({
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
            msg += toJp(v);
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

const toJp = (msg: string): string => {
  switch (msg) {
    case 'A user with that username already exists.':
      return 'Nameが他の人とかぶってます\n';
    case 'A user is already registered with this e-mail address.':
      return 'Emailが他の人とかぶってます\n';
    case 'This password is too common.':
      return 'パスワードはもうちょっとひねってください\n';
    default:
      return msg;
  }
};
