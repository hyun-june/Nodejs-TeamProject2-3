import { SearchBar } from "../../components/shared/SearchBar/SearchBar"
import { AdminFoodList } from "./components/AdminFoodList/AdminFoodList"
import "./AdminFoodPage.css";

export const AdminFoodPage = () => {
    return <>
        <SearchBar/>
        <AdminFoodList/>
    </>
}