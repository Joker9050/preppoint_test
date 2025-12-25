"use client";

export default function Navigation({
  index,
  total,
  onPrev,
  onNext
}) {
  return (
    <div className="flex justify-between items-center my-4">
      <button
        onClick={onPrev}
        disabled={index === 0}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        ⬅ Previous
      </button>

      <span className="text-sm">
        Question {index + 1} of {total}
      </span>

      <button
        onClick={onNext}
        disabled={index === total - 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next ➡
      </button>
    </div>
  );
}
