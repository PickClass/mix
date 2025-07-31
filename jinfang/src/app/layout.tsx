"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import { Breadcrumb, Layout, App, theme } from "antd";
const { Content } = Layout;
import Headers from "@/components/header";
import Footers from "@/components/footers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<html lang="zh-CN">
			<body className={` antialiased`}>
				<App>
					<Layout>
						<Headers />
						<Content style={{ padding: "0 48px" }}>
							<Breadcrumb
								style={{ margin: "16px 0" }}
								items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
							/>
							<div
								style={{
									padding: 24,
									minHeight: 380,
									background: colorBgContainer,
									borderRadius: borderRadiusLG,
								}}
							>
								<AntdRegistry>{children}</AntdRegistry>
							</div>
						</Content>

						<Footers />
					</Layout>
				</App>
			</body>
		</html>
	);
}
