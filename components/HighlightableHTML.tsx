interface HighlightableHTMLProps {
  htmlContent: string | null;
  onHighlight: (highlightedText: string) => void;
}

export default function HighlightableHTML({
  htmlContent,
  onHighlight,
}: HighlightableHTMLProps) {
  const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        onHighlight(selection.toString());
      }
  };

  const safeHtmlContent = htmlContent || "";

  return (
    <div
      className="bg-gray-300 flex-1 rounded-lg mb-4 p-4 overflow-auto w-full"
      onMouseUp={handleMouseUp}
      dangerouslySetInnerHTML={{ __html: safeHtmlContent }}
    ></div>
  );
}
