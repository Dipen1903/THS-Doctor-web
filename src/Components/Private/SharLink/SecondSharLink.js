import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Link from "../../../Assets/img/png/link.png";
import share from '../../../Assets/img/svg/share.svg';
import PHONE from '../../../Assets/img/png/mobile phone.png'
import ARROW from '../../../Assets/img/svg/upload.svg';
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ModalComponent from './ModalComponent';
import UploadModal from './UploadModal.js';
import UploadSendLink from './UploadSendLink';
// import firebase from 'firebase/compat/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyAJh9bSIe-gZ74qFYxfWzsOmkr_z1FviyA",
//     authDomain: "thsmedical-3333e.firebaseapp.com",
//     projectId: "thsmedical-3333e",
//     storageBucket: "thsmedical-3333e.appspot.com",
//     messagingSenderId: "850749344600",
//     appId: "1:850749344600:web:64d72f1207caea2af3332d",
//     measurementId: "G-41PQEPW141",
// };

// firebase.initializeApp(firebaseConfig);


const SecondSharLink = () => {
    const [data, SetData] = useState(false);
    const [uploadModal , SetUploadModal]= useState(false);
    const [uploadLink , SetUploadLink] = useState(false);
    // const handleShareButtonClick = async () => {
    //     try {
    //         const dynamicLinkURL = 'https://medicaluser.page.link/y1E4';
    //         const dynamicLinks = firebase.dynamicLinks();
    //         const link = await dynamicLinks.buildLink({
    //             link: dynamicLinkURL,
    //             domainUriPrefix: 'https://medicaluser.page.link',
    //             android: {
    //                 packageName: 'com.medical.userapp',
    //             },
    //             ios: {
    //                 bundleId: 'com.medicaluser.app',
    //             },
    //             social: {
    //                 title: 'Check out this awesome content!',
    //                 description: 'This is the content description.',
    //             },
    //         });
    //         console.log('Dynamic Link:', link);
    //         console.log('Share this link:', link);
    //     } catch (error) {
    //         console.error('Error generating dynamic link:', error);
    //     }
    // };
    return (
        <>
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
                    <div className='sharelinksecond' style={{ width: "25%" }}>
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
                        <hr />
                        <h4 className='paycontent pt_10'>Link</h4>
                        <div class="input-container pt_4">
                            <input type="text" placeholder="https://www.ths.com/p...." id="linkInput" />
                            <span id="copyLinkText">
                                <img src={Link}></img>
                                Copy link</span>
                        </div>
                        <div>
                            <button className='sharebtn' onClick={() =>SetUploadLink(true)}>
                                <div className='shreflex'>
                                    <img src={share} alt='Share Icon' />
                                    <h4 className='paycontent'>Share Link</h4>
                                </div>
                            </button>
                            <button className='sharebtn2' onClick={() => SetUploadModal(true)} >
                                <div className='shreflex'>
                                    <img src={ARROW} alt='Share Icon' />
                                    <h4 className='paycontent'>Upload Excel Sheet</h4>
                                </div>
                            </button>
                            <button className='sharebtn3' onClick={() => { SetData(true); }} >
                                <div className='shreflex'>
                                    <img src={PHONE} alt='Share Icon' />
                                    <h4 className='paycontent'>Direct Share on Contact Number</h4>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
            <ModalComponent isOpen={data} onClose={() => SetData(false)} />
            <UploadModal isOpen={uploadModal} onClose={() => SetUploadModal(false)}/>
            <UploadSendLink isOpen={uploadLink} onClose={() => SetUploadLink(false)} />
        </>
    )
}

export default SecondSharLink




