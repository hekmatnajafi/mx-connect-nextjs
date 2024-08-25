"use client";

import axios from "axios";
import { useState } from "react";
import MXConnectWidget from "./connectWidget";
import Balance from "./balances";

export default function Components() {
  const [connectWidgetUrl, setConnectWidgetUrl] = useState();
  const [userGuid, setUserGuid] = useState();
  const [memberGuid, setMemberGuid] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleGetUrl = async () => {
    const { data } = await axios.post("/api/connect", {});
    console.log({ data });
    setConnectWidgetUrl(data?.widget_url?.url);
  };
  console.log({ userGuid, memberGuid });
  return (
    <div>
      <div className="flex gap-5 items-center justify-center">
        <button
          className="p-2 bg-green-500 text-white rounded-lg"
          onClick={handleGetUrl}
        >
          connect
        </button>
        <Balance />
      </div>
      {connectWidgetUrl && (
        <div>
          <table className="guid-table mt-48 mb-48 border">
            <tbody>
              <tr>
                <td>Test Bank</td>
                <td>MX Bank, MX Bank (OAuth)</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>mxuser</td>
              </tr>
              <tr>
                <td>password</td>
                <td>
                  correct, challenge, options, image,{" "}
                  <a
                    href="https://docs.mx.com/api/guides/testing#test_credentials"
                    target="_blank"
                    rel="noreferrer"
                  >
                    see docs for more scenarios
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <MXConnectWidget
            widgetUrl={connectWidgetUrl}
            onEvent={(event) => {
              console.log("MX PostMessage: ", event);
              if (event.type === "mx/connect/memberConnected") {
                setUserGuid(event.metadata.user_guid);
                setMemberGuid(event.metadata.member_guid);
              } else if (event.type === "mx/connect/loaded") {
                setIsLoading(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
