import { useState } from "react"
import { PageNationBar } from "../../../../components/shared/PageNationBar/PageNationBar"
import { BottomSheet } from "../../../../components/shared/BottomSheet/BottomSheet"
import { useBottomSheet } from "../../../../components/shared/BottomSheet/components/useBottomSheet"
import { AdminTable } from "../../../../components/Admin/AdminTable/AdminTable"
import { AdminExerciseAddForm } from "../AdminExerciseAddForm/AdminExerciseAddForm"
import { AdminExerciseUpdateForm } from "../AdminExerciseUpdateForm/AdminExerciseUpdateForm"
import { AdminExerciseDeleteForm } from "../AdminExerciseDeleteForm/AdminExerciseDeleteForm"
import { AddButton } from "../../../../components/shared/AddButton/AddButton"
import { useGetAllExercise } from "../../../../core/query/exercise"
import { useSearchParams } from "react-router-dom"

const manageOptions = {
    add: (props) => <AdminExerciseAddForm {...props} />,
    update: (props) => <AdminExerciseUpdateForm {...props} />,
    delete: (props) => <AdminExerciseDeleteForm {...props} />,
}

export const AdminExerciseList = () => {
    const [ searchParams ] = useSearchParams()
    const page = +searchParams.get('page') || 1
    const q = searchParams.get('q')
    const { bottomSheetProps , open, close } = useBottomSheet()
    const [ manageMode, setManagerMode ] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const { data } = useGetAllExercise({ page , q, size : 10 })

    const handleOpenManager = (mode, id = null) => {
        setManagerMode(mode)
        setSelectedId(id) 
        open()
    }

    return <>
        <AddButton onClick={()=> handleOpenManager('add')}/>
        <AdminTable 
            list={data?.data} 
            handleOpenManager={handleOpenManager} 
            theads={['name']}
        />
        <PageNationBar totalPageNum={data?.totalPageNum} />
        <BottomSheet {...bottomSheetProps}>
            {manageMode && manageOptions[manageMode]({ id: selectedId , close})}
        </BottomSheet>
    </>
}