import AddTodoForm from "@/components/forms/addTodoForm/AddTodoForm";
import TodoList from "@/components/todoList/TodoList";
import {dehydrate ,QueryClient,useQuery } from "@tanstack/react-query";
import {getTodosData} from "@/pages/api/getTodosData";
import {TodosType} from "@/types";
import {GetStaticProps} from "next";
import isEmpty from "lodash/isEmpty";
import {useState} from "react";
import Filter from "@/components/filter/Filter";
import Search from "@/components/search/Search";


type FilterValueType = {
  id: number;
  text: string;
  value: string;
};

const Home = () => {

  const filterValues: FilterValueType[] = [
    { id: 1, text: 'All', value: "" },
    { id: 2, text: 'Active', value: "true" },
    { id: 3, text: 'Done', value: "false"},
  ];

  const [selectedFilter, setSelectedFilter] = useState<FilterValueType>(filterValues[0]);
  const [selectedSearch, setSelectedSearch] = useState<string>("");

  const {data, isLoading} = useQuery({
    queryKey: ['todos', {filter: selectedFilter.value,search: selectedSearch}], queryFn: () => getTodosData(selectedFilter.value,selectedSearch)
  });

  return (
    <main>
      <div className="container">
        <h1>Todo app</h1>
        <div className="filterWrapper">
          <Search setSelectedSearch={setSelectedSearch} />
          <Filter
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            filterValues={filterValues}
          />
        </div>
        <AddTodoForm />
        {isLoading ? (
          <p className="text-center font-lg">Loading.....</p>
        ) : ""}
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
    queryKey: ['todos'], queryFn: () => getTodosData("","")
  });
  return{
    props:{
      dehydrateState: dehydrate(queryClient)
    }
  }
}
