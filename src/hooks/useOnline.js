import { useState } from 'react'
import { useEventListener } from '.'

const useOnline = () => {
	const [online, setOnline] = useState(navigator.onLine)

	useEventListener('online', () => setOnline(navigator.onLine))
	useEventListener('offline', () => setOnline(navigator.onLine))

	return online
}

export default useOnline
