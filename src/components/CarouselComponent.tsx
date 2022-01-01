import {useState} from "react";
import styled from "styled-components";
import {PhotoData} from "stores";

const Slider = styled.div`
    position: relative;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
`;

const Slide = styled.div``;

const Button = styled.div`
    background-color: transparent;
    border: 0;
    cursor: pointer;
    height: 43px;
    opacity: 0.75;
    outline: none;
    padding: 0;
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 0 1em;
    top: 50%;
    transform: translateY(-50%);
    width: 43px;
`;

const PrevButton = styled(Button)`
    left: 0;
    background-image: url("assets/prev.svg");
`;

const NextButton = styled(Button)`
    right: 0;
    background-image: url("assets/next.svg");
`;

const Bullets = styled.ul`
    padding: 0;
    list-style-type: none;
    text-align: center;
    width: 100%;
    margin: 80px auto 100px auto;
`;

const Bullet = styled.li<{isActive: boolean}>`
    display: inline-block;
    background-color: ${props => (props.isActive ? "white" : "#BEC0BC")};
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

interface CarouselComponentProps {
    slides: PhotoData[];
}

const Carousel = (props: CarouselComponentProps) => {
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

    const onChangeSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <Slider>
            <PrevButton title={"上一張"} onClick={onPrevClick} />
            <NextButton title={"下一張"} onClick={onNextClick} />
            {props.slides?.map((slide, index) => {
                return <Slide key={index}>{slide && index === currentSlide && <img src={slide.image} title={slide.desc} alt={slide.desc} className="image" />}</Slide>;
            })}
            {numSlides > 0 && (
                <Bullets>
                    {props.slides?.map((slide, index) => {
                        return <Bullet isActive={index === currentSlide} key={`bullet-${index}`} title={`第${index + 1}張`} onClick={() => onChangeSlide(index)} />;
                    })}
                </Bullets>
            )}
        </Slider>
    );
};

export const CarouselComponent = Carousel;
