
import React from 'react';
import { instructions } from '../../data/instructions';
import { Search, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import supabase from "../../Supabse/supabse";

const InstructionsList = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const { data: drugs, isLoading, error } = useQuery({
    queryKey: ["general_instructions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("general_instructions")
        .select("id,drug,image_path")
        .order("drug", { ascending: true });

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 font-semibold">Error: {error.message}</div>
      </div>
    );
  }

  const filteredDrugs = drugs?.filter((drug) =>
    drug.drug.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
 
    <div className="max-w-full md:px-28 px-4 py-8 md:ml-20 transition-all duration-300">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search instructions..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
      </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
          {filteredDrugs.map((drug) => (
            <div
              key={drug.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() =>
                navigate(`/general/${drug.id}`, {
                  state: { id: drug.id, name: drug.drug },
                })
              }
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={drug.image_path || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=2084'}
                  alt={drug.drug}
                  className="w-full h-full object-cover"
                />
                {/* {instruction.severity && (
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(instruction.severity)}`}>
                      <AlertTriangle className="h-4 w-4" />
                      <span className="capitalize">{instruction.severity} Risk</span>
                    </div>
                  </div>
                )} */}
              </div>
              <div className="p-6">
                {/* <div className="text-sm font-medium text-teal-600 mb-1">
                  {instruction.category}
                </div> */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {drug.drug}
                </h3>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};


export default InstructionsList;