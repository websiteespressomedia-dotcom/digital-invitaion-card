import { useEffect, useRef, useState } from "react";
import "./AddToCalendar.css";
import { calendarConfig } from "../../data/addToCalendarConfig";

function AddToCalendar() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth entrance when section enters the screen
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleAddToCalendar = () => {
    const formatDate = (date) =>
      date.replace(/[-:]/g, "").slice(0, 15);

    const startDate = formatDate(
      calendarConfig.startDateTime
    );

    const endDate = formatDate(
      calendarConfig.endDateTime
    );

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: calendarConfig.title,
      dates: `${startDate}/${endDate}`,
      ctz: calendarConfig.timeZone,
      details: calendarConfig.description,
      location: calendarConfig.venueAddress,
    });

    const calendarUrl =
      `https://calendar.google.com/calendar/render?${params.toString()}`;

    window.open(
      calendarUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`add-calendar-section ${
        isVisible ? "calendar-visible" : ""
      }`}
    >
      {/* Decorative background */}
      <div className="calendar-orbit calendar-orbit-one" />
      <div className="calendar-orbit calendar-orbit-two" />

      <div className="calendar-content">

        {/* Decorative Icon */}
        <div className="calendar-emblem">
          <span>✦</span>
        </div>

        <p className="calendar-eyebrow">
          A DATE TO REMEMBER
        </p>

        <h2 className="calendar-heading">
          {calendarConfig.heading}
        </h2>

        <p className="calendar-description">
          {calendarConfig.subtitle}
        </p>

        {/* Event Details */}
        <div className="calendar-event-details">

          <div className="calendar-detail">
            <span className="calendar-detail-icon">✧</span>

            <div>
              <span className="calendar-detail-label">
                DATE
              </span>

              <strong>
                {calendarConfig.dateLabel}
              </strong>
            </div>
          </div>

          <div className="calendar-detail">
            <span className="calendar-detail-icon">⌖</span>

            <div>
              <span className="calendar-detail-label">
                VENUE
              </span>

              <strong>
                {calendarConfig.venueName}
              </strong>
            </div>
          </div>

        </div>

        {/* Add to Calendar */}
        <button
          type="button"
          className="calendar-add-button"
          onClick={handleAddToCalendar}
        >
          <span className="calendar-button-icon">▦</span>

          <span>ADD TO CALENDAR</span>

          <span className="calendar-button-arrow">↗</span>
        </button>

        <p className="calendar-footer">
          KEEP THIS MOMENT CLOSE <span>✦</span>
        </p>

      </div>
    </section>
  );
}

export default AddToCalendar;
