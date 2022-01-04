import {useEffect, useState} from "react";
import styled from "styled-components";
import {PhotoData} from "stores";

const CAROUSEL_BACKGROUND_COLOR = "rgb(8, 25, 45)";
const DEFAULT_BULLET_COLOR = "rgb(113, 113, 113)";
const BULLET_HEIGHT = 60;
const DEFALUT_PLAY_INTERVAL = 3000;

const Container = styled.div`
    height: 100%;
    background-color: ${CAROUSEL_BACKGROUND_COLOR};
`;

const Slider = styled.div`
    height: calc(100% - ${BULLET_HEIGHT}px);
    padding: 0;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    touch-action: pan-y;
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

const Slides = styled.ul<{currentSlide: number}>`
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

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Bullets = styled.ul`
    margin: 0;
    padding-left: 0;
    padding-top: 20px;
    list-style-type: none;
    text-align: center;
    width: 100%;
    height: ${BULLET_HEIGHT}px;
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
    index?: number;
    autoPlay?: boolean;
    playInterval?: number;
}

export const Carousel = (props: CarouselProps) => {
    const numSlides: number = props.slides?.length;
    const initSlide: number = props.index !== undefined && Number.isInteger(props.index) && props.index >= 0 && props.index < numSlides ? props.index : 0;
    const [currentSlide, setCurrentSlide] = useState(initSlide);

    // Auto play for slides
    useEffect(() => {
        if (!props.autoPlay) {
            return;
        }
        const interval = setInterval(() => {
            setCurrentSlide(currentSlide => (currentSlide === numSlides - 1 ? 0 : currentSlide + 1));
        }, props.playInterval ?? DEFALUT_PLAY_INTERVAL);

        return () => {
            clearInterval(interval);
        };
    }, [props.autoPlay, props.playInterval, numSlides]);

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
                <Slides currentSlide={currentSlide}>
                    {props.slides?.map((slide, index) => {
                        return (
                            <Slide key={index}>
                                <a href={slide.link} target="_blank" rel="noreferrer">
                                    <Image src={slide.image} title={slide.desc ?? ""} alt={slide.desc ?? ""} />
                                </a>
                            </Slide>
                        );
                    })}
                </Slides>
                <PrevButton title={"上一張"} onClick={onPrevClick} />
                <NextButton title={"下一張"} onClick={onNextClick} />
            </Slider>
            <Bullets>
                {props.slides?.map((slide, index) => {
                    return <Bullet isActive={index === currentSlide} key={`bullet-${index}`} title={`第${index + 1}張`} onClick={() => onSlideChange(index)} />;
                })}
            </Bullets>
        </Container>
    );
};
