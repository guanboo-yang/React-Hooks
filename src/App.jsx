import './App.css'
import * as hooks from './hooks' // eslint-disable-line no-unused-vars
import React, { useEffect, useState, useRef, useCallback } from 'react' // eslint-disable-line no-unused-vars

const App = () => {
	/* useToggle & useDebounce */
	const [value, toggleValue] = hooks.useToggle(true)
	hooks.useDebounce(() => alert(value), 1000, [value])
	/* useStateHistory */
	const [todos, setTodos, { pointer, back, forward }] = hooks.useStateHistory([], { capacity: 20 })
	const [todoId, setTodoId] = useState(0)
	const addTodos = () => {
		setTodos(todo => [...todo, { id: todoId }])
		setTodoId(todoId + 1)
	}
	/* useStorage */
	const [name, setName, removeName] = hooks.useStorage('name', undefined, window.localStorage)
	/* useEventListener */
	const [key, setKey] = useState('')
	hooks.useEventListener('keydown', e => {
		setKey(e.key)
	})
	/* useClickOutside */
	const [open, setOpen] = useState(false)
	const modalRef = useRef(null)
	hooks.useClickOutside(modalRef, () => {
		if (open) setOpen(false)
	})
	/* useDarkMode */
	const [darkMode, setDarkMode, unsetDarkMode] = hooks.useDarkMode()
	/* useCopyToClipboard */
	const [copyTextRef, copyToClipboard, { success }] = hooks.useCopyToClipboard()
	/* useScrollY */
	const scrollY = hooks.useScrollY()
	/* useOnline */
	const online = hooks.useOnline()
	/* useHover */
	const [hoverRef, hovered] = hooks.useHover()
	/* useTimer */
	const [timerMsg, setTimerMsg] = useState('')
	const handleTimeup = useCallback(() => setTimerMsg('Time Up!'), [])
	const [time, setTime] = hooks.useTimer(handleTimeup, 10)
	/* useInput */
	const email = hooks.useInput('example.com')
	const password = hooks.useInput('1234')

	return (
		<div className='app'>
			<div className='row'>
				<div className='h1 header'>REACT HOOKS EXAMPLES</div>
			</div>
			{/* useToggle & useDebounce */}
			<div className='row'>
				<code>useToggle & useDebounce</code>
				<div className='h1'>{value.toString()}</div>
				<div className='btn-group'>
					<button className='btn' onClick={toggleValue}>
						Toggle
					</button>
					<button className='btn' onClick={() => toggleValue(true)}>
						Set to True
					</button>
					<button className='btn' onClick={() => toggleValue(false)}>
						Set to False
					</button>
				</div>
			</div>
			{/* useStateHistory */}
			<div className='row'>
				<code>useStateHistory</code>
				<div className='h1' style={{ margin: '10px' }}>
					{todos.length
						? todos.map(todo => (
								<span key={todo.id} todo={todo} className='card'>
									<code>{todo.id}</code>
								</span>
						  ))
						: '\u200b'}
				</div>
				{/* <div>{history.join(', ')}</div> */}
				<div className='caption'>pointer position: {pointer}</div>
				<div className='btn-group'>
					<button className='btn' onClick={addTodos}>
						add
					</button>
					<button className='btn' onClick={back}>
						Back
					</button>
					<button className='btn' onClick={forward}>
						Forward
					</button>
				</div>
			</div>
			{/* useStorage */}
			<div className='row'>
				<code>useStorage</code>
				<div className='h1'>{name || '\u200b'}</div>
				<div className='btn-group'>
					<button className='btn' onClick={() => setName('Andrew')}>
						set to Andrew
					</button>
					<button className='btn' onClick={removeName}>
						unset
					</button>
				</div>
			</div>
			{/* useEventListener */}
			<div className='row'>
				<code>useEventListener</code>
				<div className='h1'>{key || '\u200b'}</div>
			</div>
			{/* useClickOutside */}
			<div className='row'>
				<code>useClickOutside</code>
				<div className='h1' style={{ margin: '10px' }}>
					{(open && (
						<span ref={modalRef} className='card'>
							<span>Modal</span>
						</span>
					)) ||
						'\u200b'}
				</div>
				<div className='btn-group'>
					<button className='btn' onClick={() => setOpen(true)}>
						Open
					</button>
				</div>
			</div>
			{/* useDarkMode */}
			<div className='row'>
				<code>useDarkMode</code>
				<div className='h1'>{darkMode ? 'Dark' : 'Light'}</div>
				<div className='btn-group'>
					<button className='btn' onClick={() => setDarkMode(!darkMode)}>
						Toggle Theme
					</button>
					<button className='btn' onClick={unsetDarkMode}>
						Unset Theme
					</button>
				</div>
			</div>
			{/* useCopyToClipboard */}
			<div className='row'>
				<code>useCopyToClipboard</code>
				<div className='h1' ref={copyTextRef} contentEditable suppressContentEditableWarning={true} spellCheck='false' style={{ outline: 'none' }}>
					copy this
				</div>
				<div className='btn-group'>
					<button className='btn' onClick={() => copyToClipboard(copyTextRef.current.innerText)}>
						{success ? 'copied!' : 'copy'}
					</button>
				</div>
			</div>
			{/* useScrollY */}
			<div className='row'>
				<code>useScrollY</code>
				<div className='h1'>{scrollY}</div>
			</div>
			{/* useOnline */}
			<div className='row'>
				<code>useOnline</code>
				<div className='h1'>{online ? 'online' : 'offline'}</div>
			</div>
			{/* CAN'T USE USEEVENTLISTENER */}
			{/* useHover */}
			<div className='row'>
				<code>useHover</code>
				<div className='h1'>{hovered ? 'HOVERED' : '\u200b'}</div>
				<div className='btn-group'>
					<button className='btn' ref={hoverRef}>
						hover me
					</button>
				</div>
			</div>
			{/* useTimer */}
			<div className='row'>
				<code>useTimer</code>
				<div className='h1'>{timerMsg === '' ? new Date(time * 1000).toISOString().substr(11, 8) : timerMsg}</div>
				<div
					className='caption'
					onInput={e => {
						setTime(Number(e.target.innerText) || 0)
						setTimerMsg('')
					}}
					contentEditable
					suppressContentEditableWarning={true}
					spellCheck='false'
					style={{ outline: 'none' }}>
					10
				</div>
			</div>
			{/* useInput */}
			<div className='row'>
				<code>useInput</code>
				<input type='text' placeholder='Email' {...email} />
				<input type='password' placeholder='Password' {...password} />
				<div>
					{email.value} {password.value}
				</div>
			</div>
		</div>
	)
}

export default App
