import React from "react";
import StoreInfo from "./StoreInfo";
import UpgradeAccount from "./UpgradeAccount";

export default function PageInformation() {
  return (
    <div className="hidden lg:flex w-[237.5px] xl:w-[280px] lgs:mx-0 rounded-lg ">
      <div className="fixed bg-white rounded-lg w-[237.5px] xl:w-[280px] flex-col border-2 border-slate-200">
        <StoreInfo />
      </div>
      <UpgradeAccount />
    </div>
  );
}
