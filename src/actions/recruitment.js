import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentRequest = citizen_id => ({
  type: actionTypes.RECRUITMENT_FETCH_REQUEST,
  payload: {
    citizen_id
  }
});

export const fetchRecruitmentSuccess = data => ({
  type: actionTypes.RECRUITMENT_FETCH_SUCCESS,
  payload: {
    data
  }
});

export const fetchRecruitmentFailure = message => ({
  type: actionTypes.RECRUITMENT_FETCH_FAILURE,
  payload: {
    message
  }
});

export const changeActiveItem = activeItem => ({
  type: actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM,
  payload: {
    activeItem
  }
});

export const filterRecruitment = text => ({
  type: actionTypes.FILTER_RECRUITMENT,
  payload: {
    searchText: text
  }
});

export const sortRecruitment = (sortKey, direction) => ({
  type: actionTypes.SORT_RECRUITMENT,
  payload: {
    sortKey,
    direction
  }
});