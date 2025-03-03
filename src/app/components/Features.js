export default function Features() {
  return (
      <div className="bg-purple-50">
        <div className="relative p-16 w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="flex items-center justify-center md:justify-start md:ml-12 order-1 md:order-none">
            <div className="w-60 h-60 bg-gray-400"></div>
          </div>
          <p className="text-center md:text-left md:w-1/2 md:ml-12 order-2 md:order-none">Feature 1</p>
  
          {/* Feature 2 */}
          <p className="text-center md:text-right md:w-1/2 md:mr-12 order-4 md:order-none">Feature 2</p>
          <div className="flex items-center justify-center md:justify-end md:mr-12 order-3 md:order-none">
            <div className="w-60 h-60 bg-gray-400"></div>
          </div>
  
          {/* Feature 3 */}
          <div className="flex items-center justify-center md:justify-start md:ml-12 order-5 md:order-none">
            <div className="w-60 h-60 bg-gray-400"></div>
          </div>
          <p className="text-center md:text-left md:w-1/2 md:ml-12 order-6 md:order-none">Feature 3</p>
  
          {/* Feature 4 */}
          <p className="text-center md:text-right md:w-1/2 md:mr-12 order-8 md:order-none">Feature 4</p>
          <div className="flex items-center justify-center md:justify-end md:mr-12 order-7 md:order-none">
            <div className="w-60 h-60 bg-gray-400"></div>
          </div>
        </div>
      </div>
    );
  }
  