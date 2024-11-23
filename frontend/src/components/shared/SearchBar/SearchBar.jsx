import { useNavigate, useLocation} from "react-router-dom"
import { MdSearch } from "react-icons/md";
import { urlParser } from "../../../core/utils/fn/urlParser";
import "./SearchBar.css";

export const SearchBar = ({...props}) => {
    const { search } = useLocation()
    const Navigate = useNavigate()

    const handleSearch = ({key}) => {
        if (key && key !== 'Enter') return
        const q = document.querySelector('#search-input').value
        Navigate(urlParser(search, { q }))
    }

    return <div id="search-bar" { ...props }>
        <input 
            id='search-input' 
            placeholder="검색어를 입력하세요" 
            onKeyDown={handleSearch}
        />
        <button onClick={()=> handleSearch}><MdSearch size={30}/></button>
    </div>
}