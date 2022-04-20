export const countAvgStars = (reviews) => {
    let output = 0
    for (let i = 0; i < reviews.length; i++) {
        output += reviews[i].starId
    }
    return output / reviews.length
}