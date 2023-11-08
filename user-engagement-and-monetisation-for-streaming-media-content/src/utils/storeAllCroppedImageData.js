// storing allCroppedImageData in s3 and returning selectedAreasData
import { Buffer } from "buffer";
// Buffer.from('anything','base64');

import { Storage } from "aws-amplify";

export default async (allCroppedImageData) => {
      const selectedAreasData = [];
      await Promise.all(
            allCroppedImageData.map(async (element) => {
                  const buf = Buffer.from(
                        element.croppedImageData.replace(
                              /^data:image\/\w+;base64,/,
                              ""
                        ),
                        "base64"
                  );
                  const key = await Storage.put(`${element.id}.png`, buf, {
                        contentEncoding: "base64",
                        contentType: "image/png",
                        level: "private",
                  });

                  // generate signedURL
                  // const signedURL = await Storage.get(`${element.id}.png`, {
                  //       level: 'private',
                  //       download: false,
                  //       expires: 30 * 60,
                  //       contentEncoding: "base64",
                  //       contentType: "image/png"
                  // })

                  const selectedAreasD = {
                        id: element.id,
                        left: element.left,
                        top: element.top,
                        width: element.width,
                        height: element.height,
                        originalHeight: element.originalHeight,
                        originalWidth: element.originalWidth,
                        // signedURL
                  };
                  selectedAreasData.push(selectedAreasD);
            })
      );
      return selectedAreasData;
};
