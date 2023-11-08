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


// const initialState = {
//   moments: [],
// };

// const momentsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_MOMENTS':
//       return {
//         ...state,
//         moments: action.payload
//       };
//     case 'UNSET_MOMENTS':
//       return {
//         ...state,
//         moments: []
//       };
//     case 'UPDATE_MOMENT':
//       return {
//         ...state,
//         moments: state.moments.map((moment) =>
//           moment.id === action.payload.id ? { ...moment, ...action.payload } : moment
//         )
//       };
//     case 'TOGGLE_FAVORITE':
//       return {
//         ...state,
//         moments: state.moments.map((moment) =>
//           moment.id === action.payload ? { ...moment, isFavorite: !moment.isFavorite } : moment
//         )
//       };
//     default:
//       return state;
//   }
// };

// export default momentsReducer;
