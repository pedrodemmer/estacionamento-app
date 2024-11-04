import Input from '@/components/Input/content';
import Navbar from '@/components/Navbar/content'
import Button from '@/components/Button/content';
import { Dropdown1, Dropdown2 } from '@/components/Dropdown/content';
import Table from '@/components/Tables/content';


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        < styles />

        {children}
      </body>
    </html>
  );
}
