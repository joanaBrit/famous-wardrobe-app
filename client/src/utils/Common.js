// converting an array of fields into value of formData
export function stateValues(fields) {
  return fields.reduce((fieldsObj, field) => {
    const name = field.name.replace(' ', '_').toLowerCase() 
    return { ...fieldsObj, [name]: '' }
  }, {})
}


// adds a variable name to the array of fields to formData
export function fieldValues(fields) {
  return fields.map(field => {
    const name = field.name.replace(' ', '_').toLowerCase()
    return { ...field, variable: name }
  })
}