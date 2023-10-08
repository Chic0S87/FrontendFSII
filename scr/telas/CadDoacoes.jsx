import Pagina from "../templates/Pagina";
import FormDoacao from "../formularios/Doacao";
import TabelaDoacoes from "../tabelas/TabelaDoacoes";
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadDoacao(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [doacao, setDoacao] = useState({
    codigo: 0,
    dataDoacao: "",
    cpfPessoa: "",
    listaItens: "",
    quantidade: "",
  });

  // function preparaTela(doacao) {
  //   setModoEdicao(true);
  //   setEditPessoa(pessoa);
  //   setExibirTabela(false);
  // }

  // function excluirPessoa(pessoa) {
  //   fetch(urlBackend + "/pessoas", {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(pessoa),
  //   }).then((resposta) => {
  //     window.alert("Pessoa excluída com sucesso!");
  //     window.location.reload();
  //     return resposta.json();
  //   });
  // }

  useEffect(() => {
    fetch(urlBackend + "/doacao", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setDoacao(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Doações</Alert>
        {exibirTabela ? (
          <TabelaDoacoes
            listaDoacao={doacao}
            setDoacao={setDoacao}
            exibirTabela={setExibirTabela}
            // editar={preparaTela}
            // excluir={excluirPessoa}
          />
        ) : (
          <FormDoacao
            listaDoacao={doacao}
            setDoacao={setDoacao}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            // editar={preparaTela}
            // pessoa={editPessoa}
          />
        )}
      </Container>
    </Pagina>
  );
}
