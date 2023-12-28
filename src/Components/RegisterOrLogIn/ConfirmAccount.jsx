import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../API/AxiosInstances/axiosInstance';

const ConfirmAccount = () => {
  const location = useLocation();
    const nav = useNavigate()
  useEffect(() => {
    const segmentedUrl = window.location.search
    const confirmationToken = segmentedUrl.split("=")[1]

    if (confirmationToken) {
      axiosInstance.post('/confirm_account', { confirmation_token: confirmationToken })
        .then(response => {
            nav("/GettingStarted")
        })
        .catch(error => {
            console.log('Error:',error)
        });
    }
  }, [location]);

  return (
    <div>  
    <p style={{color: "white"}}>Redirecting...</p>
    </div>
  );
};

export default ConfirmAccount;
