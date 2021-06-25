import React from "react";

export const Header = ({ value, setValue }) => {
  function currentMonthName() {
    return value.format("MMMM");
  }

  function currentYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  return (
    <>
      <div className="month-year-container">
        <div className="previous" onClick={() => setValue(prevMonth())}>
          {String.fromCharCode(171)}
        </div>
        <div className="next" onClick={() => setValue(nextMonth())}>
          {String.fromCharCode(187)}
        </div>
        <div className="current">
          {currentMonthName()} {currentYear()}
        </div>
      </div>
    </>
  );
};
