const snapshotsInfoReducer = (state, action) => {
      switch (action.type) {
            case "ADD_SNAPSHOT":
                  return [...state, action.snapshotInfo];
            case "REMOVE_SNAPSHOT":
                  return state.filter(
                        ({ snapshotID }) => snapshotID !== action.snapshotID
                  );
            case "UPDATE_SNAPSHOT":
                  return state.map((snapshotInfo) => {
                        if (snapshotInfo.snapshotID === action.snapshotID) {
                              return {
                                    ...snapshotInfo,
                                    ...action.updates,
                              };
                        } else {
                              return snapshotInfo;
                        }
                  });
            default:
                  return state;
      }
};

export default snapshotsInfoReducer;
