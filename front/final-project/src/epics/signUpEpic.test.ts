// authEpic.test.ts
import { TestScheduler } from 'rxjs/testing';
import { signUpEpic } from './authEpic';
import { signUpRequest, signUpSuccess, signUpFailure } from '../redux/slices/authSlice';
import { of } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

jest.mock('rxjs/ajax');

describe('signUpEpic', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  test('should handle sign up success', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = new ActionsObservable(hot('-a', { a: signUpRequest({ email: 'test@example.com', name: 'test', password: 'password' }) }));
      const response = { response: { id: '123', name: 'test', email: 'test@example.com' } };

      (ajax.post as jest.Mock).mockReturnValue(cold('--b', { b: response }));

      const output$ = signUpEpic(action$);

      expectObservable(output$).toBe('---c', { c: signUpSuccess() });
    });
  });

  test('should handle sign up failure', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = new ActionsObservable(hot('-a', { a: signUpRequest({ email: 'test@example.com', name: 'test', password: 'password' }) }));
      const error = { response: { message: 'Sign up failed' } };

      (ajax.post as jest.Mock).mockReturnValue(cold('--#', {}, error));

      const output$ = signUpEpic(action$);

      expectObservable(output$).toBe('---c', { c: signUpFailure('Sign up failed') });
    });
  });
});
