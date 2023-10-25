const momentsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_MOMENTS':
        return action.payload;
      case 'UNSET_MOMENTS':
        return [];
      default:
        return state;
    }
};

// moments will be on the redux state at:
// state.moments
export default momentsReducer;
