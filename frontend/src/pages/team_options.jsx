import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { BiPlusMedical } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { GiPlayerPrevious } from "react-icons/gi";
import { useContext } from "react";
import { groupContext } from "../helper/group_context";
import { useEffect } from 'react';

const TeamOptions = ({ className }) => {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const handleMouseEnter3 = () => {
    setIsHovered3(true);
  };

  const handleMouseLeave3 = () => {
    setIsHovered3(false);
  };

  const handlePreviousTeamsButtonClick = () => {
    navigate('/PreviousTeams');
  };

  const { groupName} = useContext(groupContext);

  return (
    <main className='relative w-screen'>
      <LoggedNav />
      <section className="bg-[#E6F3FE] min-h-screen relative">
        <div className="flex justify-center items-center pt-[8%]">
          <h2 className="bg-white rounded-lg p-4 text-center text-2xl font-bold inline-block py-2 px-4 relative">
              {groupName}
          </h2>
        </div>
        <div className='min-w-full max-h-screen overflow-x-hidden flex flex-wrap gap-4 justify-center items-center lg:pl-12 lg:pr-12 pb-6 pt-6 lg:gap-8 lg:pt-[2%]'>
          <button type='button' onClick={() => navigate(`../maketeams/${sessionStorage.getItem('groupName')}`)}>
            <div
              className='w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] hover:text-[100px] rounded-lg shadow-lg shadow-[#4169E1]'
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
            >
              {isHovered1 ? (
                <span className="text-[40px] font-bold overflow-hidden">Create Teams</span>
              ) : (
                <BiPlusMedical className="text-[90px]" />
              )}
            </div>
          </button>
          <button type="button" onClick={() => navigate(`/editparticipants/${sessionStorage.getItem('groupName')}`)}>
            <div
              className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] hover:text-[100px] rounded-lg shadow-lg shadow-[#4169E1]"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              {isHovered2 ? (
                <span className="text-[40px] font-bold overflow-hidden">Edit Teams</span>
              ) : (
                <AiFillEdit className="text-[90px]" />
              )}
            </div>
          </button>
          <button type='button' onClick={handlePreviousTeamsButtonClick}>
            <div
              className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] hover:text-[100px] shadow-lg rounded-lg shadow-[#4169E1]"
              onMouseEnter={handleMouseEnter3}
              onMouseLeave={handleMouseLeave3}
            >
              {isHovered3 ? (
                <span className="text-[40px] font-bold overflow-hidden">Previous Teams</span>
              ) : (
                <GiPlayerPrevious className="text-[90px]" />
              )}
            </div>
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default TeamOptions;
