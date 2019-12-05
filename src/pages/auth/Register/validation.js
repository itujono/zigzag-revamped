import * as yup from "yup"

export const validationSchema = yup.object().shape({
	first_name: yup.string().required("Nama depan jangan kosong"),
	last_name: yup.string().required("Nama belakang jangan kosong"),
	email: yup
		.string()
		.required("You have to tell your email")
		.email("Please provide a valid email address"),
	password: yup
		.string()
		.required()
		.min(8, "Eight characters minimum"),
	repeat_password: yup
		.string()
		.required("Please repeat your password")
		.oneOf([yup.ref("password")], "Password should match"),
	province: yup.string().required("Pilih provinsi kamu"),
	city: yup.string().required("Pilih kota/kabupaten kamu"),
	subdistrict: yup.string().required("Kecamatan nya juga"),
	zip: yup.string().required("Kode pos jangan lupa")
})
