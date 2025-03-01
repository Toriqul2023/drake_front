import { Inter } from 'next/font/google'
import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
import AuthProvider from './context/context';
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NFC Bnagladesh',
 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <AuthProvider>{children}</AuthProvider>
     </body>
    </html>
  )
}
