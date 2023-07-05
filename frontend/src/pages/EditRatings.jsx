import React from 'react';
import LoggedNav from "../components/navbar";
import Footer from "../components/footer";

const EditRating = () => {
  return (
    <>
      <main className='w-screen h-screen bg-[#E6F3FE]'>
          <LoggedNav />
            <div>
              <h1>You can edit the ratings here!</h1>
            </div>
          <Footer />
      </main>
    </>
  );
};

export default EditRating;
