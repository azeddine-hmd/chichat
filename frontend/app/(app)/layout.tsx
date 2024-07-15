import HomeTemplate from "@/components/templates/home-template";
import ActiveChannelItemContextProvider from "@/context/active-channel-item-contex";
import ServerSidebar from "@/components/organisms/server-sidebar";
import DefaultContentChannel from "@/components/molecules/default-content-channel";
import ChannelSidebar from "@/components/organisms/channel-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ActiveChannelItemContextProvider>
      <HomeTemplate>
        <div className="flex h-full max-w-screen overflow-hidden">
          <ServerSidebar className="flex-none flex-0" />
          <ChannelSidebar className="felx-none flex-0">
            <DefaultContentChannel />
          </ChannelSidebar>
          <div className="flex-grow flex-shrink overflow-hidden">
            {children}
          </div>
        </div>
      </HomeTemplate>
    </ActiveChannelItemContextProvider>
  );
}
