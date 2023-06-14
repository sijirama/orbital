import { useEffect, useState } from 'react'
import { useAppSelector } from '../Store/hooks'
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { UserUpdateType } from '../Types/User'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useUpdateUserMutation } from '../Store/slices/userApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function UserProfile() {
    const user = useAppSelector((state) => state.user.user)
    const [submit, { isLoading }] = useUpdateUserMutation()
    const [image, setImage] = useState(user?.profilePicture)
    const [file, setFile] = useState<File | null>(null)
    const navigate = useNavigate()

    const initialState: UserUpdateType = {
        firstName: user?.firstName!,
        lastName: user?.lastName!,
        email: user?.email!,
        bio: (user as any)?.bio,
        address: (user as any)?.address,
        phoneNumber: (user as any)?.phoneNumber
    }

    const onUpload = (event: FileUploadSelectEvent) => {
        const uploadedFiles = event.files
        if (uploadedFiles && uploadedFiles.length > 0) {
            const uploadedFile = uploadedFiles[0]
            setFile(uploadedFile)
        }
    }

    const handleSubmit = async (values: UserUpdateType) => {
        const data = { ...values, profilePicture: image }
        try {
            const response = await submit(data)
            if (!response) {
                throw new Error()
            }
            toast.success('Profile updated successfully')
            navigate('/dashboard')
        } catch (error) {
            toast.error('Failed to update profile')
        }
    }
    const validate = (values: UserUpdateType) => {}

    useEffect(() => {
        //console.log(file)
    }, [file])

    return (
        <section className="">
            <div className="flex flex-col md:flex-row gap-1 md:gap-3 lg:gap-5 p-2 md:p-5">
                <div className=" lg:w-1/3 p-2 md:p-4 flex flex-col items-center gap-3 justify-center">
                    <p className="font-semibold font-rubik">Profile Image</p>
                    <div className="h-28">
                        <img className="h-full w-full" src={image} />
                    </div>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        url=""
                        accept="image/*"
                        maxFileSize={1000000}
                        onSelect={onUpload}
                        chooseLabel="Add a Profile Image"
                    />
                </div>

                <div className="w-full rounded-lg shadow-lg flex flex-col items-center justify-center p-1 md:p-2 lg:p-4">
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
                                    disabled
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
                                    placeholder="Bio"
                                    type="text"
                                    name="bio"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="password"
                                    component="div"
                                />

                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Address"
                                    type="text"
                                    name="address"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="confirmPassword"
                                    component="div"
                                />
                                <Field
                                    className="bg-mylightgray font-light focus:outline-none p-1 md:p-2 my-1 md:my-2 border border-gray-300 rounded-md"
                                    placeholder="Your Phone Number"
                                    type="text"
                                    name="phoneNumber"
                                />
                                <ErrorMessage
                                    className="text-red-700 font-semibold text-xs"
                                    name="confirmPassword"
                                    component="div"
                                />

                                <button
                                    className={`text-mydarkred font-bold border-2 border-mydarkred rounded-lg w-2/3 lg:w-1/3 my-2 h-10 ${
                                        isLoading && 'opacity-25'
                                    }`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Submitting' : 'Update Your Profile!'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}
