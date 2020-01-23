import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  signUpMessageToJp,
  signUpParamFactry
} from 'service/backend-django-rest-todolists/util';
import { waitForElementToBeRemoved } from '@testing-library/dom';

describe('util methods', () => {
  it('signUpParamFactory', () => {
    const result = signUpParamFactry({
      username: 'test',
      email: '',
      password1: 'test1',
      password2: 'test2'
    });
    expect(result).toEqual({
      username: 'test',
      password1: 'test1',
      password2: 'test2'
    });
  });
  it('signUpMessageToJp', () => {
    let result = signUpMessageToJp('A user with that username already exists.');
    expect(result).toBe('Nameが他の人とかぶってます\n');
    result = signUpMessageToJp(
      'A user is already registered with this e-mail address.'
    );
    expect(result).toBe('Emailが他の人とかぶってます\n');
    result = signUpMessageToJp('This password is too common.');
    expect(result).toBe('パスワードはもうちょっとひねってください\n');
  });
});
