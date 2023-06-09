import { useState } from 'react'
import { useRegisterMutation } from '../Store/slices/userApiSlice'

const initialState = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'eg@email.com',
    password: 'password',
    confirmPassword: 'password again'
}

export default function Register() {
    const [register, { isLoading }] = useRegisterMutation()
    const [user, setUser] = useState(initialState)
    const { firstName, lastName, email, password, confirmPassword } = user

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }
            const response = await register({ firstName, lastName, email, password }).unwrap()
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return( <main className="w-full min-h-screen flex justify-center items-start">
        <section className='py-60 mx-auto'>
            <p>Register to Orbital</p>
            <form></form>
        </section>
    </main> )
}
