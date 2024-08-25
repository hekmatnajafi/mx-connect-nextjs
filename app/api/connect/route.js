import { NextResponse } from "next/server";
import { mxClient } from "../mxConfig";

export async function POST(req) {
  const body = await req.json();
  let { userGuid } = body;
  if (userGuid == null) {
    const createUserRequestBody = {
      user: {
        id: body.user_id ? body.user_id : null,
      },
    };
    const createUserResponse = await mxClient.createUser(createUserRequestBody);
    userGuid = createUserResponse.data.user.guid;
  }

  const widgetRequestBody = {
    widget_url: {
      include_transactions: true,
      is_mobile_webview: false,
      mode: "verification",
      ui_message_version: 4,
      widget_type: "connect_widget",
    },
  };

  const { data } = await mxClient.requestWidgetURL(userGuid, widgetRequestBody);
  return NextResponse.json(data);
}
