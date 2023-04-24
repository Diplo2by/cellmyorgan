import React from "react"

const MainFormElement = (props) => {
	return (
		<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
			{props.children}
		</div>
	)
}

const DropdownFormElement = () => {
	return <></>
}

const InputFormElement = () => {
	return <></>
}

export { MainFormElement, DropdownFormElement, InputFormElement }
