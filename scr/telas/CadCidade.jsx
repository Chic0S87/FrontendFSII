import Pagina from "../templates/Pagina";
import FormCidade from "../formularios/Cidades"; 
import TabelaCidades from "../tabelas/TabelaCidade"; 
import { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

export default function TelaCadCidade(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [cidades, setCidades] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editCidade, setEditCidade] = useState({
    codigo:"",
    nome: ""
  });

  function preparaTela(cidade) {
    setModoEdicao(true);
    setEditCidade(cidade);
    setExibirTabela(false);
  }

  function excluirCidade(cidade) {
    fetch(urlBackend + "/cidades", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cidade),
    }).then((resposta) => {
      window.alert("Cidade excluída com sucesso!");
      window.location.reload();
      return resposta.json();
    });
  }

  useEffect(() => {
    fetch(urlBackend + "/cidades", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCidades(dados);
        } else {
        }
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant={"secondary"}>Cadastro de Cidades</Alert>
        {exibirTabela ? (
          <TabelaCidades 
            listaCidades={cidades}
            setCidades={setCidades}
            exibirTabela={setExibirTabela}
            editar={preparaTela}
            excluir={excluirCidade}
          />
        ) : (
          <FormCidade 
            listaCidades={cidades}
            setCidades={setCidades}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            setModoEdicao={setModoEdicao}
            editar={preparaTela}
            cidade={editCidade}
          />
        )}
      </Container>
    </Pagina>
  );
}
