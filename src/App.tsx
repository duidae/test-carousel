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

const CarouselContainer = styled.div`
    height: calc(100vh - 200px);
`;

function App() {
    return (
        <div className="App">
            <Header />
            <CarouselContainer>
                <Carousel slides={PHOTO_DATA} />
            </CarouselContainer>
            <Footer />
        </div>
    );
}

export default App;
