 /**
 * Returns a truncated string and appends "..." if its longer than the limit.
 *
 *
 * @param string - The string to be truncated
 * @param limit - The limit of the string
 * @returns The truncated strin...
 *
 */
const stringLimit = (string : string,limit : number) => {
   
    if(!string)
    {
        return ''
    }
    if(string.length > limit)
    {
        return string.slice(0,limit) + '...'
    }
    return string
}

export default stringLimit