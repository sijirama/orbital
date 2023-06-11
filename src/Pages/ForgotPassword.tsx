import { useForgotPasswordMutation } from '../Store/slices/userApiSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserForgotPasswordType } from '../Types/User'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState: UserForgotPasswordType = {
    email: ''
}

export default function ForgotPassword() {
    const [submit, { isLoading }] = useForgotPasswordMutation()
    const navigate = useNavigate()

    const handleSubmit = async (user: UserForgotPasswordType) => {
        const { email } = user
        try {
            if (!email) {
                throw new Error('Email field is missing')
            }
            const response = await submit({ email }).unwrap()
            console.log(response)
            toast.success('Reset token has been sent to your Email address')
            navigate('/authenticate')
        } catch (error) {
            console.error(error)
        }
    }

    const validate = (values: UserForgotPasswordType) => {
        const errors: UserForgotPasswordType | any = {}
        if (!values.email) {
            errors.email = 'email is Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        return errors
    }

    return (
        <main className=" w-full min-h-screen flex ">
            <section className="w-0"></section>
            <section className=" w-full  bg-mylightpink flex justify-center items-center">
                <div className="w-5/6 md:w-2/3 lg:w-1/3 bg-mylightgray px-5 md:px-7  lg:px-10 py-5 rounded-lg shadow-md">
                    <p className="font-bold text-lg lg:text-2xl my-4 lg:my-5 font-geologica -tracking-wide">
                        Enter your <span className="text-mydarkred"> Email</span>
                    </p>
                    <Formik
                        initialValues={initialState}
                        validate={(values) => validate(values)}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(setSubmitting)
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

                                <p className="font-thin text-sm my-1">
                                    Remember yout password?{' '}
                                    <Link to="/authenticate">
                                        <span className="text-mydarkred font-semibold">Sign In</span>
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
                                        {isLoading ? 'Submitting' : 'Submit!'}
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
