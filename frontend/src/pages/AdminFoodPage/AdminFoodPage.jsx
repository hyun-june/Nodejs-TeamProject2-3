import { SearchBar } from "../../components/shared/SearchBar/SearchBar"
import { AdminFoodList } from "./components/AdminFoodList/AdminFoodList"

export const AdminFoodPage = () => {
    return <>
        <SearchBar/>
        <AdminFoodList/>
    </>
}