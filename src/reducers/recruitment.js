import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  data: [{
    'no': '1.', 'name': 'Supanat Reanthong', 'position': 'Software Developer', 'citizenID': '11007022996763', 'email': 'supanat.reanthong@gmail.com',
    'phone': '0850884116', 'status': 'apply', 'registrationDate': '1150/11/12', 'interviewTime': '2018/06/20 17:30'
  },
  {
    'no': '2.', 'name': 'John Lilki', 'position': 'Software Developer', 'citizenID': '1105469856123', 'email': 'jhlilk22@yahoo.com',
    'phone': '0689544164', 'status': 'apply', 'registrationDate': '1112/11/12', 'interviewTime': ''
  },
  {
    'no': '3.', 'name': 'Jamie Harington', 'position': 'Product Developer Software Developer', 'citizenID': '1101266988123', 'email': 'jamieharingonton@yahoo.com',
    'phone': '0958633264', 'status': 'apply', 'registrationDate': '1121/12/11', 'interviewTime': ''
  },
  {
    'no': '4.', 'name': 'Jill Lewis', 'position': 'Database Administration', 'citizenID': '455266988123', 'email': 'jilsewris22@yahoo.com',
    'phone': '0689588864', 'status': 'apply', 'registrationDate': '2015/10/25', 'interviewTime': ''
  }],
  activeItem: 'all',
  searchText: '',
  direction: null,
  sortKey: null,
};

const recruitment = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.RECRUITMENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        citizen_id: action.payload.citizen_id,
      };
    case actionTypes.RECRUITMENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.payload.data,
      };
    case actionTypes.RECRUITMENT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    case actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.activeItem,
      };
    case actionTypes.FILTER_RECRUITMENT:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    case actionTypes.SORT_RECRUITMENT:
      return {
        ...state,
        sortKey: action.payload.sortKey,
        direction: action.payload.direction
      };
    default:
      return state;
  }
};

export default recruitment;