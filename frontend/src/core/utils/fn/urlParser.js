// 기본 url 과 객체를 넣으면 그대로 url 을 만들어줍니다.
// 예) urlParser('/feed', { a : 1, b : 'tt'}) = return '/feed?a=1&b=tt'
export const urlParser = (fullUrl, options={}) => {
    const queryStartIdx = fullUrl.indexOf('?')
    let url = fullUrl , newOptions = {...options}
    
    if (queryStartIdx !== -1){
        url = fullUrl.slice(0, queryStartIdx)
        const originOptions = {}
        fullUrl.slice(queryStartIdx + 1).split('&').map((option)=>{
            const [a,b] = option.split('=')
            originOptions[a] = b
        })
        newOptions = {...originOptions, ...newOptions}
    }
    if (JSON.stringify(newOptions) === "{}") return url
    url += '?'
    for (const [key, value] of Object.entries(newOptions)) 
        url += `${key}=${value}&`
    
    return url.slice(0,-1)
}