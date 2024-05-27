import React, { useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth'; 
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';
import '../../Firebase/config'; 


const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83); // Bottom border color

  // Styling for username text
  .username {
    color: white; // Text color
    margin-left: 5px; // Left margin
  }
`;


export default function UserInfo() {

    const { user } = useContext(AuthContext);
    const { clearState } = useContext(AppContext);
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            console.log('Logging out...');
        
            clearState();
       
            await signOut(auth);
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (

        <WrapperStyled>
            <div>
                <Avatar src={user.photoURL}>
                    {user.photoURL ? '' : user.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className='username'>{user.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleLogout}>
                Log out
            </Button>
        </WrapperStyled>
    );
}
