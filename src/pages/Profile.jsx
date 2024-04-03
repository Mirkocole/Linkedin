import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Profile() {

    let { idProfile } = useParams();

    const apiKey = process.env.REACT_APP_AUTHTOKEN;
    const apiUrl = process.env.REACT_APP_APIURL;

    const [profile, setProfile] = useState({});

    useEffect(() => {

        async function getProfile() {
            try {
                let res = await fetch(apiUrl + idProfile, {
                    headers: { "Content-Type": "application/json", "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBjNDBmNGEyODFkODAwMTlhM2VjZjkiLCJpYXQiOjE3MTIwNzkwOTIsImV4cCI6MTcxMzI4ODY5Mn0.hPtNWcz2lZ29EDFxNnRFVf6le-XnMC7NLBqvGf0rUls' }
                });

                if (res.ok) {
                    let json = await res.json();
                    setProfile(json);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getProfile();
    }, [])



    return (
        <>
            <Container className='border shadow'>

                <h1 className='p-5 m-4'>Name: {profile.name}</h1>
                <p>ID: {profile._id}</p>
                <p>Surname: {profile.surname}</p>
                <p>Email: {profile.email}</p>
                <p>UserName: {profile.username}</p>
            </Container>
        </>
    )
}
