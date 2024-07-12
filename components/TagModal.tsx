import taxonomyData from "@/taxonomyData.json";

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTag: (concept: any) => void;
}

export default function TagModal({ isOpen, onClose, onTag }: TagModalProps) {
  if (!isOpen) return null;

  const handleTagClick = (concept: any) => {
    onTag(concept);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 overflow-auto">
      <div className="bg-white rounded-lg px-4 pb-4 w-5/6 h-2/3 overflow-y-auto">
        <div className="sticky top-0 bg-white flex justify-between border-b border-gray-200">
          <h2 className="text-2xl font-bold my-2">Select a Tag</h2>
          <button
            onClick={onClose}
            className=" my-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Financial Statement</h3>
          <ul>
            {taxonomyData.FinancialStatement.map((concept) => (
              <li
                key={concept.conceptName}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleTagClick(concept)}
              >
                {concept.conceptName}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Tax Computation</h3>
          <ul>
            {taxonomyData.TaxComputation.map((concept) => (
              <li
                key={concept.conceptName}
                className="cursor-pointer p-2 hover:bg-gray-200"
                onClick={() => handleTagClick(concept)}
              >
                {concept.conceptName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
