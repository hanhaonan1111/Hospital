import type { medicineOrder, resGetAddress } from '@/types/payMedicines'
import http from '@/utils/http'

export function getMedicineBypPescriptionId(id: string) {
    return http.get<medicineOrder>('/patient/medicine/order/pre?prescriptionId=' + id)
}

export function getAddress() {
    return http.get<resGetAddress>('/patient/order/address')
}

export function getOrderId(data: { id: string, addressId: string }) {
    return http<any, { data: { id: string } }>({
        url: '/patient/medicine/order',
        method: "POST",
        data
    })
}