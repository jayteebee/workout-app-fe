import React from 'react'
import { useNavigate } from 'react-router-dom'
import backButton from "../../CSS/Icons/backButton.png"

const BackButton = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
  return (
    <div>
    
    <button 
    className="button"
    onClick={goBack}>
    <img src={backButton} alt="backButton" className="backButton" />
    </button>
    </div>
  )
}

export default BackButton