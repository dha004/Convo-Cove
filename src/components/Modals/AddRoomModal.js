
import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../Firebase/services';

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);

    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
        form.resetFields();
        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomVisible(false);
    };

    return (
        <div>
            <Modal
                title='Create room' 
                visible={isAddRoomVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label='Room Name' name='name'>
                        <Input placeholder='Enter the room name' /> 
                    </Form.Item>
                    <Form.Item label='Description' name='description'>
                        <Input.TextArea placeholder='Enter the description' /> 
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
