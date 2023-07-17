import React from 'react'
import Footer from '../components/footer';
import { NonLoggedNav } from '../components/navbar';

const Privacy=()=> {
  return (
    <section className='w-screen h-screen'>
        <div className='bg-[#4169E1]'>
        <NonLoggedNav name='Login' destination='/login' />
        </div>
        <div className='w-full h-[84%] overflow-y-auto pr-12 pl-12'>
        <div className='w-full h-[10%] text-center text-2xl font-bold fixed bg-white flex justify-center place-items-center'><h1>Privacy and Cookies Policy</h1></div>
        <br /> <br />

        <h1 className='font-bold'>Effective Date: July, 13th 2023</h1> 
        <br />

        <h1 className='font-bold text-xl'>1. Introduction</h1>
        <br />
        <p>
            Welcome to TeamMakerOnline.com. At TeamMakerOnline.com, we respect your privacy and 
            are committed to protecting your personal information. This Privacy and Cookies Policy explains how we 
            collect, use, and disclose information when you use our Website. By accessing or using the Website, you consent 
            to the practices described in this Policy.
        </p>
        <br />

        <h1 className='font-bold text-xl'>2. Information We Collect</h1>
        <br />
        <h1 className='font-semibold text-lg'>2.1 Personal Information</h1>
        <br />

        <p>
            When you register an account on TeamMakerOnline.com, we may collect certain personal information from you, such as your name, 
            email address, and any other information you provide during the registration process.
            When you use the platform, we may collect other information such as list of names and individual ratings. We store this information securely in our database
            and the access is restricted to you only.
        </p>
        <br />

        <h1 className='font-semibold text-lg'>2.2 Cookies and Similar Technologies</h1>
        <br />

        <p>
            We use cookies and similar tracking technologies to enhance your experience on our Website. A cookie is a small text file that is stored on 
            your device and contains information that allows us to identify your browser or device. We use cookies to store information that are vital to the 
            functionality of the website such as the JWT (JSON Web Token) token, which is used for authentication purposes.</p>
            <br />

        <h1 className='font-bold text-xl'>3. How We Use Your Information</h1>
        <br />
        <h1>We may use the personal information we collect for the following purposes:</h1>
        <br />

        <ul className='pl-6'>
            <li>- To provide and maintain our services.</li>
            <li>- To personalize and improve your experience on the Website.</li>
            <li>- To communicate with you, respond to your inquiries, and provide customer support.</li>
            <li>- To enforce our terms and conditions and protect our legal rights.</li>
        </ul>
        <br />

        <h1 className='font-bold text-xl'>4. How We Share Your Information</h1>
        <br />
        <h1>We may share your personal information with the following parties:</h1>
        <br />

        <p>
            Service providers: We may engage third-party service providers to perform functions on our behalf, such as hosting, data analysis, 
            and customer support. These service providers will have access to your personal information as necessary to perform their functions but 
            are obligated not to disclose or use it for any other purpose.
        </p>
        <br />
        <p>
            Legal requirements: We may disclose your personal information if required to do so by law or in response to a valid legal request, such 
            as a court order or government investigation.
        </p>
        <br />

        <h1 className='font-bold text-xl'>5. Security</h1>
        <br />
        <p>
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, please note that 
            no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        <br />
        <h1>
            Third-Party Websites
        </h1>
        <p>
            Our Website may contain links to third-party websites that are not operated by us. We have no control over, and assume no responsibility 
            for, the content, privacy policies, or practices of any third-party websites. We encourage you to review the privacy policies of these websites 
            before providing any personal information.
        </p>
        <br />

        <h1 className='font-bold text-xl'>Changes to this Policy</h1>
        <br />
        <p>
            We may update this Privacy and Cookies Policy from time to time. Any changes we make will be posted on this page, and the "Effective Date" at the 
            top of this Policy will be revised. We encourage you to review this Policy periodically to stay informed about how we collect, use, and protect your 
            personal information.
        </p>
        <br />

        <h1 className='font-bold text-xl'>Contact Us</h1>
        <br />
        <p>
            If you have any questions or concerns about this Privacy and Cookies Policy, please contact us at support@teammakeronline.com.
        </p>
        <br /><br /><br />
    </div>
    <Footer />
    </section>
  )
}

export default Privacy;