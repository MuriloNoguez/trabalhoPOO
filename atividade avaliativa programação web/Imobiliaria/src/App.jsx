import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <header>
      <img src="/Icon.png" alt="" className='img-logo'/>
      <div className='containerH'>
        <h1>Imobiliaria SM</h1>
        <h2>App: Pré-cadastro de inquilinos</h2>
      </div>
    </header>
    <main>
      <form action="">
        <label htmlFor="">Nome do inquilino:</label>
        <input type="text" placeholder='Digite o nome do inquilino'/>
        <label htmlFor="">Salário Atual R$:</label>
        <input type="number" name="salario" id="salario" placeholder='Digite o salário do inquilino'/>
        <label htmlFor="">Imóvel Desejado</label>
        <select name="imovel" id="imovel" >
          <option value="casaResidencial">Casa Residencial</option>
          <option value="casaComercial">Casa Comercial</option>
          <option value="apartamento">Apartamento</option>
          <option value="salaComercial">Sala Comercial</option>
          <option value="loja">Loja</option>
        </select>
       
        <label htmlFor="">Garantias:</label>
        <div className="containerGarantia">
          <div><input type="checkbox" name="fiador" id="fiador" /><span>Fiador</span></div>
          <div><input type="checkbox" name="outroImovel" id="outroImovel" /><span className='espaco'>Outro Imovel</span></div>
          <div><input type="checkbox" name="seguroFianca" id="seguroFianca"/><span className='espaco'>Seguro Fiança</span></div>
          
        </div>
        <div className="containerButao">
        <input type="submit" value="Verificar Situação" className='button1'/>
        <input type="reset" value="Limpar Dados" className='button2'/>
        </div>
      </form>
      <section className='mensagem'>
        <img src="/Icon.png" alt="" className='img-mensagem'/>
        <div className='text'>
          <h3>Mensagem 1</h3>
          <h3>Mensagem 2</h3>
          <h3>Mensagem 3</h3>
        </div>
      </section>
    </main>
    </>
  )
}

export default App
