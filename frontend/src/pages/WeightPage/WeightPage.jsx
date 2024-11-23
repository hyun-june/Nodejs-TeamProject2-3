import { Header } from "../../components/shared/Header/Header";
import { Button } from "../../components/shared/Button/Button";
import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { FormInput } from "../../components/shared/FormInput/FormInput";
import { PendingButton } from "../../components/shared/PendingButton/PendingButton";
import { useForm } from "react-hook-form";
import "./WeightPage.css";
// import { useState } from 'react';

export const WeightPage = () => {
    const { bottomSheetProps , open} = useBottomSheet()
    const { register, handleSubmit } = useForm()
    // const [value, onChange] = useState(new Date());

    const handleModalOpen = () => {
        open()
    }

    const handleWeightSubmit = (formData) => {
        console.log(formData)
        // open()
    }

    return (
        <div className="weight-page">
            <Header backTo={'/'} title='몸무게'></Header>
            <div>
                {/* <Calendar onChange={onChange} value={value} /> */}
            </div>
            <main>
                <section>
                    <h3>53.4kg</h3>
                </section>
                <section>
                    <div className="straght-progress sky-thema">
                        <div className="straght-progress-head">
                            <h4>BMI</h4>
                            <div className="progress-number">
                                <span>16.5</span>
                            </div>
                        </div>
                        <div className="straght-progress-bar">
                            <div/>
                        </div>
                    </div>
                </section>
                <section>
                    차트
                </section>
            </main>
            <Button className='submit-btn' round='full' onClick={handleModalOpen}>몸무게 입력하기</Button>
            <BottomSheet {...bottomSheetProps}>
                <div className="weight-update-modal">
                    <h1>몸무게 수정</h1>
                    <form action="" onSubmit={handleSubmit(handleWeightSubmit)}>
                        <FormInput name='weight' type='number' title='체중' register={register}></FormInput>
                    </form>
                    <PendingButton round='full' thema='point'>수정하기</PendingButton>
                </div>
            </BottomSheet>
        </div>
    );
};
