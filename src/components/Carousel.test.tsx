import renderer from "react-test-renderer";
import {Carousel} from "components";
import {PHOTO_DATA} from "stores";

test("Carousel", () => {
    const tree = renderer.create(<Carousel slides={PHOTO_DATA} />);
    expect(tree).toMatchSnapshot();
});
