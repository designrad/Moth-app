import AppNavigator from '../../navigation/Navigator';

export default (state, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
