function calculateRentalFee(rentalStartDate, rentalEndDate, rentalPrice) {
    const start = new Date(rentalStartDate);
    const end = new Date(rentalEndDate);
    const durationInMilliseconds = end - start;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
    return (rentalPrice * durationInDays) || 0;
}

function getCurrentISODate() {
    return new Date().toISOString();
}

module.exports = {
    calculateRentalFee,
    getCurrentISODate
};
