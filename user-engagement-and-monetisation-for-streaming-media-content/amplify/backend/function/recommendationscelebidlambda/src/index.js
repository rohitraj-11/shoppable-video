/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");

exports.handler = async (event) => {
      const requestJSON = JSON.parse(event.body);
      const responseData = [];

      var personalizeruntime = new AWS.PersonalizeRuntime({
            apiVersion: "2018-05-22",
      });
      var params = {
            campaignArn: `${process.env.CAMPAIGN_ARN}`,
            itemId: `${requestJSON.itemID}`,
            numResults: requestJSON.count,
            // recommenderArn: "STRING_VALUE",
            userId: `${requestJSON.userID}`,
      };
      console.log(params);
      await personalizeruntime
            .getRecommendations(params, function (err, data) {
                  if (err) {
                        console.log(err, err.stack); // an error occurred
                        responseData.push(err);
                  } else {
                        responseData.push(data); // successful response
                  }
            })
            .promise();

      return {
            statusCode: 200,
            headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(responseData),
      };
};
