import { useState, useEffect } from 'react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
}

interface TagData {
  tagName: string;
  tagType: string;
  value: string;
  attributes: Record<string, string>;
}

const extractTags = (htmlContent: string): TagData[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const tags: TagData[] = [];

  doc.querySelectorAll('.tagged.tooltip').forEach((element) => {
    const tag = element.querySelector('ix\\:nonFraction, ix\\:null'); // Adjust for your specific tag names
    if (tag) {
      const attributes: Record<string, string> = {};
      Array.from(tag.attributes).forEach((attr) => {
        attributes[attr.name] = attr.value;
      });
      tags.push({
        tagName: element.getAttribute('data-tooltip-content') || '',
        tagType: tag.tagName,
        value: tag.innerHTML,
        attributes,
      });
    }
  });

  return tags;
};

export default function PreviewModal({ isOpen, onClose, htmlContent }: PreviewModalProps) {
  const [selectedTag, setSelectedTag] = useState<TagData | null>(null);
  const [tags, setTags] = useState<TagData[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTags(extractTags(htmlContent));
    }
  }, [isOpen, htmlContent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-4 w-2/3 max-h-3/4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Preview Tags</h2>
        <div className="flex">
          <table className="w-1/2 border">
            <thead>
              <tr>
                <th className="border p-2">Tag Name</th>
                <th className="border p-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag, index) => (
                <tr key={index} className="cursor-pointer" onClick={() => setSelectedTag(tag)}>
                  <td className="border p-2">{tag.tagName}</td>
                  <td className="border p-2">{tag.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-1/2 border p-4">
            {selectedTag ? (
              <div>
                <h3 className="text-lg font-bold mb-2">Tag Attributes</h3>
                <ul>
                  {Object.entries(selectedTag.attributes).map(([key, value]) => (
                    <li key={key} className="mb-1">
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Select a value to see attributes</p>
            )}
          </div>
        </div>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}