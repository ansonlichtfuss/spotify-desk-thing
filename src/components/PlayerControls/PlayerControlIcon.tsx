import type { IconTypes } from "solid-icons";
import { type Component, createMemo, type ParentProps } from "solid-js";

interface Props extends ParentProps {
	src?: string;
	Icon?: IconTypes;
	alt?: string;
	isDisabled?: boolean;
	enlargeIcon?: boolean;
	showActiveIndicator?: boolean;
	onClick?: () => void;
}

export const PlayerControlIcon: Component<Props> = (props) => {
	const dimensions = createMemo(() => (props.enlargeIcon ? 72 : 48));
	return (
		<button
			type="button"
			class={`group relative ${
				!props.isDisabled ? "opacity-100" : "pointer-events-none opacity-25"
			}`}
			disabled={props.isDisabled}
			onClick={props.onClick}
		>
			{props.src ? (
				<img
					alt={props.alt}
					class="group-hover:scale-105 "
					src={props.src}
					width={dimensions()}
					height={dimensions()}
				/>
			) : null}
			{props.Icon ? <props.Icon color="#ffffff" size={dimensions()} /> : null}
			{props.showActiveIndicator && (
				<span
					class="absolute -bottom-4 left-1/2 bg-white rounded-full"
					style={{ width: "10px", height: "10px", "margin-left": "-5px" }}
				></span>
			)}
		</button>
	);
};
