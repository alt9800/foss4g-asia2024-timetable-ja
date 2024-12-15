// TimelineSchedule.js
import React, { useState, useEffect } from 'react';
import './TimelineSchedule.css';

const TimelineSchedule = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    // import.meta.env.BASE_URL を使用してベースパスを取得
    const jsonPath = `${import.meta.env.BASE_URL}foss4g_asia_2024_sessions_translated.json`;
    console.log('Fetching JSON from:', jsonPath); // デバッグ用
  
    fetch(jsonPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Loaded data:', data); // デバッグ用
        setSessions(data);
      })
      .catch(error => {
        console.error('Error loading sessions:', error);
      });
  }, []);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const getGridPosition = (timeRange) => {
    const startTime = timeRange.split('-')[0];
    const [hours, minutes] = startTime.split(':').map(Number);
    return (hours - 9) * 2 + (minutes === 30 ? 1 : 0) + 1;
  };

  const getDurationSpan = (timeRange) => {
    const [start, end] = timeRange.split('-');
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    const durationInMinutes = (endHour - startHour) * 60 + (endMin - startMin);
    return Math.ceil(durationInMinutes / 30);
  };

  const rooms = [
    'Auditorium Hall 1',
    'Auditorium Hall 2',
    'Room34-1104',
    'Room34-1102',
    'Room34-1101',
    'Room11-503',
    'Room11-504'
  ];

  const dates = [
    '2024-12-15',
    '2024-12-16',
    '2024-12-17',
    '2024-12-18'
  ];

  const Modal = ({ session, onClose }) => {
    if (!session) return null;

    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{session.title}</h2>
            <a 
              href={session.url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              ↗
            </a>
          </div>
          <div className="modal-body">
            <div className="session-meta">
              {session.date} | {session.time_range} | {session.location}
            </div>
            <div className="session-speaker">
              <h3>Speaker</h3>
              <p>{session.speaker}</p>
            </div>
            <div className="session-abstract">
              <h3>Abstract</h3>
              <p>{session.abstract_ja}</p>
            </div>
            {session.description && (
              <div className="session-description">
                <h3>Description</h3>
                <p>{session.description_ja}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="timeline-container">
      {dates.map(date => (
        <div key={date} className="date-section">
          <h2 className="date-header">
            {new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          <div className="timeline-grid">
            <div className="time-axis">
              {generateTimeSlots().map(time => (
                <div key={time} className="time-slot">
                  <span>{time}</span>
                </div>
              ))}
            </div>

            {rooms.map(room => (
              <div key={room} className="room-track">
                <div className="room-header">{room}</div>
                <div className="track-content">
                  {sessions
                    .filter(session => session.date === date && session.location === room)
                    .map(session => (
                      <div
                        key={session.url}
                        className="session-card"
                        style={{
                          top: `${(getGridPosition(session.time_range) - 1) * 64}px`,
                          height: `${getDurationSpan(session.time_range) * 64}px`,
                        }}
                        onClick={() => setSelectedSession(session)}
                      >
                        <div className="session-time">{session.time_range}</div>
                        <h3 className="session-title">{session.title}</h3>
                        <div className="session-speaker">{session.speaker}</div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedSession && (
        <Modal 
          session={selectedSession} 
          onClose={() => setSelectedSession(null)} 
        />
      )}
    </div>
  );
};

export default TimelineSchedule;