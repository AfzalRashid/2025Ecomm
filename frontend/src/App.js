import Header from './components/Header'
import Footer from './components/Footer';
import Home from './pages/Home'
import { Outlet } from 'react-router-dom';
const App = () => {
  return <>
    <Header />
    <main className="py-3">
      <div className="container">
        <h1>Welcome to MyShop</h1>
        <Outlet/>
      </div>
    </main>
    <Footer/>
  </>;
}

export default App;
