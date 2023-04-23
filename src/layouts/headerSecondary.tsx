import Monogram from "~/components/Monogram"
import NavLink from "~/components/NavLink"
const headerSecondary = ()=>{

    return<div className="w-full p-4 flex content-center items-center bg-primary-500">

       <Monogram />
       <NavLink  name="Home" className={undefined} href={undefined}/>
       <NavLink  name="Blog" className={undefined} href={undefined}/>
       <NavLink  name="Vidoes" className={undefined} href={undefined}/>
  
    </div>
}
export default headerSecondary;