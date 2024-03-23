import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { ListingCard } from "../components/ListingCard";
import { Key } from "react";
import { NoItems } from "../components/NoItem";

async function getData(userId:string)
{
    const data = await prisma?.product.findMany(
        {
            where:{
                userId:userId,
                addedCategory:true,
                addedDescription:true,
                addedLocation:true,

            },
            select:{
                photo:true,
                 id:true,
                  price:true,
                description:true,
                 title:true,
                  
            },orderBy:
            {
                createdAT:"desc",
            },
        }
    );
    return data;
}

export default async function Mylisting() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/");
    }
    const data = await getData(user.id);
    return (
      <section className="container mx-auto px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight">Your listing</h2>
  
        {data.length === 0 ? (
          <NoItems
            description="Please list a hoeme on airbnb so that you can see it right here"
            title="Your dont have any listing listed"
          />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {data.map((item) => (
           <ListingCard key={item.id} 
           imagePath={item.photo as string}
            description={item.description as string}
             title={item.title as string} 
             price={item.price as number} 
             userId={undefined} 
             productId={item.id} 
             pathName="/my-listing"/>
            ))}
          </div>
        )}
      </section>
    );
  }
  