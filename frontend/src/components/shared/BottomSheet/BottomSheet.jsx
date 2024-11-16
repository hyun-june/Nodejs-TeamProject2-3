import ReactDOM from "react-dom";
import './BottomSheet.css'

export const BottomSheet = ({ children , isOpen , close, className='', ...props }) => {
    const bottomSheetContainer = document.getElementById("bottom-sheet")

    const handleBottomSheetClose = (e) => {
        if (e.target.className === "bottom-sheet-overlay") close()
    }

    return bottomSheetContainer &&  ReactDOM.createPortal(<>
        {
            isOpen &&    
            <>
                <div className="bottom-sheet-overlay" onClick={handleBottomSheetClose} />
                <div className={`bottom-sheet-content ${className}`} {...props} >
                    {children}
                </div>
            </>
        }
    </>, bottomSheetContainer)
}