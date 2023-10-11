import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";

function FormCidade(props) {
  const [validated, setValidated] = useState(false);
  const [cidade, setCidade] = useState(props.cidade);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setCidade({ ...cidade, [id]: valor });
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    console.log("entrei aqui");
    if (form.checkValidity()) {
      if (!props.modoEdicao) {
        fetch(urlBackend + "/cidades", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cidade),
        })
          .then((resposta) => {
            return resposta.json();
          })
          .then((dados) => {
            if (dados.status) {
              props.setModoEdicao(false);
              let novaLista = props.listaCidades;
              novaLista.push(cidade);
              props.setCidades(novaLista);
              props.exibirTabela(true);
            }
            window.alert(dados.mensagem);
            })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição :" + erro.message);
            
          });
      } else {
        fetch(urlBackend + "/cidades", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cidade),
        }).then((resposta) => {
          window.location.reload();
          return resposta.json();
        });
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
          <Form.Group >
            <Form.Label>Nome da Cidade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da cidade"
              required
              value={cidade.nome}
              id="nome"
              onChange={manipularMudanca}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">
            Por favor, informe o nome da cidade!
          </Form.Control.Feedback>
        </Row>
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

export default FormCidade;
