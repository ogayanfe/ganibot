import Header from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col flex w-screen h-screen">
      <Header />
      <main className="flex-grow overflow-y-auto">{children}</main>
    </div>
  );
}
