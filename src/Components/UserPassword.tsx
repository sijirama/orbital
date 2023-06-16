import { UserUpdatePasswordType } from '../Types/User'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useUpdatePasswordMutation } from '../Store/slices/userApiSlice'

export default function UserPassword() {
    const navigate = useNavigate()
    const [submit, { isLoading }] = useUpdatePasswordMutation()

    const initialState: UserUpdatePasswordType = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    }

    const validate = (values: UserUpdatePasswordType) => {
        const errors: UserUpdatePasswordType | any = {}
        if (!values.oldPassword) {
            errors.oldPassword = 'Old password is required'
        } else if (!values.password) {
            errors.password = 'New password must be provided'
        } else if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm password must be provided'
        } else if (!(values.password === values.confirmPassword)) {
            errors.confirmPassword = 'Passwords do not match!'
        }
        return errors
    }

    const handleSubmit = async (values: UserUpdatePasswordType) => {
        const data = { oldPassword: values.oldPassword, newPassword: values.password }
        try {
            const response = await submit(data)
            if (!response) {
                throw new Error()
            }
            toast.success('Password updated successfully')
            console.log(response)
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
            toast.error('Failed to update password')
        }
    }

    return (
        <section className="">
            <main className="w-full flex flex-col md:flex-row">
                <div className="hidden md:block md:w-1/3"></div>
                <div className="md:w-2/3 m-3 shadow-lg p-3 rounded-lg">
                    <Formik
                        initialValues={initialState}
                        validate={(values) => validate(values)}
                        onSubmit={(values, {}) => {
                            handleSubmit(values)
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="flex flex-col w-full ">
                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Old Password"
                                    type="password"
                                    name="oldPassword"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="oldPassword"
                                    component="div"
                                />

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

                                <button
                                    className={`text-mydarkred font-bold border-2 border-mydarkred rounded-lg w-2/3 lg:w-1/3 my-2 h-10 ${
                                        isSubmitting && isLoading && 'opacity-25'
                                    }`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting' : 'Update Your Password!'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </main>
        </section>
    )
}
