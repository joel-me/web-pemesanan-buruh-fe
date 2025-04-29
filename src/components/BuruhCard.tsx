type BuruhProps = {
    name: string;
    keahlian: string[];
    hargaPerHari: number;
  };
  
  export const BuruhCard = ({ name, keahlian, hargaPerHari }: BuruhProps) => {
    return (
      <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">Keahlian: {keahlian.join(", ")}</p>
        <p className="text-sm text-gray-800 mt-2">Harga: Rp {hargaPerHari}/hari</p>
        <button className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Pesan
        </button>
      </div>
    );
  };
  
  export default BuruhCard;
  