import { useState } from "react"
import { PageNationBar } from "../../../../components/shared/PageNationBar/PageNationBar"
import { BottomSheet } from "../../../../components/shared/BottomSheet/BottomSheet"
import { useBottomSheet } from "../../../../components/shared/BottomSheet/components/useBottomSheet"
import { AdminTable } from "../../../../components/Admin/AdminTable/AdminTable"
import { AdminFoodAddForm } from "../AdminFoodAddForm/AdminFoodAddForm"
import { AdminFoodUpdateForm } from "../AdminFoodUpdateForm/AdminFoodUpdateForm"
import { AdminFoodDeleteForm } from "../AdminFoodDeleteForm/AdminFoodDeleteForm"
import { AddButton } from "../../../../components/shared/AddButton/AddButton"

const mocks = [
    {
        _id : '1',
        date : '24-11-12',
        name : '사과',
    },
    {
        _id : '2',
        date : '24-11-12',
        name : '배',
    },
    {
        _id : '3',
        date : '24-11-12',
        name : '포도',
    },
]

const manageOptions = {
    'add' : <AdminFoodAddForm/>,
    'update' : <AdminFoodUpdateForm/>,
    'delete' : <AdminFoodDeleteForm/>,
}

export const AdminFoodList = () => {
    const { bottomSheetProps , open } = useBottomSheet()
    const [manageMode, setManagerMode] = useState(null)

    const handleOpenManager = (mode) => {
        setManagerMode(mode)
        open()
    }

    return <>
        <AddButton onClick={()=> handleOpenManager('add')}/>
        <AdminTable 
            list={mocks} 
            handleOpenManager={handleOpenManager} 
            theads={['date', 'name']}
        />
        <PageNationBar totalPageNum={3} />
        <BottomSheet {...bottomSheetProps}>
            { manageMode && manageOptions[manageMode] }
        </BottomSheet>
    </>
}