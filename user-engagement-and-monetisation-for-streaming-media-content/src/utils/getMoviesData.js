const axios = require("axios").default;

export default async (moviesD) => {
      const movies = [];
      await Promise.all(
            moviesD.map(async (ID) => {
                  const url = `https://api.themoviedb.org/3/movie/${ID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
                  // console.log(ID);

                  await axios
                        .get(url)
                        .then(function (response) {
                              movies.push(response.data);
                        })
                        .catch(function (error) {
                              movies.push(undefined);
                        });
            })
      );
      return movies;
};
