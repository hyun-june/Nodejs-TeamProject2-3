import { useState } from "react"
import { PageNationBar } from "../../../../components/shared/PageNationBar/PageNationBar"
import { BottomSheet } from "../../../../components/shared/BottomSheet/BottomSheet"
import { useBottomSheet } from "../../../../components/shared/BottomSheet/components/useBottomSheet"
import { AdminTable } from "../../../../components/Admin/AdminTable/AdminTable"
import { AdminFoodAddForm } from "../AdminFoodAddForm/AdminFoodAddForm"
import { AdminFoodUpdateForm } from "../AdminFoodUpdateForm/AdminFoodUpdateForm"
import { AdminFoodDeleteForm } from "../AdminFoodDeleteForm/AdminFoodDeleteForm"
import { AddButton } from "../../../../components/shared/AddButton/AddButton"
import { useSearchParams } from "react-router-dom"
import { useGetAllFood } from "../../../../core/query/food"
import { PendingContainer } from "../../../../components/shared/PendingContainer/PendingContainer"

const manageOptions = {
    add: (props) => <AdminFoodAddForm {...props} />,
    update: (props) => <AdminFoodUpdateForm {...props} />,
    delete: (props) => <AdminFoodDeleteForm {...props} />,
}

export const AdminFoodList = () => {
    const [ searchParams ] = useSearchParams()
    const page = +searchParams.get('page') || 1
    const q = searchParams.get('q')
    const { bottomSheetProps , open, close } = useBottomSheet()
    const [ manageMode, setManagerMode ] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const { data , isPending} = useGetAllFood({ page , q, size : 10 })

    const handleOpenManager = (mode, id = null) => {
        setManagerMode(mode)
        setSelectedId(id) 
        open()
    }

    if (isPending) return <PendingContainer/>

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