export default function DeleteUser() {
    return (
      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-2 text-gray-700">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path d="M4 12a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="4" />
          </svg>
          <span>Deleting User...</span>
        </div>
      </div>
    );
  }
  