import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import La from "../Reservation/lalala";
let InfoBox = styled.div`
&:hover {                
    background: #FFD2D5;
  }
  left: -10%;
   position: relative;
   width: 400px;
   height: 40px;

   text-align: center;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;
let Cell = styled.li`

   position: relative;
   top: -5px;
   float: left;
   width: 220px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
//useState({ endTime: "", equipmentName: "", equipmentNameNth: "", reservationID: 0, startTime: "", userID: "" });


const selectedEquipment = (EquipmentId, EquipmentName, EquipmentNth, e) => {
    console.log($("#originEquip").val());
    console.log($("#EquipmentMatchID").val());
    $("#EquipmentNameMatched").val(EquipmentName + "/" + EquipmentNth);
    if (EquipmentId != $("#originEquip").val()) {
        $("#EquipmentMatchID").val(EquipmentId);
        $("#MatchedIMG").attr("src", "./icon/icon_unmatching.png");
        $("#matchingID").val(0);
    }
    else {
        $("#MatchedIMG").attr("src", "./icon/icon_matching.png");
        $("#matchingID").val(1);
    }
}
function EEItem({ key, ESLId, EquipmentId, EquipmentName, EquipmentNth }) {
    let eslIDinfo = ESLId;
    if (ESLId == "" || ESLId == " " || ESLId == null) {
        eslIDinfo = "None";
    }
    return (
        <div style={{ cursor: 'pointer' }} onClick={(e) => { selectedEquipment(EquipmentId, EquipmentName, EquipmentNth, e) }}>
            <div>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={ESLId} />
                    <Cell style={{ float: 'left', fontSize: '17px', width: '120px' }} id="equiID">&nbsp;{EquipmentId}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: '250px' }} id="equipmentInfo">{EquipmentName}/{EquipmentNth}</Cell>
                </ InfoBox >
            </div >
        </div>
    );
}
export default EEItem;