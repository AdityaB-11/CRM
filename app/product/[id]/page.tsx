import { createReservation } from "@/app/actions";
import { CaegoryShowcase } from "@/app/components/CategoryShowcase";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  noStore();
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      photo: true,
      description: true, 
      title: true,
      categoryName: true,
      price: true,
      age:true,
      contact:true,
      specs:true,
      building:true,
      city:true,
      State:true,
      Country:true,
      pincode:true,

       
      Reservation: {
        where: {
          productId: productId,
        },
      },

      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function ProductRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  
  
   
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <div className="relative h-[550px]">
        <Image
          alt="Image of Product"
          src={`https://pcxwstpgqgohsryrdtyr.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
             {data?.title}
          </h3>
          <h2 className="text-l font-medium">
          ₹{data?.price}/Day
          </h2>
          <Separator className="my-7" />
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.specs}</p>
          </div>
          <Separator className="my-7" />
          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Contact Details: {data?.contact}</p>
            </div>
          </div>

          <Separator className="my-7" />

          <CaegoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <h3 className="font-medium">How old is the product?</ h3>
          <p className="text-muted-foreground">{data?.age} months</p>
          

          <Separator className="my-7" />
          <h3 className="font-medium">Description:</h3>
          <p className="text-muted-foreground">{data?.description}</p>
          
          <Separator className="my-7" />
          <h3 className="font-medium">Address:</h3>
          <p className="text-muted-foreground">{data?.building} {data?.city} {data?.pincode} </p>
          <p className="text-muted-foreground mb-4">{data?.State} {data?.Country}</p>
          <Button className="w-full" asChild>
                    <Link href="https://www.google.co.in/maps/search/${}" target="_blank">Open on the map</Link>
                </Button>
                <Separator className="my-7" />
                <h3 className="font-medium">Penalty(if due date Exceeded):</h3>
                <h3 className="font-medium">50% extra of the original rent</h3>
        </div>

        <form action={createReservation}>
            <input type="hidden" name="productId" value={params.id} />
            <input type="hidden" name="userId" value={user?.id} />
              
            <SelectCalender reservation={data?.Reservation} />

            {user?.id ? (
                <ReservationSubmitButton />
            ) : (
                <Button className="w-full" asChild>
                    <Link href="/api/auth/login">Make a Reservation</Link>
                </Button>
            )}
        </form>
      </div>
    </div>
  );
}
