import { useEffect } from "react";

export function useOutsideAlerter(ref, action) {
	function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
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
