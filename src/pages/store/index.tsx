import LayoutMain from "~/layouts/layoutMain";

export default function Page() {
  return (
    <LayoutMain>
      <div>
        <h1 className="bg-red-500">Hello, Next.js!</h1>;
        <a href="https://www.dreamstime.com/angus-bull-grazing-negative-space-low-angle-view-lush-springtime-pasture-image214368614">
          214368614
        </a>{" "}
        /{" "}
        <a href="https://www.dreamstime.com/photos-images/grazing-cattle-angus.html">
          Grazing Cattle Angus
        </a>{" "}
        © <a href="https://www.dreamstime.com/jackienix_info">Jacqueline Nix</a>{" "}
        | <a href="https://www.dreamstime.com/stock-photos">Dreamstime.com</a>
      </div>
    </LayoutMain>
  );
}
