import React, { useState, useEffect } from 'react';
import './TimelineSchedule.css';

const TimelineSchedule = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/foss4g-asia2024-timetable-ja/foss4g_asia_2024_sessions_translated.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  // 30分刻みのタイムスロットを生成
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  // 時間をグリッド位置に変換
  const getGridPosition = (timeRange) => {
    const startTime = timeRange.split('-')[0];
    const [hours, minutes] = startTime.split(':').map(Number);
    return (hours - 9) * 2 + (minutes === 30 ? 1 : 0) + 1;
  };

  // セッションの長さをグリッドスパンに変換
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

// セッションカードコンポーネント
const SessionCard = ({ session, onClick }) => {
  const gridPosition = getGridPosition(session.time_range);
  const durationSpan = getDurationSpan(session.time_range);

  return (
    <div
      className="session-card"
      style={{
        top: `${(gridPosition - 1) * 80}px`,
        height: `${durationSpan * 80}px`,
      }}
      onClick={onClick}
    >
      <div className="session-time">{session.time_range}</div>
      <h3 className="session-title">{session.title}</h3>
      <div className="session-speaker">{session.speaker}</div>
    </div>
  );
};

  // モーダルコンポーネント
  const SessionModal = ({ session, onClose }) => {
    if (!session) return null;
  
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>&times;</button>
          <div className="modal-scroll">
            <div className="modal-header">
              <h2 className="modal-title">{session.title}</h2>
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
                <span className="meta-item">{session.date}</span>
                <span className="meta-item">{session.time_range}</span>
                <span className="meta-item">{session.location}</span>
              </div>
              <div className="session-speaker-info">
                <h3>発表者</h3>
                <p>{session.speaker}</p>
              </div>
              {session.abstract_ja ? (
                <div className="session-abstract">
                  <h3>概要</h3>
                  <p>{session.abstract_ja}</p>
                </div>
              ) : session.abstract && (
                <div className="session-abstract">
                  <h3>Abstract</h3>
                  <p>{session.abstract}</p>
                </div>
              )}
              {session.description_ja ? (
                <div className="session-description">
                  <h3>説明</h3>
                  <p>{session.description_ja}</p>
                </div>
              ) : session.description && (
                <div className="session-description">
                  <h3>Description</h3>
                  <p>{session.description}</p>
                </div>
              )}
            </div>
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
                      <SessionCard
                        key={`${session.date}-${session.time_range}-${session.location}`}
                        session={session}
                        onClick={() => setSelectedSession(session)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <SessionModal 
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </div>
  );
};

export default TimelineSchedule;