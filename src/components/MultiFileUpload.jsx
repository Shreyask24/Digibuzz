import { useState } from "react";

export default function MultiFileUpload() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection from input
  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  // Remove a file from the list
  const handleRemove = (name) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  // Prevent browser default behavior
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload Supporting Documents
      </h2>

      {/* Drag-and-Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-indigo-500 bg-gray-800"
            : "border-gray-600 bg-gray-800 hover:border-indigo-400"
        }`}
      >
        <p className="text-gray-300 mb-2">
          Drag & drop files here, or{" "}
          <label
            htmlFor="fileInput"
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            browse
          </label>
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <p className="text-xs text-gray-500">Supports: Images, PDFs, Docs</p>
      </div>

      {/* File Preview List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-medium text-gray-300 mb-2">
            Uploaded Files ({files.length})
          </h3>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-800 px-4 py-3 rounded-lg"
            >
              {/* File Info */}
              <div className="flex items-center gap-3">
                {/* Show preview if image */}
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-700 text-gray-400 text-sm">
                    📄
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(file.name)}
                className="text-red-500 hover:text-red-400 text-sm font-medium"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {files.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={() => alert("Files submitted successfully!")}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
