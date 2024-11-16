import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategorieInput } from "../../../../components/shared/CategorieInput/CategorieInput"
import { useForm } from "react-hook-form"

export const AdminFoodAddForm = () => {
    const { register, handleSubmit } = useForm()

    const handleFormSubmit = (formData) => {
        console.log(formData)
    }

    return <div id="admin-manager">
        <h1>음식 추가하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput title='이름' {...register("name")}/>
            <CategorieInput/>
            <div className="input-flex">
                <FormInput title='탄수화물' {...register("carbohydrate")}/>
                <FormInput title='단백질' {...register("protein")}/>
                <FormInput title='지방' {...register("fat")}/>
            </div>
            <FormInput title='개당 기본 그램' {...register("defaultGram")}/>
            <FormInput title='개당 기본 칼로리' {...register("calorie")}/>
            <button className="submit-btn">추가</button>
        </form>
    </div>
}