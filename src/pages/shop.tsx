import LayoutSecondary from "~/layouts/layoutSecondary";
import ProductCard from "~/components/ProductCard";

export default function Page() {
  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquet nisl, eget aliquam nunc justo eget nisl. N`;
  const defaultProps = {
    direction: "left",
    title: "Title",
    text: loremIpsum,
    src: "/unnamed.jpg",
    video: "https://www.youtube.com/embed/lIkwIEXWx8c",
  };

  const productCardsProps = [defaultProps, defaultProps, defaultProps];

  return (
    <LayoutSecondary>
      {productCardsProps.map((props, index) => {
        const { title, text, src } = props;
        const direction = index % 2 === 0 ? "left" : "right";
        return (
          <ProductCard
            key={title}
            direction={direction}
            title={title}
            text={text}
            src={src}
          />
        );
      })}
    </LayoutSecondary>
  );
}
