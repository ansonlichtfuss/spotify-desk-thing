import { type Component, children, type ParentProps } from "solid-js";

interface DynamicBackgroundType extends ParentProps {
	imgUrl?: string;
	accentColor?: string;
}

export const DynamicBackground: Component<DynamicBackgroundType> = (props) => {
	return (
		<div
			class="h-full w-full top-0 left-0 p-12 bg-black fixed text-white"
			style={{
				"background-color": `${props?.accentColor}`,
			}}
		>
			{children(() => props.children)()}
		</div>
	);
};
