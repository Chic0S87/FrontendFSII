import { useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";
import SearchBar from "../templates/Searchbar/Searchbar";

export default function FormDoacao(props) {
  const [produtoSelecionado, setProdutoSelecionado] = useState(props.produto);
  const [validated, setValidated] = useState(false);
  const [pessoaSelecionada, setPessoaSelecionada] = useState(props.pessoa);
  const [listaPessoas, setListaPessoas] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [doacao, setDoacao] = useState([]);
  useEffect(() => {
    fetch(urlBackend + "/pessoas", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        setListaPessoas(dados);
      });
  });
  useEffect(() => {
    fetch(urlBackend + "/produto", { method: "GET" })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        setListaProdutos(dados);
        
      });
  });
  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setDoacao({ ...doacao, [id]: valor });
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log("entrei aqui");
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/doacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pessoa),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaDoacoes;
              novaLista.push(doacao);
              props.setDoacao(novaLista);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição :" + erro.message);
          });
      } else {
      }

      setValidated(false);
    } else {
      setValidated(true);
    }
    event.preventDefault();
  }

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group>
            <Form.Label>Data da Doação</Form.Label>
            <Form.Control
              type="date"
              placeholder="Digite a data da doação"
              required
              value={doacao.dataDoacao}
              id="data"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe uma data !
          </Form.Control.Feedback>
        </Row>

        <Row>
          <Form.Group>
            <Form.Label>Selecione uma Pessoa para receber a Doação:</Form.Label>
            <SearchBar
              placeHolder={"Busque pessoas"}
              dados={listaPessoas}
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={(pessoaSelecionada) => {
                setPessoaSelecionada(pessoaSelecionada);
                setDoacao({ ...doacao, pessoa: pessoaSelecionada.nome });
              }}
              valor={pessoaSelecionada ? pessoaSelecionada.nome : ""}
              id="pessoa"
              onChange={manipularMudanca}
            />
          </Form.Group>
        </Row>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
            <Form.Group className="mb-5">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="insira a quantidade de produtos doados"
                value={doacao.quantidade}
                id="quantidade"
                onChange={manipularMudanca}
              />
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Form.Group>
            <Form.Label>Busque um produto para ser doado:</Form.Label>
            <SearchBar
              placeHolder={"Busque produtos"}
              dados={listaProdutos}
              campoChave={"codigoProduto"}
              campoBusca={"nome"}
              funcaoSelecao={(produtoSelecionado) => {
                setProdutoSelecionado(produtoSelecionado);
                setDoacao({ ...doacao, produto: produtoSelecionado.nome });
              }}
              valor={produtoSelecionado ? produtoSelecionado.nome : ""}
              id="produto"
              onChange={manipularMudanca}
            />
          </Form.Group>
        </Row>
              <br/>
        <Row>
          <Col>
            <Button variant="primary" type="submit" className="mb-3">
              {props.modoEdicao ? "Atualizar" : "Cadastrar"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="danger"
              type="button"
              className="mb-3"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
