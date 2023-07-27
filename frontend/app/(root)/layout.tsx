import Snackbar from "@/components/atoms/snackbar";

export default function AfterRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Snackbar></Snackbar>
      <div>{children}</div>
    </>
  );
}
