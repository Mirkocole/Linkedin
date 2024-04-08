import React, { useEffect, useState } from 'react'
import MainNav from '../../components/MainNav/MainNav';
import Usercard from '../../components/Usercard/Usercard';
import { Container,Col, Row } from 'react-bootstrap';

export default function Homepage() {

  const apiKey = process.env.REACT_APP_AUTHTOKEN;
  const apiUrl = process.env.REACT_APP_APIURL;

  const [search,setSearch] = useState('');
  const [users,setUsers] = useState([]);

  useEffect(()=>{
    getAllProfile()
  },[])

  async function getAllProfile(){
    try {
      let res = await fetch(apiUrl,{
        headers: {'Content-type': 'application/json', "Authorization": 'Bearer ' + apiKey}
      });

      // console.log(res);
      if (res.ok) {
        let json = await res.json();
        // console.log(json);
        
          setUsers(json);
        
      }else{
        console.log(res);
      }

    } catch (error) {
      
    }
  }

  return (
    <>
    <MainNav />
    <Container>
      <Row>
      {console.log(users)}
      {
        users.map((el,index)=>{
         return <Col xs={12} md={4} lg={3} key={index}>
         <Usercard  key={index} user={el}/>
         </Col>
        })
      }
      </Row>
    </Container>
    </>
  )
}
