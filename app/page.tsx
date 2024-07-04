"use client";
import FileUpload from "@/components/FileUpload";
import HighlightableHTML from "@/components/HighlightableHTML";
import TagModal from "@/components/TagModal";
import { useState } from "react";

export default function HomePage() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const handleHighlight = (highlightedText: string) => {
    setSelectedText(highlightedText);
  };

  const handleTag = (tagType: string, attributes: Record<string, string>) => {
    if (htmlContent && selectedText) {
      const taggedText = `<span class="tagged tooltip"><ix:${tagType} ${Object.entries(
        attributes
      )
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")}>${selectedText}</ix:${tagType}></span>`;

      const updatedHtmlContent = htmlContent.replace(selectedText, taggedText);
      setHtmlContent(updatedHtmlContent);
      setSelectedText(null);
    }
  };

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
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white w-24 h-12 flex items-center justify-center rounded-full"
          >
            Tag
          </button>
        </div>
        {htmlContent && (
          <HighlightableHTML
            htmlContent={htmlContent}
            onHighlight={handleHighlight}
          />
        )}
      </div>
      <TagModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTag={handleTag} />
    </div>
  );
}
