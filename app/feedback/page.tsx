import {  createFeedback } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FeedbackPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
         Whats wrong with the product?
        </h2>
      </div>

      <form action={createFeedback}>
        <input type="hidden" name="productId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          
          
          <div className="flex flex-col gap-y-2">
            <Label>Mention you complaint here:</Label>
            <Textarea
              name="description"
              required
              placeholder="explain the complaint"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>contact details</Label>
            <Textarea
              name="specs"
              required
              placeholder="Where can we contact you?"
            />
          </div>
          
          <div className="flex flex-col gap-y-2">
            <Label>Image1</Label>
            <Input name="image" type="file" required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image2</Label>
            <Input name="image" type="file" required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image3</Label>
            <Input name="image" type="file" required />
          </div>


          
        </div>

        <CreatioBottomBar />
      </form>
    </>
  );
}
