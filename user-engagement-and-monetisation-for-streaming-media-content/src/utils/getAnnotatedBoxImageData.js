export default (snapshotImageElement, annotatedBox) => {
      const canvas = document.createElement("canvas");
      const pixelRatio = 1;
      const l1 = annotatedBox.left * snapshotImageElement.width;
      const t1 = annotatedBox.top * snapshotImageElement.height;
      const w1 = annotatedBox.width * snapshotImageElement.width;
      const h1 = annotatedBox.height * snapshotImageElement.height;
      // console.log(l1, t1, w1, h1);
      const scaleX = 1;
      const scaleY = 1;
      const ctx = canvas.getContext("2d");
      canvas.width = w1;
      canvas.height = h1;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
            snapshotImageElement,
            l1 * scaleX,
            t1 * scaleY,
            w1 * scaleX,
            h1 * scaleY,
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
