import React, { useState } from 'react'

export default function Homepage() {

  const apiKey = process.env.REACT_APP_AUTHTOKEN;
  const apiUrl = process.env.REACT_APP_APIURL;

  const [search,setSearch] = useState('');

  return (
    <div>Homepage</div>
  )
}
