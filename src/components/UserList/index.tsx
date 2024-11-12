import { Table, Button } from "antd";
import { User } from "../../types";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
  const columns = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: User) => (
        <span>
          <Button type="primary" onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button
            danger
            onClick={() => onDelete(record.id)}
            style={{ marginLeft: 8 }}
          >
            删除
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default UserList;
