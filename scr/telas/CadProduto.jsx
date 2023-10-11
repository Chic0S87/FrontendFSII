import { useState, useEffect } from "react";
import TableProduto from "../tabelas/TabelaProduto";
import ProdutoForm from "../formularios/Produto";
import { urlBackend } from "../assets/funcoes";
import Pagina from "../templates/Pagina";
import { Container, Alert } from "react-bootstrap";

export default function CadProdutos(props) {
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

  function prepararTela(produto) {
    setModoEdicao(true);

    setProdutoEdicao(produto);
    setExibirTabela(false);
  }

  function deletarProduto(produto) {
    fetch(urlBackend + "/produto", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    }).then((resposta) => {
      window.alert("Produto excluído com sucesso!!!");
      
      return resposta.json();
    });
  }

  useEffect(() => {
    buscarProduto();
    buscarCategoria();
  }, []);

  function buscarProduto() {
    fetch(urlBackend + "/produto", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setProdutos(dados);
        } else {
        }
      });
  }

  function buscarCategoria() {
    fetch(urlBackend + "/categoria", {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setCategoria(dados);
        } else {
        }
      });
  }

  return (
    <Pagina>
      <Container>
        <Alert variant={"secondary"}>Cadastro de Produtos</Alert>
        {exibirTabela ? (
          <TableProduto
            listaProdutos={produtos}
            setProdutos={setProdutos}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarProduto}
          />
        ) : (
          <ProdutoForm
            listaProdutos={produtos}
            setProdutos={setProdutos}
            exibirTabela={setExibirTabela}
            modoEdicao={modoEdicao}
            editar={prepararTela}
            setModoEdicao={setModoEdicao}
            produto={produtoEdicao}
            buscarProduto={buscarProduto}
            categorias={categoria}
          />
        )}
      </Container>
    </Pagina>
  );
}
