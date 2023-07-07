import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { BiPlusMedical } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { GiPlayerPrevious } from "react-icons/gi";
import { useState } from 'react';

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

  return (
    <>
      <main className='w-screen h-screen bg-[#99cefc]'>
        <LoggedNav />
        <section className="bg-[#E6F3FE] h-screen">
          <div className='relative w-[100%] h-[100%] bg-[#E6F3FE]'>
            <div className='flex justify-center items-center h-full'>
              <span className="text-[20px] font-bold mb-4">{className}</span>
              <div className='flex flex-col lg:flex-row flex-wrap justify-center items-center gap-4'>
                <button type='button' onClick={() => { navigate(`../maketeams/${sessionStorage.getItem('groupName')}`) }}>
                  <div
                    className='w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] hover:text-[100px]'
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
                <button type="button" onClick={() => { navigate(`/editparticipants/${sessionStorage.getItem('groupName')}`) }}>
                  <div
                    className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] hover:text-[100px]"
                    onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}
                  >
                    {isHovered2 ? (
                      <span className="text-[40px] font-bold overflow-hidden">Edit</span>
                    ) : (
                      <AiFillEdit className="text-[90px]" />
                    )}
                  </div>
                </button>
                <button type='button' onClick={handlePreviousTeamsButtonClick}>
                  <div
                    className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] hover:text-[100px]"
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
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default TeamOptions;
