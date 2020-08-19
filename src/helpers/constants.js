import bcaLogo from "assets/images/bca-logo.jpeg"
import mandiriLogo from "assets/images/mandiri-logo.png"
import { theme } from "styles"

export const ID_AKUN_KOKO = 40
export const URL_ZIZGAG = "https://zigzagfashion.id"

export const TEXT_STOCK_HABIS = "STOCK HABIS"
export const TEXT_FEATURED = "FEATURED"
export const ORIGIN = {
	city: "Surabaya",
	cityId: "444",
	province: "Jawa Timur",
	provinceId: "11"
}
export const Discount = {
	NORMAL: 5000,
	MORE_THAN_19: 10000
}

export const UserType = {
	PARTNER: "partner",
	REGULER: "reguler",
	VIP: "vip"
}

export const ErrorMessage = {
	NOT_FOUND: "Data produk tidak ditemukan."
}

export const CategoryIcon = {
	lain: "icon-diamond",
	sepatu: "icon-high-heel-boot",
	dompet: "icon-wallet1",
	lingerie: "icon-diamond",
	tas: "icon-bag",
	clothing: "icon-dress",
	sale: "icon-diamond"
}

export const BankLogo = {
	BCA: bcaLogo,
	MANDIRI: mandiriLogo
}

export const LIGHTBOX_SETTING = {
	progressBar: { fillColor: theme.primaryColor },
	settings: {
		transitionSpeed: 300,
		slideAnimationType: "slide",
		lightboxTransitionSpeed: 0.12,
		lightboxTransitionTimingFunction: "easeInOut"
	}
}
