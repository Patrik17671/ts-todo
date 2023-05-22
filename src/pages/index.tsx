import { Inter } from 'next/font/google'
import AddTodoForm from "@/components/forms/addTodoForm/AddTodoForm";
import TodoList from "@/components/todoList/TodoList";
import {dehydrate ,QueryClient,useQuery } from "@tanstack/react-query";
import {getTodosData} from "@/pages/api/getTodosData";
import {TodosType} from "@/types";
import {GetStaticProps} from "next";
import isEmpty from "lodash/isEmpty";

const inter = Inter({ subsets: ['latin'] })

const Home = () => {

  //getting data
  const {data, isLoading} = useQuery({
   queryKey: ['todos'], queryFn: getTodosData
  });

  if(isLoading){
    return (<h1>loading</h1>)
  }

  return (
    <main>
      <div className="container">
        <h1>Todo app</h1>
        <AddTodoForm />
        {isEmpty(data) ? (
          <p className="emptyList">Your todo list is empty =(.</p>
        ) : (
          <TodoList todoList={data} />
        )}
      </div>
    </main>
  )
}
export default Home

//SSG
export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<TodosType>({
    queryKey: ['todos'], queryFn: getTodosData
  });
  return{
    props:{
      dehydrateState: dehydrate(queryClient)
    }
  }
}
