import React from 'react'
import { Container } from 'react-bootstrap'

const ShareLinkHome = () => {
    const navigates = () => {
        window.location.href='/doctor/sharelinkhome'
    }
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
                    <h4 className='sharelinkparagraph pt_5'>THS charges 10% (plus GST) as platform services.</h4>
                    <h4 className='paycontent pt_10'>How much fees do you want take from your <br />
                        patient?</h4>
                    <h4 className='paycontent pt_20'>Consultation Fee (Rs)</h4>
                    <div className='firstpayment pt_5'>
                        <input type='text' placeholder='500' className='inputclass'></input>
                        <h4 className='cons'>You Earn</h4>
                        <h4 className='consultionfee'>Rs. 400</h4>
                    </div>
                    <h4 className='paycontent pt_30'>Followup Fee (Rs)</h4>
                    <div className='firstpayment pt_5'>
                        <input type='text' placeholder='500' className='inputclass'></input>
                        <h4 className='cons'>You Earn</h4>
                        <h4 className='consultionfee'>Rs. 400</h4>
                    </div>
                    <button className='buttonsave mt_40' onClick={() => {navigates()}} >
                    Save & Continue
                    </button>
                </div>

            </div>
        </Container>
    )
}

export default ShareLinkHome
