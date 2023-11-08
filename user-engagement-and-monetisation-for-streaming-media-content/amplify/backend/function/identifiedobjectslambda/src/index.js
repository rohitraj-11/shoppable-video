// Import required AWS SDK clients and commands for Node.js
// import { DetectLabelsCommand } from  "@aws-sdk/client-rekognition";
// import  { RekognitionClient } from "@aws-sdk/client-rekognition";

const clientRekognition = require("@aws-sdk/client-rekognition");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
      console.log(`EVENT: ${JSON.stringify(event)}`);
      const receivedData = JSON.parse(event.body);

      const identifiedObjects = [];
      const REGION = `${process.env.REGION}`;
      const bucket = `${process.env.LOOKUPOBJECTSS3STORAGE_BUCKET_NAME}`;

      console.log(REGION, " ", bucket);

      if (receivedData.aCelebritiesProfile && !receivedData.bMerchandiseBuy) {
            await Promise.all(
                  receivedData.selectedAreasData.map(async (element) => {
                        // SNS service object
                        const rekogClient =
                              new clientRekognition.RekognitionClient({
                                    region: REGION,
                              });
                        const photo = `private/${receivedData.userIdentityID}/${element.id}.png`;
                        const params = {
                              Image: {
                                    S3Object: {
                                          Bucket: bucket,
                                          Name: photo,
                                    },
                              },
                        };

                        const customIdentifiedCelebrities = [];
                        const identifiedCelebrities = await rekogClient.send(
                              new clientRekognition.RecognizeCelebritiesCommand(
                                    params
                              )
                        );
                        identifiedCelebrities.CelebrityFaces.forEach(
                              (element) => {
                                    const customIdentifiedCelebritiesD = {
                                          Urls: element.Urls,
                                          Name: element.Name,
                                          BoundingBox: element.Face.BoundingBox,
                                    };
                                    customIdentifiedCelebrities.push(
                                          customIdentifiedCelebritiesD
                                    );
                              }
                        );

                        const identifiedObjectsD = {
                              annotatedBox: { ...element },
                              labels: null,
                              customIdentifiedCelebrities,
                        };

                        identifiedObjects.push(identifiedObjectsD);
                  })
            );
      } else {
            await Promise.all(
                  receivedData.selectedAreasData.map(async (element) => {
                        // SNS service object
                        const rekogClient =
                              new clientRekognition.RekognitionClient({
                                    region: REGION,
                              });
                        const photo = `private/${receivedData.userIdentityID}/${element.id}.png`;
                        const params = {
                              Image: {
                                    S3Object: {
                                          Bucket: bucket,
                                          Name: photo,
                                    },
                              },
                        };

                        const identifiedLabels = await rekogClient.send(
                              new clientRekognition.DetectLabelsCommand(params)
                        );

                        let faceFound = false;

                        identifiedLabels.Labels.some((element) => {
                              if (
                                    element.Name === "Face" ||
                                    element.Name === "Human"
                              ) {
                                    faceFound = true;
                                    return true;
                              }
                        });

                        let identifiedCelebrities;
                        const customIdentifiedCelebrities = [];
                        if (receivedData.aCelebritiesProfile && faceFound) {
                              identifiedCelebrities = await rekogClient.send(
                                    new clientRekognition.RecognizeCelebritiesCommand(
                                          params
                                    )
                              );
                              identifiedCelebrities.CelebrityFaces.forEach(
                                    (element) => {
                                          const customIdentifiedCelebritiesD = {
                                                Urls: element.Urls,
                                                Name: element.Name,
                                                BoundingBox:
                                                      element.Face.BoundingBox,
                                          };
                                          customIdentifiedCelebrities.push(
                                                customIdentifiedCelebritiesD
                                          );
                                    }
                              );
                        }

                        const identifiedObjectsD = {
                              annotatedBox: { ...element },
                              labels: identifiedLabels.Labels,
                              customIdentifiedCelebrities,
                        };

                        identifiedObjects.push(identifiedObjectsD);
                  })
            );
      }

      return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(identifiedObjects),
      };
};
