import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';

// Styled component for message wrapper with custom CSS
const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

// Helper function to format the date relative to the current time
function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
        // Convert seconds to a Date object and format it
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());

        // Capitalize the first letter of the formatted date string
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
}

// Message component to display individual chat messages
export default function Message({ text, displayName, createdAt, photoURL }) {
    return (
        <WrapperStyled>
            <div>
                {/* Avatar for the message author */}
                <Avatar size='small' src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                {/* Display author name */}
                <Typography.Text className='author'>{displayName}</Typography.Text>
                {/* Display formatted date */}
                <Typography.Text className='date'>
                    {formatDate(createdAt?.seconds)}
                </Typography.Text>
            </div>
            <div>
                {/* Display message text */}
                <Typography.Text className='content'>{text}</Typography.Text>
            </div>
        </WrapperStyled>
    );
}
