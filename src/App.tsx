import {Carousel} from "./components";
import styled from "styled-components";
import {PHOTO_DATA} from "./stores";
import "./App.css";

const Header = styled.div`
    height: 100px;
    background-color: black;
`;

const Footer = styled.div`
    height: 100px;
    background-color: black;
`;

function App() {
    return (
        <div className="App">
            <Header />
            <div className="Carousel">
                <Carousel slides={PHOTO_DATA} enableCaption={true} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
