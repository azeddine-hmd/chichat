import { User } from "@/models/user";
import React, { forwardRef } from "react";
import Avatar from "../atoms/avatar";
import { cn } from "@/lib/cn";

export type UserListItemProps = {
  user: User;
} & React.ComponentPropsWithRef<"div">;

const UserItem = forwardRef<HTMLDivElement, UserListItemProps>(
  function UserItem({ children, className, user, ...restProps }, forwardedRef) {
    return (
      <div
        className={cn("group/item group- flex h-[62px] items-center justify-between rounded-lg border-t border-t-separator-xlight px-1 hover:bg-hover/20 pr-2", className)}
        ref={forwardedRef}
        {...restProps}
      >
        <div className="flex">
          <Avatar
            className="mr-2"
            status={user.status}
            imageSrc={user.avatar}
          />
          <div className="justify-Start flex flex-col items-start">
            <div className="w-full text-start text-sm font-medium text-white">
              {user.displayName}
            </div>
            <div className="w-full text-left text-xs font-light text-muted">
              {user.username}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-2">{children}</div>
      </div>
    );
  }
);

export default UserItem;
