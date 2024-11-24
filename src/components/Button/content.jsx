import "../../tailwind.css";
import Link from "next/link";

export default function Button({ id, label, color, onClick, href = "#" }) {
  return (
    <div>
      <Link href={href}>
          <input
            id={id}
            type="button"
            value={label}
            className={`px-6 py-2 ${color} text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition duration-300 cursor-pointer`}
            onClick={onClick}
          />
      </Link>
    </div>
  );
}
