import Navbar from './components/common/navbar/Navbar';
import style from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Home({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <footer style={{ position: 'fixed', bottom: '0' }} className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p style={{ color: 'teal' }}>Copyright <span style={{ color: 'red' }}>©</span> 2023 - All right reserved by Bullean IT Solutions</p>
        </aside>
      </footer>
    </>
  )
}
