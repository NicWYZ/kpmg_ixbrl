"use client";
import FileUpload from "@/components/FileUpload";
import HighlightableHTML from "@/components/HighlightableHTML";
import TagModal from "@/components/TagModal";
import PreviewModal from "@/components/PreviewModal";
import { useState, useRef } from "react";
import { Tooltip } from "react-tooltip";
import { saveAs } from 'file-saver'
import 'react-tooltip/dist/react-tooltip.css'

export default function HomePage() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  //const [selectedText, setSelectedText] = useState<string | null>(null);
  const [isTaggingModalOpen, setIsTaggingModalOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  const selectedText = useRef<string>('')


  const handleHighlight = (highlightedText: string) => {
    //setSelectedText(highlightedText);
    selectedText.current = highlightedText;
  };

  const handleTag = (tagName: string, tagType: string, attributes: Record<string, string>) => {
    if (htmlContent && selectedText) {
      const taggedText = `<span class="tagged tooltip" style="background-color: yellow" data-tooltip-id="tagged element" data-tooltip-content="${tagName}" data-tooltip-place="top">
                            <ix:${tagType} ${Object.entries(attributes)
                              .map(([key, value]) => `${key}="${value}"`)
                              .join(" ")}>
                              ${selectedText.current}
                            </ix:${tagType}>
                          </span>`;

      const updatedHtmlContent = htmlContent.replace(selectedText.current, taggedText);

      setHtmlContent(updatedHtmlContent);
      //setSelectedText(null);
      selectedText.current = '';
    }
  };

  const handleExport = () => {
    if (!htmlContent) return;
  
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Function to convert HTML document to XHTML string
    const serializeToXHTML = (doc: Document) => {
      let xhtmlString = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xhtmlString += `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n`;
      xhtmlString += `<html xmlns="http://www.w3.org/1999/xhtml">\n`;
      xhtmlString += `<head>\n<title>Exported XHTML</title>\n</head>\n`;
      xhtmlString += `<body>\n`;
  
      const serializer = new XMLSerializer();
      doc.body.childNodes.forEach((node) => {
        xhtmlString += serializer.serializeToString(node);
      });
  
      xhtmlString += `\n</body>\n</html>`;
      return xhtmlString;
    };
  
    const xhtmlContent = serializeToXHTML(doc);
  
    // Create a Blob from the XHTML content
    const blob = new Blob([xhtmlContent], { type: 'application/xhtml+xml' });
    saveAs(blob, 'exported_file.xhtml');
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="w-full bg-gradient-to-r from-blue-700 to-purple-700 text-white py-4 flex justify-between items-center px-4">
        <h1 className="text-5xl font-bold">KTAG</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsPreviewModalOpen(true)}
            className="bg-black text-white w-24 h-12 flex items-center justify-center rounded-full"
          >
            Preview
          </button>
          <button 
            onClick={handleExport}
            className="bg-black text-white w-24 h-12 flex items-center justify-center rounded-full"
          >
            Export
          </button>
        </div>
      </div>

      <div className="container mx-auto mt-4 flex-1 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <FileUpload setHtmlContent={setHtmlContent} />
          <button
            onClick={() => setIsTaggingModalOpen(true)}
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
      <TagModal
        isOpen={isTaggingModalOpen}
        onClose={() => setIsTaggingModalOpen(false)}
        onTag={handleTag}
      />
      <PreviewModal 
        isOpen={isPreviewModalOpen} 
        onClose={() => setIsPreviewModalOpen(false)}
        htmlContent={htmlContent || ''} 
      />

      <Tooltip id="tagged element" />
    </div>
  );
}
