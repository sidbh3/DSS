import Card from "./Card";

const CardsSection = () => {
  const stats = [
    { title: "Total System Running", value: 20 },
    { title: "Total Standard User", value: 54 },
    { title: "Total Data Records", value: 25 },
    { title: "Total System User", value: 36 },
  ];

  return (
    <div className="flex justify-between items-center gap-4 px-6 py-4 bg-[#E8F4FB] rounded-md shadow-md">
      {stats.map((stat, index) => (
        <Card key={index} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default CardsSection;
