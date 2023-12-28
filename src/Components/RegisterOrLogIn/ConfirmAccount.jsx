import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmAccount = () => {
  const location = useLocation();
    const nav = useNavigate()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('confirmation_token');
console.log('token',token)
    if (token) {
      axios.post('/confirm_account', { confirmation_token: token })
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
