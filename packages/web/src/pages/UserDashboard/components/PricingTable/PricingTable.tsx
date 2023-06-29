import React from "react";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";

export namespace PricingTable {
  export type Props = {
    user: GetUserRequest.Response | null;
  };
}

export function PricingTable({ user }: PricingTable.Props) {
  return (
    <div className={"personaverse-pricing-table"}>
      {user?.id && (
        <stripe-pricing-table
          className="some-class"
          client-reference-id={user.id}
          pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
          publishable-key={process.env.REACT_APP_PRICING_TABLE_KEY}
        ></stripe-pricing-table>
      )}
    </div>
  );
}
