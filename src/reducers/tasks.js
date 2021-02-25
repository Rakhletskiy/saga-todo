export const initialState = {
  tasks: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK_SUCCEED':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case 'DELETE_TASK_SUCCEED':
      return {
        ...state,
        tasks: [...state.tasks.slice(0, action.payload), ...state.tasks.slice(action.payload + 1)]
      }
    default:
      return state;
  }
};

export default reducer;  