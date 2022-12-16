import { useEventListener } from '.'

const useClickOutside = (ref, callback) => {
	useEventListener(
		'click',
		event => {
			if (ref.current == null || ref.current.contains(event.target)) return
			callback(event)
		},
		document,
		{ capture: true }
	)
}

export default useClickOutside
