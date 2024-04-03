import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Card, Button, Row, Stack } from 'react-bootstrap';
import '../Profile/Profile.css';
import Carosello from '../../components/Carosello/Carosello';


export default function Profile() {

    let { idProfile } = useParams();

    const apiKey = process.env.REACT_APP_AUTHTOKEN;
    const apiUrl = process.env.REACT_APP_APIURL;

    const [profile, setProfile] = useState({});
    const [allProfiles,setAllProfiles] = useState([]);

    const defaultCopertina = 'https://placehold.co/800x400';
    const defaultProfile = 'https://placehold.co/400';

    
    useEffect(() => {

        getProfile();
        getAllProfile();
    }, [])

    async function getProfile() {
        try {
            let result = await fetch(apiUrl + idProfile, {
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+apiKey }
            });

            if (result.ok) {
                let json = await result.json();
                setProfile(json);
                console.log(json)
            }
        } catch (error) {
         console.log(error);
        }
    }

    async function getAllProfile(){
        try {
            let result = await fetch(apiUrl, {
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer '+apiKey }
            });

            if (result.ok) {
                let json = await result.json();
                setAllProfiles(json);
                // console.log(json)
            }
        } catch (error) {
         console.log(error);
        }
    }


    return (
        <>
            <Container fluid className='d-flex justify-content-center p-0 my-5'>

                <Stack direction='horizontal' gap={3} className='container align-items-start'>

                    <Col xs={12} md={9} className='border bg-light rounded m-0'>

                        <Card className='position-relative w-100'>
                            <Card.Img variant="top" src={profile.image ?? defaultCopertina} style={{ height: '350px', width: 'auto', objectFit: 'cover' }} />
                            <Card.Img variant="top" src={profile.image ?? defaultProfile} className='imageProfile' />
                            <Card.Body className='card-content'>
                                <Card.Title className='fw-bolder fs-3'>{profile.name} {profile.surname}</Card.Title>
                                <Card.Text>{profile.email} </Card.Text>
                                <Card.Text>{profile.username} </Card.Text>
                                <Row className='justify-content-start'>

                                    <Button variant="primary" className='d-flex w-auto me-2'>Disponibile per</Button>
                                    <Button variant="outline-primary" className='d-flex w-auto me-2'>Aggiungi sezione del profilo</Button>
                                    <Button variant="outline-dark" className='d-flex w-auto me-2'>Altro</Button>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Carosello />
                    </Col>

                    <Col md={3} className=' d-none d-md-flex'>
                        <Stack gap={3}>
                            <div className='p-3 border rounded bg-light '>
                                <h5>Lingua del profilo</h5>
                                <span>Italiano</span>
                                <hr></hr>
                                <h5>Profilo pubblico e URL</h5>
                                <span>www.linkedin.com/in/{profile.username}</span>
                            </div>
                            <div className='p-3 border rounded bg-light '>
                                <h5>Altri profili simili...</h5>
                            </div>
                        </Stack>
                    </Col>
                </Stack>

            </Container>
        </>
    )
}
