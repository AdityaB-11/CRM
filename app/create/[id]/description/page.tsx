import { CreateDescription } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your Product!
        </h2>
      </div>

      <form action={CreateDescription}>
        <input type="hidden" name="productId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Describe the product in details"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>specs</Label>
            <Textarea
              name="specs"
              required
              placeholder="Mention specs or Size of the product"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Age</Label>
            <Input
              name="age"
              type="number"
              required
              placeholder="How old is your product (months)"
              min={0}
            />
          </div>
          

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="Price per Day in INR"
              min={10}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          
        </div>

        <CreatioBottomBar />
      </form>
    </>
  );
}
