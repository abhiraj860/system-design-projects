"use client";
const clientId = "#DDD_444";

import { useEffect } from "react";
import { useState } from "react";
import { InputWithButton } from "./components/ui/InputBar";
import { Button } from "@/components/ui/button";
import { Tables } from "./components/ui/Table";
export default function Home() {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [message, setMessage] = useState<string>("");
	const [arrayMessage, setArrayMessage] = useState<string[]>([]);

	useEffect(() => {
		const newSocket = new WebSocket("ws://localhost:8080");
		newSocket.onopen = () => {
			console.log("Connection established");
		};

		newSocket.onmessage = (event) => {
			setArrayMessage(JSON.parse(event.data));
		};
		setSocket(newSocket);
		return () => newSocket.close();
	}, [arrayMessage]);

	function inputHandler(e: any) {
		if(e.target.value !== '~') {
			setMessage(e.target.value);
		}
	}
	function getTime() {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		const localDateTime = `${hours}:${minutes}:${seconds}`;
		return localDateTime;
	}
	function clickHandler() {
		const tempMessage = clientId + "~" + message.trim() + "~" + getTime();
		const temp = [tempMessage, ...arrayMessage];
		setArrayMessage(temp);
		socket?.send(JSON.stringify(temp));
		setMessage("");
	}
	return (
		<>
			<div className="text-white text-center py-6 text-2xl">Machine ID: {clientId}</div>
			<div className="h-vh flex justify-center mt-12 items-center">
				<div className="text-white"></div>
				<div className="flex mr-20">
					<div>
						<InputWithButton changeHandler={inputHandler} valueText={message} />
					</div>
					<div>
						<Button
							onClick={clickHandler}
							size={"sm"}
							className="bg-red-900 border-2 text-white ml-4 h-10 hover:text-white hover:bg-black hover: border-red-900"
						>
							Send
						</Button>
					</div>
				</div>
				<div className="flex text-red min-w-200 min-h-200 bg-white ml-20">
					<Tables valueArray={arrayMessage} />
				</div>
				{/*
				 */}
			</div>
		</>
	);
}
