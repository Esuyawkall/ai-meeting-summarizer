type UploadProps = {
  fileType: "text" | "audio";
  onClose: () => void;
  onFileRead?: (content: string | File) => void;
};

export default function Upload({ fileType, onClose, onFileRead }: UploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileType === "text") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        onFileRead?.(text);
      };
      reader.readAsText(file);
    }

    if (fileType === "audio") {
      onFileRead?.(file);
    }
  };

  return (
    <div className="w-full h-full bg-black/50 dark:bg-white/50 absolute flex items-center justify-center z-10 top-0">
      <div className="will-change-contents p-16 rounded-2xl bg-white text-black dark:bg-black dark:text-white relative">
        <button
          className="top-2 right-2 absolute rounded-full bg-red-500 text-white w-6"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {fileType === "text" ? "Upload Text File" : "Upload Audio File"}
        </h2>

        <div className="flex">
          <input
            className="border border-black dark:border-white px-2 py-1 rounded-xl"
            onChange={handleFileChange}
            type="file"
            accept={fileType === "text" ? ".txt,.md" : "audio/*"}
          />

          <button
            onClick={onClose}
            className="w-auto text-center min-w-[100px] text-white transition-all shadow-xl sm:w-auto bg-blue-500 hover:bg-blue-700 hover:shadow-lg shadow-blue-400
            dark:shadow-gray-600 hover:dark:shadow-sm dark:shadow-md dark:hover:bg-green-600 dark:bg-green-400 rounded-2xl px-2 py-1 mx-2"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
