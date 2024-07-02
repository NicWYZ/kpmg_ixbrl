import React, { useRef, useState } from 'react';

const FileUploadComponent: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const fileType = file.name.endsWith('.docx') ? 'docx' : 'xlsx';

    try {
      const response = await fetch(`/api/${fileType}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setHtmlContent(data.html);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-7xl">
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
        {htmlContent && <div dangerouslySetInnerHTML={{ __html: htmlContent }} />}
      </div>
    </div>
  );
};

export default FileUploadComponent;