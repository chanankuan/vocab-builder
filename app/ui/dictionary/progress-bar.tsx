export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-6 h-6">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background */}
        <circle
          className="text-gray-200 stroke-[#D4F8D3]"
          strokeWidth="15"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        {/* <!-- Progress circle --> */}
        <circle
          className="text-indigo-500 progress-ring__circle stroke-[#2BD627]"
          strokeWidth="15"
          strokeLinecap={progress >= 100 ? 'butt' : 'round'}
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray="251.2"
          strokeDashoffset={`calc(251.2 - (251.2 * ${progress}) / 100)`}
          transform="rotate(-90 50 50)"
        ></circle>
      </svg>
    </div>
  );
}
