import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { debounce } from 'lodash';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, curMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = async (value) => {
            setOptions([]);
            setFetching(true);

            const newOptions = await fetchOptions(value, curMembers);
            setOptions(newOptions);
            setFetching(false);
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    React.useEffect(() => {
        return () => {
            setOptions([]);
        };
    }, []);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

const fetchUserList = async (search, curMembers) => {
    try {
        const q = query(
            collection(db, 'users'),
            where('keywords', 'array-contains', search?.toLowerCase()),
            orderBy('displayName'),
            limit(20)
        );

        const querySnapshot = await getDocs(q);

        const userList = [];
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            userList.push({
                label: userData.displayName,
                value: userData.uid,
                photoURL: userData.photoURL,
            });
        });


        return userList.filter((opt) => !curMembers.includes(opt.value));
    } catch (error) {
        console.error('Error fetching user list:', error);
        return [];
    }
};

export default function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.resetFields();
        setValue([]);

        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });

        setIsInviteMemberVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setValue([]);

        setIsInviteMemberVisible(false);
    };

    return (
        <div>
            <Modal
                title='Invite more members' 
                visible={isInviteMemberVisible} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                destroyOnClose={true}
            >
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        name='search-user'
                        label='Members Name'
                        value={value}
                        placeholder='Enter member name'
                        fetchOptions={fetchUserList} 
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}

