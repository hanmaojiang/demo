import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { User } from "../../types";

interface UserFormProps {
  isEditing?: boolean;
  selectedUser?: User;
  onAddUser?: (user: User) => void;
  onUpdateUser?: (user: User) => void;
  onCancel: () => void;
}
const UserForm = ({
  isEditing,
  selectedUser,
  onAddUser,
  onUpdateUser,
  onCancel,
}: UserFormProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditing && selectedUser) {
      form.setFieldsValue(selectedUser);
    }
  }, [isEditing, selectedUser, form]);

  const onFinish = (values: any) => {
    if (isEditing) {
      onUpdateUser?.({ ...selectedUser, ...values });
      message.success("用户信息更新成功!");
    } else {
      onAddUser?.(values);
      message.success("用户注册成功!");
    }
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[{ required: true, message: "请输入您的用户名!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: "请输入您的邮箱地址!" },
          { type: "email", message: "请输入有效的邮箱地址!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="年龄"
        name="age"
        rules={[{ required: true, message: "请输入您的年龄!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? "保存" : "注册"}
        </Button>
        {isEditing ? (
          <Button style={{ marginLeft: 8 }} onClick={onCancel}>
            取消
          </Button>
        ) : (
          <Button style={{ marginLeft: 8 }} onClick={() => form.resetFields()}>
            重置
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default UserForm;
