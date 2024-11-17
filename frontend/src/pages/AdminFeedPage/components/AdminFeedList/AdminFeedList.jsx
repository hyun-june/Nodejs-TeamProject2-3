import { useState } from "react"
import { PageNationBar } from "../../../../components/shared/PageNationBar/PageNationBar"
import { BottomSheet } from "../../../../components/shared/BottomSheet/BottomSheet"
import { useBottomSheet } from "../../../../components/shared/BottomSheet/components/useBottomSheet"
import { AdminTable } from "../../../../components/Admin/AdminTable/AdminTable"
import { AdminFeedDeleteForm } from "../AdminFeedDeleteForm/AdminFeedDeleteForm"

const mocks = [
    {
        _id : '1',
        date : '24-11-12',
        name : '피드1',
    },
    {
        _id : '2',
        date : '24-11-12',
        name : '피드2',
    },
    {
        _id : '3',
        date : '24-11-12',
        name : '피드3333',
    },
]

const manageOptions = {
    'delete' : <AdminFeedDeleteForm/>,
}

export const AdminFeedList = () => {
    const { bottomSheetProps , open } = useBottomSheet()
    const [manageMode, setManagerMode] = useState(null)

    const handleOpenManager = (mode) => {
        setManagerMode(mode)
        open()
    }

    return <>
        <AdminTable 
            list={mocks} 
            handleOpenManager={handleOpenManager} 
            theads={['date', 'name']}
            buttonOption={ [
                {
                    name : 'delete', 
                    title : '삭제'
                },
            ]}
        />
        <PageNationBar totalPageNum={3} />
        <BottomSheet {...bottomSheetProps}>
            { manageMode && manageOptions[manageMode] }
        </BottomSheet>
    </>
}