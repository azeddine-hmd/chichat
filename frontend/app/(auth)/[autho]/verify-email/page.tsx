import { BsMailbox } from "react-icons/bs";

export default function SendEmail() {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-600 p-8 shadow-lg w-[500px] mb-10 text-muted">
      <BsMailbox size="128" />
      <div className="text-center text-muted text-2xl" >
        We have sent an <span className="font-bold" >email</span> containing a verification code link. Kindly check your <span className="font-bold" >inbox</span> to proceed with the account <span className="font-bold" >activation</span> process.
        </div>
    </div>
  );
}
