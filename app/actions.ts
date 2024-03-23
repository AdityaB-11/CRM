"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";
import path from "path";

export async function createproduct({ userId }: { userId: string }) {
  const data = await prisma.product.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.product.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.product.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const productId = formData.get("productId") as string;
  const data = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${productId}/description`);
}

export async function CreateDescription(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const specs = formData.get("specs") as string;
  const price = formData.get("price");
  const age = formData.get("age");
  const imageFile = formData.get("image") as File;
  const productId = formData.get("productId") as string;

  
  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

  const data = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      title: title,
      description: description,
      specs: specs,
      price: Number(price),
      age: Number(age),
      photo: imageData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${productId}/address`);
}
export async function CreateLocation(formData: FormData) {
    const building = formData.get("building") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const pincode = formData.get("pincode");
    const country = formData.get("country") as string;
    const productId = formData.get("productId") as string;




    const data = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            building: building,
            city: city,
            State: state,
            Country: country,
            pincode: Number(pincode),
            contact: contact,
            addedLocation: true,  
        },
    });

    return redirect("/");
}

export async function createReservation(formData: FormData) {
    const userId = formData.get("userId") as string;
    const productId = formData.get("productId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
  
    const data = await prisma.reservation.create({
      data: {
        userId: userId,
        endDate: endDate,
        startDate: startDate,
        productId: productId,
      },
    });
  
    return redirect("/");
  }


