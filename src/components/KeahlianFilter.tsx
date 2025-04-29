type KeahlianFilterProps = {
    selected: string;
    onSelect: (keahlian: string) => void;
  };
  
  export const KeahlianFilter = ({ selected, onSelect }: KeahlianFilterProps) => {
    const keahlianOptions = ["Menanam", "Memanen", "Mencangkul", "Menyemprot"];
  
    return (
      <div className="flex space-x-2 mb-4">
        {keahlianOptions.map((keahlian) => (
          <button
            key={keahlian}
            onClick={() => onSelect(keahlian)}
            className={`px-3 py-1 rounded ${
              selected === keahlian
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {keahlian}
          </button>
        ))}
      </div>
    );
  };
  
  export default KeahlianFilter;
  