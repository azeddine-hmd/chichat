import DmPage from "@/client-pages/dm-page";

export default function Dm({ params }: { params: any }) {
  return (
    <DmPage id={params.id} />
  )
}
