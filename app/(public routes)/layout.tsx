import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
