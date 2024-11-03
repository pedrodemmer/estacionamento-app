import '../../tailwind.css';

export default function Button({ label }) {
    return (
        <div>
            <input 
                type="button" 
                value={label} 
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer" 
            />
        </div>
    );
}
