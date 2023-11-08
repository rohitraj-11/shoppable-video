const userInfoReducer = (state, action) => {
      switch (action.type) {
            case "SET_USER_IDENTITY_ID":
                  return {
                        ...state,
                        userIdentityID: action.userIdentityID,
                  };
            default:
                  return state;
      }
};

export default userInfoReducer;
