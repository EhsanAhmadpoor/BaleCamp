import { describe, it, expect } from 'vitest';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { loginEpic } from './authEpics';
import { loginRequest, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { ajax } from 'rxjs/ajax';

jest.mock('rxjs/ajax');

describe('loginEpic', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch loginSuccess on successful login', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', { a: loginRequest({ email: 'test@test.com', password: '123456' }) });
      const response = { response: { id: '123', name: 'Test User', verified: true, email: 'test@test.com', role: 'Admin' } };

      (ajax.post as jest.Mock).mockReturnValue(cold('--r', { r: response }));

      const output$ = loginEpic(action$);

      expectObservable(output$).toBe('---b', {
        b: loginSuccess({
          userId: '123',
          name: 'Test User',
          verified: true,
          email: 'test@test.com',
          role: 'Admin',
          password: '123456',
        }),
      });
    });
  });

  it('should dispatch loginFailure on failed login', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('-a', { a: loginRequest({ email: 'test@test.com', password: 'wrong' }) });
      const error = { response: { message: 'Invalid credentials' } };

      (ajax.post as jest.Mock).mockReturnValue(cold('--#', {}, error));

      const output$ = loginEpic(action$);

      expectObservable(output$).toBe('---b', { b: loginFailure('Invalid credentials') });
    });
  });
});
