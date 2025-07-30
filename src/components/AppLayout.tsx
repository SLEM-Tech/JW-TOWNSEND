import { ReactNode } from "react";
// import Header from "./Navbars/Header";
import Footer from "./Footers/Footer";
import HeaderNav from "./Navbars/navbar";
import FooterSection from "./Footers/footerSection";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <main className={`relative`}>
      <HeaderNav />
      <div className={`min-h-screen sm:px-4 md:px-0 ${className}`}>
        {children}
      </div>
      <FooterSection />
      {/* <Footer /> */}
    </main>
  );
};

export default AppLayout;
