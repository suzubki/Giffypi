// importación del componente Gif
import { Gifs } from "./routes/gifs";
import {Title} from './components/Title';
// import Search from "./components/Search";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";  

function App() {
  return (
    <div className="vh-100 bg-dark">
      <Title />
      <Gifs />
    </div>
  );
}

export default App;
