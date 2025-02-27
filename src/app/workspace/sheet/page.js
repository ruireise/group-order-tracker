export default function Sheet() {
    // Example: Number of joiners you want to show
    const joinerCount = 3; // You can dynamically change this as needed
  
    return (
      <div className="p-14 mt-12">
        <h1 className="text-2xl font-bold mb-10">Sheet Name Goes Here</h1>
        
        <div className="overflow-auto w-full">
          <table className="table-auto border-separate w-full">
            {/*Header*/}
            <thead className="bg-purple-300">
              <tr>
                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold" key="item-header">Item</th>
                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold" key="quantity-header">Quantity</th>
                <th className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold" key="cost-header">Cost per</th>
  
                {/* Dynamically create columns for Claim Qt. and Joiner */}
                {Array.from({ length: joinerCount }).map((_, index) => (
                  <>
                    <th key={`claim-qt-${index}`} className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold">Claim Qt.</th>
                    <th key={`joiner-${index}`} className="border-2 border-purple-700 px-6 py-2 text-md text-blue-600 font-semibold">Joiner</th>
                  </>
                ))}
              </tr>
            </thead>
  
            {/* Table Body */}
            <tbody>
              {Array.from({ length: 10 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="border-2 border-purple-700 px-2 py-2" key={`item-${rowIdx}`}>
                    <input
                      type="text"
                      className="w-full outline-none"
                    />
                  </td>
                  <td className="border-2 border-purple-700 px-2 py-2" key={`quantity-${rowIdx}`}>
                    <input
                      type="integer"
                      className="w-full outline-none"
                    />
                  </td>
                  <td className="border-2 border-purple-700 px-2 py-2" key={`cost-${rowIdx}`}>
                    <input
                      type="double"
                      className="w-full outline-none"
                    />
                  </td>
  
                  {/* Dynamically create inputs for Claim Qt. and Joiner columns */}
                  {Array.from({ length: joinerCount }).map((_, index) => (
                    <>
                      <td key={`claim-qt-input-${index}`} className="border-2 border-purple-700 px-2 py-2">
                        <input
                          type="number"
                          className="w-full outline-none"
                        />
                      </td>
                      <td key={`joiner-input-${index}`} className="border-2 border-purple-700 px-2 py-2">
                        <input
                          type="text"
                          className="w-full outline-none"
                        />
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  