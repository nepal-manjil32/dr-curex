import React from 'react'
import Doctor from '../../components/doctor/Doctor'
import Minimalnav from '../../components/minimalnav/Minimalnav'

const Appointment = () => {
  return (
    <div className='appointment'>
      <Minimalnav />
      <Doctor />
    </div>
  )
}

export default Appointment
