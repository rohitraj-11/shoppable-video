/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");

exports.handler = async (event) => {
      const requestJSON = JSON.parse(event.body);

      var personalizeevents = new AWS.PersonalizeEvents({
            apiVersion: "2018-03-22",
      });

      const eventListInit = [];

      requestJSON.itemsID.map((ID) => {
            const eventListInitItem = {
                  eventType: "analysed" /* required */,
                  sentAt:
                        new Date() ||
                        "Wed Dec 31 1969 16:00:00 GMT-0800 (PST)" ||
                        123456789 /* required */,
                  // eventId: "STRING_VALUE", // if not passed, personalize generates unique eeventId on it's own
                  // eventValue: "NUMBER_VALUE",
                  impression: [
                        `${requestJSON.impression}`,
                        /* more items */
                  ],
                  itemId: `${ID}`,
                  // properties:
                  //       any /* This value will be JSON encoded on your behalf with JSON.stringify() */,
                  recommendationId: `${requestJSON.recommendationID}`,
            };
            eventListInit.push(eventListInitItem);
      });

      var params = {
            eventList: eventListInit,
            sessionId: `${requestJSON.sessionID}` /* required */, // passed sessiontoken from app
            trackingId: `${process.env.TRACKING_ID}` /* required */,
            userId: `${requestJSON.userID}`,
      };

      console.log(params);

      var done = false;
      await personalizeevents
            .putEvents(params, function (err, data) {
                  if (err) {
                        console.log(err, err.stack); // an error occurred
                  } else {
                        console.log(data); // successful response
                        done = true;
                  }
            })
            .promise();

      return {
            statusCode: 200,
            headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "*",
                  "Content-Type": "application/json",
            },
            body: JSON.stringify(done),
      };
};
