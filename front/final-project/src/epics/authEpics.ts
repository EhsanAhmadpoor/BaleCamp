import { ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { loginRequest, loginSuccess, loginFailure, signUpRequest, signUpSuccess, signUpFailure } from '../redux/slices/authSlice';


const LOGIN_URL = '/api/auth/login';
const SIGNUP_URL = '/api/auth/signup';

export const loginEpic = (action$: any) =>
  action$.pipe(
    ofType(loginRequest.type), // Listen for loginRequest actions
    mergeMap((action: any) =>
      ajax.post(LOGIN_URL, {
        email: action.payload.email,
        password: action.payload.password,
      }, { 'Content-Type': 'application/json' }).pipe(
        map((response: any) => {
          // Handle successful response and dispatch loginSuccess
          const { id, name, verified, email, role, password } = response.response; // assuming userId is in response
          return loginSuccess({ userId: id, name, verified, email, role, password });
        }),
        catchError((error) => {
          // Handle error and dispatch loginFailure
          return of(loginFailure(error.response.message));
        })
      )
    )
  );

export const signUpEpic = (action$: any) =>
  action$.pipe(
    ofType(signUpRequest.type), // Listen for signUpRequest actions
    mergeMap((action: any) =>
      ajax.post(SIGNUP_URL, {
        email: action.payload.email,
        name: action.payload.name,
        password: action.payload.password,
      }, { 'Content-Type': 'application/json' }).pipe(
        map((response: any) => {
          console.log(response)
          return signUpSuccess();
        }),
        catchError((error) => {
          return of(signUpFailure(error.response.message));
        })
      )
    )
  );
