import { MdClose  } from "react-icons/md";
import "./CategoryInput.css";

export const CategoryInput = ({ 
    title='카테고리', 
    categoryOptions=['1', '2', '2'] ,
    category,
    setCategory,
    ...props
}) => {

    const handleAddCategory = ({target}) => {
        const newValue = target.value;
        if (categoryOptions.includes(newValue) && !category.includes(newValue)) 
            setCategory([...category, newValue])
    }

    const handleDeleteCategory = (option) => {
        setCategory(category.filter((el) => el !== option))
    }

    return <div className="categorie-input">
        <label>{title}</label>
        <select onChange={handleAddCategory} { ...props}>
            { categoryOptions.map((a)=> <option key={a} value={a}>{a}</option>)}
        </select>
        <ul>
            {
                category.length !== 0 && category.map((option)=>              
                    <li key={option}>
                        <div>{option}</div>
                        <button onClick={()=> handleDeleteCategory(option)}><MdClose/></button>
                    </li>)
            }
        </ul>
    </div>
}