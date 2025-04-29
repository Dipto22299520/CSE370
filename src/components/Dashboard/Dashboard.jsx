import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdQuiz } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { BsRecord2 } from "react-icons/bs";
import { SiCoursera } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiFeedbackLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='w-screen h-screen overflow-hidden' style={{ background: 'black' }}>
      <div className='absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-black z-10'>
        <button onClick={() => navigate('/Exam')} className='text-purple-800 font-bold flex items-center gap-2'>Exam <MdQuiz /></button>
        <button  onClick={()=>navigate('./Joinclass')}className='text-purple-800 font-bold flex items-center gap-2'>Join a Class <SiGoogleclassroom /></button>
        <button  onClick={()=>navigate('./Recording')} className='text-purple-800 font-bold flex items-center gap-2'>See the Recording <BsRecord2 className='text-2xl' /></button>
        <button  className='text-purple-800 font-bold flex items-center gap-2'>Enroll in a Course <SiCoursera /></button>
        <button  className='text-purple-800 font-bold flex items-center gap-2'>Renew Subscription <MdOutlineSubscriptions /></button>
        <button  className='text-purple-800 font-bold flex items-center gap-2'>Provide Feedback <RiFeedbackLine /></button>
      </div>

      <div className='w-full h-full flex justify-center items-center'>
        <iframe src='https://my.spline.design/nexbotrobotcharacterconcept-OQ62rzpiiDrMILtfxlNPPIkr/' frameBorder='0' width='100%' height='100%'></iframe>
        <motion.div 
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className='text-4xl font-extrabold text-white absolute'
        >
          Welcome to dashboard
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
