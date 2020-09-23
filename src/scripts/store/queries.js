const ADD_QUERY = 'ADD_QUERY';
const DELETE_QUERIES = 'DELETE_QUERIES'

export const addQuery = query => ({ type: ADD_QUERY, query });
export const deleteQueries = query => ({ type: DELETE_QUERIES });

export const getQueries = state => state.queries;
export const getLastQuery = state => state.queries[state.queries.length - 1];

const initialState = {
  queries: [],
}

const queriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUERY:
      if(state.queries[state.queries.length - 1] === action.query) {
        return state;
      }

      return {
        ...state,
        queries: [...state.queries, action.query],
      }
    case DELETE_QUERIES:
      return {
        ...state,
        queries: [state.queries[state.queries.length - 1]],
      }
    default:
      return state;
  }
}

export default queriesReducer;
