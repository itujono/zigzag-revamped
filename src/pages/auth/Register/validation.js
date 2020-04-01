import * as yup from "yup"

export const validationSchema = yup.object().shape({
	first_name: yup.string().required("Nama depan jangan kosong"),
	last_name: yup.string().required("Nama belakang jangan kosong"),
	email: yup
		.string()
		.required("Emailnya jangan kosong")
		.email("Email address harus valid ya"),
	password: yup
		.string()
		.required()
		.min(8, "Delapan karakter ya minimalnya"),
	repeat_password: yup
		.string()
		.required("Please repeat your password")
		.oneOf([yup.ref("password")], "Password should match"),
	province: yup
		.number()
		.typeError("Pilih dari menu ya, jangan diketik")
		.required("Pilih provinsi kamu"),
	city: yup
		.number()
		.typeError("Pilih dari menu ya, jangan diketik")
		.required("Pilih kota/kabupaten kamu"),
	subdistrict: yup
		.number()
		.typeError("Pilih dari menu ya, jangan diketik")
		.required("Kecamatan nya juga"),
	zip: yup.string().required("Kode pos jangan lupa"),
	tele: yup.string().required("Nomor HP jangan lupa"),
	address: yup.string().required("Alamat juga jangan lupa")
})
