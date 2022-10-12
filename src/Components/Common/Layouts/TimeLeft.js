import moment from "moment";
import React, { useEffect, useState } from "react";
import { ConvertHMS } from "../../../Utilities/Functions";

function TimeLeft({ occuringDate, hide }) {
  var duration;
  duration = moment.duration(moment(occuringDate).diff(moment.now()));
  const [seconds, setSeconds] = useState(parseInt(duration.asSeconds()));

  useEffect(() => {
    setTimeout(() => {
      duration = moment.duration(moment(occuringDate).diff(moment.now()));
      setSeconds(parseInt(duration.asSeconds()));
    }, 60000);
    return () => {};
  }, [occuringDate, seconds]);

  return (
    <span className={hide ? "" : "failed_tag"}>{`${ConvertHMS(
      seconds
    )} Left`}</span>
  );
}

export default TimeLeft;
