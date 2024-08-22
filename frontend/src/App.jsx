import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Sigin from './components/Sigin';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';

const App = ()=>{
  return (
    <>
       <BrowserRouter>
         <Routes>
             <Route path="/signup" element={<Signup/>} />
             <Route path='/sigin'  element={<Sigin/>} />
             <Route path='/dashboard' element={<Dashboard/> } />
             <Route path='/send' element={<SendMoney/>} />
         </Routes>
       </BrowserRouter>
    </>
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App/>);