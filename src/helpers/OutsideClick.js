import { useEffect } from "react";

export function useOutsideAlerter(ref, action, exceptions = []) {
	function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target) && !exceptions.includes(event.target.className)) {
			action();
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
}
