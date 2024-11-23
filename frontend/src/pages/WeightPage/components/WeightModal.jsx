import { useForm } from "react-hook-form";
import { useUpdateDailyWeight } from "../../../core/query/dailyWeight";
import { FormInput } from "../../../components/shared/FormInput/FormInput";
import { PendingButton } from "../../../components/shared/PendingButton/PendingButton";
import { dateParser } from "../../../core/utils/fn/dateParser";

export const WeightModal = ({date, close}) => {
    const { register, handleSubmit } = useForm()
    const { mutate } = useUpdateDailyWeight()

    const handleWeightSubmit = (formData) => {
        console.log({...formData, date : dateParser(date)})
        mutate({...formData, date : dateParser(date)}, {
            onSuccess : () => {
                close()
            }
        })
    }

    return (
        <div className="weight-update-modal">
            <h1>몸무게 수정</h1>
            <form action="" onSubmit={handleSubmit(handleWeightSubmit)}>
                <FormInput name='weight' type='number' title='체중' register={register}></FormInput>
                <PendingButton round='full' thema='point'>수정하기</PendingButton>
            </form>
        </div>
    );
};
