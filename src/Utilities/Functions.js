import moment from "moment";

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
  time1 = moment(time1, ["h:mm A"]).format("HH:mm");
  time2 = moment(time2, ["h:mm A"]).format("HH:mm");

  const [hours1, minutes1, seconds1] = time1.split(":");
  const [hours2, minutes2, seconds2] = time2.split(":");
  const date1 = new Date(2022, 0, 1, +hours1, +minutes1, +seconds1 || "00");
  const date2 = new Date(2022, 0, 1, +hours2, +minutes2, +seconds2 || "00");

  return date1.getTime() > date2.getTime();
};
// export function ConvertHMS(value) {
//   const sec = parseInt(value, 10); // convert value to number if it's string
//   let hours = Math.floor(sec / 3600); // get hours
//   let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
//   let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
//   // add 0 if value < 10; Example: 2 => 02
//   if (hours < 10) {
//     hours = "0" + hours;
//   }
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds; // Return is HH : MM : SS
// }
export function ConvertHMS(n) {
  try {
    var day = parseInt(n / (24 * 3600));
    n = n % (24 * 3600);
    var hour = parseInt(n / 3600);
    n %= 3600;
    var minutes = n / 60;
    n %= 60;
    var seconds = n;

    var time = "";
    if (day >= 1) {
      time += `${day} day/s `;
    }
    if (hour >= 1) {
      time += `${hour} hours `;
    }
    if (minutes >= 1) {
      time += `${minutes.toFixed()} minutes`;
    }
    return time;
  } catch (error) {
    return "00:00";
  }
}
export function padLeadingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
