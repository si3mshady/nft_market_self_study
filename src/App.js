import NavBar from './components/Navbar/Navbar'
import SideBar from './components/SideBar/Sidebar'
import MainContent from './components/MainContent/MainContent'
import NewMarketItem from './components/NewMarketItem/NewMarketItem'

import './App.css';

function App() {
  return (
    <>

    
    <NavBar />
    <div className='container'> 

    <SideBar />

    {/* <MainContent /> */}
    <NewMarketItem/>
    
    
    </div>
    </>
  );
}

export default App;


//todo - make
