import { useState, useContext, useEffect } from "react";
import { groupContext } from "../helper/group_context";
import { getCookie, server_domain } from "../components/queries";
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
    fetch(`${server_domain}/member/previousteams`, {
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
                  <h2 className="bg-white rounded-lg p-4 text-center text-2xl font-bold">{groupName}</h2>
                  {prevTeams.length === 0 ? (
                    <p>No teams found.</p>
                  ) : (
                    <ul>
                      {prevTeams.map((team, index) => (
                        <li key={index}>
                          <div
                            className="overflow-x-scroll whitespace-normal w-[400px] bg-[#4169E1] p-4 mb-4 rounded-lg cursor-pointer shadow-lg shadow-[#4169E1] hover:scale-[105%] delay-75"
                            onClick={() => handleActivityClick(index)}
                            style={{
                              maxWidth: '400px',
                              overflowX: 'auto',
                              WebkitOverflowScrolling: 'touch',
                            }}
                          >
                            <div className=" text-white text-lg font-bold flex justify-center overflow-hidden">
                              {team[0]}
                            </div>
                            {team.showPartnerships && (
                              <div>
                                <strong className="text-white mt-4 flex justify-center pb-4">Partnerships:</strong>
                                <ul className="flex flex-col gap-y-4">
                                  {team[1].map((partnership, i) => (
                                    <li key={i} className="text-white">
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


