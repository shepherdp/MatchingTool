import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";
import { BiPlusMedical } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { GiPlayerPrevious } from "react-icons/gi";
import { useState } from 'react';

const TeamOptions = () => {
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
  const handleEditButtonClick = () => {
    navigate('/EditRatings');
  };
  const handlePreviousGroupsButtonClick = () => {
    navigate('/PreviousGroups');
  };
  return (
    <>
      <main className='w-screen h-screen bg-[#99cefc]'>
        <LoggedNav />
        <section className="bg-[#E6F3FE] h-screen">
          <div className='relative w-[100%] h-[100%] bg-[#E6F3FE]'>
            <div className='flex justify-center items-center h-full gap-4'>
              <button type='button'>
                <div
                  className='w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px]'
                  onMouseEnter={handleMouseEnter1}
                  onMouseLeave={handleMouseLeave1}
                >
                  {isHovered1 ? (
                    <span className="text-[50px] font-bold overflow-hidden">Create groups</span>
                  ) : (
                    <BiPlusMedical />
                  )}
                </div>
              </button>
              <button type="button"onClick={handleEditButtonClick}>
                <div
                  className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px]"
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                >
                  {isHovered2 ? (
                    <span className="text-[50px] font-bold overflow-hidden">Edit</span>
                  ) : (
                    <AiFillEdit />
                  )}
                </div>
              </button>
              <button type='button' onClick={handlePreviousGroupsButtonClick}>
                <div
                  className="w-[250px] h-[250px] bg-white border-4 border-[#4169E1] flex justify-center items-center text-[#4169E1] text-[90px] hover:text-[100px]"
                  onMouseEnter={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                >
                  {isHovered3 ? (
                    <span className="text-[50px] font-bold overflow-hidden">Previous Groups</span>
                  ) : (
                    <GiPlayerPrevious />
                  )}
                </div>
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default TeamOptions;