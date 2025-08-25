import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm text-gray-600">© 2024 Expose</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link href="/tos" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <button
              className="hover:text-gray-900 transition-colors"
              data-tally-open="wd6Rvo"
              data-tally-width="280"
              data-tally-overlay="1"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              data-tally-auto-close="2000"
            >
              Support
            </button>
          </div>
        </div>
      </div>
      <script async src="https://tally.so/widgets/embed.js"></script>
    </div>
  );
}
