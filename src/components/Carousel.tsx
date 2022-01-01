import {useState} from "react";
import styled from "styled-components";
import {PhotoData} from "stores";

const CAROUSEL_BACKGROUND_COLOR = "rgb(8, 25, 45)";
const DEFAULT_BULLET_COLOR = "rgb(190, 192, 188)";

const Container = styled.div`
    padding: 0;
    position: relative;
    background-color: ${CAROUSEL_BACKGROUND_COLOR};
`;

const Button = styled.div`
    width: 43px;
    height: 43px;
    opacity: 0.75;
    outline: none;
    padding: 0;
    margin: 0 1em;
    border: 0;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;

const PrevButton = styled(Button)`
    left: 0;
    background-image: url("assets/prev.svg");
`;

const NextButton = styled(Button)`
    right: 0;
    background-image: url("assets/next.svg");
`;

const Slider = styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: nowrap;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
`;

const Slide = styled.li``;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Bullets = styled.ul`
    padding: 0;
    list-style-type: none;
    text-align: center;
    width: 100%;
    height: 40px;
`;

const Bullet = styled.li<{isActive: boolean}>`
    display: inline-block;
    background-color: ${props => (props.isActive ? "white" : DEFAULT_BULLET_COLOR)};
    min-width: 10px;
    min-height: 10px;
    width: 0.6em;
    height: 0.6em;
    margin: 0 0.8em;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    text-indent: 100%;
`;

interface CarouselProps {
    slides: PhotoData[];
}

export const Carousel = (props: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const numSlides = props.slides?.length;

    if (!Array.isArray(props.slides) || numSlides <= 0) {
        return null;
    }

    const onPrevClick = () => {
        setCurrentSlide(currentSlide === 0 ? numSlides - 1 : currentSlide - 1);
    };

    const onNextClick = () => {
        setCurrentSlide(currentSlide === numSlides - 1 ? 0 : currentSlide + 1);
    };

    const onSlideChange = (index: number) => {
        if (index >= 0 && index < numSlides) {
            setCurrentSlide(index);
        }
    };

    return (
        <Container>
            <Slider>
                <PrevButton title={"上一張"} onClick={onPrevClick} />
                <NextButton title={"下一張"} onClick={onNextClick} />
                {props.slides?.map((slide, index) => {
                    return <Slide key={index}>{slide && index === currentSlide && <Image src={slide.image} title={slide.desc} alt={slide.desc} />}</Slide>;
                })}
            </Slider>
            {numSlides > 0 && (
                <Bullets>
                    {props.slides?.map((slide, index) => {
                        return <Bullet isActive={index === currentSlide} key={`bullet-${index}`} title={`第${index + 1}張`} onClick={() => onSlideChange(index)} />;
                    })}
                </Bullets>
            )}
        </Container>
    );
};
