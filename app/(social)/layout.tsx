import Header from "@/components/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div 
      className={`
        flex-col flex w-screen h-screen
        transition-colors duration-300
      `}
    >
      <Header />
      <main 
        className={`
          flex-grow overflow-y-auto
          scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
        `}
      >
        {children}
      </main>
    </div>
  );
}
