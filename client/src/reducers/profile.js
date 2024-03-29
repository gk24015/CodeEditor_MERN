import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE
    
  } from '../actions/types';
  
  const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  };
  
  function profileReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false
        };
     /* case GET_PROFILES:
        return {
          ...state,
          profiles: payload,
          loading: false
        };*/
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          profile: null
        };
     /* case CLEAR_PROFILE:
        return {
          ...state,
          profile: null,
          repos: []
        };
      case GET_REPOS:
        return {
          ...state,
          repos: payload,
          loading: false
        };
      case NO_REPOS:
        return {
          ...state,
          repos: []
        };*/
        case CLEAR_PROFILE:
          return {
            ...state,
            profile:null,
            repos:[],
            loading:false
          }
      default:
        return state;
    }
  }
  
  export default profileReducer;