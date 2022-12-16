import { useState, useEffect, useRef } from 'react'

const useTimer = (callback, defaultTime = 60) => {
	const [time, setTime] = useState(defaultTime)
	const [remainTime, setRemainTime] = useState(0)
	const savedCallback = useRef()
	const savedDelay = useRef()

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		savedDelay.current = time
		setRemainTime(time)

		const tick = id => {
			if (savedDelay.current > 0) savedDelay.current -= 1
			else savedDelay.current = 0
			setRemainTime(savedDelay.current)
			if (savedDelay.current <= 0) {
				savedCallback.current()
				clearInterval(id)
			}
		}

		if (time !== null) {
			const id = setInterval(() => tick(id), 1000)
			return () => clearInterval(id)
		}
	}, [time])

	return [remainTime, setTime]
}

export default useTimer
