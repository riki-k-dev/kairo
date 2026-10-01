// src/components/ui/Calendar.tsx

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onSelect }: CalendarProps) {
  const [currMonthDate, setCurrMonthDate] = useState(new Date(selectedDate));

  const year = currMonthDate.getFullYear();
  const month = currMonthDate.getMonth();

  // Calendar logic helpers
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrev = () => {
    setCurrMonthDate(new Date(year, month - 1, 1));
  };

  const handleNext = () => {
    setCurrMonthDate(new Date(year, month + 1, 1));
  };

  const handleDatePick = (day: number) => {
    const newD = new Date(year, month, day);
    // console.log("Picked a new date:", newD);
    onSelect(newD);
  };

  // Generate blank grids for prev month
  const blankDays = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    blankDays.push(
      <div key={`prev-${i}`} className="text-[var(--text-muted)] opacity-30">
        {daysInPrevMonth - i}
      </div>,
    );
  }

  // Generate days
  const actualDays = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const isSelected =
      selectedDate.getDate() === d &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    actualDays.push(
      <div
        key={`day-${d}`}
        onClick={() => handleDatePick(d)}
        className={`rounded-md cursor-pointer transition-colors w-7 h-7 mx-auto flex items-center justify-center ${
          isSelected
            ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-80"
            : "hover:bg-[var(--bg-secondary)]"
        }`}
      >
        {d}
      </div>,
    );
  }

  return (
    <div className="absolute top-full left-0 mt-3 bg-[var(--input-bg)] border border-[var(--input-border)] shadow-lg rounded p-4 z-30 w-72">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-3 text-[var(--text-main)]">
        <button
          onClick={handlePrev}
          className="p-1 hover:bg-[var(--bg-secondary)] rounded"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-center font-medium">
          {monthNames[month]} {year}
        </div>
        <button
          onClick={handleNext}
          className="p-1 hover:bg-[var(--bg-secondary)] rounded"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-[var(--text-muted)] mb-2">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm font-medium text-[var(--text-main)] select-none">
        {blankDays}
        {actualDays}
      </div>
    </div>
  );
}
