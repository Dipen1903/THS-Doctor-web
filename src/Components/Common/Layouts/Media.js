import React, { useMemo } from "react";
import { Icon } from "../../../Utilities/Icons";

function Media({ src }) {
  const mediaOut = useMemo(() => {
    let type, file;
    if (typeof src === "object") {
      type = src?.name?.includes("pdf") ? "PDF" : "IMG";
      file = URL.createObjectURL(src);
    } else {
      type = src?.includes("pdf") ? "PDF" : "IMG";
      file = src;
    }
    return { type, file };
  }, [src]);
  return mediaOut.type === "PDF" ? (
    <img alt={mediaOut.type} src={Icon.Doc} className="upload_avatar_img" />
  ) : (
    <img
      alt={mediaOut.type}
      src={mediaOut?.file || Icon.User}
      className="upload_avatar_img"
    />
  );
}

export default Media;
