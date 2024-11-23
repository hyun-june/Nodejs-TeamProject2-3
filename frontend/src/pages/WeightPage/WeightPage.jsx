import { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { Header } from "../../components/shared/Header/Header";
import { Button } from "../../components/shared/Button/Button";
import { BottomSheet } from "../../components/shared/BottomSheet/BottomSheet";
import { useBottomSheet } from "../../components/shared/BottomSheet/components/useBottomSheet";
import { useGetDailyWeight } from "../../core/query/dailyWeight";
import { WeightModal } from "./components/WeightModal";
import { dateParser } from "../../core/utils/fn/dateParser";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdMonitorWeight } from "react-icons/md";
import "./WeightPage.css";
import { useGetMyInfo } from '../../core/query/user';
const customStyles = {
    content: {
        position : 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const WeightPage = () => {
    const { bottomSheetProps , open, close} = useBottomSheet()
    const [modalIsOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const parseDate = dateParser(date)
    const { data } = useGetDailyWeight({ date : parseDate})
    const weight = data?.data?.weight

    const handleCalendarChange = (date) => {
        setDate(date)
    }

    return (
        <div className="weight-page">
            <Header backTo={'/'} title='몸무게'></Header>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={()=> setIsOpen(false)}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <Calendar onChange={handleCalendarChange} value={date} />       
            </Modal>
            <main>
                <section className='date-section' onClick={() => setIsOpen(true)}>
                    <FaRegCalendarAlt />
                    <h3>{ parseDate } </h3>
                    <div style={{flexGrow : 1}}/>
                    <IoIosArrowDown />
                </section>
                <section className='weight-page-weight-section'>
                    <MdMonitorWeight size={30}/>
                    <h3>{weight ? `${weight}kg` : '기록해보세요!'} </h3>
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
                {/* <section>
                    차트
                </section> */}
            </main>
            <Button className='submit-btn' round='full' onClick={open}>몸무게 입력하기</Button>
            <BottomSheet {...bottomSheetProps}>
                <WeightModal date={date} close={close}/>
            </BottomSheet>
        </div>
    );
};