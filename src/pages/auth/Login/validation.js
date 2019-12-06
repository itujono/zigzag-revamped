import * as yup from "yup"

export const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required("Email jangan lupa")
		.email("Ini bukan email yang bener nih"),
	password: yup.string().required("Password wajib isi ya")
})
