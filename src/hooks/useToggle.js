import { useState } from 'react'

const useToggle = defaultValue => {
	const [value, setValue] = useState(defaultValue)
	const toggleFunc = value => {
		setValue(currValue => (typeof value === 'boolean' ? value : !currValue))
	}
	return [value, toggleFunc]
}

export default useToggle
