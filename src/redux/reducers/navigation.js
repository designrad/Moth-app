
import AppNavigator from '../../navigation/Navigator';

import { Routes } from '../../global/constants';

// const { auth, tabs, tutorial } = Routes;

// const authState = makeNavigationState(auth);
// const tabsState = makeNavigationState(tabs);
// const tutorialState = makeNavigationState(tutorial);


export default (state, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};
