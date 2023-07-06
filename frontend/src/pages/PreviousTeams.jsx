import { useState, useContext, useEffect } from "react";
import { groupContext } from "../helper/group_context";
import { getCookie } from "../components/queries";
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";

const PrevTeams = () => {
  const { groupName, setGroupName } = useContext(groupContext);
  const [prevTeams, setPrevTeams] = useState([]);

  useEffect(() => {
    const val = sessionStorage.getItem('groupName');
    setGroupName(val);
    fetchTeams();
  }, [groupName]);

  const fetchTeams = () => {
    fetch(`/member/previousteams`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ group_name: groupName })
    })
      .then(response => response.json())
      .then(resp => setPrevTeams(resp.teams))
      .catch(error => console.error('Error:', error));
  };

  const handleActivityClick = (index) => {
    const updatedPrevTeams = [...prevTeams];
    updatedPrevTeams[index].showPartnerships = !updatedPrevTeams[index].showPartnerships;
    setPrevTeams(updatedPrevTeams);
  };

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <LoggedNav />
        <main className='flex-grow w-screen bg-[#E6F3FE]'>
          <div>
            <h2>{groupName}</h2>
            <h3>Previous Teams:</h3>
            {prevTeams.length === 0 ? (
              <p>No teams found.</p>
            ) : (
              <ul>
                {prevTeams.map((team, index) => (
                  <li key={index}>
                    <div
                      className="w-[300px] h-[50px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[20px] hover:text-[25px]"
                      onClick={() => handleActivityClick(index)}
                    >
                      <span className="text-[20px] font-bold overflow-hidden">Activity Name: {team[0]}</span>
                    </div>
                    {team.showPartnerships && (
                      <div>
                        <strong>Partnerships:</strong>
                        <ul>
                          {team[1].map((partnership, i) => (
                            <li key={i}>Team {i + 1}: {partnership}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrevTeams;

// import { useContext, useEffect, useState } from "react";
// import { groupContext } from "../helper/group_context";
// import { getCookie } from "../components/queries";
// import LoggedNav from "../components/navbar";
// import Footer from "../components/footer";

// const PrevTeams = () => {
//   const { groupName, setGroupName } = useContext(groupContext);
//   const [prevTeams, setPrevTeams] = useState([]);

//   useEffect(() => {
//     const val = sessionStorage.getItem('groupName');
//     setGroupName(val);
//     fetchTeams();
//   }, []);

//   const fetchTeams = () => {
//     fetch(`/member/previousteams`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'X-CSRF-TOKEN': getCookie('csrf_access_token'),
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ group_name: groupName })
//     })
//       .then(response => response.json())
//       .then(resp => setPrevTeams(resp.teams))
//       .catch(error => console.error('Error:', error));
//   };

//   const handleActivityClick = (index) => {
//     // Toggle partnerships visibility for the clicked activity
//     const updatedPrevTeams = [...prevTeams];
//     updatedPrevTeams[index].showPartnerships = !updatedPrevTeams[index].showPartnerships;
//     setPrevTeams(updatedPrevTeams);
//   };

//   return (
//     <>
//       <main className='w-screen h-screen bg-[#E6F3FE]'>
//         <LoggedNav />
//         <div>
//           <h2>Class Name: {groupName}</h2>
//           <h3>Previous Teams:</h3>
//           <ul>
//             {prevTeams.map((team, index) => (
//               <li key={index}>
//                 <button type="button" onClick={() => handleActivityClick(index)}>
//                   <strong>Activity Name:</strong> {team[0]}
//                 </button>
//                 {team.showPartnerships && (
//                   <div>
//                     <strong>Partnerships:</strong>
//                     <ul>
//                       {team[1].map((partnership, i) => (
//                         <li key={i}>Team {i + 1}: {partnership}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <Footer />
//       </main>
//     </>
//   );
// };

// export default PrevTeams;



// import { useContext, useEffect, useState } from "react"
// import { groupContext } from "../helper/group_context"
// import { getCookie } from "../components/queries";

// const PrevTeams = ()=>{
//   const {groupName, setGroupName} = useContext(groupContext)
//   const [prevTeams, setPrevTeams] = useState([])
//   useEffect(()=>{
//     const val = sessionStorage.getItem('groupName')
//     setGroupName(val)
//   }, []);

//   return (
//     <>
//     <button type="button" className="w-20 h-20 bg-blue-400" onClick={
//       ()=>{
//         fetch(
//           `/member/previousteams`, {
//               method: 'POST',
//               credentials: 'include',
//               headers: {
//                   'X-CSRF-TOKEN': getCookie('csrf_access_token'),
//                       'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({group_name:groupName})
//           }
//       ).then(response => response.json()).then(resp => setPrevTeams(resp))
//       }
//     }>send</button>
//     </>
//   )
// }

// export default PrevTeams;


