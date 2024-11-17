import { useState } from "react";
import "./Tabs.css";

export const Tabs = ({defaultIdx = 0, items=[]}) => {
    const [idx , setIdx] = useState(defaultIdx)
    return <>
        <ul className="tabs-header">
            {
                items?.map(({title}, i)=> 
                    <li 
                        key={title} 
                        className={idx === i && 'active'}
                        onClick={()=> setIdx(i)}
                    >
                        <span>{title}</span>
                    </li>)
            }
        </ul>
        { items[idx]?.comp }
    </>
}