import { Layout, Menu } from "antd";
import Image from "next/image";
const { Header } = Layout;
import type { MenuProps } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Index() {
  const menu = [
    {
      key: "/",
      label: "首页",
    },
    {
      key: "/article",
      label: "文章",
    },
    {
      key: "/formula",
      label: "方剂",
    },
    {
      key: "/zhongyao",
      label: "中药",
    },
  ];

  const [current, setCurrent] = useState("/");
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    router.replace(e.key);
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <div className="demo-logo h-[32px] w-[100px] rounded-2xl bg-[#1890ff]"> */}
      {/* <Image src="/logo.png" alt="logo" width={110} height={100} /> */}
      <Image
        src="/logo1.png"
        alt="logo"
        width={110}
        height={110}
        priority={true}
        style={{ width: "auto" }}
      />
      {/* </div> */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        selectedKeys={[current]}
        items={menu}
        onClick={onClick}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
