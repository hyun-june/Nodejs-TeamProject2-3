import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/shared/FormInput/FormInput"
import { CategoryInput } from "../../../../components/shared/CategoryInput/CategoryInput"
import { PendingButton } from "../../../../components/shared/PendingButton/PendingButton"
import { useUpdateFood, useGetFood } from "../../../../core/query/food"

const categoryOptions = [
    '채소', '과일', '육류', '수산물', '가공식품'
]

export const AdminFoodUpdateForm = ({ id, close }) => {
    const { data, isPending :isGetPending } = useGetFood(id)
    const { category : defaultCategory, nutrient, name, defaultGram, calorie } = data?.data || {}
    const { register, handleSubmit, formState : { errors } } = useForm({
        defaultValues: data?.data ? {
            name,
            carbohydrate : nutrient[0]?.Carbohydrate,
            protein : nutrient[0]?.Protein,
            fat : nutrient[0]?.Fat,
            defaultGram,
            calorie
        } : {}
    })
    const [ category, setCategory ] = useState(defaultCategory || [])
    const { mutate, isPending } = useUpdateFood()

    const handleFormSubmit = (formData) => {
        mutate({ id, category , nutrient : [
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


    if (isGetPending) return <></>

    return <div id="admin-manager">
        <h1>음식 추가하기</h1>
        <hr />
        <form className="manager-content" onSubmit={handleSubmit(handleFormSubmit)}>
            <FormInput name='name' title='이름' register={register} errMsg={errors.name?.message}  defaultValue={name}/>
            <CategoryInput 
                category={category} 
                setCategory={setCategory}
                categoryOptions={categoryOptions}
            />
            <div className="input-flex">
                <FormInput name='carbohydrate' title='탄수화물' register={register} errMsg={errors.carbohydrate?.message}  defaultValue={nutrient[0]?.Carbohydrate}/>
                <FormInput name='protein' title='단백질' register={register} errMsg={errors.protein?.message}  defaultValue={nutrient[0]?.Protein}/>
                <FormInput name='fat' title='지방' register={register} errMsg={errors.fat?.message}  defaultValue={nutrient[0]?.Fat}/>
            </div>
            <FormInput name='defaultGram' title='개당 기본 그램' register={register} errMsg={errors.defaultGram?.message}  defaultValue={defaultGram}/>
            <FormInput name='calorie' title='개당 기본 칼로리' register={register} errMsg={errors.calorie?.message}  defaultValue={calorie}/>
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
