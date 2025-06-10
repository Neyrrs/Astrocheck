import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar /> {children}
    </div>
  );
}