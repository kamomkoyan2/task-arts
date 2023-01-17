const ResponseData = (status: number, message: string | null, error: any | null, data: any | null) => {
    if (error != null && error instanceof Error) {
        return {
            status: status,
            message: error.message,
            errors: error,
            data: null
        };
    }

    return {
        status,
        message,
        errors: error,
        data: data
    };
}

export default { ResponseData };