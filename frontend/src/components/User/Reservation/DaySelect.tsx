import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function Dayselect() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  window.print();

  return (
    <>
      <div className="datepicker-wrapper">
        <DatePicker
          selected={selectedDate}
          shouldCloseOnSelect={false}
          onChange={handleDateChange}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          inline
        />
      </div>
    </>
  );
}
