import { useState, useEffect } from "react";
import { Tabs, Modal } from "antd";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import { User } from "./types";

function App() {
  const [tab, setTab] = useState<string>("1");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = () => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: "张三", email: "zhangsan@qq.com", age: 25 },
        { id: 2, name: "李四", email: "lisi@qq.com", age: 30 },
      ]);
    }, 500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (user: User) => {
    setTab("1");
    setUsers([...users, user]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditing(false);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  return (
    <>
      <div style={{ padding: "24px" }}>
        <Tabs activeKey={tab} onChange={(activeKey) => setTab(activeKey)}>
          <Tabs.TabPane key="1" tab="用户列表">
            <UserList users={users} onEdit={editUser} onDelete={deleteUser} />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="用户注册">
            <UserForm
              onAddUser={addUser}
              onCancel={() => setIsEditing(false)}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <Modal
        title="信息编辑"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <UserForm
          isEditing
          selectedUser={selectedUser}
          onUpdateUser={updateUser}
          onCancel={() => setIsEditing(false)}
        />
      </Modal>
    </>
  );
}

export default App;
