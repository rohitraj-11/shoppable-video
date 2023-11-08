export default (snapshotImageElement, annotatedBox, BoundingBox) => {
      const canvas = document.createElement("canvas");
      const pixelRatio = 1;
      const l1 = annotatedBox.left * snapshotImageElement.width;
      const t1 = annotatedBox.top * snapshotImageElement.height;
      const w1 = annotatedBox.width * snapshotImageElement.width;
      const h1 = annotatedBox.height * snapshotImageElement.height;
      const l2 = BoundingBox.Left * w1 * pixelRatio;
      const t2 = BoundingBox.Top * h1 * pixelRatio;
      const w2 = BoundingBox.Width * w1 * pixelRatio;
      const h2 = BoundingBox.Height * h1 * pixelRatio;
      // console.log(l1, t1, w1, h1, l2, t2, w2, h2);
      const scaleX = 1;
      const scaleY = 1;
      const ctx = canvas.getContext("2d");
      canvas.width = w2;
      canvas.height = h2;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
            snapshotImageElement,
            l1 + l2 * scaleX,
            t1 + t2 * scaleY,
            w2 * scaleX,
            h2 * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
      );
      const picD = canvas.toDataURL("image/png", 1);
      // console.log(snapshotImageElement);
      // console.log(picD);
      return picD;
};

// const canvas = document.createElement("canvas");
//       // const snapshotImage = document.createElement("img");
//       // snapshotImage.src = `data:image/png;base64,${response}`;
//       // snapshotImage.onload = () => {
//       // };
//       const pixelRatio = 1;
//       const l1 = annotatedBox.left * snapshotImageElement.width;
//       const t1 = annotatedBox.top * snapshotImageElement.height;
//       const w1 = annotatedBox.width * snapshotImageElement.width;
//       const h1 = annotatedBox.height * snapshotImageElement.height;
//       const l2 = celeb.BoundingBox.Left * w1 * pixelRatio;
//       const t2 = celeb.BoundingBox.Top * h1 * pixelRatio;
//       const w2 = celeb.BoundingBox.Width * w1 * pixelRatio;
//       const h2 = celeb.BoundingBox.Height * h1 * pixelRatio;
//       console.log(l1, t1, w1, h1, l2, t2, w2, h2);
//       const scaleX = 1;
//       const scaleY = 1;
//       const ctx = canvas.getContext("2d");
//       // New lines to be added
//       canvas.width = w2;
//       canvas.height = h2;
//       ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//       ctx.imageSmoothingQuality = "high";
//       ctx.drawImage(
//             snapshotImageElement,
//             l1 + l2 * scaleX,
//             t1 + t2 * scaleY,
//             w2 * scaleX,
//             h2 * scaleY,
//             0,
//             0,
//             canvas.width,
//             canvas.height
//       );
//       const picD = canvas.toDataURL("image/png", 1);
//       console.log(picD);
//       setPic(picD);
