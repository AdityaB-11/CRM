import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link"; 
import { createproduct } from "../actions";

export async function UserNav()
{
  const{getUser}= getKindeServerSession();
  const user =await getUser()

  const createproductwithId =createproduct.bind(null,{
    userId:user?.id as string,
  });
    return(
         <DropdownMenu>
            <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

          <img
            src={
              user?.picture ??
              "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt="Image of the user"
            className="rounded-full h-8 w-8 hidden lg:block"
          />
        </div>  
            </DropdownMenuTrigger>
            <DropdownMenuContent 
            align="end" className="w-[200px]">
              {user?(
            <>
             <DropdownMenuItem>
              <form action={createproductwithId} className="w-full">
                <button type="submit" className="w-full text-start">
                  List your Product
                </button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-listing" className="w-full">
                My Listed Products
              </Link>
            </DropdownMenuItem>
             
            <DropdownMenuItem>
              <Link href="/borrowings"  className="w-full">
                My Borrowed Products
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/aadhar"  className="w-full">
                Auth aadhar 
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutLink className="w-full">Logout</LogoutLink>
            </DropdownMenuItem>                                         
            </>
              ):(
                <>  
                <DropdownMenuItem>
                <RegisterLink className="w-full">Register</RegisterLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LoginLink className="w-full">Login</LoginLink>
              </DropdownMenuItem>
              </>
              )}
            </DropdownMenuContent>
         </DropdownMenu>
    )
}