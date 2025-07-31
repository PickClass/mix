import { Layout, theme } from "antd";
const { Header } = Layout;
import Menus from "../menu";

export default function Headers() {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

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
			<div
				className="demo-logo"
				style={{
					padding: 24,
					width: 300,
					marginRight:30,
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
				}}
			/>
			<Menus />
		</Header>
	);
}
