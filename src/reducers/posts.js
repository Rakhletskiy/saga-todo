export const initialState = {
  posts: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POSTS_FETCH_SUCCEED':
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};

export default reducer;  