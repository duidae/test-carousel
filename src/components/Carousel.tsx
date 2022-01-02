import {useState} from "react";
import styled from "styled-components";
import {PhotoData} from "stores";

const CAROUSEL_BACKGROUND_COLOR = "rgb(8, 25, 45)";
const DEFAULT_CAPTION_COLOR = "rgb(242, 242, 242)";
const DEFAULT_BULLET_COLOR = "rgb(113, 113, 113)";

const Container = styled.div`
    padding: 0;
    position: relative;
    overflow: visible;
    touch-action: pan-y;
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

const Slider = styled.ul<{currentSlide: number}>`
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: nowrap;
    list-style-type: none;
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
    transform: translateX(-${props => props.currentSlide * 100}%);
    will-change: transform;
`;

const Slide = styled.li`
    flex: 0 0 100vw;
    height: 100%;
`;

const Index = styled.div`
    font-size: 20px;
    color: ${DEFAULT_CAPTION_COLOR};
    padding: 8px 12px;
    position: absolute;
    top: 0;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Caption = styled.div`
    width: 100%;
    color: ${DEFAULT_CAPTION_COLOR};
    font-size: 20px;
    padding: 0;
    position: absolute;
    bottom: 10%;
    text-align: center;
`;

const Bullets = styled.ul`
    padding: 0;
    list-style-type: none;
    text-align: center;
    width: 100%;
    height: 40px;
`;

const Bullet = styled.li<{isActive: boolean}>`
    width: 0.6em;
    height: 0.6em;
    min-width: 10px;
    min-height: 10px;
    margin: 0 0.8em;
    border-radius: 50%;
    display: inline-block;
    background-color: ${props => (props.isActive ? "white" : DEFAULT_BULLET_COLOR)};
    transition: background-color 0.6s ease;
    overflow: hidden;
    text-indent: 100%;
    cursor: pointer;
`;

interface CarouselProps {
    slides: PhotoData[];
    enableCaption?: boolean;
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
            <Slider currentSlide={currentSlide}>
                <PrevButton title={"上一張"} onClick={onPrevClick} />
                <NextButton title={"下一張"} onClick={onNextClick} />
                {props.slides?.map((slide, index) => {
                    return (
                        <Slide key={index}>
                            {props.enableCaption && (
                                <Index>
                                    {index + 1}/{numSlides}
                                </Index>
                            )}
                            {props.enableCaption && <Caption>{slide.desc ?? ""}</Caption>}
                            <Image src={slide.image} title={slide.desc ?? ""} alt={slide.desc ?? ""} />
                        </Slide>
                    );
                })}
            </Slider>
            <Bullets>
                {props.slides?.map((slide, index) => {
                    return <Bullet isActive={index === currentSlide} key={`bullet-${index}`} title={`第${index + 1}張`} onClick={() => onSlideChange(index)} />;
                })}
            </Bullets>
        </Container>
    );
};
