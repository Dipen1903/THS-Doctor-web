import React, { useState, useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import Link from "../../../Assets/img/png/link.png";
import share from '../../../Assets/img/svg/share.svg';
import PHONE from '../../../Assets/img/png/mobile phone.png'
import ARROW from '../../../Assets/img/svg/upload.svg';
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ModalComponent from './ModalComponent';
import UploadModal from './UploadModal.js';
import UploadSendLink from './UploadSendLink';
import { DoctorFees, DoctorLinks } from '../../../Store/Reducers/CommonReducer';
import { useDispatch, useSelector } from "react-redux";
import { DoctorLink } from '../../../Routes/Service';
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
    const [uploadModal, SetUploadModal] = useState(false);
    const [uploadLink, SetUploadLink] = useState(false);
    const { CommonSlice, ProfileSlice } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [isNewChecked, setIsNewChecked] = useState('1');
    const [isFollowUpChecked, setIsFollowUpChecked] = useState(false);
    const [apiResponse, setApiResponse] = useState('');
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
    console.log("apiResponse", apiResponse);

    useEffect(() => {
        dispatch(DoctorFees());
        // dispatch(DoctorLink(1));
    }, [dispatch]);
    const linkInputRef = useRef(null);

    const {
        doctorFees,
        doctorLink
    } = CommonSlice;
    const navigates = () => {
        window.location.href = '/doctor/sharelink'
    }

    useEffect(() => {
        if (isNewChecked || isFollowUpChecked) {
            const consultationType = getConsultationType();
            callApi(consultationType);
        }
    }, [isNewChecked, isFollowUpChecked]);

    const handleNewCheckboxChange = (event) => {
        setIsNewChecked(event.target.checked);
        // If "New" is checked, make sure "Follow up" is unchecked
        if (event.target.checked) {
            setIsFollowUpChecked(false);
        }
    };

    const handleFollowUpCheckboxChange = (event) => {
        setIsFollowUpChecked(event.target.checked);
        // If "Follow up" is checked, make sure "New" is unchecked
        if (event.target.checked) {
            setIsNewChecked(false);
        }
    };;

    const getConsultationType = () => {
        if (isNewChecked && isFollowUpChecked) {
            return '1,2';
        } else if (isNewChecked) {
            return '1';
        } else if (isFollowUpChecked) {
            return '2';
        } else {
            return '';
        }
    };

    const callApi = async (consultationType) => {
        try {
            const result = await dispatch(DoctorLinks(consultationType));
            // console.log('API call result', result);
            setApiResponse(result?.payload?.url || '');
        } catch (error) {
            // console.error('API call error', error);
        }
    };
    const handleCopyLinkClick = () => {
        if (linkInputRef.current) {
            // Set the input value to the full link (apiResponse)
            linkInputRef.current.value = apiResponse;
            console.log("apiResponse-----", apiResponse);
            linkInputRef.current.select();
            document.execCommand('copy');
        }
    };

    const truncateLink = (text) => {
        if (text.length > 20) {
            return text.slice(0, 20) + '...';
        }
        return text;
    };
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
                                    <h2 className='secondh2'>Rs.{parseFloat(doctorFees?.consulting_fee) - parseFloat(doctorFees && doctorFees?.consulting_fee * doctorFees?.admin_commission / 100)}</h2>
                                </div>
                                <div className='textdiv'>
                                    <h3 className='secondsharelink'>Followup Fee:</h3>
                                    <h2 className='secondh2'>Rs.{parseFloat(doctorFees?.follow_up_fee
                                    ) - parseFloat(doctorFees && doctorFees?.follow_up_fee
                                        * doctorFees?.admin_commission / 100)}</h2>
                                </div>
                            </div>
                            <div>
                                <button className='editbtn' onClick={() => { navigates() }}>Edit Fees</button>
                            </div>
                        </div>
                        <h4 className='paycontent pt_20'>Select consultation type</h4>
                        <div className='firstpayment pt_20'>
                            <div className='firstpayment'>
                                <input
                                    type='checkbox'
                                    className='checkboxdesign'
                                    checked={isNewChecked}
                                    onChange={handleNewCheckboxChange}
                                />
                                <p className='secondh2'>New</p>
                            </div>
                            <div className='firstpayment'>
                                <input
                                    type='checkbox'
                                    className='checkboxdesign'
                                    checked={isFollowUpChecked}
                                    onChange={handleFollowUpCheckboxChange}
                                />
                                <p className='secondh2'>Follow up</p>
                            </div>
                        </div>
                        <hr />
                        <h4 className='paycontent pt_10'>Link</h4>
                        <div class="input-container pt_4">
                            <input
                                type="text"
                                placeholder="https://www.ths.com/p...."
                                id="linkinput"
                                ref={linkInputRef} // <-- Step 1: Attach the ref to the input
                                value={truncateLink(apiResponse)}
                                onChange={(e) => setApiResponse(e.target.value)}
                                style={{ fontSize: '10px' }} // <-- Add this style to set the font size to 10px
                            />
                            <span id="copyLinkText" onClick={handleCopyLinkClick}> {/* Step 2: Add onClick event */}
                                <img src={Link} alt="Copy Link Icon" /> Copy link
                            </span>
                        </div>
                        <div>
                            <button className='sharebtn' onClick={() => { SetData(true); }}>
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
                            {/* <button className='sharebtn3' onClick={() => { SetData(true); }} >
                                <div className='shreflex'>
                                    <img src={PHONE} alt='Share Icon' />
                                    <h4 className='paycontent'>Direct Share on Contact Number</h4>
                                </div>
                            </button> */}
                        </div>
                    </div>
                </div>
            </Container>
            <ModalComponent isOpen={data} onClose={() => SetData(false)} />
            <UploadModal isOpen={uploadModal} onClose={() => SetUploadModal(false)} />
            <UploadSendLink isOpen={uploadLink} onClose={() => SetUploadLink(false)} />
        </>
    )
}

export default SecondSharLink




