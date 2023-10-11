import Pagina from "../templates/Pagina";
import FormDoacao from "../formularios/Doacao";
import TabelaDoacoes from "../tabelas/TabelaDoacoes";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadDoacao(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [produtoEdicao, setProdutoEdicao] = useState({
    codigo: "",
    nome: "",
    metrica: "",
    descricao: "",
    codigoCategoria: "",
  });
  const [categoria, setCategoria] = useState();

  const [doacoes, setDoacoes] = useState([]);

  function prepararTela(produto) {
    setModoEdicao(true);

    setProdutoEdicao(produto);
    setExibirTabela(false);
  }

  useEffect(() => {
    buscarDoacao();
  }, []);

  function buscarDoacao() {
    fetch(urlBackend + "/doacao", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setDoacoes(dados);
        } else {
        }
      });
  }

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Doações</Alert>
        {exibirTabela ? (
          <TabelaDoacoes
            listaProdutos={produtos}
            listaDoacoes={doacoes}
            setDoacoes={setDoacoes}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            // excluir={excluirPessoa}
          />
        ) : (
          <FormDoacao
            // listaDoacao={doacao}
            // setDoacao={setDoacao}
            exibirTabela={setExibirTabela}
            // modoEdicao={modoEdicao}
            // setModoEdicao={setModoEdicao}
            // editar={preparaTela}
            // pessoa={editPessoa}
          />
        )}
      </Container>
    </Pagina>
  );
}
