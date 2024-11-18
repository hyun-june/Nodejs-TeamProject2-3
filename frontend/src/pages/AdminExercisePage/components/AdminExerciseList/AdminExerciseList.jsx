import { useState } from "react"
import { PageNationBar } from "../../../../components/shared/PageNationBar/PageNationBar"
import { BottomSheet } from "../../../../components/shared/BottomSheet/BottomSheet"
import { useBottomSheet } from "../../../../components/shared/BottomSheet/components/useBottomSheet"
import { AdminTable } from "../../../../components/Admin/AdminTable/AdminTable"
import { AdminExerciseAddForm } from "../AdminExerciseAddForm/AdminExerciseAddForm"
import { AdminExerciseUpdateForm } from "../AdminExerciseUpdateForm/AdminExerciseUpdateForm"
import { AdminExerciseDeleteForm } from "../AdminExerciseDeleteForm/AdminExerciseDeleteForm"
import { AddButton } from "../../../../components/shared/AddButton/AddButton"

const mocks = [
    {
        _id : '1',
        date : '24-11-12',
        name : '팔굽혀펴기',
    },
    {
        _id : '2',
        date : '24-11-12',
        name : '달리기',
    },
    {
        _id : '3',
        date : '24-11-12',
        name : '철봉',
    },
]

const manageOptions = {
    'add' : <AdminExerciseAddForm/>,
    'update' : <AdminExerciseUpdateForm/>,
    'delete' : <AdminExerciseDeleteForm/>,
}

export const AdminExerciseList = () => {
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