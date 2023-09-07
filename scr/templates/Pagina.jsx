import { Container } from "react-bootstrap";
import { Cabecalho } from "./Cabecalho";
import Menu from "./Menu";

export default function Pagina(props){
  return(
    <>
    <Cabecalho texto="Assembléia de Deus Ministério Belém "/>
    <Menu/>
    <Container>
    {props.children}
    </Container>
    <br/>
    <br/>
    <Container>
        <h3 className="text-center">TRABALHO FULLSTACK II RELACIONAMENTO DE ENTIDADES</h3>
        <br/>
        <h3 className="text-center">Francisco Carlos de Souza Junior</h3>
    </Container>
    </>

  )
}