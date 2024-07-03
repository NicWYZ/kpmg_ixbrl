"use client";
import FileUpload from "@/components/FileUpload";
import EditableHTML from "@/components/EditableHTML";
import { useState } from "react";

export default function HomePage() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 flex justify-between items-center px-4">
        <h1 className="text-5xl font-bold">KTAG</h1>
        <div className="flex space-x-4">
          <button className="bg-black text-white w-24 h-12 flex items-center justify-center rounded-full">
            Preview
          </button>
          <button className="bg-black text-white w-24 h-12 flex items-center justify-center rounded-full">
            Export
          </button>
        </div>
      </div>

      <div className="container mx-auto mt-4 flex-1 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <FileUpload setHtmlContent={setHtmlContent} />
          <button className="bg-purple-600 text-white w-24 h-12 flex items-center justify-center rounded-full">
            Tag
          </button>
        </div>
        {htmlContent && <EditableHTML htmlContent={htmlContent} />}
      </div>
    </div>
  );
}
