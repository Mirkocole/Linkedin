import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Container, Card, Button, Row, Stack, Spinner, Modal, Form } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import '../Profile/Profile.css';
import Carosello from '../../components/Carosello/Carosello';
import Usercard from '../../components/Usercard/Usercard';
import { MdOutlineEdit } from "react-icons/md";
import Experiences from '../../components/Experiences/Experiences';
import MainNav from '../../components/MainNav/MainNav';
import { useNavigate } from "react-router-dom";



export default function Profile({ idAdmin }) {

    const apiKey = process.env.REACT_APP_AUTHTOKEN;
    const apiUrl = process.env.REACT_APP_APIURL;
    let { idProfile } = useParams();
    let adminKey = jwtDecode(apiKey);


    const [valueAdd, setValueAdd] = useState({});

    const handleUpdateValue = (e) => {
        // console.log(valueAdd[e.target.id]);
        let key = e.target.id;
        let val = e.target.value;
        setValueAdd((prev) => prev = { ...prev, [key]: val });
    };



    const [showEditModal, setShowEditModal] = useState(false);

    const handleCloseModal = () => { setShowEditModal(false) }
    const handleOpenModal = () => { setShowEditModal(true) }

    const [profile, setProfile] = useState({});
    const [allProfiles, setAllProfiles] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [image, setImage] = useState(new FormData());
    const [refresh, setRefresh] = useState(false);



    const defaultCopertina = 'https://placehold.co/800x400';
    const defaultProfile = 'https://placehold.co/400';

    const navigate = useNavigate();


    function handleImage(img) {
        // const formData = {}
        // formData['experience'] = img;
        setImage((prev) => {
            prev.delete('experience');
            prev.append('experience', img);
            return prev;
        })
    }


    useEffect(() => {

        // console.log(adminKey._id)
        if (idProfile == adminKey._id || idAdmin) {
            setIsAdmin(true);
        }

        getProfile();
        getAllProfile();

        // console.log(isAdmin)
    }, [refresh,navigate])

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


    async function addImageProfile() {
        try {

            if (image) {
                let res = await fetch(apiUrl + profile._id + '/picture', {
                    method: 'POST',
                    headers: { "Authorization": 'Bearer ' + apiKey },
                    body: image
                });

                if (res) {
                    console.log(res);
                    setRefresh(!refresh);
                    setShowEditModal(false);
                } else {
                    // setRefresh(!refresh);
                    setShowEditModal(false);

                }

            } else {

                setRefresh(!refresh);
                setShowEditModal(false);
            }


        } catch (error) {

        }
    }


    return (
        <>
            {loadingProfile ? <Spinner /> : <>
                <MainNav />
                <Container fluid className='d-flex justify-content-center p-0 my-5'>

                    <Stack direction='horizontal' gap={3} className='container align-items-start'>

                        <Col xs={12} md={9} className='rounded m-0 px-lg-5 px-2'>

                            <Card className='position-relative w-100 pb-4'>
                                <MdOutlineEdit className={`icon-edit d-${isAdmin ? 'flex' : 'none'}`} />
                                <Card.Img variant="top" src={profile.image ?? defaultCopertina} style={{ height: '250px', width: 'auto', objectFit: 'cover' }} />
                                <Card.Img variant="top" src={profile.image ?? defaultProfile} className='imageProfile' />
                                {isAdmin && <MdOutlineEdit className='icon-edit-dark' onClick={handleOpenModal} />}
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


                    {/* Modale Image  */}
                    <Modal show={showEditModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifica immagine profilo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Immagine</Form.Label>
                                    <Form.Control type="file" id='picture' onChange={(e) => { handleImage(e.target.files[0]) }} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Annulla
                            </Button>
                            <Button variant="primary" onClick={addImageProfile}>
                                Modifica
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            </>}

        </>
    )
}
