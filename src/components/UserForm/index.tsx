import { useEffect } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { User } from "../../types";

interface UserFormProps {
  isEditing?: boolean;
  selectedUser?: User;
  onAddUser?: (user: User) => void;
  onUpdateUser?: (user: User) => void;
  onCancel: () => void;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 24 },
};

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

  const validatePassword = (rule: any, value: string) => {
    if (!value) {
      return Promise.reject('请输入密码!');
    }
    if (value.length < 8) {
      return Promise.reject('密码至少8位!');
    }
    if (!/[a-z]/.test(value)) {
      return Promise.reject('密码中必须包含小写字母!');
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject('密码中必须包含大写字母!');
    }
    if (!/\d/.test(value)) {
      return Promise.reject('密码中必须包含数字!');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject('密码中必须包含特殊字符!');
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      name="basic"
      autoComplete="off"
      {...formItemLayout}
      style={{ maxWidth: 400 }}
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

      {isEditing ? null : (
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, validator: validatePassword },
          ]}
        >
          <Input type="password" />
        </Form.Item>
      )}

      <Form.Item
        label="年龄"
        name="age"
        rules={[{ required: true, message: "请输入您的年龄!" }]}
      >
        <InputNumber min={1} max={120} step={1} />
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
