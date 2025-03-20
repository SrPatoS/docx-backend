import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

export class EmailParser {
	component(props?: any): React.JSX.Element {
		return (
			<html>
			<body>
			<h1>Email</h1>
			<p>email</p>
			</body>
			</html>
		);
	}

	getHtmlString(props?: any) {
		return renderToStaticMarkup(<this.component props={props} />);
	}
}