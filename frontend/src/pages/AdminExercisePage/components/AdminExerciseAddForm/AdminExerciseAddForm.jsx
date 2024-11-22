import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategoryInput } from "../../../../components/shared/CategoryInput/CategoryInput"
import { Textarea } from "../../../../components/shared/Textarea/Textarea"
import { PendingButton } from "../../../../components/shared/PendingButton/PendingButton"
import { useCreateExercise } from "../../../../core/query/exercise"

const categoryOptions = [
    '유산소', '무산소', '팔', '다리', '정신'
]

export const AdminExerciseAddForm = ({close}) => {
    const { register, handleSubmit, formState : { errors } } = useForm()
    const [ category, setCategory ] = useState([])
    const { mutate, isPending } = useCreateExercise()

    const handleFormSubmit = (formData) => {
        mutate({ category ,...formData },  {
            onSuccess: () => {
                close();
            },
        })
    }

    return <div id="admin-manager">
        <h1>운동 추가하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput name='name' title='이름' register={register} errMsg={errors.name?.message}/>
            <CategoryInput 
                category={category} 
                setCategory={setCategory}
                categoryOptions={categoryOptions}
            />
            <FormInput name='mets' title='운동 강도' register={register} errMsg={errors.mets?.message}/>
            <Textarea name="description" title="운동설명" register={register} errMsg={errors.description?.message}/>
            <PendingButton 
                isPending={isPending}
                thema='point'
                round='sm'
                className="submit-btn"
            >
                추가
            </PendingButton>
        </form>
    </div>
}