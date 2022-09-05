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
    value === 0 ||
    value === null ||
    value === "null" ||
    value === undefined ||
    value === "undefined" ||
    value?.length === 0
  ) {
    return true;
  } else {
    return false;
  }
};
export const compareTime = (time1, time2) => {
  const [hours1, minutes1, seconds1] = time1.split(":");
  const [hours2, minutes2, seconds2] = time2.split(":");

  const date1 = new Date(2022, 0, 1, +hours1, +minutes1, +seconds1 || "00");
  const date2 = new Date(2022, 0, 1, +hours2, +minutes2, +seconds2 || "00");

  return date1.getTime() > date2.getTime();
};

export function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
