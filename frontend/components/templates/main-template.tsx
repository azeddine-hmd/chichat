import { ChannelItem, useActiveChannelItemContext } from "@/context/active-channel-item-contex";
import FriendsTemplate from "./friends";

export type MainTemplateProps = {
  channelItem?: ChannelItem;
};

export default function MainTemplate({ channelItem }: MainTemplateProps) {
  const { item } = useActiveChannelItemContext(channelItem);

  return <>{item.type === "friends" ? <FriendsTemplate /> : null}</>;
}
