import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Compilex: Dashboard" },
    { name: "description", content: "Welcome to Compilex, your one stop compile and run your code!" },
  ];
};

export default function Dashboard(){
    return <>
    
    </>;
};