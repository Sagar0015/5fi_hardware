import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { API, Auth } from 'aws-amplify';

import * as authActions from './auth.actions';
import * as AuthType from './auth.types';
import { notify } from 'react-notify-toast';

export function* loadUserAsync() {
  try {
    yield Auth.currentSession();
    const { username, attributes } = yield Auth.currentAuthenticatedUser();
    const uid = attributes.sub;
    const userData = {
      username,
      uid,
      name: attributes.name,
      email: attributes.email,
      mode: attributes['custom:mode'],
      role: attributes['custom:role']
    };
    yield put(authActions.loadUserSuccess(userData));
  } catch (err) {
    console.error(err);
    yield put(authActions.loadUserFail(err));
  }
}

export function* onSigninAsync({
  payload: {
    formData: { email, password, clientMetadata },
    router
  }
}) {
  try {
    const { username, attributes } = yield Auth.signIn(
      email.trim().toLowerCase(),
      password,
      clientMetadata
    );
    const uid = attributes.sub;
    yield put(
      authActions.signinSuccess({
        username,
        uid,
        name: attributes.name,
        email: attributes.email,
        mode: attributes['custom:mode'],
        role: attributes['custom:role']
      })
    );
    const { toaster } = yield select(state => state.siteCoordinator);
    notify.show("User Signed In Successfully", "custom", toaster.duration, toaster.success)
    if (router) {
      if (router.location?.state && router.location?.state.from && router.location?.state?.from.pathname) {
        router.push(router.location?.state?.from.pathname)

      } else {
        router.push('/monitor')

      }

    }
  } catch (err) {
    console.error(err);
    const { toaster } = yield select(state => state.siteCoordinator);
    notify.show(err.message, "custom", toaster.duration, toaster.error)
    if (err.code === 'UserNotConfirmedException') {
      yield put(authActions.signinFail(err.message));
    } else if (err.code === 'UserNotFoundException') {
      yield put(authActions.signinFail(err.message));
    } else if (err.code === 'UserLambdaValidationException') {
      yield put(authActions.signinFail({ domain: err.message }));
    } else {
      yield put(authActions.signinFail(err.message));

    }
  }
}

export function* onSignupAsync({ payload: { formData, callback } }) {
  try {
    const response = yield Auth.signUp({
      ...formData,
      autoSignIn: {
        enabled: true
      }

    })


    if (callback) {
      yield call(callback, response)
    }

    yield put(authActions.signupSuccess(response));

  } catch (err) {
    console.error(err);
    yield put(authActions.signupFail(err.message));
  }
}

export function* onVerifyAsync({ payload: { code, callback } }) {
  try {
    let email = localStorage.getItem("registerEmail")
    const response = yield Auth.confirmSignUp(email, code)

    if (callback) {
      yield call(callback, response)
    }

    yield put(authActions.verificationSuccess(response));

  } catch (err) {
    console.error(err);
    yield put(authActions.verificationFail(err.message));
  }
}

export function* signOutAsync({ payload: { history } }) {
  try {
    yield Auth.signOut();
    history.push('/deploy')
    const { toaster } = yield select(state => state.siteCoordinator);
    notify.show("User Signed Out Successfully", "custom", toaster.duration, toaster.success)
    yield put(authActions.signoutSuccess());
  } catch (err) {
    console.error(err);
    yield put(authActions.signoutFail(err));
  }
}

export function* watchLoadUser() {
  yield takeLatest(AuthType.LOAD_USER_START, loadUserAsync);
}

export function* watchSignin() {
  yield takeLatest(AuthType.SIGN_IN_START, onSigninAsync);
}

export function* watchSignup() {
  yield takeLatest(AuthType.SIGN_UP_START, onSignupAsync);
}


export function* watchVerify() {
  yield takeLatest(AuthType.VERIFICATION_START, onVerifyAsync);
}


export function* watchSignout() {
  yield takeLatest(AuthType.SIGN_OUT_START, signOutAsync);
}

export function* authSagas() {
  yield all([
    call(watchSignin),
    call(watchSignup),
    call(watchSignout),
    call(watchLoadUser),
    call(watchVerify)
  ]);
}
