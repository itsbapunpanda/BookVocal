// src/components/PageRangeSelector.tsx
type Props = {
  pageRange: { start: number; end: number };
  setPageRange: (range: { start: number; end: number }) => void;
};

export default function PageRangeSelector({ pageRange, setPageRange }: Props) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Select Page Range</label>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Start"
          value={pageRange.start}
          onChange={(e) => setPageRange({ ...pageRange, start: Number(e.target.value) })}
          className="w-1/2 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />
        <input
          type="number"
          placeholder="End"
          value={pageRange.end}
          onChange={(e) => setPageRange({ ...pageRange, end: Number(e.target.value) })}
          className="w-1/2 p-2 rounded bg-gray-100 dark:bg-gray-700"
        />
      </div>
    </div>
  );
}
