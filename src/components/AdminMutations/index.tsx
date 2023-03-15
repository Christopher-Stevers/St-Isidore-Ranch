
import React, {useState} from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
const AdminMutations: React.FC = () => {
const {data: productClasses, refetch} = api.productClass.getProductClasses.useQuery( )

type ProductClass = {
	name: string,
	id: string ,
}
const [localProductClass, updateLocalProductClass] = useState("")
	const { data: sessionData } = useSession();

	type TextInput ={
		text : string,
	}
	const [productClass, updateProductClass] = useState<TextInput>({text : ''});

	const setLocalProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateLocalProductClass(e.target.value)
	}
const {mutate:addProductClass} = api.productClass.addProductClass.useMutation( {
	onSuccess : async() => {
		if (typeof refetch === 'function'){
		await refetch()}
	}
})
	  const {mutate:addProductsToClass} = api.product.addProductsToClass.useMutation( {
		onSuccess :  async() => {
			if (typeof refetch === 'function'){
			await refetch()}
		}
	})

const handleAddProductClass = () => {

	addProductClass({text: localProductClass})
	  }
	  const handleAddProductsToClass = (productClass:ProductClass)=>{
		addProductsToClass({productClassId: productClass.id, count: parseInt(localProductClass) })
	  }
	  
	  const {mutate:removeProductClass} = api.productClass.removeProductClass.useMutation( {
		onSuccess :  async() => {
			if (typeof refetch === 'function'){
			await refetch()}
		}
	})

	return (

	  <div className="flex flex-col items-center justify-center gap-4">
		<p className="text-center text-2xl text-white">
		  {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
		</p>
		<div>{productClasses?.map((productClass: ProductClass)=><div className="border-green-500 border-3 p-4 rounded-sm flex gap-4 bg-white" key={productClass.id}>{productClass.name}
		{" "}Add products
		<input onChange={setLocalProductCount} className=" h-4  bg-blue-500" type="number" />
		<button onClick={()=>handleAddProductsToClass(productClass)}>Create Products</button>
		<button onClick={()=>removeProductClass({id:productClass.id})} className="text-red-500 font-bold">x</button>
		</div>)}
	
		</div>
		<input onChange = {(e)=>updateProductClass({text: e.target.value})} />
		<button onClick={ handleAddProductClass}>update productClass</button>
		<button
		  className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
		  onClick={sessionData ? () => void signOut() : () => void signIn()}
		>
		  {sessionData ? "Sign out" : "Sign in"}
		</button>
	  </div>
	);
  };

  export default AdminMutations;
  