import React from 'react'
import { format } from 'timeago.js';

const QuizInfo = ({ startDate, endDate }) => {
    const now = new Date();

    // Ensure startDate and endDate are Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeRemainingStartMs = start - now;
    const timeRemainingEndMs = end - now;

    const daysUntilStart = Math.floor(timeRemainingStartMs / (1000 * 60 * 60 * 24));
    const hoursUntilStart = Math.floor((timeRemainingStartMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesUntilStart = Math.floor((timeRemainingStartMs % (1000 * 60 * 60)) / (1000 * 60));
    const secondsUntilStart = Math.floor((timeRemainingStartMs % (1000 * 60)) / 1000);

    const daysUntilEnd = Math.floor(timeRemainingEndMs / (1000 * 60 * 60 * 24));
    const hoursUntilEnd = Math.floor((timeRemainingEndMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesUntilEnd = Math.floor((timeRemainingEndMs % (1000 * 60 * 60)) / (1000 * 60));
    const secondsUntilEnd = Math.floor((timeRemainingEndMs % (1000 * 60)) / 1000);

    const hasStarted = start <= now;
    const hasEnded = end <= now;

    return (
        <div className='quiz-status'>
            {hasStarted ? (
                <p>Started on: <span>{format(start.toLocaleString())}</span></p>
            ) : (
                <p>Starts in: <span>{daysUntilStart > 0 && `${daysUntilStart} day `}
                    {hoursUntilStart > 0 && `${hoursUntilStart} hours `}
                    {minutesUntilStart > 0 && `${minutesUntilStart} minutes `}
                    {`${secondsUntilStart} seconds`}
                </span></p>
            )}

            {hasEnded ? (
                <p>Ended on: <span>{format(end.toLocaleString())}</span></p>
            ) : (
                <p>Ends in: <span>{daysUntilEnd > 0 && `${daysUntilEnd} day `}
                    {hoursUntilEnd > 0 && `${hoursUntilEnd} hours `}
                    {minutesUntilEnd > 0 && `${minutesUntilEnd} minutes `}
                    {`${secondsUntilEnd} seconds`}
                </span></p>
            )}
        </div>
    )
}

export default QuizInfo;
