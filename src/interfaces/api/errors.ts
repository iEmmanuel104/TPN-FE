export type APIError = Error & {
    data: {
        success: false,
        data: null,
        message: string
    }
}