const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_NUMBER_OF_POSTS = 'SET_NUMBER_OF_POSTS';

export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage})
export const setNumberOfPosts = numberOfPosts => ({ type: SET_NUMBER_OF_POSTS, numberOfPosts });

const initialState = {
  currentPage: 0,
  numberOfPosts: 0,
}

export const getCurrentPage = state => state.currentPage;
export const getNumberOfPosts = state => state.numberOfPosts;

const paginationReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case SET_NUMBER_OF_POSTS:
      return {
        ...state,
        numberOfPosts: action.numberOfPosts,
      }
    default:
      return state;
  }
}

export default paginationReducer;
