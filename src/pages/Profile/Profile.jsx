import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Card, Button, Row, Stack, Spinner, Modal, Form } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import '../Profile/Profile.css';
import Carosello from '../../components/Carosello/Carosello';
import Usercard from '../../components/Usercard/Usercard';
import { MdOutlineEdit } from "react-icons/md";
import Experiences from '../../components/Experiences/Experiences';



export default function Profile({ idAdmin }) {

    const apiKey = process.env.REACT_APP_AUTHTOKEN;
    const apiUrl = process.env.REACT_APP_APIURL;
    let { idProfile } = useParams();
    let adminKey = jwtDecode(apiKey);


    const [valueAdd,setValueAdd] = useState({});

    const handleUpdateValue = (e) => {
        // console.log(valueAdd[e.target.id]);
        let key = e.target.id;
        let val = e.target.value;
        setValueAdd((prev) => prev = {...prev, [key] : val});
    };



    const [showEditModal, setShowEditModal] = useState(false);

    const handleCloseModal = () => { setShowEditModal(false) }
    const handleOpenModal = () => { setShowEditModal(true) }

    const [profile, setProfile] = useState({});
    const [allProfiles, setAllProfiles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);



    const defaultCopertina = 'https://placehold.co/800x400';
    const defaultProfile = 'https://placehold.co/400';


    useEffect(() => {

        // console.log(adminKey._id)
        if (idProfile == adminKey._id || idAdmin) {
            setIsAdmin(true);
        }

        getProfile();
        getAllProfile();

        // console.log(isAdmin)
    }, [])

    async function getProfile() {
        try {
            // console.log(idAdmin)
            setLoadingProfile((prev) => !prev);
            let result;
            if (idAdmin) {

                result = await fetch(apiUrl + idAdmin, {
                    headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey }
                });
            } else {
                result = await fetch(apiUrl + idProfile, {
                    headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey }
                });

            }

            if (result.ok) {
                let json = await result.json();
                setLoadingProfile((prev) => !prev);
                setProfile(json);
                // console.log(json)
            }
        } catch (error) {
            console.log(error);
            setLoadingProfile((prev) => !prev);
        }
    }

    async function getAllProfile() {
        try {
            let result = await fetch(apiUrl, {
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey }
            });

            if (result.ok) {
                let json = await result.json();
                setAllProfiles(json);
                // console.log(json);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            {loadingProfile ? <Spinner /> :
                <Container fluid className='d-flex justify-content-center p-0 my-5'>

                    <Stack direction='horizontal' gap={3} className='container align-items-start'>

                        <Col xs={12} md={9} className='rounded m-0 px-5'>
                            {/* {isAdmin && <h1 className='p-3 text-danger'>Sei Admin</h1>} */}

                            <Card className='position-relative w-100 pb-4'>
                                <MdOutlineEdit className={`icon-edit d-${isAdmin ? 'flex' : 'none'}`} />
                                <Card.Img variant="top" src={profile.image ?? defaultCopertina} style={{ height: '250px', width: 'auto', objectFit: 'cover' }} />
                                <Card.Img variant="top" src={profile.image ?? defaultProfile} className='imageProfile' />
                                {isAdmin && <MdOutlineEdit className='icon-edit-dark' />}
                                <Card.Body className='card-content position-relative'>
                                    <Card.Title className='fw-bolder fs-3'>{profile.name} {profile.surname}</Card.Title>
                                    <Card.Text>{profile.email} </Card.Text>
                                    <Card.Text>{profile.username} </Card.Text>
                                    <Row className='justify-content-start'>

                                        <Button variant="primary" className='d-flex w-auto me-2'>Disponibile per</Button>
                                        <Button variant="outline-primary" className='d-flex w-auto me-2'>Aggiungi sezione del profilo</Button>
                                        <Button variant="outline-dark" className='d-flex w-auto me-2'>Altro</Button>
                                    </Row>
                                </Card.Body>
                                <Carosello />
                            </Card>


                            <Experiences isAdmin={isAdmin} apiKey={apiKey} apiUrl={apiUrl} id={idAdmin ?? idProfile} />

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
                                    {allProfiles && allProfiles.filter((el, index) => index < 5).map((el, index) => {
                                        return <Usercard key={index} user={el} />
                                    })}
                                </div>
                            </Stack>
                        </Col>
                    </Stack>


                    {/* Modale AddExperiences */}
                    <Modal show={showEditModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Aggiungi Esperienza Lavorativa</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Città</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci la Città" id='area' defaultValue={valueAdd.area} onChange={(e) => { handleUpdateValue(e) }} />
                                </Form.Group>
                                <Form.Group className="mb-3"  >
                                    <Form.Label>Nome Azienda</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il nome dell'Azienda" id='company' defaultValue={valueAdd.company} onChange={(e) => { handleUpdateValue(e) }} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Ruolo</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci il ruolo svolto" id='role' defaultValue={valueAdd.role} onChange={(e) => { handleUpdateValue(e) }} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Inizio lavoro</Form.Label>
                                    <Form.Control type="date" id='startDate' defaultValue={valueAdd.startDate} onChange={(e) => { handleUpdateValue(e) }} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Fine lavoro</Form.Label>
                                    <Form.Control type="date" id='endDate' defaultValue={valueAdd.endDate} onChange={(e) => { handleUpdateValue(e) }} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Descrivi il lavoro svolto</Form.Label>
                                    <Form.Control as="textarea" rows={3} id='description' defaultValue={valueAdd.description} onChange={(e) => { handleUpdateValue(e) }} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Annulla
                            </Button>
                            <Button variant="primary" onClick={()=>{}}>
                                Aggiungi esperienza
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>}

        </>
    )
}