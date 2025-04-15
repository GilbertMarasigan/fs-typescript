export const healthRatingColor = (rating: number): string => {
    switch (rating) {
        case 0:
            return 'green';
        case 2:
        case 3:
            return 'red';
        case 1:
            return 'goldenrod';
        default:
            return 'gray'; // default case in case no valid rating is passed
    }
};
