import { CreateLocation } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AddressRoute({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Enter the Address Details!
        </h2>
      </div>

      <form action={CreateLocation} >
        <input type="hidden" name="productId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
           
            <div className="flex flex-col gap-y-2">
           <Label>Buidling Details</Label>
            <Input
              name="building"
              type="text"
              required
              placeholder="building,street,landmark etc"
            />
           </div>
           
           <div className="flex flex-col gap-y-2">
           <Label>City</Label>
            <Input
              name="city"
              type="text"
              required
              placeholder="Enter your city"
            />
           </div>
           
           <div className="flex flex-col gap-y-2">
            <Label>State</Label>
            <Input
              name="state"
              type="text"
              required
              placeholder="Enter your domestic state.."
            />
           </div>
          <div className="flex flex-col gap-y-2">
            <Label>Country</Label>
            <Input
              name="country"
              type="text"
              required
              placeholder="Your country"
            />
           </div>
           
           
           
           
          <div className="flex flex-col gap-y-2">
            <Label>Contact_No</Label>
            <Input
              name="contact"
              type="number"
              required
              placeholder="Phone or mobile no."
              minLength={10}
              maxLength={10}  
            />
          </div>
          

          <div className="flex flex-col gap-y-2">
            <Label>Pincode</Label>
            <Input
              name="pincode"
              type="number"
              required
              placeholder="Enter your pincode"
              min={0}
            />
          </div>
        </div>
    

        <CreatioBottomBar />
      </form>
    </>
  );
}
