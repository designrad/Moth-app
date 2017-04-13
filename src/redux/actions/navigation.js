import ActionTypes from '../constants';

export function push(route) {
  return {
    type: ActionTypes.PUSH,
    route
  };
}

export function pop() {
  return {
    type: ActionTypes.POP
  };
}

export function setRoot(route) {
  return {
    type: ActionTypes.SET_ROOT,
    route
  };
}
