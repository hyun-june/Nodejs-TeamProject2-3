import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategorieInput } from "../../../../components/shared/CategorieInput/CategorieInput"
import { useForm } from "react-hook-form"

export const AdminFeedAddForm = () => {
    const { register, handleSubmit } = useForm()

    const handleFormSubmit = (formData) => {
        console.log(formData)
    }

    return <div id="admin-manager">
        <h1>음식 추가하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput id='name' title='이름' {...register("name")}/>
            <CategorieInput/>
            <div className="input-flex">
                <FormInput id='name' title='탄수화물' {...register("carbohydrate")}/>
                <FormInput id='name' title='단백질' {...register("protein")}/>
                <FormInput id='name' title='지방' {...register("fat")}/>
            </div>
            <FormInput id='name' title='개당 기본 그램' {...register("defaultGram")}/>
            <FormInput id='name' title='개당 기본 칼로리' {...register("calorie")}/>
            <button className="submit-btn">추가</button>
        </form>
    </div>
}