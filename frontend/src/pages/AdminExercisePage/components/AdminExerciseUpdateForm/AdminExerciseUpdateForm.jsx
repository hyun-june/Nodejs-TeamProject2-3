import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategoryInput } from "../../../../components/shared/CategoryInput/CategoryInput"
import { Textarea } from "../../../../components/shared/Textarea/Textarea"
import { PendingButton } from "../../../../components/shared/PendingButton/PendingButton"
import { useUpdateExercise } from "../../../../core/query/exercise"
import { useGetExercise } from "../../../../core/query/exercise"

const categoryOptions = [
    '유산소', '무산소', '팔', '다리', '정신'
]

export const AdminExerciseUpdateForm = ({ id, close }) => {
    const { data, isPending :isGetPending } = useGetExercise(id)
    const { category : defaultCategory, name, description, mets } = data?.data || {}
    const { register, handleSubmit, formState : { errors } } = useForm({
        defaultValues: data?.data ? {
            name,
            mets,
            description
        } : {}
    })
    const [ category, setCategory ] = useState(defaultCategory || [])
    const { mutate, isPending } = useUpdateExercise()

    const handleFormSubmit = (formData) => {
        mutate({ category, id ,...formData },  {
            onSuccess: () => {
                close();
            },
        })
    }

    if (isGetPending) return <></>

    return <div id="admin-manager">
        <h1>운동 수정하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput name='name' title='이름' register={register} errMsg={errors.name?.message} defaultValue={name}/>
            <CategoryInput 
                category={category} 
                setCategory={setCategory}
                categoryOptions={categoryOptions}
            />
            <FormInput name='mets' title='운동 강도' register={register} errMsg={errors.mets?.message} defaultValue={mets} />
            <Textarea name="description" title="운동설명" register={register} errMsg={errors.description?.message} defaultValue={description} />
            <PendingButton 
                isPending={isPending}
                thema='point'
                round='sm'
                className="submit-btn"
            >
                수정
            </PendingButton>
        </form>
    </div>
}