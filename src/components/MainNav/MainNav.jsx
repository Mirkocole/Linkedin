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
  Image,
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
import "./MainNav.css";
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <>
      <Navbar expand="lg" bg="light" style={{ backgroundColor: "white" }}>
        <Container>
          <Link to="/">
            <IoLogoLinkedin style={{ color: "#0d66c2", fontSize: "1.5em" }} />
          </Link>

          <Form className="ms-2">
            <InputGroup style={{ maxWidth: "30rem", borderStyle: "none" }}>
              <InputGroup.Text
                style={{
                  backgroundColor: "#edf3f7",
                  bordeRightStyle: "none",
                  borderLeftStyle: "none",
                  borderTopStyle: "none",
                  borderBottomStyle: "none",
                }}
              >
                <IoIosSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search.."
                style={{
                  backgroundColor: "#edf3f7",
                  borderStyle: "none",
                }}
              />
            </InputGroup>
          </Form>

          <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "70px" }}>
            <Link to="/" className="text-center">
              <IoIosHome style={{ fontSize: "1.5em" }} />
              <div style={{ fontSize: "0.7em" }} className="p-2">
                Home
              </div>
            </Link>

            <Link to="#" className="text-center">
              <IoIosPeople style={{ fontSize: "1.5em" }} />
              <div style={{ fontSize: "0.7em" }} className="p-2">
                Network
              </div>
            </Link>

            <Link to="#" className="text-center">
              <IoIosBriefcase style={{ fontSize: "1.5em" }} />
              <div style={{ fontSize: "0.7em" }} className="p-2">
                Jobs
              </div>
            </Link>

            <Link to="#" className="text-center">
              <IoIosText style={{ fontSize: "1.5em" }} />
              <div style={{ fontSize: "0.7em" }} className="p-2">
                Messagging
              </div>
            </Link>

            <Link to="#" className="text-center">
              <IoIosNotifications style={{ fontSize: "1.5em" }} />
              <div style={{ fontSize: "0.7em" }} className="p-2">
                Notifications
              </div>
            </Link>

            <Link to={'/profile/me'}>
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                roundedCircle
                style={{ width: "24px", height: "24px", objectFit: "cover" }}
                className="mx-2"
              ></Image>
              <NavDropdown
                title="Me"
                id="nav-dropdown"
                style={{ fontSize: "0.7em" }}
              >
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">
                  Something else here
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Link>

            <div className="vr" />

            <Link>
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                roundedCircle
                style={{ width: "24px", height: "24px", objectFit: "cover" }}
                className="mx-2"
              ></Image>
              <NavDropdown
                title="Me"
                id="nav-dropdown2"
                style={{ fontSize: "0.7em" }}
              >
                <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3">
                  Something else here
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
