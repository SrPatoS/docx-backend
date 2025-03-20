import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

function EndUserWorkEmail() {
	return (
		<html>
		<body>
		<h1>Bem-vindo, "oi"!</h1>
		<p>Estamos felizes em ter você conosco.</p>
		</body>
		</html>
	);
}

const EndUserWorkEmailValue = renderToStaticMarkup(<EndUserWorkEmail />);

export {
	EndUserWorkEmailValue
};