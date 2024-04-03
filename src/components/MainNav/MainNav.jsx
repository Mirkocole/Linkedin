import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  InputGroup,
  Stack,
  Row,
} from "react-bootstrap";
import {
  IoLogoLinkedin,
  IoIosSearch,
  IoIosHome,
  IoIosPeople,
  IoIosBriefcase,
  IoIosText,
  IoIosNotifications,
} from "react-icons/io";

export default function MainNav() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Stack direction="horizontal">
          
              <Navbar.Brand href="#">
                <IoLogoLinkedin
                  style={{ color: "#0d66c2", fontSize: "1.5em" }}
                />
              </Navbar.Brand>

            <InputGroup style={{ maxWidth: "30rem" }} className="me-5">
              <InputGroup.Text
                style={{ backgroundColor: "white", borderRightStyle: "none" }}
              >
                <IoIosSearch />
              </InputGroup.Text>
              <Form.Control
                type="trext"
                placeholder="Search.."
                style={{ borderLeftStyle: "none" }}
              />
            </InputGroup>

            <Navbar.Collapse id="navbarScroll" className="ms-auto">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#" className="text-center">
                  <IoIosHome style={{ fontSize: "1.5em" }} />
                  <div style={{ fontSize: "0.7em" }}>Home</div>
                </Nav.Link>

                <Nav.Link href="#" className="text-center">
                  <IoIosPeople style={{ fontSize: "1.5em" }} />
                  <div style={{ fontSize: "0.7em" }}>Network</div>
                </Nav.Link>

                <Nav.Link href="#" className="text-center">
                  <IoIosBriefcase style={{ fontSize: "1.5em" }} />
                  <div style={{ fontSize: "0.7em" }}>Jobs</div>
                </Nav.Link>

                <Nav.Link href="#" className="text-center">
                  <IoIosText style={{ fontSize: "1.5em" }} />
                  <div style={{ fontSize: "0.7em" }}>Messagging</div>
                </Nav.Link>

                <Nav.Link href="#" className="text-center">
                  <IoIosNotifications style={{ fontSize: "1.5em" }} />
                  <div style={{ fontSize: "0.7em" }}>Notifications</div>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="navbarScroll" />
          </Stack>
        </Container>
      </Navbar>
    </>
  );
}
