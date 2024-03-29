import React from 'react'
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import './styles.css'
export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About EstateEase</h1>
      <p className='mb-4 text-slate-700' style={{marginTop :'40px'}}>EstateEase is a premier real estate agency dedicated to facilitating seamless property transactions for clients seeking to buy, sell, or rent homes in the most sought-after neighborhoods. Our seasoned team of agents brings a wealth of experience and expertise to the table, ensuring that every client receives personalized attention and expert guidance throughout their real estate journey. With a commitment to excellence, we strive to make the buying and selling process as smooth and stress-free as possible, leveraging our in-depth understanding of the local market to achieve optimal outcomes for our clients.</p>
      <p className='mb-4 text-slate-700'>
      At EstateEase, our mission is to empower clients to achieve their real estate aspirations by offering unparalleled service, tailored advice, and a comprehensive understanding of market dynamics. Whether you're a first-time buyer navigating the complexities of homeownership or a seasoned investor seeking lucrative opportunities, our dedicated agents are here to assist you at every step of the way. With a focus on building lasting relationships based on trust and integrity, we prioritize the individual needs and goals of each client, ensuring a positive and fulfilling real estate experience.
      </p>
      <p className='mb-4 text-slate-700'>Backed by a team of dedicated professionals with a passion for real estate, EstateEase is committed to delivering excellence in every aspect of our service. We believe that the journey of buying or selling a property should be characterized by excitement and satisfaction, and we are dedicated to making that vision a reality for our clients. With EstateEase, you can rest assured that you're in capable hands, receiving the highest level of service and support to achieve your real estate dreams.</p>
      <p className='mb-4 text-slate-700' style={{textAlign :'center'}}>Follow me on</p>
      <p className='mb-4 text-slate-700'></p>
      <div className="socialIcons">
                <a href="https://www.instagram.com/__roy__krishna__/" target="_blank">
                <span className="icon">
                        <FaInstagram  color="black"/>
                    </span>
                </a>
                    <a href="https://github.com/KrishnaRoy7" target="_blank">
                    <span className="icon">
                        <FaGithub color="black"/>
                    </span>
                    </a>
                    <a href="https://www.linkedin.com/in/krishna-chandra-roy-098467228/" target="_blank">
                    <span className="icon">
                        <FaLinkedin color="black"/>
                    </span>
                    </a>
                    
                </div>
    </div>
  )
}
