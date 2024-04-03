import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';

export default function Experiences({isAdmin, id, apiKey,apiUrl}) {

    const [experiences,setExperiences] = useState([]);

    async function getExperiences(){
        try {
            let res = await fetch(apiUrl+id+'/experiences',{
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey }
            });

            if (res.ok) {
                let json = res.json();
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{

    },[])

  return (
    <>
        <Container className=" p-3 my-3">

        </Container>
    </>
  )
}
