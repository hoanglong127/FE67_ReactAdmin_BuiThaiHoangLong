import actionType from "../actions/type";

const initialState = {
  userList: [],
  usersByPage: [],
  typeUserList: [],
  userEdit: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_USERS:
      state.userList = payload;
      return { ...state };
    case actionType.SET_USERS_BY_PAGE:
      state.usersByPage = payload;
      return { ...state };
    case actionType.SET_TYPE_USER_LIST:
      state.typeUserList = payload;
      return { ...state };
    case actionType.SET_USER_EDIT:
      state.userEdit = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
