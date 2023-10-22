import {
  type Address,
  type Product,
  type PrismaClient,
} from "@prisma/client";

const getProductClassOfItemById = async (
  prisma: PrismaClient,
  id: string,
) => {
  const productClass = await prisma.productClass.findUnique(
    {
      where: {
        id: id,
      },
    },
  );
  return productClass?.name;
};

export const htmlMessageTemplate = async (
  order: {
    id: string;
    address: Address | null;
    totalPrice: number;
    boxes: { title: string }[];
  },
  id: string,
  items: Product[],
  prismaClient: PrismaClient,
) => {
  return `<p>New order with id ${
    order?.id
  } and payment intent ${id} has been payed for total of ${
    order.totalPrice
  }
               </p>
               <p>Order is for boxes:</p>
               <ul>
               
               ${order?.boxes?.map((box) => {
                 return `<li> ${box.title} </li>`;
               })}
               </ul>
               
         <p>contents are</p>
         
         <ul>
         
         ${await Promise.all(
           items?.map(async (item) => {
             return `<li> ${await getProductClassOfItemById(
               prismaClient,
               item.productClassId,
             )} </li>`;
           }),
         )}
         </ul>
         <p>
                address is:
                <p>${order.address?.address1}</p><p>${
    order.address?.address2
  }</p>
                 <p>${order.address?.postalCode}</p><p>${
    order.address?.city
  }</p><p>${order.address?.name}</p>
                .`;
};
