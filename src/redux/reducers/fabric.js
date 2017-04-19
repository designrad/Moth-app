export default (initialState, actionType, customReducer) => (
  (state = { ...initialState }, action) => {
    const { type } = action;

    if (actionType && type === actionType) {
      const { payload } = action;
      if (!payload) {
        return initialState;
      }
      return { ...state, ...payload };
    }
    return customReducer ? customReducer(state, action) : state;
  }
);
