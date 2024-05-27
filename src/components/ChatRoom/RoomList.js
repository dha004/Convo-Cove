// Import necessary modules and components from React, Ant Design, and styled-components
import React from 'react';
import { Collapse, Typography, Button } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';

// Destructure Panel from Collapse component
const { Panel } = Collapse;

// Styled component for custom styling of Panel
const PanelStyled = styled(Panel)`
  &&& {
    // Custom styling for panel header and text color
    .ant-collapse-header,
    p {
      color: white;
    }

    // Padding adjustment for collapse content
    .ant-collapse-content-box {
      padding: 0 40px;
    }

    // Custom styling for 'Add Room' button
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

// Styled component for custom styling of Typography Link
const LinkStyled = styled(Typography.Link)`
  // Block display and margin adjustment for link
  display: block;
  margin-bottom: 5px;
  color: white; // Text color
`;

// Component for displaying the list of rooms
export default function RoomList() {
    // Access context variables for rooms, visibility of add room modal, and selected room
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = React.useContext(AppContext);

    // Function to handle adding a new room
    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };

    return (
        // Collapse component to display room list with collapsible panels
        <Collapse ghost defaultActiveKey={['1']}>
            {/* Custom-styled panel for room list */}
            <PanelStyled header='Room Lists' key='1'>
                {/* Iterate through rooms and display as clickable links */}
                {rooms.map((room) => (
                    <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
                        {room.name}
                    </LinkStyled>
                ))}
                {/* Button to add a new room */}
                <Button
                    type='text'
                    icon={<PlusSquareOutlined />}
                    className='add-room'
                    onClick={handleAddRoom}
                >
                    Add Room
                </Button>
            </PanelStyled>
        </Collapse>
    );
}
