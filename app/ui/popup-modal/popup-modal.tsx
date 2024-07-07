export default function Toast() {
  return (
    <>
      <div
        id="toast-success"
        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              id="remix-icons/fill/system/checkbox-circle-fill"
              clip-path="url(#clip0_4502_1201)"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M7.99992 14.6667C4.31792 14.6667 1.33325 11.682 1.33325 8C1.33325 4.318 4.31792 1.33333 7.99992 1.33333C11.6819 1.33333 14.6666 4.318 14.6666 8C14.6666 11.682 11.6819 14.6667 7.99992 14.6667ZM7.22925 10.99L11.9426 6.276L10.9999 5.33333L7.22925 9.10467L5.34325 7.21867L4.40058 8.16133L7.22925 10.99Z"
                  fill="#3CBF61"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_4502_1201">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Item moved successfully.</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div
        id="toast-danger"
        className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4502_1210)">
              <path
                d="M7.99992 14.6667C4.31792 14.6667 1.33325 11.682 1.33325 8C1.33325 4.318 4.31792 1.33333 7.99992 1.33333C11.6819 1.33333 14.6666 4.318 14.6666 8C14.6666 11.682 11.6819 14.6667 7.99992 14.6667ZM7.33325 10V11.3333H8.66659V10H7.33325ZM7.33325 4.66667V8.66667H8.66659V4.66667H7.33325Z"
                fill="#D80027"
              />
            </g>
            <defs>
              <clipPath id="clip0_4502_1210">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Item has been deleted.</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-danger"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
      <div
        id="toast-warning"
        className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          Improve password difficulty.
        </div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-warning"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
