import { FaPiggyBank, FaDollarSign, FaMoneyBill } from 'react-icons/fa';
import { BiBarChartAlt, BiX } from 'react-icons/bi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContaCorrenteService from '../domain/service/ContaCorrenteService';
import { CofrinhoService } from '../domain/service/CofrinhoService';
import {Container, Row, Col, Card, Button, Image} from "react-bootstrap";
import imgAlt from "../resources/img/michel-com-a-mão.png";
import "../resources/CSS/Home.css";

function Home() {
  const [showAddRendaExtra, setShowAddRendaExtra] = useState(false);
  const [showAddCofrinho, setShowAddCofrinho] = useState(false);
  const [showResgateCofrinho, setShowResgateCofrinho] = useState(false);
  const contaCorrenteService = new ContaCorrenteService()
  const cofrinhoService = new CofrinhoService()
  const [valorMensal, setValorMensal] = useState(0); // Estado para armazenar o valor mensal a ser adicionado
  const [selected, setSelected] = useState("Descrição");
  const descriptions = {
    Gastos:
      "Em gastos você ira cadastrar suas despesas mensais, tendo dois tipos possiveis de gstos, o Gasto Fixo no qual adicionara apenas o valor maximo, e o Gasto Variado que será preenchido valor maximo e minmo para ser feita a media desses valores",
    Cofrinho:
      "Em Cofrinho servirá para ajudar a você planejar um gasto a longo prazo, como uma viajem para fim do ano, um carro novo, etc. Será adicionado a meta a qual deseja alcançar e o valor inicial depositado, e conforme os dias pode adicionar para alcançar a meta e resgatar caso tire dinheiro do cofrinho",
    Renda:
      "Em Renda você adicionará o seu salário bruto em que ganha todo mês, também podendo edita-lo ou adicionar um valor extra, que seria um dinheiro inseperado naquele mês",
    Relatórios:
      "Em relatórios poderá visualzar toda a sua finaça cadastrada,  como cofrinho e seu progresso, renda bruta, todos os seus gastos como graficos para visualizar qual maior gasto naquele mês e total do gasto e seu salário. Também em relatórios poderá excluir qualquer um de seus cadastros financeiros",
  };

  function handleAddCofrinhoClick() {
    setShowAddCofrinho(true);
  }

  function handleAddRendaExtraClick() {
    setShowAddRendaExtra(true);
  }

  async function handleResgateCofrinhoClick() {
    setShowResgateCofrinho(true);
  }
  
  const handleAddValorMensal = async () => {
    try {
      await cofrinhoService.addValorMensalToCofrinho(valorMensal);
      setShowAddCofrinho(false); // Fechar o formulário após o sucesso
    } catch (error) {
      console.error("Erro ao adicionar valor mensal ao cofrinho:", error);
    }
};

const handleResgatarValorMensal = async () => {
  const valorResgate = Number(document.getElementById('valorR').value);
  
  try {
      // Chama a função para subtrair o valor do cofrinho (esse método ainda precisa ser criado)
      await cofrinhoService.ResgatarValorMensalToCofrinho(valorResgate);
      
      // Fechar o formulário após o sucesso
      setShowResgateCofrinho(false);
  } catch (error) {
      console.error("Erro ao resgatar valor mensal do cofrinho:", error);
  }
};
 

  const handleAddRendaExtra = async () => {
    const valor = document.getElementById('rendaExtra').value;
    try {
       await contaCorrenteService.addRendaExtra(valor);  // Use a função real do serviço aqui
       setShowAddRendaExtra(false);  // Fechar o formulário após o sucesso
    } catch (error) {
       console.error("Erro ao adicionar renda extra:", error);
    }
 };
  
 return (
  <section>
    <Container fluid>
      <Row>
        <Col className="corpo-sup">
          <Row>
            <Col lg="6">
              <h1>A maneira mais fácil de gerenciar finanças pessoais</h1>
              <p>
                O gerenciador de gastos que você precisava a um click de
                distância, adicione seus gastos, lucros e planos futuros que a
                gente da um jeito para você
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row className="posicaoCard">
        <Col>
          <Card id="gastoCard" style={{ width: "16rem" }}>
            <Card.Body>
              <span className="lgGastos">
                <FaDollarSign />
              </span>
              <Card.Title className="tituloGasto">Gasto</Card.Title>
              <Card.Subtitle className="textoGasto mb-2 text-muted">
                Para Gerenciar seus Gastos clique aqui!!
              </Card.Subtitle>
              <Link to="/gastos">
                <Button className="bt_comecar" variant="primary">
                  Criar
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card id="gastoCard" style={{ width: "16rem" }}>
            <Card.Body>
              <span className="lgGastos">
                <FaPiggyBank />
              </span>
              <Card.Title className="tituloGasto">Cofrinho</Card.Title>
              <Card.Subtitle className="textoGasto mb-2 text-muted">
                Para Gerenciar seu Cofrinho clique aqui!!
              </Card.Subtitle>
              <Link to="/cofrinho">
                <Button className="bt_criar bt_comecar">Criar</Button>
              </Link>
              <Button
                className="bt_resgatar bt_comecar"
                onClick={handleAddCofrinhoClick}
              >
                Adicionar
              </Button>
              <Button
                className="bt_resgatar bt_comecar"
                onClick={handleResgateCofrinhoClick}
              >
                Resgatar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card id="gastoCard" style={{ width: "16rem" }}>
            <Card.Body>
              <span className="lgGastos">
                <FaMoneyBill />
              </span>
              <Card.Title className="tituloGasto">Renda Bruta</Card.Title>
              <Card.Subtitle className="textoGasto mb-2 text-muted">
                Para Gerenciar sua Renda clique aqui!!
              </Card.Subtitle>
              <Link to="/contaCorrente">
                <Button className="bt_criar bt_comecar">Criar</Button>
              </Link>
              <Link to="/EditarContaCorrente">
                <Button
                  className="bt_comecar"
                  onClick={handleAddCofrinhoClick}
                >
                  Adicionar
                </Button>
              </Link>
              <Button
                className="bt_criar bt_comecar"
                onClick={handleAddRendaExtraClick}
              >
                Extra
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card id="gastoCard" style={{ width: "16rem" }}>
            <Card.Body>
              <span className="lgGastos">
                <BiBarChartAlt />
              </span>
              <Card.Title className="tituloGasto">Relatórios</Card.Title>
              <Card.Subtitle className="textoGasto mb-2 text-muted">
                Para ver o relatorio completo aqui!!
              </Card.Subtitle>
              <Link to="/relatorios">
                <Button className="bt_comecar">Ver</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    {showAddCofrinho && (
      <div className="cofrinho-overlay">
        <div className="cofrinho-form">
          <h2>Adicionar valor ao Cofrinho</h2>
          <form>
            <label htmlFor='valor'>Valor</label>
            <input
              type="number"
              name="valor"
              id='valor'
              value={valorMensal}
              onChange={(e) => setValorMensal(e.target.value)}
            />
            <button type="button" onClick={handleAddValorMensal}>Adicionar</button>
            <button className='btnX' onClick={() => setShowAddCofrinho(false)}><BiX /></button>
          </form>
        </div>
      </div>
    )}
    {showResgateCofrinho && (
      <div className="cofrinho-overlay">
          <div className="cofrinho-form">
              <h2>Resgatar um valor do Cofrinho</h2>
              <form>
                  <label htmlFor='valorR'>Valor </label>
                  <input type="number" id="valorR" name="valorR" />
                  <button type="button" onClick={handleResgatarValorMensal}>Resgatar</button>
                  <button className='btnX' onClick={() => setShowResgateCofrinho(false)}><BiX /></button>
              </form>
          </div>
      </div>
  )}
    {showAddRendaExtra && (
      <div className="cofrinho-overlay">
         <div className="cofrinho-form">
            <h2>Adicionar Renda Extra</h2>
            <form>
               <label htmlFor='rendaExtra'>Valor </label><input type="text" name="valor" id="rendaExtra" />
               <button type="button" onClick={handleAddRendaExtra}>Adicionar</button>
               <button className='btnX' onClick={() => setShowAddRendaExtra(false)}><BiX /></button>
            </form>
         </div>
      </div>
   )}
    <Container>
      <hr></hr>
      <Row className="justify-content-center align-items-center">
        <Col md="8">
          <div className="title">{selected}</div>
          <div className="description">{descriptions[selected]}</div>
        </Col>
        <Col md="12">
          <div className="icon-bar">
            <div className="top-strip">
              <div className={selected === "Gastos" ? "highlight" : ""}></div>
              <div
                className={selected === "Cofrinho" ? "highlight" : ""}
              ></div>
              <div className={selected === "Renda" ? "highlight" : ""}></div>
              <div
                className={selected === "Relatórios" ? "highlight" : ""}
              ></div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md="3">
          <div className="boxIcone">
            <Button
              variant="link"
              onClick={() => setSelected("Gastos")}
              className={selected === "Gastos" ? "selected" : ""}
            >
              <FaDollarSign className="icon" />
            </Button>
          </div>
        </Col>
        <Col md="3">
          <div className="boxIcone">
            <Button
              variant="link"
              onClick={() => setSelected("Cofrinho")}
              className={selected === "Cofrinho" ? "selected" : ""}
            >
              <FaPiggyBank className="icon" />
            </Button>
          </div>
        </Col>
        <Col md="3">
          <div className="boxIcone">
            <Button
              variant="link"
              onClick={() => setSelected("Renda")}
              className={selected === "Renda" ? "selected" : ""}
            >
              <FaMoneyBill className="icon" />
            </Button>
          </div>
        </Col>
        <Col md="3">
          <div className="boxIcone">
            <Button
              variant="link"
              onClick={() => setSelected("Relatórios")}
              className={selected === "Relatórios" ? "selected" : ""}
            >
              <BiBarChartAlt className="icon" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
    <Container>
      <hr></hr>
      <Row>
        <Col md="6">
          <Image className="imagem-texto" src={imgAlt}></Image>
        </Col>
        <Col md="6" className="descriptiontexto-container">
          <p className="descriptiontexto">
            Na jornada de construir um futuro financeiramente sólido,
            oferecemos uma plataforma que vai além do simples gerenciamento de
            gastos e renda. Aqui, cultivamos a confiança, a disciplina e a
            liberdade financeira. Permita-nos guiá-lo enquanto você cria um
            amanhã mais seguro e próspero, um centavo de cada vez !
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);
}

export default Home;
