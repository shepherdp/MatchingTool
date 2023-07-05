import React from 'react';
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";

const PreviousGroups = () => {
  return (
    <>
      <main className='w-screen h-screen bg-[#E6F3FE]'>
            <LoggedNav />
                <div>
                    <h1>You can see the previous groups here!</h1>
                </div>
            <Footer />
      </main>
    </>
  );
};

export default PreviousGroups;
