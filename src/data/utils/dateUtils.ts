// para las fechas que vienen del back (string o Date)

export const formatDateFromBackend = (dateString: string): string => {
    const [year, month, day] = dateString.split("-")
    
    return `${day}/${month}/${year.slice(-2)}`
}
