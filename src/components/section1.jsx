import { useState, useRef } from "react";
import "../styles/section1.scss";
export function Section1() {
  //---------------SearchCep------------------------------------->
  const cepInput = useRef(null);
  const [value, newValue] = useState("");
  const [endereço, setEndereço] = useState();
  async function cepRespost() {
    let valor = await fetch(`https://viacep.com.br/ws/${value}/json/`).catch(
      () => {
        [alert("digite o cep corretamente")];
      }
    );
    return await valor.json();
  }
  async function searchCep() {
    let bodyParse = await cepRespost();
    setEndereço(bodyParse);
    cepInput.current.focus();

    //hooks
  }

  function removeValues() {
    setEndereço(null);
    cepInput.current.focus();
  }
  //-------------------------------------------------------->
  const [valueName, newValueName] = useState("");
  const [dadosGit, setDadosGit] = useState();

  async function resultSearchPersonGit() {
    let result;
    if (valueName.length <= 3) {
      alert("digite seu usuário corretamente");
    } else {
      result = await fetch(`https://api.github.com/users/${valueName}`);
      return result.json();
    }

    return await result.json();
  }
  async function searchPersonGit() {
    let bodyParserPerson = await resultSearchPersonGit();
    setDadosGit(bodyParserPerson);
    console.log(dadosGit);
  }

  return (
    <section>
      <h2>
        Primeiro começaremos consultando uma que dirá onde você está de acordo
        com o seu cep
      </h2>
      <form action="">
        <label htmlFor=" InpCep">Digite seu Cep abaixo</label>
        <input
          type="number"
          name="valueCep"
          id="InpCep"
          placeholder="Digite seu cep"
          ref={cepInput}
          onChange={(e) => newValue(e.target.value)}
        />
        <button className="btnConsultaCep" type="button" onClick={searchCep}>
          pesquisar cep
        </button>
        {endereço && (
          <>
            <p className="pDadosCep" id="pCep">
              Uf: {endereço.uf === "" ? "não encontrado" : endereço.uf}
              <br />
              ddd:{endereço.ddd === "" ? "não encontrado" : endereço.ddd}
              <br />
              cidade:
              {endereço.localidade === ""
                ? "não encontrado"
                : endereço.localidade}
              <br />
              bairro:
              {endereço.bairro === "" ? "não encontrado" : endereço.bairro}
              <br />
              ibge: {endereço.ibge === "" ? "não encontrado" : endereço.ibge}
            </p>
            <button
              type="button"
              className="btnApagar"
              id="btnDelet"
              onClick={removeValues}
            >
              apagar
            </button>
          </>
        )}
      </form>
      <h2>Agora veremos ver alguns dados do seu Github...</h2>
      <form action="/">
        <label htmlFor="inpGit">Digite seu usuário abaixo</label>
        <input
          type="text"
          placeholder="digite seu usuário"
          onChange={(e) => newValueName(e.target.value)}
        />
        <button
          type="button"
          className="btnConsultaCep"
          onClick={searchPersonGit}
        >
          Pesquisar
        </button>
        {dadosGit && (
          <>
            <p>
              seu nome : {dadosGit.name}
              <br />
              <br />
              seu perfil abaixo :
              <br />
              <img src={dadosGit.avatar_url} alt="perfil" />
              <br />
              <br />
              Sua bio : {dadosGit.bio}
              <br />
              <br />
              sua localização : {dadosGit.location}
              <br />
              <br />
              seguidores : {dadosGit.followers}
              <br />
              <br />
              seguindo : {dadosGit.following}
            </p>
          </>
        )}
      </form>
    </section>
  );
}
