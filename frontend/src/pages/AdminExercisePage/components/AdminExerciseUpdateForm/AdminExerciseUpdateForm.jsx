import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategorieInput } from "../../../../components/shared/CategorieInput/CategorieInput"
import { Textarea } from "../../../../components/shared/Textarea/Textarea"

export const AdminExerciseUpdateForm = () => {
    const { register, handleSubmit, formState : { errors } } = useForm()

    const handleFormSubmit = (formData) => {
        console.log(formData)
    }

    return <div id="admin-manager">
        <h1>운동 수정하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput name='name' title='이름' register={register} errMsg={errors.name?.message}/>
            <CategorieInput/>
            <FormInput name='defaultGram' title='운동 강도' register={register} errMsg={errors.defaultGram?.message}/>
            <Textarea name="description" title="운동설명" register={register} errMsg={errors.description?.message}/>
            <button className="submit-btn">수정</button>
        </form>
    </div>
}