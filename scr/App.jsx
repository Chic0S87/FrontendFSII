import CadCidades from "./telas/CadCidade"
import TelaCadPessoa from "./telas/CadPessoa"
import CadProdutos from "./telas/CadProduto"
import CadCategoria from "./telas/CadCategoriaProduto"
import TelaMenu from "./telas/TelaMenu"
import Tela404 from "./telas/Tela404"

import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
    return (    
      <div>
       <BrowserRouter>
          <Routes>
            <Route path="/cadastroPessoa" element={<TelaCadPessoa/>}/>     
            <Route path="/cadastroCidade" element={<CadCidades/>}/> 
            <Route path="/cadastroProduto" element={<CadProdutos/>}/>
            <Route path="/cadastroCategoria" element={<CadCategoria/>}/>
            <Route path="/" element={<TelaMenu/>}/>
            <Route path="*" element={<Tela404/>}/>
          </Routes>
        </BrowserRouter>
      </div>    
    
  )
}
export default App

