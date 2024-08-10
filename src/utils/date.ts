import dayjs from 'dayjs';

export default class DateUtil {
    static extractDateFromISOString(ISOString: string) {
        try {
            const dateObject = new Date(ISOString);
            const extractedDate = dateObject.toISOString().split('T')[0];
            return extractedDate;
        } catch (error) {
            return null;
        }
    }

    static getYearFromISOString(ISOString: string) {
        try {
            const dateObject = new Date(ISOString);
            const year = dateObject.getFullYear();
            return year;
        } catch (error) {
            return null;
        }
    }

    static getTimeCreated(ISOString: string) {
        const dateObject = new Date(ISOString);
        const timeCreated = dayjs(dateObject).format(
            'DD MMMM, YYYY [at] hh:mm A [GMT]Z',
        );
        return timeCreated;
    }
}
