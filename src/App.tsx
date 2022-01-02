import {Carousel} from "./components";
import {PHOTO_DATA} from "./stores";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Carousel slides={PHOTO_DATA} showCaption={true} />
        </div>
    );
}

export default App;
