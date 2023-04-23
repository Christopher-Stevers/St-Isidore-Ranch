import HeaderSecondary from "~/layouts/headerSecondary"
import FooterMain from "~/layouts/footerMain"
const LayoutSecondary = ({children}:React.PropsWithChildren)=>{
    return <>
    
    <HeaderSecondary/>
    <div className="grid content-center justify-center">
    {children}
    </div>
    <FooterMain/>
    </>
}
export default LayoutSecondary