import { useRouter } from "next/router";

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  return <div>Product: {productId}</div>;
};
export default ProductPage;
