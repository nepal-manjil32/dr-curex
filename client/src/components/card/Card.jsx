import React from 'react'
import './Card.css'
import {Link} from "react-router-dom"

const Card = (props) => {
  return (
    <div className='card'>
      <img src={props.imageSrc} alt="" />
      <Link className='link' to={props.linkTO}>{props.name}</Link>
    </div>
  )
}

export default Card
