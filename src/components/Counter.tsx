import { createSignal } from "solid-js";

export const Counter = () => {
	const [count, setCount] = createSignal(0);

	return (
		<button type="button" onClick={() => setCount((prev) => prev + 1)}>
			Count: {count()}
		</button>
	);
};
