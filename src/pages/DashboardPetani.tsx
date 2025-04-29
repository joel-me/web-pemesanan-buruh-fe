import { useState } from "react";
import BuruhCard from "../components/BuruhCard";
import KeahlianFilter from "../components/KeahlianFilter";

const dummyBuruh = [
  { name: "Pak Budi", keahlian: ["Menanam", "Memanen"], hargaPerHari: 50000 },
  { name: "Bu Siti", keahlian: ["Mencangkul"], hargaPerHari: 60000 },
  { name: "Pak Andi", keahlian: ["Menyemprot", "Menanam"], hargaPerHari: 55000 },
];

export const DashboardPetani = () => {
  const [filter, setFilter] = useState("");

  const filteredBuruh = filter
    ? dummyBuruh.filter((b) => b.keahlian.includes(filter))
    : dummyBuruh;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cari Buruh</h1>

      <KeahlianFilter selected={filter} onSelect={setFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBuruh.map((buruh, index) => (
          <BuruhCard key={index} {...buruh} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPetani;
