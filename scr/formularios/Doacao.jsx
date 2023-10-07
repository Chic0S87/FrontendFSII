import { Form , Button, Container, Row , Col } from "react-bootstrap";
import CaixaSelecao from "../templates/Select/Select.jsx"
import { urlBackend } from "../assets/funcoes.jsx";

export default function FormDoacao(props) {
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [validated, setValidated] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState({});
  const [listaPessoas, setListaPessoas] = useState([]);
  const [doacao, setDoacao] = useState({
    codigo:0,
    dataDoacao:"",
    cpfPessoa: "",
    listaItens: "",
    quantidade: ""
  });
  
  function manipularOnChange(e) {
    const elementForm = e.currentTarget;
    const id = elementForm.codigo;
    const valor = elementForm.value;
    setDoacao({ ...doacao, [codigo]: valor });
  }
  
}

<Container>
  <Row className="mb-3">
    <Col>
    <Form.Label>
    <strong>Selecione o Produto</strong>
    </Form.Label>
    </Col>
    <Col>
    <CaixaSelecao enderecoFonteDados={urlBackend + "/produto"} 
    campoChave={"codigo"}
    campoExibicao={"descricao"}
    funcaoSelecao={setProdutoSelecionado}
    
    />
    </Col>
  </Row>
</Container>

//26:52