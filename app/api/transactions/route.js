import { NextResponse } from "next/server";
import { mxClient } from "../mxConfig";

export async function POST(req) {
  const body = await req.json();
  try {
    const { data } = await mxClient.listTransactionsByMember(
      body.memberGuid,
      body.userGuid
    );
    console.log({ data });
    return NextResponse.json(data);
  } catch (e) {
    throw e;
  }
}
