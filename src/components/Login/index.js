import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import { auth } from '../../Firebase/config';
import { addDocument, generateKeywords } from '../../Firebase/services';
import { signInWithPopup } from 'firebase/auth';
import { GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";

export default function Login() {
    const { Title } = Typography;

    const fbProvider = new FacebookAuthProvider();
    const ghProvider = new GithubAuthProvider(auth);

    const handleLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { user, additionalUserInfo } = result;

            if (additionalUserInfo?.isNewUser) {
                const userData = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    providerId: additionalUserInfo.providerId,
                    keywords: generateKeywords(user.displayName?.toLowerCase()),
                };
                addDocument('users', userData);
            }
        } catch (error) {
            console.error('Error signing in:', error);
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
                        onClick={() => handleLogin(ghProvider)}
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
