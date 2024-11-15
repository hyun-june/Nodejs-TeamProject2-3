import { Link, useSearchParams, useLocation } from "react-router-dom"; 
import { urlParser } from "../../../core/utils/fn/urlParser";
import "./PageNationBar.css";

export const PageNationBar = ({ totalPageNum = 1, ...props}) => {
    const [searchParams] = useSearchParams()
    const { search } = useLocation()
    const crrPage = +searchParams.get('page')
    const page = crrPage !== 0 ?  crrPage : 1

    return <ul id="page-nation-bar" {...props}>
        {
            <>
                {page !== 1 && <li><Link to={urlParser(search, { page: page - 1 })} >prev</Link></li>}
                {Array.from({ length: totalPageNum }, (_, i) => i + 1).map((i)=> 
                    <li key={i} >
                        <Link to={urlParser(search, { page: i, })} className={`${page === i ? 'crr-page' : ''}`} >
                            {i}
                        </Link>
                    </li>)}
                {page !== totalPageNum && <li><Link to={urlParser(search, { page: 1 + page})}>next</Link></li>}
            </>
        }
    </ul>  
}