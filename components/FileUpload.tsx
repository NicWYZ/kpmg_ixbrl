import  { useRef } from 'react';

interface FileUploadProps {
  setHtmlContent: (html: string) => void;
}

export default function FileUploadComponent({ setHtmlContent }: FileUploadProps){
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
    <div className= 'flex justify-center items-center'>
      <button onClick={handleClick} className="bg-blue-600 text-white w-24 h-12 flex items-center justify-center rounded-full">
        Import
      </button>
      <input
        type="file"
        accept=".docx,.xlsx"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};