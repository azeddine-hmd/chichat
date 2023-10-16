import { Children } from "react";
import { twMerge } from "tailwind-merge";
import Hr from "../atoms/hr";

export type TopBarProps = {
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export default function TopBar({ children, className }: TopBarProps) {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 0) {
    return (<h1>Need at least one child!</h1>);
  }

  const firstChild = childrenArray[0];
  const restChildren = childrenArray.slice(1);

  return (
    <>
      <div className={twMerge("h-12 w-full bg-gray-600 flex items-center  p-2 px-4 space-x-2 overflow-hidden", className)} >
        {firstChild}
        <div className="flex items-center" >
          <Hr className="border-r-0 rounded-full h-6 border-separator-xlight mx-2 " />
        </div>
        {restChildren}
      </div>
      <Hr className="w-full border-separator-light"></Hr>
    </>
  );
}
