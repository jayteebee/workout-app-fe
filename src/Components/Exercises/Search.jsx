import React from 'react'
import { MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';


const Search = () => {
  return (
    <div>
    <h3>Search</h3>
    
    <MDBInputGroup>
    <MDBInput label='Search' />
    <MDBBtn rippleColor='dark'> Search </MDBBtn>
  </MDBInputGroup>
    
    
    </div>
  )
}

export default Search