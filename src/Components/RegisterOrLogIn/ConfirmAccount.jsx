import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../API/AxiosInstances/axiosInstance';

const ConfirmAccount = () => {
  const location = useLocation();
    const nav = useNavigate()
  useEffect(() => {
    // console.log(window.location.href); // Full URL
    // console.log(window.location.search); // Just the query string part
    
    //     const tokenTest = new URLSearchParams(window.location.search).get('confirmation_token');
    //     console.log(tokenTest); // Should log the token or null
    
    
    //     const queryParams = new URLSearchParams(location.search);
    //     console.log('queryParams',queryParams)
    
    //     const token = queryParams.get('confirmation_token');
    // console.log('token',token)
    
    const segmentedUrl = window.location.search
console.log('segmentedUrl',segmentedUrl)
    const confirmationToken = segmentedUrl.split("=")[1]
    console.log('confirmationToken',confirmationToken)

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
    <h2>Confirmation Page</h2>
    </div>
  );
};

export default ConfirmAccount;
