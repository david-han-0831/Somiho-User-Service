/**
 * API 클라이언트 통합 Export
 */

export { authApi, membersApi, productsApi, reservationsApi, marketPricesApi, noticesApi, dashboardApi } from "./client"

// 기본 export
import { authApi, membersApi, productsApi, reservationsApi, marketPricesApi, noticesApi, dashboardApi } from "./client"

const api = {
  auth: authApi,
  members: membersApi,
  products: productsApi,
  reservations: reservationsApi,
  marketPrices: marketPricesApi,
  notices: noticesApi,
  dashboard: dashboardApi,
}

export default api

