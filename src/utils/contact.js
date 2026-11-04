import siteConfig from '../siteConfig'

export const phone = siteConfig.contact.phone
export const phoneDigits = phone.replace(/\D/g, '')
export const whatsAppNumber = phoneDigits
export const whatsAppUrl = (message = siteConfig.contact.whatsappMessage) =>
  `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`

export const phoneDisplay =
  phone.startsWith('+91') && phoneDigits.length === 12
    ? `+91 ${phoneDigits.slice(2, 7)} ${phoneDigits.slice(7)}`
    : phone

export function formatMobileNumber(value) {
  const trimmedValue = value.trim()
  const digits = trimmedValue.replace(/\D/g, '')

  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  if (trimmedValue.startsWith('+91') && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }

  return trimmedValue
}
