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
        <div className="flex h-screen max-h-screen w-full">
          <ServerSidebar />
          <ChannelSidebar>
            <DefaultContentChannel />
          </ChannelSidebar>
          {children}
        </div>
      </HomeTemplate>
    </ActiveChannelItemContextProvider>
  );
}
