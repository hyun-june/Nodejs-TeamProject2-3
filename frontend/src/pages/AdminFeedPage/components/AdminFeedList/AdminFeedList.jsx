import { useState } from "react"
import { PageNationBar } from "../../../../components/shared/PageNationBar/PageNationBar"
import { BottomSheet } from "../../../../components/shared/BottomSheet/BottomSheet"
import { useBottomSheet } from "../../../../components/shared/BottomSheet/components/useBottomSheet"
import { AdminTable } from "../../../../components/Admin/AdminTable/AdminTable"
import { useSearchParams } from "react-router-dom"
import { AdminFeedDeleteForm } from "../AdminFeedDeleteForm/AdminFeedDeleteForm"
import { useGetAllFeed } from "../../../../core/query/feed"
import { PendingContainer } from "../../../../components/shared/PendingContainer/PendingContainer"

const manageOptions = {
    delete: (props) => <AdminFeedDeleteForm {...props} />,
}

export const AdminFeedList = () => {
    const [ searchParams ] = useSearchParams()
    const page = +searchParams.get('page') || 1
    const q = searchParams.get('q')
    const { bottomSheetProps , open, close } = useBottomSheet()
    const [ manageMode, setManagerMode ] = useState(null)
    const [selectedId, setSelectedId] = useState(null)
    const { data, isPending } = useGetAllFeed({ page , q, size : 10  })


    const handleOpenManager = (mode, id = null) => {
        setManagerMode(mode)
        setSelectedId(id) 
        open()
    }

    if (isPending) return <PendingContainer/>

    return <>
        <AdminTable 
            list={data?.data} 
            handleOpenManager={handleOpenManager} 
            theads={['description']}
            buttonOption={ [
                {
                    name : 'delete', 
                    title : '삭제'
                },
            ]}
        />
        <PageNationBar totalPageNum={data?.totalPageNum} />
        <BottomSheet {...bottomSheetProps}>
            {manageMode && manageOptions[manageMode]({ id: selectedId , close})}
        </BottomSheet>
    </>
}