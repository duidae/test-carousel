import {Carousel, Header} from "./components";
import {PHOTO_DATA} from "./stores";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Carousel slides={PHOTO_DATA} enableCaption={true} />
        </div>
    );
}

export default App;
