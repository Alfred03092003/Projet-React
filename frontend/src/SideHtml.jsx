import React from "react";
import "./Components/Sidebar.css";
import { FaQrcode, FaLink, FaStream, FaCalendarWeek, FaQuestionCircle, FaSlidersH, FaPhoneVolume, FaComments, FaFacebook,FaTwitter, FaInstagram, FaYoutube} from "react-icons/fa";

const SideHtml = () => {
    return (
        <div className="main_box">
            <div className="sidebar_menu">
                <div className="logo">
                    <a href="#">CodinLab</a>
                </div>
                <ul>
                    <li><a href="#"><FaQrcode />Dashboard</a></li>
                    <li><a href="#"><FaLink />Shortcuts</a></li>
                    <li><a href="#"><FaStream />Overview</a></li>
                    <li><a href="#"><FaCalendarWeek />Events</a></li>
                    <li><a href="#"><FaQuestionCircle />About</a></li>
                    <li><a href="#"><FaSlidersH />Services</a></li>
                    <li><a href="#"><FaPhoneVolume />Contact</a></li>
                    <li><a href="#"><FaComments />Feedback</a></li>
                </ul>
            </div> 
            <div className="social-media">
                <a href=""><FaFacebook/></a>
                <a href=""><FaTwitter/></a>
                <a href=""><FaInstagram/></a>
                <a href=""><FaYoutube/></a>
            </div>
        </div>
    )
}

export default SideHtml;