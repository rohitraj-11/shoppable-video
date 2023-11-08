/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
      let body;
      let statusCode = 200;
      const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json",
      };
      let requestJSON = JSON.parse(event.body);
      console.log("++++++++++", event.body.routeKey);
      console.log("----------", event.body);
      console.log("----------+++++++", event.body.videoName);

      const tableName = `${process.env.TABLE_NAME}`;
      console.log(tableName);
      try {
            switch (requestJSON.routeKey) {
                  case "GET /snapshots":
                        body = await dynamo
                              .query({
                                    TableName: tableName,
                                    ExpressionAttributeValues: {
                                          ":a": requestJSON.userIdentityID,
                                    },
                                    KeyConditionExpression:
                                          "userIdentityID = :a",
                                    ExclusiveStartKey:
                                          requestJSON.exclusiveStartKey,
                                    Limit: requestJSON.limit,
                              })
                              .promise();
                        break;
                  case "PUT /snapshots":
                        await dynamo
                              .put({
                                    TableName: tableName,
                                    Item: {
                                          userIdentityID:
                                                requestJSON.userIdentityID,
                                          snapshotID: requestJSON.snapshotID,
                                          annotated: requestJSON.annotated,
                                          celebrities: requestJSON.celebrities,
                                          createdAt: requestJSON.createdAt,
                                          liked: requestJSON.liked,
                                          objects: requestJSON.objects,
                                          updatedAt: requestJSON.updatedAt,
                                          videoName: requestJSON.videoName,
                                          videoTime: requestJSON.videoTime,
                                    },
                              })
                              .promise();
                        body = `Put snapshot ${requestJSON.snapshotID}`;
                        break;
                  case "UPDATE /snapshots/{snapshotID}":
                        await dynamo
                              .update({
                                    TableName: tableName,
                                    Key: {
                                          userIdentityID:
                                                requestJSON.userIdentityID,
                                          snapshotID: requestJSON.snapshotID,
                                    },
                                    UpdateExpression:
                                          "set annotated = :a, celebrities = :b, objects = :c, updatedAt = :d, liked = :e",
                                    ExpressionAttributeValues: {
                                          ":a": requestJSON.annotated,
                                          ":b": requestJSON.celebrities,
                                          ":c": requestJSON.objects,
                                          ":d": requestJSON.updatedAt,
                                          ":e": requestJSON.liked,
                                    },
                              })
                              .promise();
                        body = `Updated item ${requestJSON.snapshotID}`;
                        break;
                  case "DELETE /snapshots/{snapshotID}":
                        await dynamo
                              .delete({
                                    TableName: tableName,
                                    Key: {
                                          userIdentityID:
                                                requestJSON.userIdentityID,
                                          snapshotID: requestJSON.snapshotID,
                                    },
                              })
                              .promise();
                        body = `Deleted item ${requestJSON.snapshotID}`;
                        break;
                  default:
                        throw new Error(
                              `Unsupported route: "${requestJSON.routeKey}"`
                        );
            }
      } catch (err) {
            statusCode = 400;
            body = err.message;
      } finally {
            body = JSON.stringify(body);
      }
      return {
            statusCode,
            body,
            headers,
      };
};
