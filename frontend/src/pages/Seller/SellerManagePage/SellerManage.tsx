import React from "react";
import ManageItem from "../../../components/Seller/ManageItem";
import ChangeTime from "../../../components/Seller/ChangeTime";
import SetHoliday from "../../../components/Seller/SetHoliday";
export default function SellerManagePage() {
  return (
    <div>
      <ManageItem />
      <ChangeTime />
      <SetHoliday />
    </div>
  );
}
