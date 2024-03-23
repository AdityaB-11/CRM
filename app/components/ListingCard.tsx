
import Image from "next/image";
import Link from "next/link";
 
interface iAppProps {
    imagePath: string;
    description: string;
    title:string;
    price: number;
    userId: string | undefined;
    productId: string;
    pathName: string;
  }

export function ListingCard({
    description,
    imagePath,
    title,
    price,
    userId, 
    productId,
    pathName,
  }: iAppProps)
{
    return(
        <div className="flex flex-col">
      <div className="relative h-72">
      <Image
          src={`https://pcxwstpgqgohsryrdtyr.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of Product"
          fill
          className="rounded-lg h-full object-cover"
        />
        </div>
        <Link href={`/product/${productId}`} className="mt-2">
        <h3 className="font-medium text-base">
           {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">₹{price}</span> Day
        </p>
      </Link>
        </div>
        
    );
}