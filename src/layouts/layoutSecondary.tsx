import HeaderSecondary from "~/layouts/headerSecondary"
import FooterMain from "~/layouts/footerMain"
const LayoutSecondary = ({ children }: React.PropsWithChildren) => {
    return <>

        <HeaderSecondary />
        <div className="grid content-center justify-center justify-items-center lg:grid-cols-2 xl:grid-cols-3">
            {children}
        </div>
        <FooterMain />
    </>
}
export default LayoutSecondary