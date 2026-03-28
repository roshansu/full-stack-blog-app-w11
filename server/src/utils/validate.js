import validator from 'validator'

export default function validate(data){
    const mandatoryField = ['name', 'email', 'password']

    const isTrue = mandatoryField.every((field)=>Object.keys(data).includes(field))

    if(!isTrue){
        throw new Error("Missing field")
        return;
    }

    if(!validator.isEmail(data.email)){
        throw new Error("Invalid email")
        return
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak password")
        return
    }
}