export const countAvgStars = (reviews) => {
    let output = 0
    for (let i = 0; i < reviews.length; i++) {
        output += reviews[i].starId
    }
    if (output > 0) {
        return (output / reviews.length).toFixed(2)
    } else {
        return 0
    }

}