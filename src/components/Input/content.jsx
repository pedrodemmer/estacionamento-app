export default function Input({ placeholder }) {
    return (
        <div>
            <input type="text" placeholder={placeholder}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200"/>
        </div>
    );
}
