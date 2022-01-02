import {Carousel} from "./components";
import styled from "styled-components";
import {PHOTO_DATA} from "./stores";
import "./App.css";

const Header = styled.div`
    height: 100px;
`;

const Footer = styled.div`
    height: 100px;
`;

const Body = styled.div`
    height: calc(100vh - 200px);
`;

function App() {
    return (
        <div className="App">
            <Header />
            <Body>
                <Carousel slides={PHOTO_DATA} />
            </Body>
            <Footer />
        </div>
    );
}

export default App;
