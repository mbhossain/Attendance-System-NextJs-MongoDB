import Navbar from './components/common/navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode; // Define children as ReactNode
}

export default function Home({ children }: LayoutProps) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
