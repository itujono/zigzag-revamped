import * as yup from "yup"

export const addressValidation = yup.object().shape({
	email: yup.string().required("Email wajib diisi").email("Ini bukan email beneran, kan?"),
	name: yup.string().required("Nama wajib diisi").min(2, "Nama apaan ini?"),
	tele: yup.number().required("Nomor HP wajib diisi").min(6, "Nomor HP apaan ini?"),
	province: yup.string().required("Provinsi wajib diisi"),
	city: yup.string().required("Kota wajib diisi"),
	subdistrict: yup.string().required("Kecamatan wajib diisi"),
	// zip: yup
	// 	.string()
	// 	.required("Kode pos wajib diisi")
	// 	.max(5, "Kode pos apaan nih?"),
	address: yup.string().required("Alamat pengiriman wajib diisi")
})

export const confirmationSchema = yup.object().shape({
	// ==> untuk Payment Confirmation && Upgrade Confirmation
	order_code: yup.string().required("Kode order nya wajib diisi"),
	bank_receiver: yup.string().required("Bank penerima wajib diisi"),
	bank_sender: yup.string().required("Bank penerima wajib diisi"),
	total_transfer: yup
		.number()
		.required("Jumlah yang ditransfer wajib diisi")
		.typeError("Harus masukin angka aja ya (tidak perlu titik atau koma)"),
	date: yup.date("Wajib isi ya").required("Kapan ditransfer nya juga wajib diisi")
})

export const depositSchema = yup.object().shape({
	deposit_code: yup.string().required("Kode deposit nya wajib diisi"),
	bank_receiver: yup.string().required("Bank penerima wajib diisi"),
	bank_sender: yup.string().required("Bank penerima wajib diisi"),
	total_transfer: yup
		.number()
		.required("Jumlah yang ditransfer wajib diisi")
		.typeError("Harus masukin angka aja ya (tidak perlu titik atau koma)"),
	transfer_date: yup.date("Wajib isi ya").required("Kapan ditransfer nya juga wajib diisi")
})
