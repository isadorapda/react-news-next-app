import { draftMode } from "next/headers";
import { redirectToPreviewURL } from "@prismicio/next";
import { createClient } from "../../../../prismicio";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest) {
  const client = createClient();

  draftMode().enable();

  await redirectToPreviewURL({ client, request });
}