import { useRef, useState } from 'react'
import { useTimeout } from '.'

const useCopyToClipboard = (timeout = 3000) => {
	const [success, setSuccess] = useState()
	const { reset } = useTimeout(() => setSuccess(undefined), timeout)
	const copyTextRef = useRef(null)

	const copyToClipboard = text => {
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setSuccess(true)
				reset()
			})
			.catch(() => setSuccess(false))
	}

	return [copyTextRef, copyToClipboard, { success }]
}

export default useCopyToClipboard
