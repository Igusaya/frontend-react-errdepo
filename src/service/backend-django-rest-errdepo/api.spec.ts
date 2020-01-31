import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  signInFactory,
  signUpFactory,
  signOutFactory,
  putProfileFactory,
  getProfileFactory,
  getLangFactory,
  getConfirmFactory,
  postReportFactory,
  getReportFactory
} from 'service/backend-django-rest-errdepo/api';
import { getLang } from 'actions/report';

/* Local storage set up
 ***********************************************/
const localStorageMock = (() => {
  let store: {
    [prop: string]: string;
  } = {};

  return {
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, val: string) => {
      store[key] = val;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

/* Test
 ***********************************************/
describe('backend-django-rest-errdepo API handlers', () => {
  // axiosのモックを生成
  const mock = new MockAdapter(axios);
  // モック内のレスポンスデータが引き継がれないようにresetする
  afterEach(() => {
    mock.reset();
  });
  localStorage.clear;

  /* Sign in test
   ***********************************************/
  describe('Posting sign in', () => {
    it('should succeed', async () => {
      mock
        .onPost('api/v1/rest-auth/login/', {
          username: 'test',
          password: 'pass'
        })
        .reply(200, { key: 'tokenkey' });
      const signIn = signInFactory();
      await signIn('test', 'pass');

      const key = localStorage.getItem('todolistsbackendkey');
      expect(key).toBe('tokenkey');
    });
    it('should fail with 400', async () => {
      mock
        .onPost('api/v1/rest-auth/login/', {
          username: 'test',
          password: 'pass'
        })
        .reply(400);
      const signIn = signInFactory();
      try {
        await signIn('test', 'pass');
      } catch (error) {
        expect(error.message).toBe('資格情報が誤ってます');
      }
    });
    it('should fail with 500', async () => {
      mock
        .onPost('api/v1/rest-auth/login/', {
          username: 'test',
          password: 'pass'
        })
        .reply(500);
      const signIn = signInFactory();
      try {
        await signIn('test', 'pass');
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Sign up test
   ***********************************************/
  describe('Posting sign up', () => {
    it('should succeed', async () => {
      mock
        .onPost('api/v1/rest-auth/registration/', {
          username: 'test',
          email: 'email',
          password1: 'pass1',
          password2: 'pass2'
        })
        .reply(200, { key: '298208b501174fbb738b13a7c0b8eb63aaa4e6a2' });
      const signUp = signUpFactory();
      await signUp('test', 'email', 'pass1', 'pass2');

      const key = localStorage.getItem('todolistsbackendkey');
      expect(key).toBe('298208b501174fbb738b13a7c0b8eb63aaa4e6a2');
    });
    it('should fail with 400', async () => {
      mock
        .onPost('api/v1/rest-auth/registration/', {
          username: 'test',
          email: 'email',
          password1: 'pass1',
          password2: 'pass2'
        })
        .reply(400, {
          username: ['A user with that username already exists.'],
          email: ['A user is already registered with this e-mail address.'],
          password1: ['This password is too common.']
        });
      const signUp = signUpFactory();
      try {
        const key = await signUp('test', 'email', 'pass1', 'pass2');
      } catch (error) {
        expect(error.message).toBe(
          'Nameが他の人とかぶってます\nEmailが他の人とかぶってます\nパスワードはもうちょっとひねってください\n'
        );
      }
    });
    it('should fail with 500', async () => {
      mock
        .onPost('api/v1/rest-auth/registration/', {
          username: 'test',
          email: 'email',
          password1: 'pass1',
          password2: 'pass2'
        })
        .reply(500);
      const signUp = signUpFactory();
      try {
        const key = await signUp('test', 'email', 'pass1', 'pass2');
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Sign Out test
   ***********************************************/
  describe('Posting sign out', () => {
    it('should succeed', async () => {
      localStorage.setItem('todolistsbackendkey', 'test');
      mock.onPost('api/v1/rest-auth/logout/').reply(200);
      const signOut = signOutFactory();
      await signOut();

      const key = localStorage.getItem('todolistsbackendkey');
      expect(key).toBe(null);
    });
    it('should fail with 500', async () => {
      localStorage.setItem('todolistsbackendkey', 'test');
      mock.onPost('api/v1/rest-auth/logout/').reply(500);
      const signOut = signOutFactory();
      try {
        await signOut();
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
        expect('test').toBe(localStorage.getItem('todolistsbackendkey'));
      }
    });
  });
  /* Get profile test
   ***********************************************/
  describe('Getting profile', () => {
    const resultUser = {
      id: 1,
      user_id: 2,
      username: 'testname',
      email: 'test@test.com',
      last_login: '20200101',
      image: 'image',
      description: '',
      modify: '20200101'
    };
    it('should succeed', async () => {
      localStorage.setItem('todolistsbackendkey', 'test');
      mock.onGet('profile/').reply(200, [resultUser]);
      const getProfile = getProfileFactory();
      const user = await getProfile();
      expect(user.profile).toEqual(resultUser);
    });
    it('should fail with 500', async () => {
      localStorage.setItem('todolistsbackendkey', 'test');
      mock.onGet('profile/').reply(500);
      const getProfile = getProfileFactory();
      try {
        await getProfile();
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Put profile test
   ***********************************************/
  describe('Getting profile', () => {
    const resultUser = {
      id: 1,
      user_id: 2,
      username: 'testname',
      email: 'test@test.com',
      last_login: '20200101',
      image: 'image',
      description: '',
      modify: '20200101'
    };
    const paramProfile = {
      id: 1,
      image: 'testimage',
      description: ''
    };
    it('should succeed', async () => {
      localStorage.setItem('todolistsbackendkey', 'test');
      mock.onPut('profile/').reply(200, [resultUser]);
      const putProfile = putProfileFactory();
      const result = await putProfile(paramProfile);
      expect(result.profile).toEqual(resultUser);
    });
    it('should fail with 500', async () => {
      localStorage.setItem('todolistsbackendkey', 'test');
      mock.onPut('profile/').reply(500);
      const putProfile = putProfileFactory();
      try {
        await putProfile(paramProfile);
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Get lang test
   ***********************************************/
  describe('Getting lang', () => {
    it('should succeed', async () => {
      mock
        .onGet('lang/')
        .reply(200, { langArray: ['python', 'typescript', 'java'] });
      const getLang = getLangFactory();
      const result = await getLang();
      expect(result).toEqual(['python', 'typescript', 'java']);
    });
    it('should fail with 500', async () => {
      mock.onGet('lang/').reply(500);
      try {
        const getLang = getLangFactory();
        await getLang();
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Get Confirm test
   ***********************************************/
  describe('Getting report confirm', () => {
    it('should succeed', async () => {
      const description = 'testparam1';
      const correspondence = 'testparam2';
      mock
        .onPost(`confirmreport/`)
        .reply(200, { description: 'test1', correspondence: 'test2' });
      const getConfirm = getConfirmFactory();
      const confirm = await getConfirm(description, correspondence);
      expect(confirm.description).toBe('test1');
      expect(confirm.correspondence).toBe('test2');
    });
    it('should fail with 500', async () => {
      const description = 'testparam1';
      const correspondence = 'testparam2';
      mock.onPost(`confirmreport/`).reply(500);
      try {
        const getConfirm = getConfirmFactory();
        await getConfirm(description, correspondence);
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Post Report test
   ***********************************************/
  describe('Posting report', () => {
    it('should succeed', async () => {
      const lang = 'lang';
      const fw = 'fw';
      const env = 'env';
      const errmsg = 'errmsg';
      const description = 'testparam1';
      const correspondence = 'testparam2';
      mock
        .onPost('report/', {
          lang: lang,
          fw: fw,
          env: env,
          errmsg: errmsg,
          description: description,
          correspondence: correspondence
        })
        .reply(200, {
          description: 'test1',
          correspondence: 'test2',
          modify: '2020-01-29T00:05:31.319351+09:00'
        });
      const postReport = postReportFactory();
      const confirm = await postReport(
        lang,
        fw,
        env,
        errmsg,
        description,
        correspondence
      );
      expect(confirm.description).toBe('test1');
      expect(confirm.correspondence).toBe('test2');
      expect(confirm.modify).toBe('2020-01-29 00:05:31');
    });
    it('should fail with 500', async () => {
      const description = 'testparam1';
      const correspondence = 'testparam2';
      mock.onPost(`confirmreport/`).reply(500);
      try {
        const getConfirm = getConfirmFactory();
        await getConfirm(description, correspondence);
      } catch (error) {
        expect(error.message).toBe(
          'ただいま混み合っております。時間をおいて再度お試しください。 API status: 500'
        );
      }
    });
  });
  /* Get Reports test
   ***********************************************/
  describe('Getting reports', () => {
    it('should succeed', async () => {
      mock.onGet('report/').reply(200, {
        results: [
          { test: 'test', modify: '2020-01-29T00:05:31.319351+09:00' },
          { test: 'test2', modify: '2020-01-29T00:05:31.319351+09:00' }
        ]
      });

      const getReport = getReportFactory();
      const result = await getReport();
      expect(result).toEqual({
        results: [
          { test: 'test', modify: '2020-01-29 00:05:31' },
          { test: 'test2', modify: '2020-01-29 00:05:31' }
        ]
      });
    });
  });
});
