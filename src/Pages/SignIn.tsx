import { useLoginMutation } from '../Store/slices/userApiSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserAuthenticationType } from '../Types/User'
import { Link, useNavigate } from 'react-router-dom'

const initialState: UserAuthenticationType = {
    email: '',
    password: ''
}

export default function SignIn() {
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()

    const handleForgotPasswordClick = () => {
        navigate('/forgotpassword')
    }

    const handleSubmit = async (user: UserAuthenticationType) => {
        const { email, password } = user
        try {
            if (!password || !email) {
                throw new Error('Email or password field is missing')
            }
            const response = await login({ email, password }).unwrap()
            console.log(response)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
        }
    }

    const validate = (values: UserAuthenticationType) => {
        const errors: UserAuthenticationType | any = {}
        if (!values.email) {
            errors.email = 'email is Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        } else if (!values.password || !(values.password.length > 8)) {
            errors.password = 'Invalid password'
        }
        return errors
    }

    return (
        <main className=" w-full min-h-screen flex ">
            <section className="w-0 md:w-1/3 lg:w-1/2">
                <img className="w-full h-full object-cover object-center" src="registerbg.jpg" alt="" />
            </section>
            <section className=" w-full md:w-2/3 lg:w-1/2 bg-mylightpink flex justify-center items-center">
                <div className="w-2/3 md:w-2/3 bg-mylightgray px-10 py-5 rounded-lg shadow-md">
                    <p className="font-bold text-lg lg:text-2xl my-4 lg:my-6 font-geologica -tracking-wide">
                        Welcome back to <span className="text-mydarkred"> Orbital</span>
                    </p>
                    <Formik
                        initialValues={initialState}
                        validate={(values) => validate(values)}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values, setSubmitting)
                            handleSubmit(values)
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col bg-mylightgray ">
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

                                <p className="font-thin text-sm my-1">
                                    Dont have an account?{' '}
                                    <Link to="/register">
                                        <span className="text-mydarkred font-semibold">Sign Up</span>
                                    </Link>
                                </p>
                                <div className="flex gap-1 items-center justify-center">
                                    <button
                                        className={`text-mydarkred font-bold border-2 border-mydarkred rounded-lg w-1/2 md:w-2/3 my-2 h-12 ${
                                            isSubmitting && isLoading && 'opacity-25'
                                        }`}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Submitting' : 'Sign In!'}
                                    </button>
                                    <button
                                        onClick={handleForgotPasswordClick}
                                        className="bg-mydarkred text-mylightgray text-sm w-1/2 md:w-1/3 rounded-lg font-semibold h-12 px-3"
                                    >
                                        Forgot your Password
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </main>
    )
}
