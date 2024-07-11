import React from 'react';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTag: (conceptName: string, tagType: string, attributes: Record<string, string>) => void;
  taxonomyData: {
    FinancialStatement: Array<Record<string, string | number | null>>;
    TaxComputation: Array<Record<string, string | number | null>>;
  };
}

export default function TagModal({ isOpen, onClose, onTag, taxonomyData }: TagModalProps) {
  if (!isOpen) return null;

  const handleTagClick = (concept: Record<string, string | number | null>) => {
    const { conceptName, tagType, contextRef, unitRef, name, id, scale, decimals, format } = concept;
    const attributes = {
      contextRef: contextRef as string,
      unitRef: unitRef as string,
      name: name as string,
      id: id as string,
      scale: scale?.toString() || "",
      decimals: decimals as string,
      format: format as string,
    };

    onTag(conceptName as string, tagType as string, attributes);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-4 h-fit w-3/4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Select a Tag</h2>
        <div className="overflow-y-auto max-h-96">
          <h3 className="text-lg font-semibold mb-2">Financial Statement Tags</h3>
          <ul className="space-y-2 mb-4">
            {taxonomyData.FinancialStatement.map((concept) => (
              <li
                key={concept.conceptName as string}
                className="cursor-pointer p-2 hover:bg-gray-200 border-b border-gray-300"
                onClick={() => handleTagClick(concept)}
              >
                {concept.conceptName as string}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Tax Computation Tags</h3>
          <ul className="space-y-2">
            {taxonomyData.TaxComputation.map((concept) => (
              <li
                key={concept.conceptName as string}
                className="cursor-pointer p-2 hover:bg-gray-200 border-b border-gray-300"
                onClick={() => handleTagClick(concept)}
              >
                {concept.conceptName as string}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}