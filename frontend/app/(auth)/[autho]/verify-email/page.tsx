import { BsMailbox } from "react-icons/bs";

export default function SendEmail() {
  return (
    <div className="flex w-[500px] flex-col items-center justify-center text-muted">
      <BsMailbox size="128" />
      <div className="text-center text-2xl text-muted">
        We have sent an <span className="font-bold">email</span> containing a
        verification code link. Kindly check your{" "}
        <span className="font-bold">inbox</span> to proceed with the account{" "}
        <span className="font-bold">activation</span> process.
      </div>
    </div>
  );
}
