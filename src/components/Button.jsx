export default function Button({ children, onClick, className = '' }) {
    return (
        <button class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm transform transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-700">
        Click Me
      </button>
    );
  }
  