export default function setMember(obj, keys, value) {
    let o = obj
    let iLast = keys.length - 1

    for (let i = 0; i < iLast; ++i) o = o[keys[i]]

    o[keys[iLast]] = value
    return obj
}
