import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItem";
import { ListingCard } from "../components/ListingCard";
import prisma from "../lib/db";

async function getData(userId: string) {
   
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Product: {
        select: {
          id: true,
          title:true,
          photo: true,
          description: true,
          price: true,
           
          },
        },
      },
    },
  );

  return data;
}

export default async function MyBorrowingRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/");
    }
    const data = await getData(user.id);
    return (
      <section className="container mx-auto px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight">Products you rented</h2>
  
        {data.length === 0 ? (
          <NoItems
            description="Please list a hoeme on airbnb so that you can see it right here"
            title="Your dont have any listing listed"
          />
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
            {data.map((item) => (
              <ListingCard
                key={item.Product?.id}  
                imagePath={item.Product?.photo as string}
                description={item.Product?.description as string}
                title={item.Product?.title as string}
                price={item.Product?.price as number}
                userId={undefined}
                productId={item.Product?.id} 
                pathName="/my-listing"
              />
            ))}
          </div>
        )}
      </section>
    );
  }