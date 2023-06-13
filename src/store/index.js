import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer, initState } from './reducer';
import thunk from 'redux-thunk';
import reduxpromise from 'redux-promise';
// import logger from 'redux-logger';

// (api: MiddlewareAPI<D, S>): (
//   next: Dispatch<AnyAction>
// ) => (action: any) => any

function createMyLogger() {
  return function (middlewareApi) {
    const { getState } = middlewareApi;
    return function (next) {
      return function (action) {
        console.log('prevState', getState());
        const result = next(action);
        console.log('next', getState());
        return result;
      };
    };
  };
}

function createMyPromise() {
  return function ({ dispatch, getState }) {
    return function (next) {
      return function (action) {
        if (action instanceof Promise) {
          return Promise.resolve(action).then((result) => {
            dispatch(result);
          });
        }
        return next(action);
      };
    };
  };
}

function myCompose(...middlewares) {
  if (middlewares.length === 0) {
    return () => {};
  }
  if (middlewares.length === 1) {
    return middlewares[0];
  }

  return middlewares.reduce((prevMiddleware, currentMiddleware) => {
    return function (...args) {
      return prevMiddleware(currentMiddleware(args));
    };
  });
}

const myPromise = createMyPromise();
const logger = createMyLogger();

// const reduxReducers = combineReducers(reducer);
const enhancer = applyMiddleware(myPromise);
const reduxStore = createStore(reducer, enhancer);
// console.log('reduxStore', reduxStore);

export { reduxStore };
