export default function useUtilities() {
    const commaSeperatedNumber = (num: number) =>
        num.toString().replaceAll(/\B(?=(\d{3})+$)/g, ',');

    return {
        commaSeperatedNumber,
    };
}
