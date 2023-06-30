import { Provider } from "../components/Client"
import "../styles/app.scss"
import Header from "./header"

export const metadata = {
  title: 'todo app',
  description: 'this is a todo app',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <Provider>
<>

<Header/>
        
        
        {children}
</>


        </Provider>
      </body>
    </html>
  )
}
