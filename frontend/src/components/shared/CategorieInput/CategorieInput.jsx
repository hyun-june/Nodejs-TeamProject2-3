import { useState } from "react";
import { MdClose  } from "react-icons/md";
import "./CategorieInput.css";

export const CategorieInput = ({ 
    title='카테고리', 
    categorieOptions=['top', 'dress', 'bottom', 'aadsasdasdasdas', 'asdasdasfff'] ,
    ...props
}) => {
    const [categorie , setCategorie] = useState([])

    const handleAddCategorie = ({target}) => {
        const newValue = target.value;
        if (categorieOptions.includes(newValue) && !categorie.includes(newValue)) 
            setCategorie([...categorie, newValue])
    }

    const handleDeleteCategorie = (option) => {
        setCategorie(categorie.filter((el) => el !== option))
    }

    return <div className="categorie-input">
        <label>{title}</label>
        <select onChange={handleAddCategorie} { ...props}>
            { categorieOptions.map((a)=> <option key={a} value={a}>{a}</option>)}
        </select>
        <ul>
            {
                categorie.length !== 0 && categorie.map((option)=>              
                    <li key={option}>
                        <div>{option}</div>
                        <button onClick={()=> handleDeleteCategorie(option)}><MdClose/></button>
                    </li>)
            }
        </ul>
    </div>
}