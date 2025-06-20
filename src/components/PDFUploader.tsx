// src/components/PDFUploader.tsx
type Props = {
  onFileSelect: (file: File | null) => void;
};

export default function PDFUploader({ onFileSelect }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file?.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      onFileSelect(null);
      return;
    }
    onFileSelect(file);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">Upload PDF File</label>
      <input type="file" accept="application/pdf" onChange={handleChange} />
    </div>
  );
}
