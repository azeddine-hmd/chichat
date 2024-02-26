import { useEffect } from "react";

export function useEvent(event: string, on: (...args: any[]) => void) {
	useEffect(() => {
		const listener = (...args: any[]) => {
			on(...args);
		};

		window.clientSocket.on(event, listener);

		return () => {
			window.clientSocket.off(event, listener);
		};
		// eslint-disable-next-line
	}, []);
}

export function useOneTimeEvent(event: string, once: (...args: any[]) => void) {
	useEffect(() => {
		const listener = (...args: any[]) => {
			once(...args);
		};

		window.clientSocket.once(event, listener);

		return () => {
			window.clientSocket.off(event, listener);
		}
		// eslint-disable-next-line
	}, []);
}
