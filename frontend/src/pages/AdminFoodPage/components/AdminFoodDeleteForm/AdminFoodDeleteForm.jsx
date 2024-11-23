import { useDeleteFood } from "../../../../core/query/food"
import { PendingButton } from "../../../../components/shared/PendingButton/PendingButton"

export const AdminFoodDeleteForm = ({ id, close }) => {
    const { mutate, isPending } = useDeleteFood()

    const handleDelete = () => {
        mutate(id,  {
            onSuccess: () => {
                close();
            },
        })
    }

    return <div id="admin-manager">
        <h1>상품 삭제하기</h1>
        <hr />
        <div className="manager-content">
            <p>상품을 삭제하시겠습니까?</p>
            <PendingButton
                isPending={isPending}
                round='sm'
                thema='warn'
                className="submit-btn"
                onClick={handleDelete}
            >
                삭제
            </PendingButton>
        </div>
    </div>
}