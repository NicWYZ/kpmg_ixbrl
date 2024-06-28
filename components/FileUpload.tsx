import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function FileUpload() {
    const [htmlContent, setHtmlContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const fileType = file.name.endsWith('.docx') ? 'docx' : 'xlsx';

    try {
      const response = await axios.post(`/api/${fileType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setHtmlContent(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <button onClick={handleClick} className="bg-blue-600 text-white w-24 h-12 flex items-center justify-center rounded-full mb-4">
        Import
      </button>
      <input
        type="file"
        accept=".docx,.xlsx"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
      <div className="bg-gray-300 flex-1 rounded-lg mb-4 p-4 overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      </div>
    </div>
    );
};