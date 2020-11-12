import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";

function App() {
    window.basketVisible = "hidden"

  return (
    <div className="App">
        <Menu/>
    </div>
  );
}

export default App;
