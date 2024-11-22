
const Card = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center w-40 h-24 bg-white rounded-md shadow-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default Card;
