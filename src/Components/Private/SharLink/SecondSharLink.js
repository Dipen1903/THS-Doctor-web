import React from 'react'
import { Container } from 'react-bootstrap'
const SecondSharLink = () => {
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
                <div className='sharelinksecond '>
                    <div className='secondDiv'>
                        <div>
                            <div className='textdiv'>
                                <h3 className='secondsharelink'>Share Consultation Link</h3>
                                <h2 className='secondh2'>Rs.500</h2>
                            </div>
                            <div className='textdiv'>
                                <h3 className='secondsharelink'>Followup Fee:</h3>
                                <h2 className='secondh2'>Rs.500</h2>
                            </div>
                        </div>
                        <div>
                            <button className='editbtn'>Edit Fees</button>
                        </div>
                    </div>
                    <h4 className='paycontent pt_20'>Select consultation type</h4>
                    <div className='firstpayment pt_20'>
                        <div className='firstpayment'>
                            <input type="checkbox" class="checkboxdesign" />
                            <p className='secondh2'>New </p>
                        </div>
                        <div className='firstpayment'>
                        <input type="checkbox" class="checkboxdesign" />
                            <p className='secondh2'>Follow up </p>
                        </div>

                    </div>
                    <div >

                    </div>
                </div>

            </div>
        </Container>
    )
}

export default SecondSharLink
