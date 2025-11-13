import { useState } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfToday,
  addDays,
} from "date-fns";

export default function DateTimePicker({ onSet, onCancel }) {
  // Get today's date (used for disabling past dates)
  const today = startOfToday();

  // State variables
  const [currentMonth, setCurrentMonth] = useState(today); // current month shown in calendar
  const [selectedDate, setSelectedDate] = useState(today); // selected date by user
  const [hours, setHours] = useState(today.getHours() % 12 || 12); // 12-hour format
  const [minutes, setMinutes] = useState(today.getMinutes());
  const [isPM, setIsPM] = useState(today.getHours() >= 12); // AM/PM
  const [isOpen, setIsOpen] = useState(true); // show/hide picker

  // Get all days for the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  // Change month
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // When user clicks SET
  const handleSet = () => {
    const finalHour = isPM ? (hours % 12) + 12 : hours % 12; // convert to 24-hour
    const newDate = new Date(selectedDate);
    newDate.setHours(finalHour);
    newDate.setMinutes(minutes);

    onSet?.(newDate); // send value to parent
  };

  // When user clicks CANCEL
  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false); // hide picker
  };

  // Quick select options
  const handleQuickSelect = (type) => {
    if (type === "today") setSelectedDate(today);
    if (type === "7days") setSelectedDate(addDays(today, 7));
    if (type === "month") setSelectedDate(endOfMonth(today));
  };

  // If picker is closed, hide component
  if (!isOpen) return null;

  return (
    <div className="bg-[#111827] text-gray-200 rounded-2xl shadow-xl p-5 w-80 mx-auto">
      {/* ---------- Header (Month Navigation) ---------- */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={goToPreviousMonth}
          className="text-gray-400 hover:text-white transition"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMM yyyy")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-gray-400 hover:text-white transition"
        >
          →
        </button>
      </div>

      {/* ---------- Weekday Names ---------- */}
      <div className="grid grid-cols-7 text-xs text-gray-400 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* ---------- Calendar Dates ---------- */}
      <div className="grid grid-cols-7 text-sm">
        {daysInMonth.map((day) => {
          const isDisabled = isBefore(day, today); // disable past dates
          const isSelected = isSameDay(day, selectedDate); // highlight selected

          return (
            <button
              key={day}
              onClick={() => !isDisabled && setSelectedDate(day)}
              className={`mx-auto my-1 w-8 h-8 rounded-full flex items-center justify-center
                ${
                  isSelected
                    ? "bg-indigo-600 text-white"
                    : isDisabled
                    ? "text-gray-600 cursor-not-allowed"
                    : isSameMonth(day, currentMonth)
                    ? "hover:bg-gray-700"
                    : "text-gray-500"
                }`}
              disabled={isDisabled}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* ---------- Quick Range Buttons ---------- */}
      <div className="flex justify-between text-xs mt-3">
        <button
          onClick={() => handleQuickSelect("today")}
          className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          Today
        </button>
        <button
          onClick={() => handleQuickSelect("7days")}
          className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handleQuickSelect("month")}
          className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          This Month
        </button>
      </div>

      {/* ---------- Time Picker Section ---------- */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setHours((prev) => (prev % 12) + 1)}
            className="text-gray-400 hover:text-white"
          >
            ▲
          </button>
          <input
            type="number"
            value={hours}
            onChange={(e) =>
              setHours(Math.min(12, Math.max(1, +e.target.value || 1)))
            }
            className="w-10 bg-transparent text-center border border-gray-600 rounded"
          />
          <button
            onClick={() => setHours((prev) => (prev === 1 ? 12 : prev - 1))}
            className="text-gray-400 hover:text-white"
          >
            ▼
          </button>
        </div>

        <span>:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setMinutes((prev) => (prev + 1) % 60)}
            className="text-gray-400 hover:text-white"
          >
            ▲
          </button>
          <input
            type="number"
            value={minutes.toString().padStart(2, "0")}
            onChange={(e) =>
              setMinutes(Math.min(59, Math.max(0, +e.target.value || 0)))
            }
            className="w-10 bg-transparent text-center border border-gray-600 rounded"
          />
          <button
            onClick={() => setMinutes((prev) => (prev === 0 ? 59 : prev - 1))}
            className="text-gray-400 hover:text-white"
          >
            ▼
          </button>
        </div>

        {/* AM/PM Button */}
        <button
          onClick={() => setIsPM((prev) => !prev)}
          className="px-3 py-2 border border-gray-600 rounded text-sm hover:bg-gray-700"
        >
          {isPM ? "PM" : "AM"}
        </button>
      </div>

      {/* ---------- Action Buttons ---------- */}
      <div className="flex justify-between mt-5">
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSet}
          className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded text-white"
        >
          Set
        </button>
      </div>
    </div>
  );
}
