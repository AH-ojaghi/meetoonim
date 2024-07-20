import React from "react";
import ProfileLinks from "./ProfileLinks";
import WalletBalance from "./WalletBalance";

export default function AdvertisingCard() {
  return (
    <div className="hidden md:flex w-[279.5px]  ml-4 lgs:mx-0 rounded-lg">
      <div className="fixed bg-white rounded-lg border border-slate-200 w-[279.5px] -z-10  flex-col">
        <ProfileLinks />
        <WalletBalance />
      </div>
    </div>
  );
}
