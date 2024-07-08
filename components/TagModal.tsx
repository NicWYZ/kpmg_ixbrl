interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTag: (tagName: string, tagType: string, attributes: Record<string, string>) => void;
}

export default function TagModal({ isOpen, onClose, onTag }: TagModalProps) {
  if (!isOpen) return null;

  const handleTagClick = (tagName: string) => {
    const attributes = {
      contextRef: "ird5fca4e14-f7cd-4fb2-8b0f-26a54aed1fe7",
      unitRef: "ird8a72302b-0ebb-4490-ad22-de02258f0ee2",
      name: `ird_fs:${tagName}`,
      id: "ird3086a2c2-ed9b-4a90-ab09-f2db8032ec33",
      scale: "0",
      decimals: "INF",
      format: "ixt:num-dot-decimal",
    };

    const tagType = 'nonFraction'
    
    onTag(tagName, tagType, attributes);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h2 className="text-xl font-bold mb-4">Select a Tag</h2>
        <ul>
          {["OtherIncome", "Revenue", "Expenses"].map((tag) => (
            <li
              key={tag}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
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
