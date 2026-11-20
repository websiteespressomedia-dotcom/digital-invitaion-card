
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./WeddingGift.css";
import { weddingGiftConfig } from "../../data/weddingGiftConfig";

function WeddingGift() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(2501);
  const [customAmount, setCustomAmount] = useState("");

  const amount = customAmount.trim()
    ? Number(customAmount)
    : selectedAmount;

  const isValidAmount =
    Number.isSafeInteger(amount) && amount > 0;

  // Detect mobile devices
  const isMobileDevice = () => {
    return /Android|iPhone|iPad|iPod|Mobile/i.test(
      navigator.userAgent
    );
  };

  // Create UPI payment link
  const upiUrl = weddingGiftConfig.upiId && isValidAmount
    ? `upi://pay?${new URLSearchParams({
        pa: weddingGiftConfig.upiId,
        pn: weddingGiftConfig.recipientName,
        am: String(amount),
        cu: "INR",
        tn: weddingGiftConfig.paymentNote,
      }).toString()}`
    : "";

  // Lock background scrolling while popup is open
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setShowQr(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Open UPI on mobile, show QR on desktop
  const handlePayment = () => {
    if (!upiUrl || !isValidAmount) return;

    if (isMobileDevice()) {
      window.location.href = upiUrl;
    } else {
      setShowQr(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowQr(false);
  };

  return (
    <section className="wedding-gift">

      {/* Main Wedding Gift Section */}
      <div className="gift-main-content">

        <div className="gift-decoration">✧</div>

        <p className="gift-eyebrow">
          A TOKEN OF LOVE
        </p>

        <h2>Wedding Gift</h2>

        <p className="gift-message">
          Your presence is our greatest gift.
          If you wish to bless us with something more,
          you can share a little gift with us.
        </p>

        <button
          type="button"
          className="gift-open-button"
          onClick={() => {
            setShowQr(false);
            setIsModalOpen(true);
          }}
        >
          <span>SEND A GIFT</span>
          <span className="gift-button-arrow">↗</span>
        </button>

        <p className="gift-footer">
          MADE WITH LOVE <span>✦</span>
        </p>

      </div>

      {/* Gift Popup */}
      {isModalOpen && (
        <div
          className="gift-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="gift-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-modal-title"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              className="gift-modal-close"
              onClick={closeModal}
              aria-label="Close popup"
            >
              ×
            </button>

            {!showQr ? (
              <>
                <div className="gift-modal-decoration">✧</div>

                <p className="gift-eyebrow">
                  A LITTLE GIFT OF LOVE
                </p>

                <h3 id="gift-modal-title">
                  Choose Your Gift
                </h3>

                <p className="gift-modal-message">
                  A little blessing, a beautiful memory.
                  Thank you for being part of our celebration.
                </p>

                {/* Suggested Amounts */}
                <div className="gift-amounts">
                  {weddingGiftConfig.suggestedAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`gift-amount ${
                        !customAmount && selectedAmount === value
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedAmount(value);
                        setCustomAmount("");
                      }}
                    >
                      ₹{value.toLocaleString("en-IN")}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="gift-custom">
                  <label htmlFor="custom-gift">
                    OR ENTER A CUSTOM AMOUNT
                  </label>

                  <div className="gift-input">
                    <span>₹</span>

                    <input
                      id="custom-gift"
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(event) => {
                        setCustomAmount(event.target.value);
                      }}
                    />
                  </div>
                </div>

                {/* Selected Amount */}
                <div className="gift-total">
                  <span>Your Gift</span>

                  <strong>
                    ₹{isValidAmount
                      ? amount.toLocaleString("en-IN")
                      : "0"}
                  </strong>
                </div>

                {/* Continue Payment */}
                {/* <button
                  type="button"
                  className="gift-pay-button"
                  disabled={
                    !weddingGiftConfig.upiId || !isValidAmount
                  }
                  onClick={handlePayment}
                >
                  CONTINUE TO PAYMENT ↗
                </button> */}

                {/* QR fallback on mobile */}
                <button
                  type="button"
                  className="gift-qr-fallback"
                  disabled={
                    !weddingGiftConfig.upiId || !isValidAmount
                  }
                  onClick={() => setShowQr(true)}
                >
                  PAY USING QR CODE
                </button>

                {!weddingGiftConfig.upiId && (
                  <p className="gift-note">
                    Payment details will be available soon.
                  </p>
                )}
              </>
            ) : (
              /* Desktop QR Payment View */
              <div className="gift-qr-view">

                <div className="gift-modal-decoration">✧</div>

                <p className="gift-eyebrow">
                  COMPLETE YOUR GIFT
                </p>

                <h3 id="gift-modal-title">
                  Scan to Pay
                </h3>

                <p className="gift-modal-message">
                  Scan this QR code using any supported
                  UPI payment app on your phone.
                </p>

                <div className="gift-qr-container">
                  <QRCodeSVG
                    value={upiUrl}
                    size={190}
                    level="M"
                    includeMargin
                    bgColor="#ffffff"
                    fgColor="#293b4d"
                  />
                </div>

                <div className="gift-qr-amount">
                  <span>Your Gift Amount</span>
                  <strong>
                    ₹{amount.toLocaleString("en-IN")}
                  </strong>
                </div>

                <p className="gift-qr-account">
                  Payment to: {weddingGiftConfig.recipientName}
                </p>

                <button
                  type="button"
                  className="gift-pay-button"
                  onClick={() => setShowQr(false)}
                >
                  CHANGE AMOUNT
                </button>

                <p className="gift-note">
                  Please verify the recipient and amount
                  in your UPI app before authorizing payment.
                </p>

              </div>
            )}

            <p className="gift-modal-footer">
              THANK YOU FOR YOUR LOVE
            </p>

          </div>
        </div>
      )}

    </section>
  );
}

export default WeddingGift;
