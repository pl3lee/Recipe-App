import Navbar from "./Navbar";
interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <Navbar></Navbar>
    {children}
    </>
  )
}

export default Layout;