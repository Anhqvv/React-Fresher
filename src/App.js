import './App.scss';
import Header from './components/Header';
import TableUser from './components/TableUser';
import Toastify from './components/Toastify';

function App () {
    return (
        <>
            <div className="app-container">
                <Header />
                <TableUser />
            </div>
            <Toastify />
        </>
    );
}

export default App;
