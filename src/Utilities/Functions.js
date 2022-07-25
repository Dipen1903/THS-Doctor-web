async function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}
export async function JSONToFormData(data) {
  const formData = new FormData();
  await buildFormData(formData, data);
  return formData;
}
export function ArrayRange(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}
export const isEmpty = (value) => {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    value?.length === 0
  ) {
    return true;
  } else {
    return false;
  }
};

export function GetVideoDOM(url, quality) {
  if (url) {
    var video_id, thumbnail, src, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    } else if (
      (result = url.match(
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      ))
    ) {
      video_id = result.pop();
    }

    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }

      var quality_key = "maxresdefault"; // Max quality
      if (quality == "low") {
        quality_key = "sddefault";
      } else if (quality == "medium") {
        quality_key = "mqdefault";
      } else if (quality == "high") {
        quality_key = "hqdefault";
      }

      thumbnail =
        "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
      src = "https://www.youtube.com/embed/" + video_id;

      return { thumbnail, src };
    }
  }
  return false;
}
