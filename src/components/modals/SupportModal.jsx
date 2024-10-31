import React, { useState } from "react";
import { useCredit } from "../../hooks/useCredit";
import CommonModal from "./CommonModal";
import AdInfo from "../slider/AdInfo";
import GradientButton from "../common/GradientButton";
import CreditIcon from "../../assets/icons/credit.svg";
import "./SupportModal.scss";

const SupportModal = ({ isOpen, onClose, idol }) => {
  const [creditValue, setCreditValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const { totalCredits, dispatch } = useCredit();

  const numericCreditValue = Number(creditValue);
  const isCreditZero = numericCreditValue === 0;
  const isCreditInvalid = isInvalid || totalCredits < numericCreditValue;

  const handleCreditChange = (e) => {
    const value = e.target.value;

    if (value.trim() === "") {
      setCreditValue(value);
      setIsInvalid(false);
      return;
    }

    if (!/^\d+$/.test(value) || numericCreditValue < 0) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }

    setCreditValue(value);
  };

  const handleSupport = () => {
    if (isCreditInvalid) {
      alert("후원이 실패하였습니다!");
    } else {
      dispatch({ type: "substractCredits", amount: numericCreditValue });
      alert("성공적으로 후원하였습니다!");
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title="후원하기">
      <div className="supportModalContent">
        <div className="supportIdol">
          <img
            className="supportModalImg"
            src={idol.profilePicture || "defaultImage.jpg"}
            alt={idol.name}
          />
          <AdInfo adLocation={idol.adLocation} name={idol.name} />
        </div>
        <div className="inputContainer">
          <input
            type="text"
            className={`inputCredit ${isCreditInvalid && creditValue.trim() !== "" ? "invalid" : ""}`}
            placeholder="크레딧 입력"
            value={creditValue}
            onChange={handleCreditChange}
          />
          <img src={CreditIcon} className="inputCreditIcon" alt="크레딧" />
        </div>
        {numericCreditValue > totalCredits && (
          <p className="inputErrorMessage">
            갖고있는 크레딧보다 더 많이 후원할 수 없어요
          </p>
        )}
        {isInvalid && creditValue.trim() !== "" && (
          <p className="inputErrorMessage">올바른 값을 입력해주세요</p>
        )}
        <GradientButton
          variant="supportButton"
          disabled={isCreditZero || isCreditInvalid}
          onClick={handleSupport}
        >
          후원하기
        </GradientButton>
      </div>
    </CommonModal>
  );
};

export default SupportModal;