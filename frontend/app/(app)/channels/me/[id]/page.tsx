import DirectChatRoomPage from "@/client-pages/direct-chat-room-page";

export default function DirectChatRoom({ params }: { params: any }) {
  return (
    <DirectChatRoomPage id={params.id} />
  )
}
