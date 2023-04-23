
import Link from "next/link";
export type NavlinkType = {
    className: string | undefined;
    name: string;
    href: string|undefined
}
const Navlink = ({className, name, href}:NavlinkType)=>{
    const activeHref= href ||`/${name}`
    return <Link href={activeHref} className={`text-amber-50 mx-4 ${className}`}>

        {name}
    </Link>
}
export default Navlink