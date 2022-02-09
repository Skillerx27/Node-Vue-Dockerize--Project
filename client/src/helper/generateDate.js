module.exports = getDate = async (days) => {
    const result = new Date()
    if (days) {
        result.setDate(result.getDate() + days)
    }
    result.setDate(result.getDate())
    var day = String(result.getDate()).padStart(2, '0')
    var month = String(result.getMonth() + 1).padStart(2, '0')
    var year = result.getFullYear()
    var todayDate = year + '/' + month + '/' + day
    return todayDate
  }

