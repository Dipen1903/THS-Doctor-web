import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { DoctorFees } from '../../../Store/Reducers/CommonReducer';
import { DoctorFeesUpdate } from '../../../Store/Reducers/CommonReducer';
import { useDispatch, useSelector } from "react-redux";

const ShareLinkHome = () => {
    const { CommonSlice } = useSelector((state) => state);
    const [consultationFee, setConsultationFee] = useState('');
    const [followupFee, setFollowupFee] = useState('');
    const dispatch = useDispatch();

    const navigates = async () => {
        try {
            const updatedConsultationFee = parseFloat(consultationFee);
            const updatedFollowupFee = parseFloat(followupFee);
            const result = await dispatch(
                DoctorFeesUpdate({
                    consulting_fee: updatedConsultationFee,
                    follow_up_fee: updatedFollowupFee,
                })
            );
            //   console.log('API call result', result);
            window.location.href = '/doctor/sharelinkhome';
        } catch (error) {
            //   console.error('API call error', error);
        }
    };

    useEffect(() => {
        dispatch(DoctorFees());
    }, [dispatch]);

    const { doctorFees } = CommonSlice;


    useEffect(() => {
        if (doctorFees && doctorFees?.consulting_fee) {
            setConsultationFee(doctorFees.consulting_fee.toString());
        }
        if (doctorFees && doctorFees?.follow_up_fee) {
            setFollowupFee(doctorFees.follow_up_fee.toString());
        }
    }, [doctorFees]);

    return (
        <Container
            fluid
            className="sharelink">
            <h4 className="sharelinkfont pt_30 mb_20">Share Consultation Link</h4>
            <div className='sharelinkmain'>
                <div>
                    <div className='sharelinkpadding'>
                        <div className='colordiv'></div>
                        <h3 className='sharetext'>Share Consultation Link</h3>
                    </div>
                    <hr className='hrline' />
                </div>
                <div className='sharelinksecond'>
                    <h4 className='sharelinkp'>SET YOUR FEES</h4>
                    <h4 className='sharelinkparagraph pt_5'>THS charges {doctorFees?.admin_commission}% (plus GST) as platform services.</h4>
                    <h4 className='paycontent pt_10'>How much fees do you want take from your <br />
                        patient?</h4>
                    <h4 className='paycontent pt_20'>Consultation Fee (Rs)</h4>
                    <div className='firstpayment pt_5'>
                        <input type='text' placeholder='' className='inputclass' value={consultationFee}
                            onChange={(e) => setConsultationFee(e.target.value)}></input>
                        <h4 className='cons'>You Earn</h4>
                        <h4 className='consultionfee'>Rs.{parseFloat(doctorFees?.consulting_fee) - parseFloat(doctorFees && doctorFees?.consulting_fee * doctorFees?.admin_commission / 100)}</h4>
                    </div>
                    <h4 className='paycontent pt_30'>Followup Fee (Rs)</h4>
                    <div className='firstpayment pt_5'>
                        <input type='text' placeholder='' className='inputclass' value={followupFee}
                            onChange={(e) => setFollowupFee(e.target.value)}></input>
                        <h4 className='cons'>You Earn</h4>
                        <h4 className='consultionfee'>Rs.{parseFloat(doctorFees?.follow_up_fee
                        ) - parseFloat(doctorFees && doctorFees?.follow_up_fee
                            * doctorFees?.admin_commission / 100)}</h4>
                    </div>
                    <button className='buttonsave mt_40' onClick={() => { navigates() }} >
                        Save & Continue
                    </button>

                </div>
            </div>

        </Container>

    )
}

export default ShareLinkHome
