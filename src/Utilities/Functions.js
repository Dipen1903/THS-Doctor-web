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

export function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
