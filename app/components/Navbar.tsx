import Image from "next/image";
import Link from "next/link";
import Desktoplogo from '../../public/crm-desktop.png';
import MobileLogo from '../../public/crm-mobile.png';
import { UserNav } from "./UserNav";



export function Navbar()
 {
    return(
         <nav className="w-full border-b"> 
         <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
         <Link href="/">
          <Image
            src={Desktoplogo}
            alt="Desktop logo"
            className="w-32 hidden lg:block"
            />
              <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-12"
          />
          </Link>
          
            <UserNav/>
          
        </div>
        </nav>
    );
   
 }