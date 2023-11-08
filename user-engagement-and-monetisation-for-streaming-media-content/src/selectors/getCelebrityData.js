const celebritiesData = [];

const paulWalker = {
      Name: "Paul Walker",
      About: "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.",
      Movies: [
            {
                  Movie: "The Fast and the Furious, Brian O'Conner (2001)",
                  ID: "https://dpmqj2xlpojlu.cloudfront.net/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX148_CR0,0,148,216_AL__QL50.jpg",
            },
            {
                  Movie: "Fast & Furious 7, Brian O'Conner (2015)",
                  ID: "https://dpmqj2xlpojlu.cloudfront.net/bbMV5BMTQxOTA2NDUzOV5BMl5BanBnXkFtZTgwNzY2MTMxMzE@._V1_UX148_CR0,0,148,216_AL__QL50.jpg",
            },
            {
                  Movie: "Running Scared, Joey Gazelle (2006)",
                  ID: "https://dpmqj2xlpojlu.cloudfront.net/ccMV5BMTIwOTAzMDc4MF5BMl5BanBnXkFtZTcwNjY5MzIzMQ@@._V1_UX148_CR0,0,148,216_AL__QL50.jpg",
            },
            {
                  Movie: "Fast & Furious, Brian O'Conner (2009)",
                  ID: "https://dpmqj2xlpojlu.cloudfront.net/ddMV5BYjQ1ZTMxNzgtZDcxOC00NWY5LTk3ZjAtYzRhMDhlNDZlOWEzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX148_CR0,0,148,216_AL__QL50.jpg",
            },
      ],
};
celebritiesData.push(paulWalker);

export default (celeb) => {
      return celebritiesData.find((celebrity) => celebrity.Name == celeb);
};
