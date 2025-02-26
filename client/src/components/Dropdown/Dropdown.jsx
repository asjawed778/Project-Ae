import { forwardRef, useState } from "react";
import { useGetDropdownOptionsQuery } from "../../services/course.api";
import { ImSpinner2 } from "react-icons/im";

const Dropdown = forwardRef(({ endpoint, label, required, placeholder = "Select an option", className = "", ...rest }, ref) => {
  const [fetchData, setFetchData] = useState(false);
  const { data: options, error, isLoading } = useGetDropdownOptionsQuery(endpoint, { skip: !fetchData });

  const handleClick = () => {
    if (!fetchData) setFetchData(true); // Trigger API call only on first click
  };

  return (
    <div className="relative">
      <label className="block mb-1.5">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        className={`mt-1 block w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none ${className}`}
        onClick={handleClick} // Trigger API call
        ref={ref} // Accept ref for react-hook-form
        {...rest}
      >
        <option value="">{placeholder}</option>
        {isLoading ? (
          <option className="text-center">
              Loading...
          </option>
        ) : error ? (
          <option disabled>Error fetching options</option>
        ) : (
          options?.data?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
});

export default Dropdown;




// import { forwardRef, useState } from "react";
// import { useGetDropdownOptionsQuery } from "../../services/course.api";

// const Dropdown = forwardRef(({ endpoint, label,required, placeholder = "Select an option", className = "", ...rest }, ref) => {
//   const [fetchData, setFetchData] = useState(false);
//   const { data: options, error, isLoading } = useGetDropdownOptionsQuery(endpoint, { skip: !fetchData });

//   const handleClick = () => {
//     if (!fetchData) setFetchData(true); // Trigger API call only on first click
//   };

//   return (
//     <div className="relative ">
//       <label className="block">{label} {required && <span className="text-red-600">*</span>}</label>
//       <select
//         className={`mt-1 block p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none ${className}`}
//         onClick={handleClick} // Trigger API call
//         ref={ref} // Accept ref for react-hook-form
//         {...rest}
//       >
//         {isLoading ? (
//           <>
//             <option value="">{placeholder}</option>
//             <option className="h-[20vh] flex justify-center items-center">Loading...</option>
//           </>
//         ) : error ? (
//           <option>Error fetching options</option>
//         ) : (
//           <>
//             <option value="">{placeholder}</option>
//             {options?.data?.map((option) => (
//               <option key={option._id} value={option._id}>
//                 {option.name}
//               </option>
//             ))}
//           </>
//         )}
//       </select>
//     </div>
//   );
// });

// export default Dropdown;



// // import { useState } from "react";
// // import { useGetDropdownOptionsQuery } from "../../services/course.api";

// // const Dropdown = ({ endpoint, label, placeholder = "Select an option", className="", ...rest }) => {
// //   const [fetchData, setFetchData] = useState(false);
// //   const { data: options, error, isLoading } = useGetDropdownOptionsQuery(endpoint, { skip: !fetchData });

// //   const handleClick = () => {
// //     if (!fetchData) setFetchData(true); // Trigger API call on first click
// //   };

// //   return (
// //     <div className="relative w-64">
// //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// //       <select
// //         className={"mt-1 block w-full p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none" + className}
// //         onClick={handleClick} // Trigger API call
// //         {...rest}
// //       >
// //         {isLoading ? (
// //             <>
// //             <option value="">{placeholder}</option>
// //           <option className="h-[20vh] flex justify-center items-center">Loading...</option>
// //             </>
// //         ) : error ? (
// //           <option>Error fetching options</option>
// //         ) : (
// //           <>
// //             <option value="">{placeholder}</option>
// //             {options?.data?.map((option) => (
// //               <option key={option._id} value={option._id}>
// //                 {option.name}
// //               </option>
// //             ))}
// //           </>
// //         )}
// //       </select>
// //     </div>
// //   );
// // };

// // export default Dropdown;




// // // import { useGetDropdownOptionsQuery } from "../../services/course.api";


// // // const Dropdown = ({ endpoint, label, placeholder = "Select an option", ...rest }) => {
// // //   const { data: options, error, isLoading } = useGetDropdownOptionsQuery(endpoint);
// // //   console.log("data are:", options)

// // //   return (
// // //     <div className="relative w-64">
// // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// // //       <select
// // //         className="mt-1 block w-full p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
// // //         disabled={isLoading}
// // //         {...rest}
// // //       >
// // //         {isLoading ? (
// // //           <option>Loading...</option>
// // //         ) : error ? (
// // //           <option>Error fetching options</option>
// // //         ) : (
// // //           <>
// // //             <option value="">{placeholder}</option>
// // //             {options?.data?.map((option) => (
// // //               <option key={option._id} value={option._id}>
// // //                 {option.name}
// // //               </option>
// // //             ))}
// // //           </>
// // //         )}
// // //       </select>
// // //     </div>
// // //   );
// // // };

// // // export default Dropdown;
