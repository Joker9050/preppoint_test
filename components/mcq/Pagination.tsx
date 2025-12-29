type Props = {
  onPrev: () => void
  onNext: () => void
  disablePrev: boolean
  disableNext: boolean
}

export default function Pagination({ onPrev, onNext, disablePrev, disableNext }: Props) {
  return (
    <div className="flex justify-between items-center py-4 border-t border-b border-gray-200 my-6">
      <button
        type="button"
        disabled={disablePrev}
        onClick={onPrev}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${disablePrev 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:scale-95'
          }
        `}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      <div className="text-sm text-gray-500">
        Navigate through topics
      </div>

      <button
        type="button"
        disabled={disableNext}
        onClick={onNext}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${disableNext 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }
        `}
      >
        Next
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}