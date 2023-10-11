import React, { useEffect, useState } from "react";
import { Form, Button, FormControl, InputGroup} from "react-bootstrap";
import { urlBackend } from "../assets/funcoes";


export default function FormDoacao(props) {
  const [editPessoa, setEditPessoa] = useState([]);
    const [editProduto, setEditProduto] = useState([]);
    const [listaPessoa, setListaPessoa] = useState([]); 
    const [listaProduto, setListaProduto] = useState([]); 
    const [doacao, setDoacao] = useState({
        doador: null, 
        dataDoacao: '',
        listaItens: [],
    });

    useEffect(() => {
      const getPessoa = async () => {
          try {
              const retornoPessoas = await fetch(urlBackend + '/pessoas', {
                  method: 'GET',
              });

              if (retornoPessoas.ok) {
                  const listaPessoa = await retornoPessoas.json();
                  setListaPessoa(listaPessoa);

                  
                  const nomes = listaPessoa.map((pessoa) => pessoa.nome);

                  
                  setEditPessoa(nomes);
              } else {
                  console.error('Erro ao buscar pessoas:', retornoPessoas.statusText);
              }

              
              const retornoProduto = await fetch(urlBackend + '/produto', {
                  method: 'GET',
              });

              if (retornoProduto.ok) {
                  const listaProduto = await retornoProduto.json();
                  setListaProduto(listaProduto);

                  
                  const nomesProdutos = listaProduto.map((produto) => produto.nome);

                  
                  setEditProduto(nomesProdutos);
              } else {
                  console.error('Erro ao buscar produtos:', retornoProduto.statusText);
              }

          } catch (error) {
              console.error('Erro inesperado:', error);
          }
      };

      getPessoa();
  }, []);

    const handleDoadorChange = (e) => {      
      const doadorSelecionado = listaPessoa.find((pessoa) => pessoa.nome === e.target.value);

      
      setDoacao({ ...doacao, doador: doadorSelecionado });
  };

  const handleProdutoChange = (index, e) => {
      
      const produtoSelecionado = listaProduto.find((produto) => produto.nome === e.target.value);
     
      const updatedItens = [...doacao.listaItens];
      updatedItens[index].produto = produtoSelecionado;
      setDoacao({ ...doacao, listaItens: updatedItens });
  };

  const handleDataDoacaoChange = (e) => {
            setDoacao({ ...doacao, dataDoacao: e.target.value });
  };


  const handleQuantidadeChange = (index, e) => {
      const updatedItens = [...doacao.listaItens];
      updatedItens[index].quantidade = e.target.value;
      setDoacao({ ...doacao, listaItens: updatedItens });
  };

  const handleAddItem = () => {      
      setDoacao({
          ...doacao,
          listaItens: [...doacao.listaItens, { produto: '', quantidade: 1 }],
      });
  };
  const handleRemoveItem = (index) => {
      const updatedItens = [...doacao.listaItens];
      updatedItens.splice(index, 1);
      setDoacao({ ...doacao, listaItens: updatedItens });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const cpfDoadorSelecionado = doacao.doador ? doacao.doador.cpf.replace(/[.-]/g, '') : '';
          const listaItensFormatada = doacao.listaItens.map((item) => ({
              codigoProduto: item.produto.codigo,
              quantidade: item.quantidade,
          }));

          const requestBody = {
              dataDoacao: doacao.dataDoacao,
              cpfPessoa: cpfDoadorSelecionado,
              listaItens: listaItensFormatada,
          };
          
          const response = await fetch(urlBackend + '/doacao', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
          });

          if (response.ok) {
              window.alert('Doação enviada com sucesso!');
              console.log('Doação enviada com sucesso!', JSON.stringify(requestBody));
              setDoacao({
                  doador: null,
                  dataDoacao: '',
                  listaItens: [],
              });
          } else {
              window.alert('Erro ao enviar a doação.');
              console.error('Erro ao enviar a doação.', JSON.stringify(requestBody));
          }
      } catch (error) {
          console.error('Erro inesperado:', error);
          window.alert('Erro inesperado:', error, JSON.stringify(requestBody));
      }
  };
  
    return (
      <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3">
              <Form.Label>Doador</Form.Label>
              <InputGroup className="mb-3">
                  <FormControl
                      as="select"
                      onChange={handleDoadorChange}
                      value={doacao.doador ? doacao.doador.nome : ''}
                  >
                      <option value="" disabled>
                          Selecione um doador
                      </option>
                      {editPessoa.map((doador, index) => (
                          <option key={index} value={doador}>
                              {doador}
                          </option>
                      ))}
                  </FormControl>
              </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Data da Doação</Form.Label>
              <FormControl
                  type="date"
                  onChange={handleDataDoacaoChange}
                  value={doacao.dataDoacao}
              />
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label className="mb-3">Itens da Doação</Form.Label>
              {doacao.listaItens.map((item, index) => (
                  <div key={index} className="mb-3">
                      <InputGroup className="mb-3">
                          <FormControl
                              as="select"
                              onChange={(e) => handleProdutoChange(index, e)}
                              value={item.produto ? item.produto.nome : ''}
                          >
                              <option value="" disabled>
                                  Selecione um produto
                              </option>
                              {editProduto.map((produto, index) => (
                                  <option key={index} value={produto}>
                                      {produto}
                                  </option>
                              ))}
                          </FormControl>
                          <FormControl
                              type="number"
                              min="1"
                              onChange={(e) => handleQuantidadeChange(index, e)}
                              value={item.quantidade}
                          />
                          <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                              Remover
                          </Button>
                      </InputGroup>
                  </div>
              ))}
              <Button variant="secondary" onClick={handleAddItem} className='ml-5'>
                  Adicionar Item
              </Button>
          </Form.Group>


          <Button
              variant="danger"
              type="button"
              onClick={() => {
                  props.exibirTabela(true);
              }}
          >
              Voltar
          </Button>
          <Button variant="primary" type="submit" onSubmit={handleSubmit} >
              Enviar Doação
          </Button>
      </Form>
  );
};

