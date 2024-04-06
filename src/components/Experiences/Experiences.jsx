import React, { useEffect, useState } from 'react'
import { Container, Modal, Button, Form, Image } from 'react-bootstrap';
import { MdOutlineEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

export default function Experiences({ isAdmin, id, apiKey, apiUrl }) {

    const [experiences, setExperiences] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [image, setImage] = useState(new FormData());

    const [valueAdd, setValueAdd] = useState({});
    const [valueEdit, setValueEdit] = useState({});

    const handleUpdateValue = (e) => {
        // console.log(valueAdd[e.target.id]);
        let key = e.target.id;
        let val = e.target.value;
        setValueAdd((prev) => prev = { ...prev, [key]: val });
    };

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleCloseAddModal = () => setShowAddModal(false);
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = (el) => {
        setShowEditModal(true);
        setValueEdit(el);
    };

    async function getExperiences() {
        try {
            let res = await fetch(apiUrl + id + '/experiences', {
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey }
            });

            if (res.ok) {
                let json = await res.json();
                setExperiences(json);
                // console.log(json)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getExperiences()
    }, [refresh])

    async function addExperience() {
        try {

            // Fetch senza immagine
            let res = await fetch(apiUrl + id + '/experiences', {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey },
                body: JSON.stringify(valueAdd)
            });



            if (res) {
                let json = await res.json();
                if (image) {
                    let res2 = await fetch(apiUrl + id + '/experiences/' + json._id + '/picture', {
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + apiKey },
                        body: image
                    });

                    if (res2) {
                        console.log(res2);
                        setRefresh(!refresh);
                        setShowAddModal(false);
                    } else {
                        setRefresh(!refresh);
                        setShowAddModal(false);

                    }

                } else {

                    setRefresh(!refresh);
                    setShowAddModal(false);
                }
            } else {
                console.log(res);
            }

        } catch (error) {

        }
    }
    
    
    async function editExperience() {
        try {

            // Fetch senza immagine
            let res = await fetch(apiUrl + id + '/experiences/'+valueEdit._id, {
                method: 'PUT',
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey },
                body: JSON.stringify(valueEdit)
            });



            if (res) {
                let json = await res.json();
                if (image) {
                    let res2 = await fetch(apiUrl + id + '/experiences/' + json._id + '/picture', {
                        method: 'POST',
                        headers: { "Authorization": 'Bearer ' + apiKey },
                        body: image
                    });

                    if (res2) {
                        console.log(res2);
                        setRefresh(!refresh);
                        setShowEditModal(false);
                    } else {
                        setRefresh(!refresh);
                        setShowEditModal(false);

                    }

                } else {

                    setRefresh(!refresh);
                    setShowEditModal(false);
                }
            } else {
                console.log(res);
            }

        } catch (error) {

        }
    }


    async function deleteExperience(idex) {
        try {
            console.log(id)
            let res = await fetch(apiUrl + id + '/experiences/' + idex, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json", "Authorization": 'Bearer ' + apiKey },
            });

            if (res.ok) {
                setRefresh(!refresh);
            } else {
                console.log(res)
            }
        } catch (error) {

        }
    }

    function handleImage(img) {
        // const formData = {}
        // formData['experience'] = img;
        setImage((prev) => {
            prev.delete('experience');
            prev.append('experience', img);
            return prev;
        })
    }


    return (
        <>
            <Container className="bg-white rounded border p-3 my-3 position-relative">
                <h4>Esperienze</h4>
                {isAdmin && <> <IoAdd className='icon-add-base' onClick={handleShowAddModal} /> </>}
                {experiences && experiences.map((el, index) => {
                    return <Container key={index} className='my-5 position-relative'>
                        {isAdmin &&<MdOutlineEdit className='icon-edit-base' onClick={() => handleShowEditModal(el)} />}
                        <h5><b>Azienda:</b> {el.company}</h5>
                        <h5><i> {el.area} </i></h5>
                        {el.image && <Image alt='img' src={el.image} roundedCircle style={{ width: '80px', height: '80px' }} />}
                        <p><b>Ruolo:</b> {el.role}</p>
                        <p><b>Descrizione:</b> {el.description}</p>
                        <p><b>Data inizio:</b> {new Date(el.startDate).toLocaleDateString('it-IT', 'dd/MM/yyyy')}</p>
                        <p><b>Data fine:</b> {new Date(el.endDate).toLocaleDateString('it-IT', 'dd/MM/yyyy')}</p>
                        {isAdmin && <Button variant='danger' onClick={() => { deleteExperience(el._id) }}>Delete</Button>}
                        <hr></hr>


                    </Container>
                })}
            </Container>



            {/* Modale AddExperiences */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Aggiungi Esperienza Lavorativa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Città</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci la Città" id='area' defaultValue={valueAdd.area} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control type="file" id='picture' defaultValue={valueAdd.picture} onChange={(e) => { handleImage(e.target.files[0]) }} />
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
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={addExperience}>
                        Aggiungi esperienza
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Esperienza Lavorativa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Città</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci la Città" id='area' defaultValue={valueEdit.area} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control type="file" id='picture' onChange={(e) => { handleImage(e.target.files[0]) }} />
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Label>Nome Azienda</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il nome dell'Azienda" id='company' defaultValue={valueEdit.company} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Ruolo</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il ruolo svolto" id='role' defaultValue={valueEdit.role} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Inizio lavoro</Form.Label>
                            <Form.Control type="date" id='startDate' defaultValue={valueEdit.startDate} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Fine lavoro</Form.Label>
                            <Form.Control type="date" id='endDate' defaultValue={valueEdit.endDate} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Descrivi il lavoro svolto</Form.Label>
                            <Form.Control as="textarea" rows={3} id='description' defaultValue={valueEdit.description} onChange={(e) => { handleUpdateValue(e) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={editExperience}>
                        Modifica esperienza
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    )
}
