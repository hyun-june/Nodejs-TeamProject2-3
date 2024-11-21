import "./WeightPage.css";
import { Header } from "../../components/shared/Header/Header";
import { useGetMy } from "../../core/query/user";


export const WeightPage = () => {
    const { data, error , isPending } = useGetMy()

    if (isPending) return <>로딩중</>



  return (
    <div className="weight-page">
        <Header backTo={'/'} title='몸무게'></Header>
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
    </div>
  );
};
