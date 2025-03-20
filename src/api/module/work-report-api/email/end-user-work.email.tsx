import React from "react";
import { EmailParser } from "@src/api/_core/email/email.parser";

interface IProps {
	day: string;
	start: string;
	end: string;
	lunchStart: string;
	lunchEnd: string;
}

export class EndUserWorkEmail extends EmailParser {
	override component(data: { props: IProps[] }) {
		return (
			<html>
			<head>
				<meta charSet="UTF-8" />
				<title>Seu relatório semanal</title>
				<style>
					{`
							body {
								font-family: Arial, sans-serif;
								background-color: #f4f4f4;
								padding: 20px;
							}
							.container {
								background: white;
								padding: 20px;
								border-radius: 10px;
								box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
								max-width: 600px;
								margin: auto;
							}
							table {
								width: 100%;
								border-collapse: collapse;
								margin-top: 20px;
							}
							table, th, td {
								border: 1px solid #ddd;
								padding: 10px;
								text-align: left;
							}
							th {
								background-color: #f8f8f8;
							}
						`}
				</style>
			</head>
			<body>
			<div className="container">
				<h2>Horários de Trabalho</h2>
				<p>Aqui estão seus horários registrados:</p>
				<table>
					<thead>
					<tr>
						<th>Dia</th>
						<th>Entrada</th>
						<th>Saída</th>
						<th>Início do Almoço</th>
						<th>Fim do Almoço</th>
					</tr>
					</thead>
					<tbody>
					{data.props.map((item, index) => (
						<tr key={index}>
							<td>{item.day}</td>
							<td>{item.start}</td>
							<td>{item.end}</td>
							<td>{item.lunchStart}</td>
							<td>{item.lunchEnd}</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
			</body>
			</html>
		);
	}
}
