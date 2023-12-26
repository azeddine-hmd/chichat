import Button from "@/components/atoms/button";
import { User } from "@/models/user";
import { BsPersonDashFill } from "react-icons/bs";
import Tooltip from "../tooltip";

export default function BlockedItem({ user }: { user: User }) {
  return (
    <>
      <Button className="bg-grey-800 group/unblock group relative rounded-full bg-gray-700 p-2 group-hover/item:bg-gray-900 group-active:bg-gray-400/5">
        <BsPersonDashFill className="text-lg group-hover/unblock:fill-red-500" />
        <Tooltip direction="top" margin={2}>
          Unblock
        </Tooltip>
      </Button>
    </>
  );
}
