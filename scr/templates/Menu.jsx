import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Menu(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='mt-0'>
      <Container>
      <LinkContainer to="/"><Navbar.Brand >Início</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
              <NavDropdown title="Formulários" id="collapsible-nav-dropdown">
              <LinkContainer to="/cadastroPessoa"><NavDropdown.Item >Pessoas</NavDropdown.Item></LinkContainer>
              <LinkContainer to="/cadastroCidade"><NavDropdown.Item >Cidades</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/cadastroEvento"><NavDropdown.Item disabled>Eventos</NavDropdown.Item></LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

