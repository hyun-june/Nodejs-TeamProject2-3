import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategoryInput } from "../../../../components/shared/CategoryInput/CategoryInput"
import { PendingButton } from "../../../../components/shared/PendingButton/PendingButton"
import { useCreateFood } from "../../../../core/query/food"

const categoryOptions = [
    '채소', '과일', '육류', '수산물', '가공식품'
]

export const AdminFoodAddForm = ({ close }) => {
    const { register, handleSubmit, formState : { errors } } = useForm()
    const [ category, setCategory ] = useState([])
    const { mutate, isPending } = useCreateFood()

    const handleFormSubmit = (formData) => {
        mutate({ category , nutrient : [
            {
                "Carbohydrate": formData.carbohydrate,
                "Protein": formData.protein,
                "Fat":  formData.fat,
            }
        ], ...formData },  {
            onSuccess: () => {
                close();
            },
        })
    }

    return <div id="admin-manager">
        <h1>음식 추가하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput name='name' title='이름' register={register} errMsg={errors.name?.message}/>
            <CategoryInput 
                category={category} 
                setCategory={setCategory}
                categoryOptions={categoryOptions}
            />
            <div className="input-flex">
                <FormInput name='carbohydrate' title='탄수화물' register={register} errMsg={errors.carbohydrate?.message}/>
                <FormInput name='protein' title='단백질' register={register} errMsg={errors.protein?.message}/>
                <FormInput name='fat' title='지방' register={register} errMsg={errors.fat?.message}/>
            </div>
            <FormInput name='defaultGram' title='개당 기본 그램' register={register} errMsg={errors.defaultGram?.message}/>
            <FormInput name='calorie' title='개당 기본 칼로리' register={register} errMsg={errors.calorie?.message}/>
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
