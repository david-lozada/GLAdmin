import alertify from 'alertifyjs'

export const focusForm = () => {
    const form = document.getElementsByTagName('form')[0]
    form.getElementsByTagName('input')[0].focus()
}

/**
 *	validates current form with given fields
 *	and then sends alerts
 *	@params form
*/
export const validate = (form) => {
	var requiredList = []
	// TODO: Make it iterate through every field, not just input and display an alert.
	let inputs = form.getElementsByTagName('input')
	for(let input of inputs){
		if (input.required) {
			if (input.value === '' || input.value === undefined) {
				let label = input.parentElement.parentElement.getElementsByTagName('label')[0].textContent
				requiredList.push(input.name)
				alertify.warning(label + ' es requerido')
			}
		}
	}
	if (requiredList.length > 0) {
		return false
	}
	return true
}