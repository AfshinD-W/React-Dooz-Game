import { FC, useState } from "react";

interface Iprops {
    number: string,
    onClickBlock?: (props: string) => void,
    PresentUser: boolean
}

const Block: FC<Iprops> = ({
    number,
    onClickBlock,
    PresentUser
}) => {
    const [IsSelect, setIsSelect] = useState<boolean>(false)
    const [Mark, setMark] = useState<string | undefined>(undefined)
    function OnClickButton() {
        if (!IsSelect && onClickBlock) {
            onClickBlock(number);
            setIsSelect(true);
            setMark(PresentUser ? "X" : "O");
        }
    }
    return (
        <button onClick={OnClickButton} className={`border w-12 h-12 ${Mark && "bg-gray-200"}`}>{Mark}</button>
    )

}
export default Block