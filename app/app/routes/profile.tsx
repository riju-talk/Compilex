import type { MetaFunction } from "@remix-run/node";
import { Form, Input, Button, Card, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, LinkOutlined } from "@ant-design/icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Compilex: Your Profile" },
    { name: "description", content: "Welcome to Compilex, your one-stop to compile and run your code!" },
  ];
};

export default function Profile() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Updated Profile:", values);
    // Add your logic to update the profile here
  };

  const onPasswordChange = (values: any) => {
    console.log("Password Change:", values);
    // Add your logic to change the password here
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Card title="Your Profile" className="max-w-2xl mx-auto">
        {/* Profile Information Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            fullName: "John Doe",
            username: "johndoe",
            email: "johndoe@example.com",
            contact: "+1234567890",
            socialLinks: "https://github.com/johndoe",
          }}
        >
          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          {/* Contact */}
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "Please enter your contact number!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Contact" />
          </Form.Item>

          {/* Social Links */}
          <Form.Item
            label="Social Links"
            name="socialLinks"
            rules={[{ required: true, message: "Please enter your social links!" }]}
          >
            <Input prefix={<LinkOutlined />} placeholder="Social Links" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        {/* Change Password Form */}
        <Typography.Title level={5}>Change Password</Typography.Title>
        <Form layout="vertical" onFinish={onPasswordChange}>
          {/* Current Password */}
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: "Please enter your current password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
          </Form.Item>

          {/* Confirm New Password */}
          <Form.Item
            label="Confirm New Password"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}