import { Menu } from "antd";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

export default function Menus() {
	const router = useRouter();

	const menu = [
		{ key: "/", label: "首页" },
		{ key: "/blog", label: "伤寒" },
		{ key: "/blog/3", label: "神农" },
	];

	// const onClick = (e: MenuClickEvent) => {
	// 	router.replace(e.key);
	// };

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
		router.replace(e.key);
	};

	return (
		<Menu
			onClick={onClick}
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={["/"]}
			items={menu}
			style={{ flex: 1, minWidth: 0 }}
		/>
	);
}
