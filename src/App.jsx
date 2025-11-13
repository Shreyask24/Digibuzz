import ChartWidget from "./components/ChartWidget";
import DateTimePicker from "./components/DatePicker";
import DateTimeInput from "./components/DateTimeInput";
import FirebaseNotificationDemo from "./components/FirebaseNotificationDemo";
import MultiFileUpload from "./components/MultiFileUpload";
import MultiSelectDropdown from "./components/MultiSelectDropdown";

function App() {
  return (
    <>
      <div className="min-h-screen flex justify-center flex-col items-center bg-gray-800">
        <DateTimeInput />
        <MultiSelectDropdown />
        <ChartWidget />
        <MultiFileUpload />
        <FirebaseNotificationDemo />
      </div>
    </>
  );
}

export default App;
