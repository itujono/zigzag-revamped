import * as yup from "yup"

export const addressValidation = yup.object().shape({
	email: yup
		.string()
		.required("Email wajib diisi")
		.email("Ini bukan email beneran, kan?"),
	name: yup
		.string()
		.required("Nama wajib diisi")
		.min(2, "Nama apaan ini?"),
	tele: yup
		.number()
		.required("Nomor HP wajib diisi")
		.min(6, "Nomor HP apaan ini?"),
	province: yup.string().required("Provinsi wajib diisi"),
	city: yup.string().required("Kota wajib diisi"),
	subdistrict: yup.string().required("Kecamatan wajib diisi"),
	zip: yup
		.string()
		.required("Kode pos wajib diisi")
		.max(5, "Kode pos apaan nih?"),
	address: yup.string().required("Alamat pengiriman wajib diisi")
})
