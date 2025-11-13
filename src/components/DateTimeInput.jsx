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
    <div className="relative w-80">
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
        <div className="absolute top-14 left-0 z-50">
          <DateTimePicker onSet={handleSet} onCancel={handleCancel} />
        </div>
      )}
    </div>
  );
}
