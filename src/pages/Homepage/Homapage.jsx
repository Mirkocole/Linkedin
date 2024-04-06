import React, { useState } from 'react'
import MainNav from '../../components/MainNav/MainNav';

export default function Homepage() {

  const apiKey = process.env.REACT_APP_AUTHTOKEN;
  const apiUrl = process.env.REACT_APP_APIURL;

  const [search,setSearch] = useState('');

  return (
    <>
    <MainNav />
    <div>Homepage</div>
    </>
  )
}
