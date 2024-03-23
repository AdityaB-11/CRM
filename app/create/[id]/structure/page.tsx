import { createCategoryPage } from "@/app/actions";
import { CreatioBottomBar } from "@/app/components/CreationBottomBar";
import { SelectedCategory } from "@/app/components/SelectedCategory";

 

export default function StrucutreRoute({params}:{params:{id:String}}) {
    return (
        <>
            <div className="w-3/5 mx-auto">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                 Select the Appropriate Category for your Product:
                </h2>
            </div>
            <form action={createCategoryPage}>
        <input type="hidden" name="productId" value={params.id.toString()} />
        <SelectedCategory />

        <CreatioBottomBar />
      </form>
                </>
    );
}
