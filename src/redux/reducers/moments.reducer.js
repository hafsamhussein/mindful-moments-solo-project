const momentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOMENTS':
      return action.payload;
    case 'UNSET_MOMENTS':
      return [];
    case 'UPDATE_MOMENT': 
      return state.map((moment) =>
        moment.id === action.payload.id ? action.payload : moment
      );
    default:
      return state;
  }
};


export default momentsReducer;


