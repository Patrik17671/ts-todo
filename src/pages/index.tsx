import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddTodoForm from "@/pages/components/forms/addTodoForm/AddTodoForm";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main>
      <div className="container">
        <h1>Todo app</h1>

        <AddTodoForm />
      </div>
    </main>
  )
}
