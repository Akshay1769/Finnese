import axios from "axios";

export const getAllSchemes = async () => {

    const response =
        await axios.get(
            "https://api.mfapi.in/mf"
        );

    return {
        success: true,
        count: response.data.length,
        data: response.data
    };
};

export const getSchemeDetails = async (
    schemeCode: string
) => {

    const response =
        await axios.get(
            `https://api.mfapi.in/mf/${schemeCode}`
        );

    return {
        success: true,
        data: response.data
    };
};

export const getSchemeHistory = async (
    schemeCode: string
) => {

    const response =
        await axios.get(
            `https://api.mfapi.in/mf/${schemeCode}`
        );

    return {
        success: true,
        data: response.data.data
    };
};

export const searchSchemes = async (
    query: string
) => {

    const response =
        await axios.get(
            "https://api.mfapi.in/mf"
        );

    const schemes =
        response.data.filter(
            (
                scheme: any
            ) =>
                scheme.schemeName
                    .toLowerCase()
                    .includes(
                        query.toLowerCase()
                    )
        );

    return {

        success: true,

        count:
            schemes.length,

        data:
            schemes.slice(
                0,
                50
            )

    };

};