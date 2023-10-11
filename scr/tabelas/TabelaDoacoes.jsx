import {
  Table,
  Container,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// import { MdModeEdit } from "react-icons/md";
// import { HiTrash } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { urlBackend } from "../assets/funcoes";

export default function TabelaDoacoes(props) {
  function filtrarDoacoesPorCPF(e) {
    const termoBusca = e.currentTarget.value;

    fetch(urlBackend + "/doacao", { method: "GET" })
      .then((resposta) => resposta.json())
      .then((listaDoacoes) => {
        if (Array.isArray(listaDoacoes)) {
          const resultadoBusca = listaDoacoes.filter((doacao) =>
            doacao.cpfPessoa.nome
              .toLowerCase()
              .includes(termoBusca.toLowerCase())
          );
          props.setDoacoes(resultadoBusca);
        }
      });
  }

  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, "0");
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Container>
      <Button
        className="mb-4"
        onClick={() => {
          props.exibirTabela(false);
        }}
      >
        Nova Doação
      </Button>

      <InputGroup className="mt-2">
        <FormControl
          type="text"
          id="termoBusca"
          placeholder="Busque aqui o doador pelo nome"
          onChange={filtrarDoacoesPorCPF}
        />
        <InputGroup.Text>
          <RiSearchLine />
        </InputGroup.Text>
      </InputGroup>

      <Table striped bordered hover size="sm" className="mt-5">
        <thead>
          <tr className="text-center">
            {/* <th className="text-center">Código</th> */}
            <th className="text-center">Doador</th>
            <th className="text-center">Data da Doação</th>
            <th className="text-center">Itens</th>
            {/* <th className="text-center">Ações</th> */}
          </tr>
        </thead>
        <tbody>
          {props.listaDoacoes?.map((doacao) => {
            return (
              <tr key={doacao.codigo}>
                {/* <td>{doacao.codigo}</td> */}
                <td>{doacao.cpfPessoa.nome}</td>
                <td>{formatarData(doacao.dataDoacao)}</td>

                <td>
                  <ul>
                    {doacao.listaItens.map((item, index) => (
                      <li key={index}>
                        {item.produto.nome} - Quantidade: {item.quantidade}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
