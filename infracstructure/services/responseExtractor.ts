// infracstructure/services/responseExtractor.ts

/**
 * Extrae los datos de una respuesta de Axios
 * @param response - La respuesta de Axios
 * @returns Los datos extraídos de la respuesta
 */
export function extractAxiosResponseData<T = unknown>(response: { data: T }): T {
  return response.data;
}