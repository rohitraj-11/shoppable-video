// converting all annotated area into image data

export default (markerInfo, markerJSImage, snapshotImage) => {
      const allCroppedImageData = [];
      // console.log(markerJSImage.naturalWidth, snapshotImage.naturalWidth);

      markerInfo.forEach((element) => {
            const canvas = document.createElement("canvas");
            const scaleX = 1; //markerJSImage.naturalWidth / markerJSImage.width;
            const scaleY = 1; // markerJSImage.naturalHeight / markerJSImage.height;

            const ctx = canvas.getContext("2d");

            // New lines to be added
            const pixelRatio = 1; // window.devicePixelRatio
            canvas.width =
                  (element.width / markerJSImage.naturalWidth) *
                  snapshotImage.naturalWidth *
                  pixelRatio;
            canvas.height =
                  (element.height / markerJSImage.naturalHeight) *
                  snapshotImage.naturalHeight *
                  pixelRatio;
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(
                  snapshotImage,
                  (element.left / markerJSImage.naturalWidth) *
                        snapshotImage.naturalWidth *
                        scaleX,
                  (element.top / markerJSImage.naturalHeight) *
                        snapshotImage.naturalHeight *
                        scaleY,
                  (element.width / markerJSImage.naturalWidth) *
                        snapshotImage.naturalWidth *
                        scaleX,
                  (element.height / markerJSImage.naturalHeight) *
                        snapshotImage.naturalHeight *
                        scaleY,
                  0,
                  0,
                  canvas.width,
                  canvas.height
            );
            const croppedImageData = canvas.toDataURL("image/png");
            allCroppedImageData.push({
                  originalWidth: element.width,
                  originalHeight: element.height,
                  left: element.left / markerJSImage.naturalWidth,
                  top: element.top / markerJSImage.naturalHeight,
                  width: element.width / markerJSImage.naturalWidth,
                  height: element.height / markerJSImage.naturalHeight,
                  id: element.id,
                  croppedImageData,
            });
      });
      return allCroppedImageData;
};
