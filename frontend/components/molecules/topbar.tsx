import Hr from "../atoms/hr";
import { cn } from "@/lib/utils";

export type TopBarProps = {
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export default function TopBar({ children, className }: TopBarProps) {
  return (
    <nav>
      <div
        className={cn(
          "flex h-12 w-full items-center space-x-2  overflow-hidden bg-gray-600 p-2 px-4",
          className
        )}
      >
        {children}
      </div>
      <Hr className="w-full border-separator-light"></Hr>
    </nav>
  );
}

TopBar.LeftSide = function LeftSide({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="flex items-center">
        <Hr className="mx-2 h-6 rounded-full border-r-0 border-separator-xlight " />
      </div>
    </>
  );
};
