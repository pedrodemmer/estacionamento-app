export default function Input({ placeholder, type, id, value, onChange, onKeyDown }) {
    return (
        <div>
            <input 
            placeholder={placeholder}
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200"/>
        </div>
    );
}
