import './App.css';
import OptionsMenu from '../src/components/OptionsMenu'
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="wrapper">
        <div className="container">
            <OptionsMenu/>
            <MainContent/>
        </div>

    </div>
  );
}

export default App;
