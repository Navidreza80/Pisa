// Next
import type { Metadata } from "next";

// Third party components
import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";

// metadata
export const metadata: Metadata = {
  title: "Pizza - Find your dream house!",
  description: "Find your dream house with ease just by couple of clicks!"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex-wrap">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
