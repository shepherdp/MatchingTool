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
      <div className="h-screen flex flex-col">
        <LoggedNav />
        <main className="flex-grow bg-[#E6F3FE]">
          <section>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-[#4169E1] h-auto">
                <div className="flex flex-col place-items-center pt-6 gap-y-8 bg-[#E6F3FE] p-4 lg:p-8">
                  <h2>{groupName}</h2>
                  <h3>Previous Teams:</h3>
                  {prevTeams.length === 0 ? (
                    <p>No teams found.</p>
                  ) : (
                    <ul>
                      {prevTeams.map((team, index) => (
                        <li key={index}>
                          <div
                            className="w-[300px] bg-[#4169E1] p-4 mb-4 rounded-lg cursor-pointer"
                            onClick={() => handleActivityClick(index)}
                          >
                            <div className="text-white text-lg font-bold flex justify-center">
                              {team[0]}
                            </div>
                            {team.showPartnerships && (
                              <div>
                                <strong className="text-white mt-4 flex justify-center">Partnerships:</strong>
                                <ul>
                                  {team[1].map((partnership, i) => (
                                    <li key={i} className="text-white flex justify-center">
                                      Team {i + 1}: {partnership.join(", ")}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrevTeams;

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


