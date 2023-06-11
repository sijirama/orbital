import { useRegisterMutation } from '../Store/slices/userApiSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserRegisterType } from '../Types/User'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState: UserRegisterType = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function Register() {
    const [register, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()

    const handleSubmit = async (user: UserRegisterType) => {
        const { firstName, lastName, email, password, confirmPassword } = user
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }
            const response = await register({ firstName, lastName, email, password }).unwrap()
            //console.log(response)
            if (!response) {
                throw new Error()
            }
            navigate('/dashboard')
        } catch (error) {
            //console.error(error)
            toast.error('Failed to create account')
        }
    }

    const validate = (values: UserRegisterType) => {
        const errors: UserRegisterType | any = {}
        if (!values.firstName) {
            errors.firstName = 'First name is required'
        } else if (!values.lastName) {
            errors.lastName = 'Last name is required'
        } else if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        } else if (!values.password || !(values.password.length > 8)) {
            errors.password = 'Invalid password'
        } else if (values.password === values.password) {
            //errors.confirmPassword = 'Password does not match'
        }
        return errors
    }

    return (
        <main className=" w-full min-h-screen flex ">
            <section className="w-0 md:w-1/3 lg:w-1/2">
                <img className="w-full h-full object-cover object-center" src="registerbg.jpg" alt="" />
            </section>
            <section className=" w-full md:w-2/3 lg:w-1/2 bg-mylightpink flex justify-center items-center">
                <div className="w-5/6 md:w-2/3 bg-mylightgray px-5 md:px-7 lg:px-10 py-5 rounded-lg shadow-md">
                    <p className="font-bold text-lg lg:text-2xl my-4 lg:my-6 font-geologica -tracking-wide">
                        Welcome to <span className="text-mydarkred"> Orbital</span>
                    </p>
                    <Formik
                        initialValues={initialState}
                        validate={(values) => validate(values)}
                        onSubmit={(values, {}) => {
                            handleSubmit(values)
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col bg-mylightgray ">
                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="First Name"
                                    type="text"
                                    name="firstName"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="firstName"
                                    component="div"
                                />

                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Last Name"
                                    type="text"
                                    name="lastName"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="lastName"
                                    component="div"
                                />

                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Email Adress"
                                    type="email"
                                    name="email"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="email"
                                    component="div"
                                />

                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="password"
                                    component="div"
                                />

                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="confirmPassword"
                                    component="div"
                                />

                                <p className="font-thin text-sm my-1">
                                    Already have an account?{' '}
                                    <Link to="/authenticate">
                                        <span className="text-mydarkred font-semibold">Sign in</span>
                                    </Link>
                                </p>
                                <button
                                    className={`text-mydarkred font-bold border-2 border-mydarkred rounded-lg w-2/3 my-2 h-10 ${
                                        isSubmitting && isLoading && 'opacity-25'
                                    }`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting' : 'Sign Up!'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </main>
    )
}
