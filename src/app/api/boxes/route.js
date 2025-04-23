import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req) {
  const formData = await req.formData();
  const boxName = formData.get("box_name");
  const orderid = formData.get("orderid");
  const imageFile = formData.get("image");

  const fileExt = imageFile.name.split(".").pop();
  const filePath = `${uuidv4()}.${fileExt}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("box-images")
    .upload(filePath, imageFile);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/box-images/${filePath}`;

  const { error: insertError } = await supabase.from("box").insert({
    box_name: boxName,
    orderid: orderid,
    image: imageUrl,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
