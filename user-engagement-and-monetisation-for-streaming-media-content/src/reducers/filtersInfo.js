const filtersInfoReducer = (state, action) => {
      switch (action.type) {
            case "SET_SHOW_FILTER":
                  return {
                        ...state,
                        show: action.show,
                  };
            case "SET_LIKED_FILTER":
                  return {
                        ...state,
                        liked: action.liked,
                  };
            case "SET_DATE_FILTER":
                  return {
                        ...state,
                        startDate: action.startDate, //action.startDate,
                        endDate: action.endDate,
                  };
            default:
                  return state;
      }
};

export default filtersInfoReducer;
