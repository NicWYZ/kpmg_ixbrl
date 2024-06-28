"use client"
import FileUpload from "@/components/FileUpload";

export default function HomePage(){
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 flex justify-between items-center px-4">
        <h1 className="text-5xl font-bold">KTAG</h1>
        <div className="flex space-x-4">
          <button className="bg-black text-white w-24 h-12 flex items-center justify-center rounded-full">Preview</button>
          <button className="bg-black text-white w-24 h-12 flex items-center justify-center rounded-full">Export</button>
        </div>
      </div>

      <div className="container mx-auto mt-4 px-4 flex-1 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <FileUpload />
          <button className="bg-purple-600 text-white w-24 h-12 flex items-center justify-center rounded-full">Tag</button>
        </div>
      </div>
    </div>
  );
};

