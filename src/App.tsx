import {CarouselComponent} from "./components";
import {PHOTO_DATA} from "./stores";
import "./App.css";

function App() {
    return (
        <div className="App">
            <CarouselComponent slides={PHOTO_DATA} />
        </div>
    );
}

export default App;
