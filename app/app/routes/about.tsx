import type { MetaFunction } from "@remix-run/node";
import { Card, Typography } from "antd";
import { UserOutlined, FileTextOutlined, RocketOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const meta: MetaFunction = () => {
  return [
    { title: "Compilex: About Project and Author" },
    { name: "description", content: "Welcome to Compilex, your intuitive and easy-to-use online IDE for quick coding and compiling!" },
  ];
};

const About = () => {
  return (
    <div className="p-4 overflow-y-auto h-full">
      {/* Hero Section */}
      <div className="flex justify-center p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h1 className="text-5xl py-5 text-white font-bold">Compilex</h1>
      </div>

      {/* Main Content */}
      <div className="mx-auto space-y-8 max-w-7xl p-6">
        {/* Project Overview */}
        <Card
          title={
            <div className="flex items-center space-x-2">
              <FileTextOutlined className="text-blue-600 text-2xl" />
              <Title level={3} className="m-0">
                About the Project
              </Title>
            </div>
          }
          className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Paragraph className="text-gray-700 text-lg">
            Welcome to <strong>Compilex</strong>—your ultimate online IDE for quick coding and compiling tasks! Designed to enhance productivity and simplify coding workflows, Compilex offers an intuitive and easy-to-use platform for developers of all skill levels.
          </Paragraph>
          <Paragraph className="text-gray-700 text-lg">
            Whether you’re writing snippets, testing code, or exploring new ideas, Compilex provides a seamless environment that gets you from concept to execution in no time.
          </Paragraph>
        </Card>

        {/* About Author and Future Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Author */}
          <Card
            title={
              <div className="flex items-center space-x-2">
                <UserOutlined className="text-indigo-600 text-2xl" />
                <Title level={3} className="m-0">
                  About the Author
                </Title>
              </div>
            }
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Paragraph className="text-gray-700 text-lg">
              Hi, I'm <strong>Rijusmit Biswas</strong>, a passionate software developer with a keen interest in creating tools that empower coders and streamline development workflows. With a focus on simplicity, speed, and accessibility, I strive to make coding enjoyable for everyone.
            </Paragraph>
            <Paragraph className="text-gray-700 text-lg">
              <strong>Compilex</strong> is a step toward achieving that goal—a platform where quick coding and compiling become effortless. I hope this tool becomes an essential part of your coding journey.
            </Paragraph>
          </Card>

          {/* Future Goals */}
          <Card
            title={
              <div className="flex items-center space-x-2">
                <RocketOutlined className="text-blue-600 text-2xl" />
                <Title level={3} className="m-0">
                  Future Goals for the Project
                </Title>
              </div>
            }
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Paragraph className="text-gray-700 text-lg">
              The future of <strong>Compilex</strong> is bright, with several exciting features and improvements on the horizon. We aim to continuously enhance the user experience and expand the platform's capabilities.
            </Paragraph>
            <Paragraph className="text-gray-700 text-lg">
              Some of our future goals include integrating more programming languages, adding real-time collaboration features, and improving performance and scalability. We are also looking to incorporate AI-driven code suggestions and error detection to further streamline the coding process.
            </Paragraph>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;