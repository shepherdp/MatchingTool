import { BiPlusMedical, BiTrash } from "react-icons/bi";
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import Display from "../components/displays";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { groupContext } from "../helper/group_context";
import { getCookie } from "../components/queries";

const Dashboard = () => {
  const { groups, setGroups } = useContext(groupContext);
  const navigate = useNavigate();

  
  useEffect(() => {
        fetch(
            `/member/getparticipants`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                        'Content-Type': 'application/json'
                }
            }
        ).
        then(response => response.json()).
        then(resp => {sessionStorage.setItem('groups', JSON.stringify(resp['groups']));
        setGroups(resp['groups'])})
    }, []);

  return (
    <main className="relative w-screen">
      <LoggedNav />
      <section className="bg-[#E6F3FE] min-h-screen relative">
        <div className="pt-20 lg:pt-0">
          {groups !== null && (
            <ul className="min-w-full max-h-screen overflow-x-hidden flex flex-wrap gap-4 justify-center lg:justify-start lg:pl-12 lg:pr-12 pb-6 pt-6 lg:gap-8 lg:pt-24">
              <li>
                <button
                  type="button"
                  onClick={() => navigate("/create/name")}
                  className="relative"
                >
                  <div className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px] rounded-lg shadow-lg shadow-[#4169E1]">
                    <BiPlusMedical />
                  </div>
                </button>
              </li>
              {groups.map((group, i) => (
                <li key={i} className="relative">
                    <button type='button' className="absolute w-[15%] z-50 top-[5%] left-[77%] hover:scale-105 flex justify-center place-items-center text-white bg-[#4169E1] rounded-full delay-75"
                    onClick={() => {
                        fetch(`/member/deletegroups`, {
                            method: "POST",
                            credentials: 'include',
                                headers: {
                                    'X-CSRF-TOKEN': getCookie('csrf_access_token'),
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({groupName:group[0]})
                    }).then(response => response.json()).then(resp=>{console.log(resp)}).then(window.location.reload(true))
                    }}
                    >
                        <BiTrash className=" text-[200%] text-center" />
                    </button>
                    <button type="button" className=" active:bg-inherit " onClick={()=>{
                        sessionStorage.setItem('groupName', group[0])
                        navigate(`../teamoptions`)}}>
                        {Display(group[0], group[1])}
                    </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Dashboard;



// import {BiPlusMedical} from "react-icons/bi";
// import LoggedNav from "../components/navbar";
// import Footer from "../components/footer";
// import { useNavigate } from "react-router-dom";
// import Display from "../components/displays";
// import { useEffect, useState } from "react";
// import { useContext } from "react";
// import { groupContext } from "../helper/group_context";
// import { getCookie } from "../components/queries";

// const Dashboard =()=>{
//     const {groups, setGroups} = useContext(groupContext)
//     let navigate = useNavigate()


//     useEffect(()=>{
//         const val = JSON.parse(sessionStorage.getItem('groups'));
//         if (!val){
//             fetch(
//                 `/member/getparticipants`, {
//                     method: 'GET',
//                     credentials: 'include',
//                     headers: {
//                         'X-CSRF-TOKEN': getCookie('csrf_access_token'),
//                             'Content-Type': 'application/json'
//                     }
//                 }
//             ).
//             then(response => response.json()).
//             then(resp => setGroups(resp['groups']))
//         }
//         else{
//             setGroups(val)
//         }
        
//     }, [])
    
//     return (
//         <main className="relative w-screen">
//             <LoggedNav />
//             <section className="bg-[#E6F3FE] min-h-screen relative">
//                 <div className=" pt-20 lg:pt-0">
//                 {groups !== null && <ul className=" min-w-full max-h-screen overflow-x-hidden flex flex-wrap gap-4 justify-center lg:justify-start lg:pl-12 lg:pr-12 pb-6 pt-6 lg:gap-8 lg:pt-24">
                    
//                     <ul className="min-w-full h-[90%] lg:overflow-x-hidden flex place-items-center flex-col justify-center lg:flex-wrap lg:flex-row md:flex-row md:flex-wrap md:gap-8 gap-4 lg:justify-start lg:pl-12 lg:pr-12 pb-6 lg:gap-8 lg:pt-24">
//                     <li>
//                         <button type="button" onClick={()=> navigate('/create/name')}>
//                             <div className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px] rounded-lg shadow-lg shadow-[#4169E1]">
//                                 <BiPlusMedical/>
//                             </div>
//                         </button>
//                     </li>
//                         {groups.map((group, i)=> (
//                             <li key={i}>
//                                 <button type="button" className=" active:bg-inherit" onClick={()=>{
//                                     sessionStorage.setItem('groupName', group[0])
//                                     navigate(`../teamoptions`)}}>
//                                     {Display(group[0], group[1])}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </ul>}
//                 </div>
//             </section>
//             <Footer />
//         </main>
//     )
// }
// export default Dashboard;