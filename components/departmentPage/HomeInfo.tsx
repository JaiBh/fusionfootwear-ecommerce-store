import { PhoneCall, Truck, Wallet } from "lucide-react";

function HomeInfo() {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between max-w-[1080px] mx-auto">
      <div className="text-center space-y-6 flex flex-col items-center max-w-[180px]">
        <Truck className="text-[#FF6875]" size={48}></Truck>
        <div className="space-y-2">
          <h2 className="text-present-2">FREE SHIPPING</h2>
          <p className="text-present-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
      <div className="text-center space-y-6 flex flex-col items-center max-w-[180px]">
        <Wallet className="text-[#FF6875]" size={48}></Wallet>
        <div className="space-y-2">
          <h2 className="text-present-2">100% REFUND</h2>
          <p className="text-present-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
      <div className="text-center space-y-6 flex flex-col items-center max-w-[180px]">
        <PhoneCall className="text-[#FF6875]" size={48}></PhoneCall>
        <div className="space-y-2">
          <h2 className="text-present-2">SUPPORT 24/7</h2>
          <p className="text-present-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
      </div>
    </div>
  );
}
export default HomeInfo;
