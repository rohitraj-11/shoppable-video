const recommendationsInfoReducer = (state, action) => {
      switch (action.type) {
            case "SET_RECOMMENDATIONS_INFO":
                  return {
                        ...state,
                        recommendations: action.recommendations,
                        recommendationID: action.recommendationID,
                  };
            default:
                  return state;
      }
};

export default recommendationsInfoReducer;
