import { FormInput } from "../../../../components/shared/FormInput/FormInput";
import { CategoryInput } from "../../../../components/shared/CategoryInput/CategoryInput";
import { useForm } from "react-hook-form";

export const AdminFoodUpdateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div id="admin-manager">
      <h1>음식 수정하기</h1>
      <hr />
      <form
        className="manager-content"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <FormInput
          name="name"
          title="이름"
          register={register}
          errMsg={errors.name?.message}
        />
        <CategoryInput />
        <div className="input-flex">
          <FormInput
            name="carbohydrate"
            title="탄수화물"
            register={register}
            errMsg={errors.carbohydrate?.message}
          />
          <FormInput
            name="protein"
            title="단백질"
            register={register}
            errMsg={errors.protein?.message}
          />
          <FormInput
            name="fat"
            title="지방"
            register={register}
            errMsg={errors.fat?.message}
          />
        </div>
        <FormInput
          name="defaultGram"
          title="개당 기본 그램"
          register={register}
          errMsg={errors.defaultGram?.message}
        />
        <FormInput
          name="calorie"
          title="개당 기본 칼로리"
          register={register}
          errMsg={errors.calorie?.message}
        />
        <button className="submit-btn">수정</button>
      </form>
    </div>
  );
};
