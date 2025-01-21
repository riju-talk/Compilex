import { Layout } from 'antd';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="bg-slate-800 text-white flex justify-start items-center h-16 pl-4">
      <h1 className="text-2xl font-bold tracking-wide">Compilex</h1>
    </AntHeader>
  );
};

export default Header;