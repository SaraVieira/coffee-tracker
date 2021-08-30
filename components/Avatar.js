import { toSvg } from "jdenticon"

const IncognitoAvatar = ({name}) => {
    return <><div className="incognito-avatar" dangerouslySetInnerHTML={{__html: toSvg(name, 150)}} /></>
}

export default IncognitoAvatar