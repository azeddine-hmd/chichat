import React, { Children, ReactNode, isValidElement } from "react";

export function getReactFCFromChildren(FCname: string, children?: React.ReactNode) {
	const childrenArray = Children.toArray(children);
	const foundChild = childrenArray.find((child) =>
		isValidElement(child) && typeof child.type === "function" && child.type.name === FCname
	);
	const otherChildren = childrenArray.filter((child) => child !== foundChild) as ReactNode;
	return {foundChild, otherChildren}
}
