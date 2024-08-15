
import React from 'react'
import { FaGoogle, FaFreeCodeCamp, FaYoutube } from "react-icons/fa";
import { SiW3Schools, SiCodecademy, SiCoursera } from "react-icons/si";
import SinglePartner from '../../atoms/Partners/SinglePartner';
import Title from '../../atoms/Partners/Title';
import './Partners.scss'

const Partners = () => {
  const partners = [
    { id: 1, logo: <FaGoogle />, name: 'google' },
    { id: 2, logo: <SiW3Schools />, name: 'W3Schools' },
    { id: 3, logo: <SiCodecademy />, name: 'Codecademy' },
    { id: 4, logo: <FaFreeCodeCamp />, name: 'FreeCodeCamp' },
    { id: 5, logo: <SiCoursera />, name: 'Coursera' },
    { id: 6, logo: <FaYoutube />, name: 'Youtube ' },
  ];

  return (
    <div className='partners'>
      <Title>our trusted partners</Title>
      <div className="partners-grid">
        {
          partners.map(item => {
            return <SinglePartner key={item.id} logo={item.logo} name={item.name} />
          })}
      </div>
    </div>
  )
}

export default Partners