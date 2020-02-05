/**
 * signUp関数用パラメーターファクトリー
 * @param obj
 */
export const signUpParamFactry = (obj: {
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

/**
 * signUp関数用返却値翻訳
 * @param msg
 */
export const signUpMessageToJp = (msg: string): string => {
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

/**
 * 2020-01-30T14:07:17.059986+09:00
 * to
 * 2020-01-30 14:07:17
 * @param time
 */
export const normalizationTime = (time: string): string => {
  //2020-01-30T14:07:17.059986+09:00
  let result = time.replace(/\..+/, '').replace(/T/, ' ');
  return result;
};
