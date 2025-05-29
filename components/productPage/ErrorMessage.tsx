import { FaSadTear } from "react-icons/fa";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-[80vw] max-w-[350px] flex flex-col items-center gap-6">
        <FaSadTear className="size-18 md:size-24"></FaSadTear>
        <h1 className="text-present-2 md:text-present-1 text-center">
          {message}
        </h1>
      </div>
    </div>
  );
}
export default ErrorMessage;
