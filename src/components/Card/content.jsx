export default function Card({ title, value, comparison }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full h-full flex flex-col justify-between text-center">
      <h2 className="text-gray-800 text-sm font-semibold">{title}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p
        className={`text-sm ${
          comparison > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {comparison > 0 ? `+${comparison}%` : `${comparison}%`} em relação
        ao mês anterior
      </p>
    </div>
  );
}
