import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";

export default function TabelaDoacoes(props) {
  function filtrarPessoas(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/pessoas", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaPessoas) => {
        if (Array.isArray(listaPessoas)) {
          const resultadoBusca = listaPessoas.filter((pessoa) =>
            pessoa.nome.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setPessoas(resultadoBusca);
        }
      });
  }
  function filtrarDoacoes(e) {
    const termoBusca = e.currentTarget.value;
    fetch(urlBackend + "/doacao", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((listaDoacoes) => {
        if (Array.isArray(listaDoacoes)) {
          const resultadoBusca = listaDoacoes.filter((doacao) =>
            doacao.codigo.toLowerCase().includes(termoBusca.toLowerCase())
          );
          props.setDoacao(resultadoBusca);
        }
      });
  }

  function triggaFuncoes(e) {
    if (e.key === "Enter") {
      filtrarPessoas(e);
      filtrarDoacoes(e);
    }
  }

  return (
    <Container>
      <Button
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Novo Cadastro
      </Button>
      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termobusca"
          placeholder="Buscar"
          onChange={triggaFuncoes}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Recebedor</th>
            <th>Produto</th>
            <th>Data da Doação</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {props.listaDoacoes?.map((doacao) => {
            return (
              <tr key={doacao.codigo}>
                <td>{doacao.cpfPessoa.nome}</td>
                <td>{doacao.dataDoacao}</td>
                <td>{doacao.quantidade}</td>                
                
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}