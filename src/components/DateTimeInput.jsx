import { useState } from "react";
import DateTimePicker from "./DatePicker";
import { format } from "date-fns";

export default function DateTimeInput() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSet = (value) => {
    setSelectedDateTime(value);
    setIsPickerOpen(false);
  };

  const handleCancel = () => {
    setIsPickerOpen(false);
  };

  return (
    <div className="bg-gray-900 p-5 rounded-xl text-white shadow-lg relative w-80 mt-5 mb-10">
      <h2 className="text-lg font-semibold mb-3">Date & Time</h2>

      {/* Input Field */}
      <input
        type="text"
        readOnly
        onClick={() => setIsPickerOpen(true)}
        value={
          selectedDateTime
            ? format(selectedDateTime, "dd MMM yyyy, hh:mm a")
            : ""
        }
        placeholder="Select date & time"
        className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />

      {/* Show Picker Below Input */}
      {isPickerOpen && (
        <div className="absolute top-30 left-0 z-50">
          <DateTimePicker onSet={handleSet} onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
}
