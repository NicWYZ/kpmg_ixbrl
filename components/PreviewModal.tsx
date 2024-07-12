import { useState } from 'react';
import { TaggedConcept } from "@/app/page"


interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  taggedConcepts: TaggedConcept[];
}

export default function PreviewModal({ isOpen, onClose, taggedConcepts }: PreviewModalProps) {
  const [selectedTag, setSelectedTag] = useState<TaggedConcept | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-4 w-2/3">
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
              {taggedConcepts.map((tag, index) => (
                <tr key={index} className="cursor-pointer" onClick={() => setSelectedTag(tag)}>
                  <td className="border p-2">{tag.concept.conceptName}</td>
                  <td className="border p-2">{tag.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-1/2 border p-4">
            {selectedTag ? (
              <div>
                <h3 className="text-lg font-bold mb-2">Documentation Label</h3>
                <p>{selectedTag.concept.documentationLabel}</p>
              </div>
            ) : (
              <p>Select a value to see the documentation label</p>
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