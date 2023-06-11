import { useResetPasswordMutation } from '../Store/slices/userApiSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { UserResetPasswordType } from '../Types/User'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const initialState: UserResetPasswordType = {
    password: '',
    confirmPassword: ''
}

export default function ResetPassword() {
    const [submit, { isLoading }] = useResetPasswordMutation()
    const navigate = useNavigate()
    const { token } = useParams()

    const handleSubmit = async (user: UserResetPasswordType) => {
        const { password, confirmPassword } = user
        try {
            if (password !== confirmPassword) {
                throw new Error('Password do not match')
            }
            const response = await submit({ password, token }).unwrap()
            console.log(response)
            toast.success('Password reset successful')
            navigate('/signin')
        } catch (error) {
            toast.error('Failed to reset password')
            console.error(error)
        }
    }

    const validate = (values: UserResetPasswordType) => {
        const errors: UserResetPasswordType | any = {}
        if (!values.password) {
            errors.password = 'Password is Required'
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match'
        }
        return errors
    }

    return (
        <main className=" w-full min-h-screen flex ">
            <section className="w-0"></section>
            <section className=" w-full  bg-mylightpink flex justify-center items-center">
                <div className="w-5/6 md:w-2/3 lg:w-1/3 bg-mylightgray px-5 md:px-7  lg:px-10 py-5 rounded-lg shadow-md">
                    <p className="font-bold text-lg lg:text-2xl my-4 lg:my-5 font-geologica -tracking-wide">
                        Reset your <span className="text-mydarkred"> Password</span>
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
                                    placeholder="New Password"
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
