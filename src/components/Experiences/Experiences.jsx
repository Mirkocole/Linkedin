import React, { useEffect, useState } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

export default function Experiences({ isAdmin, id, apiKey, apiUrl }) {
  const [experiences, setExperiences] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [valueAdd, setValueAdd] = useState({});

  const handleUpdateValue = (e) => {
    // console.log(valueAdd[e.target.id]);
    let key = e.target.id;
    let val = e.target.value;
    setValueAdd((prev) => (prev = { ...prev, [key]: val }));
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);

  // MODIFIY EXPERIECES MODAL
  const [showModifyModal, setShowModifyModal] = useState(false);

  const handleCloseModifyModal = () => setShowModifyModal(false);
  const handleShowModifyModal = () => setShowModifyModal(true);

  const [selected, setSelected] = useState(false);

  async function getExperiences() {
    try {
      let res = await fetch(apiUrl + id + "/experiences", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });

      if (res.ok) {
        let json = await res.json();
        setExperiences(json);
        // console.log(json)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getExperiences();
  }, [refresh]);

  async function addExperience() {
    try {
      console.log(id);
      let res = await fetch(apiUrl + id + "/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify(valueAdd),
      });

      if (res.ok) {
        setRefresh(!refresh);
        setShowAddModal(false);
      } else {
        console.log(res);
      }
    } catch (error) {}
  }

  async function deleteExperience(idex) {
    try {
      console.log(id);
      let res = await fetch(apiUrl + id + "/experiences/" + idex, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });

      if (res.ok) {
        setRefresh(!refresh);
      } else {
        console.log(res);
      }
    } catch (error) {}
  }

  // FETCH PUT EXPERIECE
  async function modifyExperience() {
    try {
      console.log(id);
      let res = await fetch(apiUrl + id + "/experiences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify(valueAdd),
      });

      if (res.ok) {
        setRefresh(!refresh);
        setShowModifyModal(false);
      } else {
        console.log(res);
      }
    } catch (error) {}
  }

  console.log(selected);

  return (
    <>
      <Container className="bg-white rounded border p-3 my-3 position-relative">
        <h4>Esperienze</h4>
        {isAdmin && (
          <>
            <IoAdd className="icon-add-base" onClick={handleShowAddModal} />
          </>
        )}
        {experiences &&
          experiences.map((el, index) => {
            return (
              <Container
                key={index}
                className="my-5"
                style={{ position: "relative" }}
              >
                <MdOutlineEdit
                  className="icon-edit-base"
                  onClick={() => {
                    setSelected(el);
                    handleShowModifyModal();
                  }}
                />
                <h5>
                  <b>Azienda:</b> {el.company}
                </h5>
                <h5>
                  <i> {el.area} </i>
                </h5>
                <p>
                  <b>Ruolo:</b> {el.role}
                </p>
                <p>
                  <b>Descrizione:</b> {el.description}
                </p>
                <p>
                  <b>Data inizio:</b>
                  {new Date(el.startDate).toLocaleDateString(
                    "it-IT",
                    "dd/MM/yyyy"
                  )}
                </p>
                <p>
                  <b>Data fine:</b>
                  {new Date(el.endDate).toLocaleDateString(
                    "it-IT",
                    "dd/MM/yyyy"
                  )}
                </p>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteExperience(el._id);
                  }}
                >
                  Delete
                </Button>
                <hr></hr>
              </Container>
            );
          })}
      </Container>

      {/* Modale AddExperiences */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza Lavorativa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Città</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la Città"
                id="area"
                defaultValue={valueAdd.area}
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome Azienda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome dell'Azienda"
                id="company"
                defaultValue={valueAdd.company}
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il ruolo svolto"
                id="role"
                defaultValue={valueAdd.role}
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Inizio lavoro</Form.Label>
              <Form.Control
                type="date"
                id="startDate"
                defaultValue={valueAdd.startDate}
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fine lavoro</Form.Label>
              <Form.Control
                type="date"
                id="endDate"
                defaultValue={valueAdd.endDate}
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrivi il lavoro svolto</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="description"
                defaultValue={valueAdd.description}
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
          </Form>
          <p className="p-3 m-2 bg-warning">{valueAdd.role}</p>
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

      {/* Modale ModifyExperiece */}
      <Modal show={showModifyModal} onHide={handleCloseModifyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza Lavorativa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Città</Form.Label>
              <Form.Control
                type="text"
                value={selected.area}
                id="area"
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nome Azienda</Form.Label>
              <Form.Control
                type="text"
                value={selected.company}
                id="company"
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                type="text"
                value={selected.role}
                id="role"
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Inizio lavoro</Form.Label>
              <Form.Control
                type="date"
                value={new Date(selected.startDate).toLocaleDateString(
                  "it-IT",
                  "dd/MM/yyyy"
                )}
                id="startDate"
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fine lavoro</Form.Label>
              <Form.Control
                type="date"
                value={new Date(selected.endDate).toLocaleDateString(
                  "it-IT",
                  "dd/MM/yyyy"
                )}
                id="endDate"
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrivi il lavoro svolto</Form.Label>
              <Form.Control
                as="textarea"
                value={selected.description}
                rows={3}
                id="description"
                onChange={(e) => {
                  handleUpdateValue(e);
                }}
              />
            </Form.Group>
          </Form>
          <p className="p-3 m-2 bg-warning">{valueAdd.role}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModifyModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={modifyExperience}>
            Aggiungi esperienza
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
