import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect, useRef } from "react";
import { Layout, Tree, Modal, Input, Button, Typography, Select, message } from "antd";
import { 
  FolderOutlined, 
  FileTextOutlined, 
  PlusOutlined, 
  DeleteOutlined,
  DownloadOutlined,
  CodeOutlined
} from "@ant-design/icons";
import Editor, { Monaco } from "@monaco-editor/react";

const { DirectoryTree } = Tree;
const { Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

// Language configurations
const languageExtensions: { [key: string]: string } = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
  html: "html",
  css: "css",
  php: "php",
  rust: "rust",
  go: "go",
  clang: "cpp" // Use C++ for Clang
};

const languageTemplates: { [key: string]: string } = {
  javascript: '// JavaScript starter\nconsole.log("Hello World!");',
  python: '# Python starter\nprint("Hello World!")',
  java: '// Java starter\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}',
  cpp: '// C++ starter\n#include <iostream>\n\nint main() {\n  std::cout << "Hello World!";\n  return 0;\n}',
  html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Hello World</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
  css: '/* CSS starter */\nbody {\n  margin: 0;\n  padding: 20px;\n}',
  php: '<?php\n// PHP starter\necho "Hello World!";\n?>',
  rust: '// Rust starter\nfn main() {\n  println!("Hello World!");\n}',
  go: '// Go starter\npackage main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello World!")\n}',
  clang: '// Clang starter\n#include <stdio.h>\n\nint main() {\n  printf("Hello World!\\n");\n  return 0;\n}'
};

export const meta: MetaFunction = () => ([
  { title: "Compilex: Editor" },
  { description: "Advanced online IDE with multi-language support" }
]);

interface FileNode {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: FileNode[];
  content?: string;
  language?: string;
}

export default function IDE() {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [projectName, setProjectName] = useState('My Project');
  const [isEditingProjectName, setIsEditingProjectName] = useState(false);
  const [modalState, setModalState] = useState({
    visible: false,
    type: '',
    contextKey: '',
    newName: '',
    selectedLanguage: 'javascript'
  });

  const editorRef = useRef<any>(null);

  // Handle editor mount
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
  };

  // Handle file selection
  const onSelect = (keys: React.Key[], info: any) => {
    const node = info.node;
    if (node.isLeaf) {
      setSelectedFile(node);
      setEditorContent(node.content || '');
    }
  };

  // Handle file content update
  const updateFileContent = (value: string | undefined) => {
    setEditorContent(value || '');
    if (selectedFile) {
      setFiles(prev =>
        prev.map(file => updateFileContentRecursive(file, selectedFile.key, value || ''))
      );
    }
  };

  const updateFileContentRecursive = (node: FileNode, key: string, content: string): FileNode => {
    if (node.key === key) {
      return { ...node, content };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map(child => updateFileContentRecursive(child, key, content))
      };
    }
    return node;
  };

  // Modal handlers
  const showModal = (type: string, key?: string) => {
    setModalState({
      visible: true,
      type,
      contextKey: key || '',
      newName: '',
      selectedLanguage: 'javascript'
    });
  };

  const handleModalOk = () => {
    if (modalState.type === 'createFile') {
      const newFile: FileNode = {
        key: `file-${Date.now()}`,
        title: `${modalState.newName}.${modalState.selectedLanguage}`,
        isLeaf: true,
        content: languageTemplates[modalState.selectedLanguage],
        language: modalState.selectedLanguage
      };
      setFiles(prev => [...prev, newFile]);
    } else if (modalState.type === 'createFolder') {
      const newFolder: FileNode = {
        key: `folder-${Date.now()}`,
        title: modalState.newName,
        isLeaf: false,
        children: []
      };
      setFiles(prev => [...prev, newFolder]);
    }
    setModalState({ ...modalState, visible: false });
  };

  return (
    <Layout className="h-screen">
      {/* Modals */}
      <Modal
        title={modalState.type === 'createFile' ? 'Create New File' : 'Create New Folder'}
        visible={modalState.visible}
        onOk={handleModalOk}
        onCancel={() => setModalState({ ...modalState, visible: false })}
      >
        {modalState.type === 'createFile' ? (
          <>
            <Input
              placeholder="File name"
              onChange={e => setModalState({ ...modalState, newName: e.target.value })}
            />
            <Select
              defaultValue="javascript"
              className="w-full mt-4"
              onChange={value => setModalState({ ...modalState, selectedLanguage: value })}
            >
              {Object.keys(languageExtensions).map(lang => (
                <Option key={lang} value={lang}>{lang}</Option>
              ))}
            </Select>
          </>
        ) : (
          <Input
            placeholder="Folder name"
            onChange={e => setModalState({ ...modalState, newName: e.target.value })}
          />
        )}
      </Modal>

      {/* Sidebar */}
      <Sider width={300} className="bg-gray-50 border-r border-gray-200" theme="light">
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            {isEditingProjectName ? (
              <Input
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
                onBlur={() => setIsEditingProjectName(false)}
                autoFocus
              />
            ) : (
              <Title 
                level={4} 
                className="m-0 cursor-pointer"
                onClick={() => setIsEditingProjectName(true)}
              >
                {projectName}
              </Title>
            )}
            <div className="flex gap-2">
              <Button
                icon={<PlusOutlined />}
                onClick={() => showModal('createFolder')}
                shape="circle"
              />
              <Button
                icon={<DownloadOutlined />}
                shape="circle"
              />
            </div>
          </div>

          <DirectoryTree
            showIcon
            defaultExpandAll
            treeData={files}
            onSelect={onSelect}
            icon={({ isLeaf }) => isLeaf ? <FileTextOutlined /> : <FolderOutlined />}
            titleRender={node => (
              <div className="flex items-center justify-between w-full">
                <span>{node.title}</span>
                {!node.isLeaf && (
                  <div className="flex gap-1">
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal('createFile', node.key);
                      }}
                    />
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal('delete', node.key);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content className="flex">
          {/* Editor Section */}
          <div className="flex-1 p-4 border-r border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <Title level={4} className="m-0">
                {selectedFile?.title || 'Select a file'}
              </Title>
              <Button icon={<CodeOutlined />} disabled={!selectedFile}>
                Compile
              </Button>
            </div>
            
            {selectedFile && (
              <Editor
                height="calc(100vh - 150px)"
                theme="vs-dark"
                language={languageExtensions[selectedFile.language || 'javascript']}
                value={editorContent}
                onChange={updateFileContent}
                onMount={handleEditorDidMount}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            )}
          </div>

          {/* Terminal Placeholder */}
          <div className="w-1/3 p-4 bg-gray-800 text-white">
            <Title level={4} className="text-white">Terminal</Title>
            <div className="mt-4 text-gray-400">
              Terminal functionality coming soon...
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}