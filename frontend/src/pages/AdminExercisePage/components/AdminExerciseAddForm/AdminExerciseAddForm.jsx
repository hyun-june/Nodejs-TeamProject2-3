import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategorieInput } from "../../../../components/shared/CategorieInput/CategorieInput"
import { Textarea } from "../../../../components/shared/Textarea/Textarea"

export const AdminExerciseAddForm = () => {
    const { register, handleSubmit } = useForm()

    const handleFormSubmit = (formData) => {
        console.log(formData)
    }

    return <div id="admin-manager">
        <h1>운동 추가하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput id='name' title='이름' {...register("name")}/>
            <CategorieInput/>
            <FormInput id='defaultGram' title='운동 강도' {...register("defaultGram")}/>
            <Textarea id="description" title="운동설명"/>
            <button className="submit-btn">추가</button>
        </form>
    </div>
}