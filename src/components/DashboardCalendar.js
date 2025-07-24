import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DashboardCalendar({ selectedDate, onChange }) {
  return (
    <div className="bg-white/80 rounded-2xl shadow-lg border border-slate-100 p-4">
      <Calendar
        onChange={onChange}
        value={selectedDate}
        className="w-full [&_.react-calendar__tile--active]:bg-indigo-500 [&_.react-calendar__tile--active]:text-white"
      />
    </div>
  );
}
