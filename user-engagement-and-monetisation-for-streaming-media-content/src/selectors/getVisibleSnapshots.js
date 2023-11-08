import moment from "moment";

export default (snapshots, { show, liked, startDate, endDate }) => {
      return snapshots.filter((snapshot) => {
            const createdAtMoment = moment(snapshot.createdAt);
            const startDateMatch = startDate
                  ? startDate.isSameOrBefore(createdAtMoment, "day")
                  : true;
            const endDateMatch = endDate
                  ? endDate.isSameOrAfter(createdAtMoment, "day")
                  : true;
            const likedMatch = liked ? (snapshot.liked ? true : false) : true;
            const showMatch = snapshot.videoName
                  .toLowerCase()
                  .includes(show.toLowerCase());
            // console.log(
            //       createdAtMoment,
            //       startDate,
            //       endDate,
            //       startDateMatch,
            //       endDateMatch,
            //       likedMatch,
            //       showMatch,
            //       "sdsdasdasd"
            // );

            return startDateMatch && endDateMatch && likedMatch && showMatch;
      });
};
