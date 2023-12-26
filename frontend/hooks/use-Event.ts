import { useEffect } from "react";

export function useEvent(event: string, on: (...args: any[]) => void) {
	useEffect(() => {
		window.clientSocket.on(event, (...args) => {
			on(...args);
		});

		return () => {
			window.clientSocket.off(event, on);
		};
	}, []);
}

export function useOneTimeEvent(event: string, once: (...args: any[]) => void) {
	useEffect(() => {
		window.clientSocket.once(event, (...args) => {
			once(...args);
		});

		return () => {
			window.clientSocket.off(event, once);
		}
	}, []);
}
