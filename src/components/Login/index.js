import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../Firebase/config';
import { addDocument, generateKeywords } from '../../Firebase/services';
import { FacebookAuthProvider } from "firebase/auth";

const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();

// const fbProvider = new firebase.auth.FacebookAuthProvider();
// const ghProvider = new firebase.auth.GithubProvider();

export default function Login() {
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName?.toLowerCase()),
            });
        }
    };

    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Convo-Cove
                    </Title>
                    <Button
                        style={{ width: '100%', marginBottom: 5 }}
                        //onClick={() => handleLogin(ghProvider)}
                    >
                        Log in with Github
                    </Button>
                    <Button
                        style={{ width: '100%' }}
                        onClick={() => handleLogin(fbProvider)}
                    >
                        Log in with Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}